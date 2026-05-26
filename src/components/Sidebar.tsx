import React, { useState } from 'react';
import { Plus, MessageSquare, Trash2, PanelLeftClose, Settings } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { SettingsModal } from './SettingsModal';

export const Sidebar: React.FC = () => {
  const { chats, currentChatId, createNewChat, setCurrentChatId, deleteChat, isSidebarOpen, toggleSidebar } = useChatStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
    <AnimatePresence mode="wait">
      {isSidebarOpen && (
        <motion.aside
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="w-72 h-screen glass-morphism border-r flex flex-col z-20"
        >
          <div className="p-4 flex items-center justify-between">
            <button
              onClick={createNewChat}
              className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all font-medium text-sm"
            >
              <Plus size={18} />
              New Chat
            </button>
            <button
              onClick={toggleSidebar}
              className="ml-2 p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground"
            >
              <PanelLeftClose size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-2 space-y-1">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={cn(
                  "group relative flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all",
                  currentChatId === chat.id 
                    ? "bg-secondary text-foreground" 
                    : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setCurrentChatId(chat.id)}
              >
                <MessageSquare size={18} className="shrink-0" />
                <span className="text-sm font-medium truncate pr-8">{chat.title}</span>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                  className="absolute right-2 opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border/50">
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              <Settings size={18} />
              <span className="text-sm font-medium">Settings</span>
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
    <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};
