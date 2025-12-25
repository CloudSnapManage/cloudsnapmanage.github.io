import React from 'react';
import { ExternalLink, Code2, AlertCircle } from 'lucide-react';
import { Project } from '../types';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col bg-surface border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-90" />
        
        {project.status && (
          <div className="absolute top-4 right-4 bg-yellow-500/10 backdrop-blur-md border border-yellow-500/20 text-yellow-500 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <AlertCircle size={12} />
            {project.status}
          </div>
        )}
      </div>

      <div className="flex-1 p-6 flex flex-col">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2" title={project.title}>
            {project.title}
          </h3>
          <p className="text-muted text-sm leading-relaxed line-clamp-3" title={project.description}>
            {project.description}
          </p>
        </div>

        <div className="mt-auto space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-white/5 text-white/70 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-white/5">
            {project.codeUrl && (
              <a 
                href={project.codeUrl} 
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <Code2 size={16} /> Code
              </a>
            )}
            {project.demoUrl && (
              <a 
                href={project.demoUrl} 
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors ml-auto"
              >
                Live Demo <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;