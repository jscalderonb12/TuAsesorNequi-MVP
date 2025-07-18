import { IChatStrategy } from '@/core/domain/IChatStrategy';
import {
  ConversationContext,
  FinancialOperationSchema,
  FinancialQuery,
} from '@/core/domain/types';
import { GeminiClient } from '@/core/infraestructure/clients/GeminiClient';
import { MCPExecutor } from '@/core/infraestructure/datasources/McpExcutor';
import { cleanJson } from '@/core/infraestructure/strategies/utils';
import {
  analyzeIntentPrompt,
  conversationalPrompt,
  explanationPrompt,
} from '@/core/infraestructure/strategies/Prompts';

export class GeminiStrategy implements IChatStrategy {
  private context: ConversationContext = {
    lastQuery: '',
    conversationHistory: [],
  };

  constructor(
    private geminiClient: GeminiClient,
    private mcpExecutor: MCPExecutor
  ) {}

  async response(userMessage: string): Promise<string> {
    const operation = await this.tryParseOperation(userMessage);

    let response: string;

    if (operation) {
      response = await this.executeOperation(userMessage, operation);
    } else {
      response = await this.respondConversationally(userMessage);
    }

    this.addToHistory(userMessage, operation || undefined);

    return response;
  }

  private async tryParseOperation(
    userMessage: string
  ): Promise<FinancialQuery | null> {
    try {
      console.log({
        analyzeIntentPrompt: analyzeIntentPrompt(
          userMessage,
          this.context.conversationHistory
        ),
      });
      const intentResponse = await this.geminiClient.ask(
        analyzeIntentPrompt(userMessage, this.context.conversationHistory)
      );

      const parsedIntent = cleanJson(intentResponse);

      if (!parsedIntent || typeof parsedIntent !== 'object') {
        return null;
      }

      return FinancialOperationSchema.parse(parsedIntent);
    } catch {
      return null;
    }
  }

  private async executeOperation(
    userMessage: string,
    operation: FinancialQuery
  ): Promise<string> {
    const result = await this.mcpExecutor.execute(operation);

    this.updateOperationContext(userMessage, operation, result);

    console.log({
      explanationPrompt: explanationPrompt(
        userMessage,
        result,
        this.context.conversationHistory
      ),
    });

    return this.geminiClient.ask(
      explanationPrompt(userMessage, result, this.context.conversationHistory)
    );
  }

  private async respondConversationally(userMessage: string): Promise<string> {
    console.log({
      conversationalPrompt: conversationalPrompt(
        userMessage,
        this.context.conversationHistory
      ),
    });

    return this.geminiClient.ask(
      conversationalPrompt(userMessage, this.context.conversationHistory)
    );
  }

  private updateOperationContext(
    query: string,
    operation: FinancialQuery,
    result: any
  ): void {
    this.context.lastQuery = query;
    this.context.lastOperation = operation.operation;
    this.context.lastParams = operation.params;
    this.context.lastResult = result;
  }

  private addToHistory(userMessage: string, operation?: FinancialQuery): void {
    this.context.conversationHistory.push({
      userMessage,
      operation: operation?.operation,
      params: operation?.params,
      result: operation ? this.context.lastResult : undefined,
      timestamp: new Date(),
    });

    if (this.context.conversationHistory.length > 5) {
      this.context.conversationHistory =
        this.context.conversationHistory.slice(-5);
    }
  }
}
