import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
}

interface ChatState {
  chats: Chat[];
  currentChatId: string | null;
  systemPrompt: string;
  theme: 'light' | 'dark';
  isSidebarOpen: boolean;
  
  // Actions
  createNewChat: () => void;
  setCurrentChatId: (id: string | null) => void;
  addMessage: (chatId: string, message: Message) => void;
  updateLastMessage: (chatId: string, content: string) => void;
  deleteChat: (id: string) => void;
  setSystemPrompt: (prompt: string) => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      chats: [],
      currentChatId: null,
      systemPrompt: "You are a helpful, creative, clever, and very friendly assistant.",
      theme: 'dark',
      isSidebarOpen: true,

      createNewChat: () => {
        const newChat: Chat = {
          id: crypto.randomUUID(),
          title: 'New Chat',
          messages: [],
          createdAt: Date.now(),
        };
        set((state) => ({
          chats: [newChat, ...state.chats],
          currentChatId: newChat.id,
        }));
      },

      setCurrentChatId: (id) => set({ currentChatId: id }),

      addMessage: (chatId, message) => {
        set((state) => ({
          chats: state.chats.map((chat) => {
            if (chat.id === chatId) {
              const updatedMessages = [...chat.messages, message];
              // Update title if it's the first user message
              let title = chat.title;
              if (chat.messages.length === 0 && message.role === 'user') {
                title = message.content.slice(0, 30) + (message.content.length > 30 ? '...' : '');
              }
              return { ...chat, messages: updatedMessages, title };
            }
            return chat;
          }),
        }));
      },

      updateLastMessage: (chatId, content) => {
        set((state) => ({
          chats: state.chats.map((chat) => {
            if (chat.id === chatId) {
              const messages = [...chat.messages];
              if (messages.length > 0) {
                messages[messages.length - 1] = {
                  ...messages[messages.length - 1],
                  content,
                };
              }
              return { ...chat, messages };
            }
            return chat;
          }),
        }));
      },

      deleteChat: (id) => {
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== id),
          currentChatId: state.currentChatId === id ? null : state.currentChatId,
        }));
      },

      setSystemPrompt: (prompt) => set({ systemPrompt: prompt }),

      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      
      setSidebarOpen: (open) => set({ isSidebarOpen: open }),
    }),
    {
      name: 'ai-chat-storage',
    }
  )
);
