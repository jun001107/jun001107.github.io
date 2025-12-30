import { GoogleGenAI } from '@google/genai';
import { getGeminiApiKey, getGeminiModel } from '@/config/env';
import { ChatMessage } from '@/types/chat';

const MODEL_NAME = getGeminiModel();

interface SendChatOptions {
  history: ChatMessage[];
  message: string;
  systemInstruction: string;
}

export const sendChatMessage = async ({ history, message, systemInstruction }: SendChatOptions) => {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set');
  }

  const ai = new GoogleGenAI({ apiKey });

  const chat = ai.chats.create({
    model: MODEL_NAME,
    config: {
      systemInstruction,
    },
    history: history
      .filter((entry) => entry.role !== 'system')
      .map((entry) => ({
        role: entry.role,
        parts: [{ text: entry.content }],
      })),
  });

  const result = await chat.sendMessage({ message });
  return result.text || '';
};
