import { useState } from 'react';
import styles from '@/styles/components/ChatSessions.module.css';

interface ChatSession {
  id: string;
  title: string;
  timestamp: string;
  isActive: boolean;
}

export default function ChatSessions() {
  // Example sessions - in a real app, these would come from your backend
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'Chat about React Components',
      timestamp: '2 hours ago',
      isActive: true,
    },
    {
      id: '2',
      title: 'TypeScript Discussion',
      timestamp: '1 day ago',
      isActive: false,
    },
    {
      id: '3',
      title: 'Next.js Migration Planning',
      timestamp: '2 days ago',
      isActive: false,
    },
  ]);

  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      timestamp: 'Just now',
      isActive: true,
    };

    setSessions(prev => 
      prev.map(session => ({ ...session, isActive: false }))
        .concat([newSession])
    );
  };

  const handleSessionClick = (sessionId: string) => {
    setSessions(prev =>
      prev.map(session => ({
        ...session,
        isActive: session.id === sessionId,
      }))
    );
  };

  return (
    <div className={styles.sessionsContainer}>
      <button 
        className={styles.newChatButton}
        onClick={handleNewChat}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        New Chat
      </button>

      <div className={styles.sessionsList}>
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`${styles.sessionItem} ${
              session.isActive ? styles.active : ''
            }`}
            onClick={() => handleSessionClick(session.id)}
          >
            <div className={styles.sessionIcon}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div className={styles.sessionInfo}>
              <div className={styles.sessionTitle}>{session.title}</div>
              <div className={styles.sessionTimestamp}>{session.timestamp}</div>
            </div>
            <button className={styles.deleteButton}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}