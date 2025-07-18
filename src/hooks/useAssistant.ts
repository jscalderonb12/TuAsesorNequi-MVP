import { useState } from 'react';
import { GeminiClient } from '@/core/infraestructure/clients/GeminiClient';
import { GeminiStrategy } from '@/core/infraestructure/strategies/GeminiStrategy';
import { MCPExecutor } from '@/core/infraestructure/datasources/McpExcutor';

const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const geminiClient = new GeminiClient(geminiApiKey);
const mcpExecutor = new MCPExecutor();
const assistant = new GeminiStrategy(geminiClient, mcpExecutor);

export const useAssistant = () => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<
    { role: 'user' | 'bot'; message: string }[]
  >([]);

  const sendMessage = async (userMessage: string) => {
    setLoading(true);
    setHistory((prev) => [...prev, { role: 'user', message: userMessage }]);

    try {
      const reply = await assistant.response(userMessage);
      setHistory((prev) => [...prev, { role: 'bot', message: reply }]);
    } catch (err: any) {
      setHistory((prev) => [
        ...prev,
        {
          role: 'bot',
          message:
            '😬 Algo inesperado ocurrió procesando tu consulta. Te agradezco si lo intentas nuevamente.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    history,
    loading,
    sendMessage,
  };
};
