export interface ILLMClient {
  ask(prompt: string): Promise<string>;
}
