import { getGeminiModel, getGeminiProxyUrl } from '@/config/env';
import { ChatMessage } from '@/types/chat';

interface SendChatOptions {
  history: ChatMessage[];
  message: string;
  systemInstruction: string;
}

interface GeminiProxyResponse {
  text?: string;
  error?: string;
  message?: string;
}

const normalizeBaseUrl = (url: string) => url.replace(/\/+$/, '');

export const sendChatMessage = async ({ history, message, systemInstruction }: SendChatOptions) => {
  const proxyUrl = getGeminiProxyUrl();
  if (!proxyUrl) {
    throw new Error('VITE_GEMINI_PROXY_URL is not set');
  }

  const filteredHistory = history
    .filter((entry) => entry.role !== 'system')
    .map((entry) => ({ role: entry.role, content: entry.content }));

  const response = await fetch(`${normalizeBaseUrl(proxyUrl)}/gemini`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      history: filteredHistory,
      message,
      systemInstruction,
      model: getGeminiModel(),
    }),
  });

  const payload = (await response.json().catch(() => ({}))) as GeminiProxyResponse;

  if (!response.ok) {
    const errorMessage = payload.error || payload.message || `Gemini proxy error (${response.status})`;
    throw new Error(errorMessage);
  }

  return payload.text || '';
};
