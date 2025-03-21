import { createContext, useContext, useReducer, ReactNode } from 'react';
import { ChatContextType, ChatSession, Message } from '@/types/chat';

// Initial state
const initialState: { sessions: ChatSession[] } = {
  sessions: []
};

// Action types
type ActionType =
  | { type: 'ADD_MESSAGE'; payload: { sessionId: string; message: Omit<Message, 'id' | 'timestamp'> } }
  | { type: 'CREATE_SESSION' }
  | { type: 'DELETE_SESSION'; payload: string }
  | { type: 'SET_ACTIVE_SESSION'; payload: string }
  | { type: 'UPDATE_SESSION_TITLE'; payload: { sessionId: string; title: string } };

// Reducer function
function chatReducer(state: typeof initialState, action: ActionType) {
  switch (action.type) {
    case 'ADD_MESSAGE': {
      const newMessage: Message = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...action.payload.message
      };

      return {
        ...state,
        sessions: state.sessions.map(session =>
          session.id === action.payload.sessionId
            ? { ...session, messages: [...session.messages, newMessage] }
            : session
        )
      };
    }

    case 'CREATE_SESSION': {
      const newSession: ChatSession = {
        id: Date.now().toString(),
        title: 'New Chat',
        timestamp: new Date().toISOString(),
        isActive: true,
        messages: []
      };

      return {
        ...state,
        sessions: [
          ...state.sessions.map(session => ({ ...session, isActive: false })),
          newSession
        ]
      };
    }

    case 'DELETE_SESSION':
      return {
        ...state,
        sessions: state.sessions.filter(session => session.id !== action.payload)
      };

    case 'SET_ACTIVE_SESSION':
      return {
        ...state,
        sessions: state.sessions.map(session => ({
          ...session,
          isActive: session.id === action.payload
        }))
      };

    case 'UPDATE_SESSION_TITLE':
      return {
        ...state,
        sessions: state.sessions.map(session =>
          session.id === action.payload.sessionId
            ? { ...session, title: action.payload.title }
            : session
        )
      };

    default:
      return state;
  }
}

// Create context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Provider component
export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const currentSession = state.sessions.find(session => session.isActive) || null;

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    if (currentSession) {
      dispatch({
        type: 'ADD_MESSAGE',
        payload: { sessionId: currentSession.id, message }
      });
    }
  };

  const createNewSession = () => {
    dispatch({ type: 'CREATE_SESSION' });
  };

  const deleteSession = (sessionId: string) => {
    dispatch({ type: 'DELETE_SESSION', payload: sessionId });
  };

  const setActiveSession = (sessionId: string) => {
    dispatch({ type: 'SET_ACTIVE_SESSION', payload: sessionId });
  };

  const updateSessionTitle = (sessionId: string, title: string) => {
    dispatch({
      type: 'UPDATE_SESSION_TITLE',
      payload: { sessionId, title }
    });
  };

  const value: ChatContextType = {
    sessions: state.sessions,
    currentSession,
    addMessage,
    createNewSession,
    deleteSession,
    setActiveSession,
    updateSessionTitle
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

// Custom hook to use chat context
export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}