import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../contexts/DataContext';
import { ChevronRight, Mail, Github, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const { heroData } = useData();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-30" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] opacity-30" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-white/10 text-emerald-400 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {heroData.title}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
              {heroData.greeting}
            </h1>
            
            <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
              {heroData.bio}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#contact"
                className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                Contact Me <Mail size={18} />
              </a>
              <a 
                href="#projects"
                className="px-8 py-3 bg-surface border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                View My Work <ChevronRight size={18} />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full max-w-md lg:max-w-lg relative"
          >
            {/* Visual representation */}
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-surface shadow-2xl group">
                {/* 1. Base Layer: Image or Abstract */}
                {heroData.image ? (
                   <>
                     <img 
                        src={heroData.image} 
                        alt={heroData.name} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     />
                     {/* Vignette / Darkness Overlay */}
                     <div className="absolute inset-0 bg-black/20" /> 
                   </>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-surface to-black flex items-center justify-center">
                        <Sparkles className="text-white/10 w-64 h-64" />
                    </div>
                )}

                {/* 2. Gradient Overlay - Ensures Text Readability & Aesthetics */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-accent">
                            <Github size={16} />
                            <span>@cloudsnapmanage</span>
                        </div>
                        <div className="text-white font-mono text-sm opacity-60">
                            &gt; building_dreams.tsx...
                        </div>
                    </div>
                </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;