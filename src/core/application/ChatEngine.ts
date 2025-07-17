import { IChatStrategy } from '@/core/domain/IChatStrategy';

export class ChatEngine {
  constructor(private strategy: IChatStrategy) {}

  async processMessage(texto: string): Promise<string> {
    return this.strategy.response(texto);
  }
}
