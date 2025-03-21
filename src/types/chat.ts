// Message Types
export interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: string;
  }
  
  // Chat Session Types
  export interface ChatSession {
    id: string;
    title: string;
    timestamp: string;
    isActive: boolean;
    messages: Message[];
  }
  
  // Chat Context Types
  export interface ChatContextType {
    sessions: ChatSession[];
    currentSession: ChatSession | null;
    addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
    createNewSession: () => void;
    deleteSession: (sessionId: string) => void;
    setActiveSession: (sessionId: string) => void;
    updateSessionTitle: (sessionId: string, title: string) => void;
  }
  
  // Chat Input Props
  export interface ChatInputProps {
    onSendMessage: (message: string) => void;
    disabled?: boolean;
  }
  
  // Chat Message Props
  export interface ChatMessageProps {
    message: Message;
    onEdit?: (messageId: string, newText: string) => void;
    onDelete?: (messageId: string) => void;
  }
  
  // Chat Box Props
  export interface ChatBoxProps {
    messages: Message[];
    isLoading?: boolean;
  }
  
  // Chat Sessions Props
  export interface ChatSessionsProps {
    sessions: ChatSession[];
    onSessionClick: (sessionId: string) => void;
    onNewSession: () => void;
    onDeleteSession: (sessionId: string) => void;
  }
  
  // API Response Types
  export interface ChatResponse {
    message: string;
    error?: string;
  }
  
  // Theme Types
  export type Theme = 'light' | 'dark';
  
  export interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
  }