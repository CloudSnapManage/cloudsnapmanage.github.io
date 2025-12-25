import React from 'react';
import { Mail, Github, Lock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <footer id="contact" className="bg-background pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-20">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's build something <span className="text-primary">amazing</span> together.
            </h2>
            <p className="text-muted text-lg">
              I'm currently looking for new opportunities. Feel free to reach out via email or connect with me on GitHub.
            </p>
          </div>
          
          <div className="flex flex-col gap-4 w-full md:w-auto">
             <a 
              href="mailto:std.shrijan@gmail.com"
              className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-3 group"
            >
              <Mail className="group-hover:scale-110 transition-transform" />
              Email Me
            </a>
            <a 
              href="https://github.com/CloudSnapManage"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-surface border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3 group"
            >
              <Github className="group-hover:scale-110 transition-transform" />
              Github
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-sm text-muted">
          <p>© 2025 Shrijan. All rights reserved.</p>
          <a 
            href="#/admin" 
            className="mt-4 md:mt-0 opacity-20 hover:opacity-100 transition-opacity p-2"
            title="Admin Access"
          >
            <Lock size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
