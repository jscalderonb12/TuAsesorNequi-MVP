export interface IChatStrategy {
  response(userMessage: string): Promise<string>;
}
