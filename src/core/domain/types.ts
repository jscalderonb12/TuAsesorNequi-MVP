import { z } from 'zod';
import { getRegisteredOperations } from '@/core/infraestructure/datasources/FinancialOperations';

const operationNames = Object.keys(getRegisteredOperations());

export const FinancialOperationSchema = z.object({
  operation: z.union(operationNames.map((op) => z.literal(op))),
  params: z.object({
    startDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato esperado: YYYY-MM-DD'),
    endDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato esperado: YYYY-MM-DD'),
  }),
});

export type FinancialQuery = z.infer<typeof FinancialOperationSchema>;

export interface ConversationMessage {
  userMessage: string;
  operation?: string;
  params?: any;
  result?: any;
  timestamp: Date;
}

export interface ConversationContext {
  lastQuery: string;
  lastOperation?: string;
  lastParams?: any;
  lastResult?: any;
  conversationHistory: ConversationMessage[];
}
