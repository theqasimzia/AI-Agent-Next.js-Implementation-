import { ReactNode } from 'react';
import styles from '@/styles/components/Layout.module.css';
import Header from './Header';  // Add this import at the top

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <Header />  {/* Add the Header component here */}
        
        {/* Left sidebar for chat sessions */}
        <div className={styles.sessionsContainer}>
          <div className={styles.sessionsHeader}>
            <h1>Chat Sessions</h1>
            <button className={styles.newChatButton}>+</button>
          </div>
          <div className={styles.sessionsList}>
            {/* Sessions will be rendered here */}
          </div>
          <div className={styles.exploreButton}>
            <button>Explore Chats</button>
          </div>
        </div>

        {/* Main content area */}
        <div className={styles.contentContainer}>
          {children}
        </div>
      </div>
    </div>
  );
}