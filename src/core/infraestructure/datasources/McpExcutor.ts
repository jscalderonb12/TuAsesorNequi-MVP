import { FinancialQuery } from '@/core/domain/types';
import { getRegisteredOperations } from '@/core/infraestructure/datasources/FinancialOperations';

export class MCPExecutor {
  private readonly financialOperations = getRegisteredOperations();

  async execute(query: FinancialQuery): Promise<any> {
    const { operation, params } = query;

    const handler = this.financialOperations[operation];

    if (!handler) {
      return {
        error: `Operación no soportada: "${operation}".`,
        disponibles: Object.keys(this.financialOperations),
      };
    }

    try {
      return await handler.execute(params);
    } catch (err) {
      return {
        error: `Error al ejecutar la operación "${operation}".`,
        detail: err instanceof Error ? err.message : String(err),
      };
    }
  }
}
