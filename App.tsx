import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import StarField from './components/StarField';
import { DataProvider } from './contexts/DataContext';

const AppContent: React.FC = () => {
  const [view, setView] = useState<'home' | 'admin'>('home');

  return (
    <div className="min-h-screen bg-background text-text selection:bg-primary/30 selection:text-white relative">
      <StarField />
      
      <div className="relative z-10">
        {view === 'admin' ? (
          <AdminPanel onBack={() => setView('home')} />
        ) : (
          <>
            <Navbar />
            <main>
              <Hero />
              <TechStack />
              <Projects />
            </main>
            <Contact onAdminClick={() => setView('admin')} />
          </>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
};

export default App;