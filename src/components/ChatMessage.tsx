import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, User, Bot } from 'lucide-react';
import type { Message } from '../store/useChatStore';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "flex w-full gap-4 p-4 rounded-2xl transition-colors",
        isAssistant ? "bg-secondary/30 backdrop-blur-sm" : "bg-transparent"
      )}
    >
      <div className={cn(
        "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
        isAssistant ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
      )}>
        {isAssistant ? <Bot size={22} /> : <User size={22} />}
      </div>
      
      <div className="flex-1 space-y-2 overflow-hidden">
        <div className="font-semibold text-sm">
          {isAssistant ? "AI Assistant" : "You"}
        </div>
        
        <div className="prose prose-invert max-w-none text-foreground/90 leading-relaxed">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                const codeString = String(children).replace(/\n$/, '');
                
                return !inline && match ? (
                  <div className="relative group mt-4 first:mt-0">
                    <div className="absolute right-3 top-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleCopy(codeString)}
                        className="p-1.5 rounded-lg bg-background/50 backdrop-blur-md border border-white/10 hover:bg-background/80 transition-all text-muted-foreground hover:text-foreground"
                      >
                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                    <SyntaxHighlighter
                      {...props}
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-xl !bg-[#1a1b26] !m-0 !p-4 !border border-white/5 shadow-2xl"
                    >
                      {codeString}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className={cn("bg-muted px-1.5 py-0.5 rounded-md text-sm font-mono", className)} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
};
