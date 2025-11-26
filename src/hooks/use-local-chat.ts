import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChatMessage } from '@/types/chatbot';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function useLocalChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const append = useCallback(async (message: { role: 'user' | 'assistant'; content: string }) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: message.role,
      content: message.content,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call our local chatbot API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...messages,
            userMessage,
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data: ChatMessage = await response.json();

      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Handle navigation if specified
      if (data.navigate_to) {
        setTimeout(() => {
          router.push(data.navigate_to!);
        }, 800); // Small delay to show response before navigating
      }
    } catch (error) {
      // console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, router]);

  const reload = useCallback(async () => {
    // Not implementing reload for now
    return null;
  }, []);

  const stop = useCallback(() => {
    setIsLoading(false);
  }, []);

  return {
    messages,
    input,
    handleInputChange,
    isLoading,
    stop,
    setInput,
    reload,
    append,
  };
}
