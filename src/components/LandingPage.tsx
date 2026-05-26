import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Layers, 
  Settings, 
  Zap, 
  Code2,
  MessageSquare,
  ChevronRight,
  Laptop
} from 'lucide-react';
import { mockFetchStream } from '../api/mockStream';

const Github: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface LandingPageProps {
  onStartChat: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartChat }) => {
  const [demoPrompt, setDemoPrompt] = useState('');
  const [demoResponse, setDemoResponse] = useState('');
  const [isDemoStreaming, setIsDemoStreaming] = useState(false);

  const startDemoStream = useCallback(async (prompt: string) => {
    if (!prompt || isDemoStreaming) return;
    setDemoPrompt(prompt);
    setDemoResponse('');
    setIsDemoStreaming(true);

    try {
      const response = await mockFetchStream(prompt);
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullContent += chunk;
          setDemoResponse(fullContent);
        }
      }
    } catch (error) {
      console.error('Error during demo stream:', error);
    } finally {
      setIsDemoStreaming(false);
    }
  }, [isDemoStreaming]);

  const presetPrompts = [
    { label: "✨ Glassmorphism", prompt: "Explain glassmorphism design." },
    { label: "⚛️ React Component", prompt: "Create a styled button in React." },
    { label: "⌨️ Keyboard Shortcut", prompt: "Tell me about keyboard shortcuts." }
  ];

  const features = [
    {
      icon: <Layers className="text-violet-400" size={24} />,
      title: "Premium Glassmorphism",
      desc: "Immersive layout crafted with frosted borders, dynamic background blurs, and HSL variables optimized for both Light and Dark themes."
    },
    {
      icon: <Zap className="text-cyan-400" size={24} />,
      title: "Real-Time Streaming",
      desc: "Experience ultra-responsive text streaming utilizing standard browser ReadableStreams, mimicking production LLM integrations."
    },
    {
      icon: <Code2 className="text-emerald-400" size={24} />,
      title: "Syntax Highlighting",
      desc: "Fully highlighted code blocks rendered on the fly. Works with TypeScript, TSX, Python, HTML, CSS and more as they stream in."
    },
    {
      icon: <Settings className="text-amber-400" size={24} />,
      title: "System Personas",
      desc: "Customize the assistant's cognitive behavioral pattern instantly using the system prompt dashboard modal."
    },
    {
      icon: <MessageSquare className="text-pink-400" size={24} />,
      title: "Zustand Persistence",
      desc: "Zustand-powered global state which automatically persists all active conversations in your browser's localStorage."
    },
    {
      icon: <Cpu className="text-blue-400" size={24} />,
      title: "Optimized Performance",
      desc: "Built on React 19 and Vite 8 for blazing-fast HMR, sub-millisecond rendering updates, and minified production sizes."
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#fafafa] overflow-x-hidden font-sans selection:bg-violet-500/20 selection:text-violet-200">
      
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-fuchsia-600/10 blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full glass-morphism border-b border-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
              <Terminal size={18} />
            </div>
            <span className="font-bold tracking-widest text-lg bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">NOVA</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#demo" className="hover:text-white transition-colors">Interactive Demo</a>
            <a href="#tech" className="hover:text-white transition-colors">Tech Stack</a>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/Munalmh/Nova.git" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-xl border border-white/5 hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
            >
              <Github size={20} />
            </a>
            <button 
              onClick={onStartChat}
              className="relative group px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium text-sm hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all duration-300 active:scale-95 flex items-center gap-1.5"
            >
              <span>Launch App</span>
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 max-w-7xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-violet-300 tracking-wide">
            <Sparkles size={13} className="text-violet-400 animate-pulse" />
            <span>Introducing Nova v1.0.0</span>
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6"
        >
          Next-Gen AI Interface for the{' '}
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Modern Web.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Experience a beautiful glassmorphic workspace designed with ambient lighting, persistent context threads, and real-time syntax highlighted code block streaming.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button 
            onClick={onStartChat}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_35px_rgba(139,92,246,0.5)] transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Start Chatting Now</span>
            <ArrowRight size={18} />
          </button>
          <a 
            href="#features"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-white/10 hover:bg-white/5 text-gray-300 font-semibold transition-all flex items-center justify-center gap-1.5"
          >
            <span>Explore Features</span>
          </a>
        </motion.div>

        {/* Dashboard Mockup Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-5xl mx-auto rounded-3xl border border-white/10 bg-[#121214]/60 p-2.5 shadow-[0_30px_100px_rgba(0,0,0,0.8)] backdrop-blur-md overflow-hidden group"
        >
          <div className="absolute -inset-px bg-gradient-to-r from-violet-500/20 via-transparent to-cyan-500/20 opacity-40 group-hover:opacity-60 transition-opacity rounded-3xl" />
          <div className="relative rounded-[20px] overflow-hidden border border-white/5 bg-[#09090b] aspect-[16/10] flex shadow-inner">
            
            {/* Sidebar Mock */}
            <div className="w-1/4 border-r border-white/5 bg-[#09090b] p-3 hidden sm:flex flex-col gap-4">
              <div className="flex items-center gap-2 px-2 py-1 bg-white/5 border border-white/5 rounded-xl text-xs text-gray-400 font-semibold">
                <Terminal size={14} className="text-violet-400" />
                <span>Nova AI Workspace</span>
              </div>
              <div className="w-full h-8 rounded-lg bg-violet-600 text-white flex items-center justify-center text-xs font-semibold">
                + New Chat
              </div>
              <div className="flex-1 flex flex-col gap-2 mt-2">
                <div className="h-9 rounded-lg bg-white/[0.03] border border-white/5 flex items-center px-3 text-xs text-gray-300">
                  <MessageSquare size={13} className="mr-2 text-violet-400" />
                  <span>React State Refactor</span>
                </div>
                <div className="h-9 rounded-lg flex items-center px-3 text-xs text-gray-500">
                  <MessageSquare size={13} className="mr-2" />
                  <span>Explain Glassmorphism</span>
                </div>
                <div className="h-9 rounded-lg flex items-center px-3 text-xs text-gray-500">
                  <MessageSquare size={13} className="mr-2" />
                  <span>Zustand persistence demo</span>
                </div>
              </div>
              <div className="h-8 border-t border-white/5 pt-2 flex items-center justify-between text-xs text-gray-500 px-1">
                <span>Dark Mode Active</span>
                <div className="w-7 h-4 bg-violet-500/20 border border-violet-500/40 rounded-full p-0.5 flex justify-end">
                  <div className="w-2.5 h-2.5 bg-violet-400 rounded-full" />
                </div>
              </div>
            </div>

            {/* Chat Body Mock */}
            <div className="flex-1 flex flex-col h-full bg-[#0d0d0f] relative">
              {/* Header Mock */}
              <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 bg-[#09090b]/50">
                <span className="text-xs font-semibold text-gray-300">React State Refactor</span>
                <div className="w-5 h-5 rounded bg-white/5 flex items-center justify-center text-[10px] text-gray-400">⚙️</div>
              </div>
              
              {/* Messages Area Mock */}
              <div className="flex-1 p-4 flex flex-col gap-4 overflow-hidden">
                <div className="flex gap-3 self-end max-w-[80%]">
                  <div className="bg-violet-600/10 border border-violet-500/20 text-xs text-gray-200 px-3 py-2 rounded-2xl rounded-tr-none">
                    How do I implement custom border blur in CSS?
                  </div>
                </div>
                
                <div className="flex gap-3 max-w-[80%] items-start">
                  <div className="w-7 h-7 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0 text-xs">
                    🤖
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 text-xs text-gray-300 px-3.5 py-3 rounded-2xl rounded-tl-none space-y-2.5 w-full text-left">
                    <p>You can use the following CSS rule to apply a beautiful backdrop filter blur:</p>
                    <pre className="bg-[#09090b] border border-white/5 rounded-xl p-2.5 font-mono text-[10px] text-cyan-300 overflow-x-auto">
{`.glass-morphism {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Input Mock */}
              <div className="p-3 border-t border-white/5 bg-[#09090b]/30 flex gap-2">
                <div className="flex-1 h-9 bg-white/[0.02] border border-white/5 rounded-xl px-3 flex items-center text-xs text-gray-500">
                  Ask Nova anything...
                </div>
                <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center text-xs">
                  ⚡
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* Interactive Stream Demo Section */}
      <section id="demo" className="py-24 px-6 border-y border-white/5 bg-white/[0.01] relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Try the Live Streaming Demo</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
              Nova uses token-based streaming to deliver answers instantly. Click one of the preset prompts below to test our emulated ReadableStream in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
            {presetPrompts.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => startDemoStream(preset.prompt)}
                disabled={isDemoStreaming}
                className="px-4 py-3 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-violet-500/30 transition-all text-xs font-semibold text-gray-300 flex items-center justify-between disabled:opacity-50"
              >
                <span>{preset.label}</span>
                <ChevronRight size={14} className="text-gray-500" />
              </button>
            ))}
          </div>

          {/* Mini-Chat Window Box */}
          <div className="glass-morphism rounded-3xl border border-white/10 overflow-hidden shadow-2xl bg-[#0b0b0d]/80">
            <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Interactive Sandbox</span>
              </div>
              {demoPrompt && (
                <span className="text-[11px] text-violet-400 font-medium truncate max-w-[200px]">Prompt: "{demoPrompt}"</span>
              )}
            </div>

            <div className="p-6 min-h-[160px] flex flex-col justify-center text-left">
              <AnimatePresence mode="wait">
                {demoResponse ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3 font-sans text-sm text-gray-300 leading-relaxed max-w-none prose prose-invert"
                  >
                    <div className="whitespace-pre-wrap">{demoResponse}</div>
                  </motion.div>
                ) : isDemoStreaming ? (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <div className="text-center text-gray-500 text-xs italic">
                    Select a preset prompt above to watch the AI output stream into this sandbox...
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Crafted for Visual and Performance Perfection</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base">
            Every feature is fine-tuned to deliver an exceptional user experience, combining structural code logic with luxury aesthetics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, borderColor: 'rgba(139,92,246,0.3)' }}
              className="p-6 rounded-3xl border border-white/5 bg-[#121214]/40 backdrop-blur-sm transition-all duration-300 flex flex-col gap-4 text-left"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-white">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Showcase */}
      <section id="tech" className="py-24 px-6 border-t border-white/5 bg-gradient-to-b from-[#09090b] to-[#040405] text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-12">Built on Modern Core Abstractions</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "React 19", role: "UI Engine", bg: "bg-blue-500/5", border: "border-blue-500/10", text: "text-blue-400" },
              { name: "Vite 8", role: "Bundler & HMR", bg: "bg-indigo-500/5", border: "border-indigo-500/10", text: "text-indigo-400" },
              { name: "TypeScript", role: "Robust Logic", bg: "bg-cyan-500/5", border: "border-cyan-500/10", text: "text-cyan-400" },
              { name: "Tailwind v4", role: "Styling Pipeline", bg: "bg-teal-500/5", border: "border-teal-500/10", text: "text-teal-400" },
              { name: "Framer Motion", role: "Fluid Animation", bg: "bg-fuchsia-500/5", border: "border-fuchsia-500/10", text: "text-fuchsia-400" }
            ].map((tech, idx) => (
              <div 
                key={idx} 
                className={`p-5 rounded-2xl border ${tech.border} ${tech.bg} flex flex-col items-center justify-center gap-1.5`}
              >
                <span className={`font-bold ${tech.text} text-sm`}>{tech.name}</span>
                <span className="text-[11px] text-gray-500 font-medium">{tech.role}</span>
              </div>
            ))}
          </div>

          <div className="mt-16 p-6 rounded-3xl border border-white/5 bg-white/[0.01] inline-flex items-center gap-3">
            <Laptop className="text-violet-400" size={20} />
            <span className="text-xs text-gray-400">Tested to work flawlessly on Chrome, Safari, Firefox and Edge</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#040405] text-center text-sm text-gray-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs text-gray-400">
              🤖
            </div>
            <span className="font-bold tracking-widest text-xs">NOVA</span>
          </div>
          <p>© 2026 Nova AI Chat. Created with 🌌 by Munalmh.</p>
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/Munalmh/Nova.git" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>

    </div>
  );
};
