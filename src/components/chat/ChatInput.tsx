import { useState, useRef, useEffect } from 'react';
import styles from '@/styles/components/ChatInput.module.css';

export default function ChatInput() {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle textarea height adjustment
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // TODO: Implement send message functionality
      setMessage('');
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className={styles.inputArea}>
      <div className={`${styles.recordingStatus} ${!isRecording && styles.hidden}`}>
        <span className={styles.statusText}>🎙️ Speak Now</span>
        <div className={styles.soundWaves}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <textarea
        ref={textareaRef}
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        rows={1}
        className={styles.messageInput}
      />

      <button
        className={`${styles.micButton} ${isRecording && styles.recording}`}
        onClick={toggleRecording}
        title={isRecording ? "Stop Recording" : "Start Voice Input"}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      </button>

      {isRecording && (
        <button
          className={styles.sendVoiceButton}
          onClick={handleSendMessage}
          title="Send Message"
        >
          <svg className={styles.sendIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      )}
    </div>
  );
}