import React, { useState, useCallback, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';
import { ThemeToggle } from './ThemeToggle';
import { useChatStore } from '../store/useChatStore';
import type { Message } from '../store/useChatStore';
import { mockFetchStream } from '../api/mockStream';
import { useAutoScroll } from '../hooks/useAutoScroll';
import { PanelLeftOpen, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatWindow: React.FC = () => {
  const { 
    chats, 
    currentChatId, 
    addMessage, 
    updateLastMessage, 
    createNewChat, 
    isSidebarOpen, 
    toggleSidebar
  } = useChatStore();
  
  const [isStreaming, setIsStreaming] = useState(false);
  const currentChat = chats.find(c => c.id === currentChatId);
  const messages = currentChat?.messages || [];
  
  const { scrollAreaRef, handleScroll } = useAutoScroll([messages, isStreaming]);

  const handleSend = useCallback(async (content: string) => {
    let chatId = currentChatId;
    
    if (!chatId) {
      createNewChat();
      // Need to get the new chatId from the updated state or wait for it
      // For simplicity, we'll use the one just created if possible or re-find it
    }

    const { currentChatId: activeId } = useChatStore.getState();
    const finalChatId = activeId!;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    addMessage(finalChatId, userMessage);
    setIsStreaming(true);

    const assistantMessageId = crypto.randomUUID();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    };
    addMessage(finalChatId, assistantMessage);

    try {
      const response = await mockFetchStream(content);
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullContent += chunk;
          updateLastMessage(finalChatId, fullContent);
        }
      }
    } catch (error) {
      console.error('Error streaming:', error);
    } finally {
      setIsStreaming(false);
    }
  }, [currentChatId, createNewChat, addMessage, updateLastMessage]);

  // Handle Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        createNewChat();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [createNewChat]);

  return (
    <div className="flex bg-background text-foreground h-screen overflow-hidden font-sans selection:bg-primary/20">
      <Sidebar />
      
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-border/40 shrink-0 glass-morphism z-10">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button onClick={toggleSidebar} className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground">
                <PanelLeftOpen size={20} />
              </button>
            )}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Terminal size={18} />
              </div>
              <h1 className="font-semibold">{currentChat?.title || "Modern AI Chat"}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <ThemeToggle />
          </div>
        </header>

        {/* Message Area */}
        <div 
          ref={scrollAreaRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-4 py-8"
        >
          <div className="max-w-4xl mx-auto space-y-6">
            <AnimatePresence initial={false}>
              {messages.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-3xl bg-secondary/50 flex items-center justify-center text-primary animate-pulse shadow-2xl">
                    <Bot size={44} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight">How can I help you today?</h2>
                    <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                      Explore the power of streaming AI with modern glassmorphism design and rich code rendering.
                    </p>
                  </div>
                </motion.div>
              ) : (
                messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))
              )}
            </AnimatePresence>
            {isStreaming && (
              <div className="flex gap-4 p-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center animate-pulse">
                  <Bot size={22} />
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="shrink-0 pt-0 bg-gradient-to-t from-background via-background/80 to-transparent">
          <ChatInput onSend={handleSend} disabled={isStreaming} />
        </div>
      </main>
    </div>
  );
};

const Bot = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);
