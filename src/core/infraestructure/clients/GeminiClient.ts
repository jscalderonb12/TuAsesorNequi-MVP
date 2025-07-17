import { ILLMClient } from '@/core/domain/ILLMClient';
import axios from 'axios';

export class GeminiClient implements ILLMClient {
  private model = 'gemini-2.0-flash';
  private urlModel: string;

  constructor(private apiKey: string) {
    this.urlModel = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
  }

  async ask(prompt: string): Promise<string> {
    const body = {
      contents: [{ parts: [{ text: prompt }] }],
    };

    const { data } = await axios.post(this.urlModel, body);
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }
}
