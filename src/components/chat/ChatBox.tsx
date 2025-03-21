import { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import styles from '@/styles/components/ChatBox.module.css';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export default function ChatBox() {
  const chatboxRef = useRef<HTMLDivElement>(null);

  // Example messages (later this will come from your chat state/context)
  const messages: Message[] = [
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      isUser: false,
      timestamp: '12:00 PM'
    },
    {
      id: '2',
      text: 'I have a question about AI.',
      isUser: true,
      timestamp: '12:01 PM'
    }
  ];

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.chatbox} ref={chatboxRef}>
      <div className={styles.messagesContainer}>
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
      </div>
      
      {messages.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>💭</div>
          <h3>Start a Conversation</h3>
          <p>Send a message to begin chatting with the AI</p>
        </div>
      )}
    </div>
  );
}