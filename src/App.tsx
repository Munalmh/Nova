import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { ChatWindow } from './components/ChatWindow';

function App() {
  const [view, setView] = useState<'landing' | 'chat'>('landing');

  return view === 'landing' ? (
    <LandingPage onStartChat={() => setView('chat')} />
  ) : (
    <ChatWindow onBackToLanding={() => setView('landing')} />
  );
}

export default App;
