import { ConversationMessage } from '@/core/domain/types';

export function cleanJson(text: string): any | null {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/```json\s*([\s\S]*?)\s*```/);
    if (match) {
      try {
        return JSON.parse(match[1]);
      } catch {
        return null;
      }
    }
    return null;
  }
}

export const cleanOldContext = (
  history: ConversationMessage[],
  maxAge: number = 30
): ConversationMessage[] => {
  const now = new Date();
  return history.filter((msg) => {
    const ageInMinutes =
      (now.getTime() - msg.timestamp.getTime()) / (1000 * 60);
    return ageInMinutes < maxAge;
  });
};
