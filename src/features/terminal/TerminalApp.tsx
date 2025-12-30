import React, { useState, useEffect, useRef } from 'react';
import { sendChatMessage } from '@/services/genaiClient';
import { ChatMessage } from '@/types/chat';
import { TERMINAL_SYSTEM_PROMPT } from './prompt';

const TerminalApp: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<ChatMessage[]>([
    { role: 'system', content: 'VisionOS Kernel v1.0.0 initialized...' },
    { role: 'system', content: 'Loading User Profile: Junghoon Cho...' },
    { role: 'model', content: 'Greetings. I am the system AI for Junghoon Cho\'s portfolio. I can answer questions about his experience in LLMs, MLOps, and Software Engineering. How can I assist?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Focus input on mount and click
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleContainerClick = () => {
    // Ensure text selection is still possible
    const selection = window.getSelection();
    if (!selection || selection.toString().length === 0) {
      inputRef.current?.focus();
    }
  };

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setHistory(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Handle local commands
    if (userMessage.toLowerCase() === 'clear') {
      setHistory([]);
      setIsLoading(false);
      return;
    }

    try {
      const text = await sendChatMessage({
        history,
        message: userMessage,
        systemInstruction: TERMINAL_SYSTEM_PROMPT,
      });

      setHistory((prev) => [...prev, { role: 'model', content: text }]);
    } catch (error: any) {
      console.error(error);
      const message = error?.message || 'Error: Connection to Neural Net interrupted. Please try again.';
      setHistory(prev => [...prev, { role: 'system', content: message }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="h-full flex flex-col font-mono text-sm sm:text-base bg-transparent p-4 text-gray-300 overflow-hidden"
      onClick={handleContainerClick}
    >
      <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pb-4">
        {history.map((msg, index) => (
          <div key={index} className={`break-words ${msg.role === 'user' ? 'text-white font-semibold' : msg.role === 'system' ? 'text-blue-400 opacity-70' : 'text-emerald-400'}`}>
            <span className="opacity-50 mr-2 select-none">
              {msg.role === 'user' ? '>' : msg.role === 'system' ? '#' : '$'}
            </span>
            <span className="whitespace-pre-wrap leading-relaxed">{msg.content}</span>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center text-emerald-400">
            <span className="opacity-50 mr-2">$</span>
            <span className="animate-pulse">_</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleCommand} className="mt-2 flex items-center border-t border-white/10 pt-2 shrink-0">
        <span className="text-blue-500 mr-2 font-bold select-none">{`~`}</span>
        <span className="text-white mr-2 select-none">{`>`}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/20 font-mono"
          placeholder="Ask about my experience..."
          autoComplete="off"
          autoFocus
        />
      </form>
    </div>
  );
};

export default TerminalApp;
