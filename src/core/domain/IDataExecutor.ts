export interface IDataExecutor {
  executeOperation(intent: string): Promise<any>;
}
