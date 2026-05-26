import React, { useRef, useEffect } from 'react';
import { Send, Command } from 'lucide-react';
import { cn } from '../lib/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = React.useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    
    // Command/Ctrl + K to focus search / new chat (handled globally but good to have context)
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  return (
    <div className="relative max-w-4xl mx-auto w-full px-4 mb-8">
      <div className="relative flex items-end gap-2 group glass-morphism rounded-[24px] p-2 pr-4 shadow-xl border-white/10 overflow-hidden focus-within:border-primary/30 transition-all">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message AI Assistant..."
          disabled={disabled}
          className="flex-1 bg-transparent border-0 outline-none p-3 pl-4 resize-none min-h-[56px] max-h-[200px] text-[15px] placeholder:text-muted-foreground/60 w-full"
          rows={1}
        />
        
        <div className="flex items-center gap-2 pb-2">
          {input.length > 0 && (
            <div className="hidden lg:flex px-2 py-1 rounded-lg bg-primary/5 text-[10px] font-mono text-primary/60 border border-primary/10 mr-1">
              {input.split(/\s+/).filter(Boolean).length} words | {input.length} chars
            </div>
          )}
          
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-muted text-[11px] font-medium text-muted-foreground shrink-0 border border-border/50">
            <Command size={10} />
            <span>Enter</span>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || disabled}
            className={cn(
              "w-10 h-10 rounded-2xl flex items-center justify-center transition-all shrink-0",
              input.trim() ? "bg-primary text-primary-foreground shadow-lg" : "bg-muted text-muted-foreground"
            )}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
      <p className="text-center text-[11px] text-muted-foreground/60 mt-3 flex items-center justify-center gap-1">
        AI model may produce inaccurate information about people, places, or facts.
      </p>
    </div>
  );
};
