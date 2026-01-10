import React, { useState, useEffect } from 'react';
import { Menu, X, Cloud } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? 'bg-background/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-bold text-xl text-white tracking-tight">
          <Cloud className="text-primary" />
          <span>CloudSnapManage<span className="text-primary">.</span></span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Home</a>
          <a href="#projects" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Projects</a>
          <a href="#contact" className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-full border border-white/10 transition-all">
            Get in Touch
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-white/10 p-6 flex flex-col gap-6 shadow-2xl">
          <a 
            href="#home" 
            onClick={() => setIsMenuOpen(false)}
            className="text-lg font-medium text-white/80 hover:text-white"
          >
            Home
          </a>
          <a 
            href="#projects" 
            onClick={() => setIsMenuOpen(false)}
            className="text-lg font-medium text-white/80 hover:text-white"
          >
            Projects
          </a>
          <a 
            href="#contact" 
            onClick={() => setIsMenuOpen(false)}
            className="text-lg font-medium text-primary"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;