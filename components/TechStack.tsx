import React from 'react';
import { TECH_STACK } from '../constants';
import { motion } from 'framer-motion';

const TechStack: React.FC = () => {
  // Group by category
  const categories = Array.from(new Set(TECH_STACK.map(item => item.category)));

  return (
    <section className="py-20 bg-surface/50 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">My Tech Stack</h2>
          <p className="text-muted">Tools and technologies I use to bring ideas to life</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, catIndex) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="bg-background border border-white/5 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/5 pb-2">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK.filter(t => t.category === category).map((tech) => (
                  <span 
                    key={tech.name}
                    className="px-3 py-1.5 text-sm bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition-colors cursor-default"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;