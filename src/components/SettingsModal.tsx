import React from 'react';
import { X } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { systemPrompt, setSystemPrompt } = useChatStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg glass-morphism rounded-3xl p-6 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Settings</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wider">
                  System Persona
                </label>
                <textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder="e.g. You are a sarcastic coder who loves puns."
                  className="w-full h-32 bg-secondary/50 border border-white/10 rounded-2xl p-4 text-sm focus:border-primary/30 outline-none resize-none transition-all"
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  This defines how the AI behaves. Try "You are a pirate" or "You are a senior engineer".
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">Appearance</h3>
                    <p className="text-xs text-muted-foreground">Customize how the interface looks</p>
                  </div>
                  {/* Theme toggle is already in header, but could be here too */}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all text-sm"
              >
                Save & Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
