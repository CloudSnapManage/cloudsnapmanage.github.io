import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import StarField from './components/StarField';
import AdminPanel from './components/AdminPanel';
import { DataProvider } from './contexts/DataContext';

const AppContent: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const search = window.location.search;

      // Check for /admin, #/admin, #admin, or ?admin
      if (
        path.endsWith('/admin') || 
        hash === '#/admin' || 
        hash === '#admin' || 
        search.includes('admin')
      ) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    // Check on initial load
    checkAdminRoute();

    // Listen for hash changes (useful for static site navigation)
    window.addEventListener('hashchange', checkAdminRoute);
    
    // Listen for popstate (back/forward button)
    window.addEventListener('popstate', checkAdminRoute);

    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
    };
  }, []);

  const handleAdminClose = () => {
    setIsAdmin(false);
    // Clean up the URL
    if (window.location.hash.includes('admin')) {
      window.history.pushState("", document.title, window.location.pathname + window.location.search);
    } else if (window.location.pathname.endsWith('/admin')) {
      const newPath = window.location.pathname.replace(/\/admin$/, '') || '/';
      window.history.pushState("", document.title, newPath);
    } else if (window.location.search.includes('admin')) {
      const newPath = window.location.pathname;
      window.history.pushState("", document.title, newPath);
    }
  };

  if (isAdmin) {
    return <AdminPanel onBack={handleAdminClose} />;
  }

  return (
    <div className="min-h-screen bg-background text-text selection:bg-primary/30 selection:text-white relative">
      <StarField />
      
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <TechStack />
          <Projects />
        </main>
        <Contact />
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