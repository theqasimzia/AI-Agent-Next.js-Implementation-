import { useState } from 'react';
import styles from '@/styles/components/ChatMessage.module.css';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

export default function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`${styles.messageContainer} ${isUser ? styles.userMessage : styles.botMessage}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.messageContent}>
        {!isUser && (
          <div className={styles.botIcon}>
            🤖
          </div>
        )}
        <div className={styles.messageBody}>
          <div className={styles.messageText}>
            {message}
          </div>
          {isHovered && (
            <div className={styles.messageActions}>
              <button className={styles.actionButton} title="Copy message">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
              </button>
              {isUser && (
                <button className={styles.actionButton} title="Edit message">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className={styles.messageTimestamp}>
        {timestamp}
      </div>
    </div>
  );
}