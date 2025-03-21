import type { AppProps } from 'next/app';
import { ThemeProvider } from '@/lib/context/ThemeContext';
import { ChatProvider } from '@/lib/context/ChatContext';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ChatProvider>
        <Component {...pageProps} />
      </ChatProvider>
    </ThemeProvider>
  );
}