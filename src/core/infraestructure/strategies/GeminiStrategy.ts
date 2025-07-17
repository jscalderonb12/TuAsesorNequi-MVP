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
  explanationFollowupPrompt,
  explanationPrompt,
  fallbackPrompt,
} from '@/core/infraestructure/strategies/Prompts';

export class GeminiStrategy implements IChatStrategy {
  private context: ConversationContext = { lastQuery: '' };

  constructor(
    private geminiClient: GeminiClient,
    private mcpExecutor: MCPExecutor
  ) {}

  private isValidIntent(parsed: any): boolean {
    return parsed && typeof parsed === 'object';
  }

  private parseOperation(parsed: any): FinancialQuery | null {
    try {
      return FinancialOperationSchema.parse(parsed);
    } catch {
      return null;
    }
  }

  async response(userMessage: string): Promise<string> {
    const intentResponse = await this.geminiClient.ask(
      analyzeIntentPrompt(userMessage)
    );
    const parsedIntent = cleanJson(intentResponse);

    if (!this.isValidIntent(parsedIntent)) {
      return this.handleFollowUp(userMessage);
    }

    const operation = this.parseOperation(parsedIntent);
    if (!operation) {
      return this.fallback(userMessage);
    }

    const result = await this.mcpExecutor.execute(operation);
    this.updateContext(userMessage, operation, result);

    return this.geminiClient.ask(
      explanationPrompt(userMessage, JSON.stringify(result, null, 2))
    );
  }

  private updateContext(
    query: string,
    operation: FinancialQuery,
    result: any
  ): void {
    this.context = {
      lastQuery: query,
      lastOperation: operation.operation,
      lastParams: operation.params,
      lastResult: result,
    };
  }

  private async fallback(userMessage: string): Promise<string> {
    return this.geminiClient.ask(fallbackPrompt(userMessage));
  }

  private async handleFollowUp(userMessage: string): Promise<string> {
    const { lastOperation, lastResult } = this.context;

    if (!lastOperation || !lastResult) {
      return this.fallback(userMessage);
    }

    return this.geminiClient.ask(
      explanationFollowupPrompt(userMessage, lastResult, lastOperation)
    );
  }
}
