import { useState, useCallback } from 'react';
import { useChat as useChatContext } from '@/lib/context/ChatContext';
import { chatApi } from '@/lib/api/chatApi';

export function useChatActions() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addMessage, currentSession } = useChatContext();

  const sendMessage = useCallback(
    async (message: string) => {
      if (!currentSession) {
        setError('No active chat session');
        return;
      }

      setIsLoading(true);
      setError(null);

      // Add user message immediately
      addMessage({
        text: message,
        isUser: true,
      });

      try {
        const { data, error } = await chatApi.sendMessage(
          message,
          currentSession.id
        );

        if (error) {
          setError(error.message);
          return;
        }

        if (data) {
          // Add bot response
          addMessage({
            text: data.response,
            isUser: false,
          });
        }
      } catch (err) {
        setError('Failed to send message');
      } finally {
        setIsLoading(false);
      }
    },
    [currentSession, addMessage]
  );

  return {
    sendMessage,
    isLoading,
    error,
  };
}

export function useSessionActions() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { createNewSession, deleteSession, updateSessionTitle } = useChatContext();

  const createSession = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await chatApi.createSession();
      if (error) {
        setError(error.message);
        return;
      }

      if (data) {
        createNewSession();
      }
    } catch (err) {
      setError('Failed to create session');
    } finally {
      setIsLoading(false);
    }
  }, [createNewSession]);

  const removeSession = useCallback(
    async (sessionId: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const { error } = await chatApi.deleteSession(sessionId);
        if (error) {
          setError(error.message);
          return;
        }

        deleteSession(sessionId);
      } catch (err) {
        setError('Failed to delete session');
      } finally {
        setIsLoading(false);
      }
    },
    [deleteSession]
  );

  const updateTitle = useCallback(
    async (sessionId: string, title: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const { error } = await chatApi.updateSessionTitle(sessionId, title);
        if (error) {
          setError(error.message);
          return;
        }

        updateSessionTitle(sessionId, title);
      } catch (err) {
        setError('Failed to update session title');
      } finally {
        setIsLoading(false);
      }
    },
    [updateSessionTitle]
  );

  return {
    createSession,
    removeSession,
    updateTitle,
    isLoading,
    error,
  };
}