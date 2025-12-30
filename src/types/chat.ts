export type ChatRole = 'user' | 'model' | 'system';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}
