import { fakeTransactions } from '@/core/infraestructure/datasources/data';

type OperationParams = {
  startDate: string;
  endDate: string;
};

interface OperationResult {
  name: string;
  description: string;
  execute: (params: OperationParams) => Promise<any>;
}

function isWithinRange(date: string, start: string, end: string) {
  return date >= start && date <= end;
}

export class FinancialOperations {
  public listTransactionsByDateRange(): OperationResult {
    return {
      name: 'listTransactionsByDateRange',
      description:
        'Devuelve todas las transacciones (ingresos, gastos y transferencias) entre dos fechas.',
      execute: async ({ startDate, endDate }: OperationParams) => {
        return fakeTransactions.filter((t) =>
          isWithinRange(t.date, startDate, endDate)
        );
      },
    };
  }

  public listExpensesGroupedByCategory(): OperationResult {
    return {
      name: 'listExpensesGroupedByCategory',
      description:
        'Muestra el total gastado por cada categoría dentro del periodo especificado.',
      execute: async ({ startDate, endDate }: OperationParams) => {
        const expenses = fakeTransactions.filter(
          (t) =>
            t.type === 'expense' && isWithinRange(t.date, startDate, endDate)
        );

        const grouped: Record<string, { total: number; transactions: number }> =
          {};

        for (const e of expenses) {
          if (!grouped[e.category]) {
            grouped[e.category] = { total: 0, transactions: 0 };
          }
          grouped[e.category].total += Math.abs(e.amount);
          grouped[e.category].transactions += 1;
        }

        return {
          period: { startDate, endDate },
          totalExpenses: expenses.reduce(
            (sum, e) => sum + Math.abs(e.amount),
            0
          ),
          categories: Object.entries(grouped).map(([category, data]) => ({
            category,
            ...data,
          })),
        };
      },
    };
  }

  public topExpenseCategories(): OperationResult {
    return {
      name: 'topExpenseCategories',
      description:
        'Devuelve las 3 categorías en las que más se gastó durante un periodo de tiempo.',
      execute: async ({ startDate, endDate }: OperationParams) => {
        const expenses = fakeTransactions.filter(
          (t) =>
            t.type === 'expense' && isWithinRange(t.date, startDate, endDate)
        );

        const grouped: Record<string, number> = {};

        for (const e of expenses) {
          grouped[e.category] = (grouped[e.category] || 0) + Math.abs(e.amount);
        }

        const topCategories = Object.entries(grouped)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([category, total]) => ({ category, total }));

        return {
          period: { startDate, endDate },
          topCategories,
        };
      },
    };
  }

  public generateFinancialSummary(): OperationResult {
    return {
      name: 'generateFinancialSummary',
      description:
        'Entrega un resumen con ingresos, gastos, saldo neto y número de transacciones para el periodo.',
      execute: async ({ startDate, endDate }: OperationParams) => {
        const filtered = fakeTransactions.filter((t) =>
          isWithinRange(t.date, startDate, endDate)
        );

        const income = filtered
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);

        const expenses = filtered
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + Math.abs(t.amount), 0);

        const netBalance = income - expenses;

        return {
          period: { startDate, endDate },
          income,
          expenses,
          netBalance,
          transactionCount: filtered.length,
        };
      },
    };
  }
}

export function getRegisteredOperations(): Record<string, OperationResult> {
  const instance = new FinancialOperations();

  const entries = Object.getOwnPropertyNames(FinancialOperations.prototype)
    .filter((name) => name !== 'constructor')
    .map((name) => {
      const op = (instance as any)[name]();
      return [op.name, op];
    });

  return Object.fromEntries(entries);
}

export function buildOperationsContext(): string {
  const operations = getRegisteredOperations();
  return Object.values(operations)
    .map((op) => `- ${op.name}: ${op.description}`)
    .join('\n');
}
