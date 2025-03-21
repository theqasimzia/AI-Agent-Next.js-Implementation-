import Layout from '@/components/shared/Layout';
import ChatBox from '@/components/chat/ChatBox';
import ChatInput from '@/components/chat/ChatInput';
import ChatSessions from '@/components/chat/ChatSessions';
import styles from '@/styles/pages/Home.module.css';

export default function Home() {
  return (
    <Layout>
      <div className={styles.chatContainer}>
        <ChatSessions />
        <div className={styles.mainContent}>
          <ChatBox />
          <ChatInput />
        </div>
      </div>
    </Layout>
  );
}
