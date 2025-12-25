import React from 'react';
import { useData } from '../contexts/DataContext';
import ProjectCard from './ProjectCard';
import { FolderGit2, Layers } from 'lucide-react';

const Projects: React.FC = () => {
  const { projects, otherRepos, customSections } = useData();

  return (
    <section id="projects" className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        
        {/* Featured Projects */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary rounded-full"></div>
          <p className="mt-4 text-muted max-w-2xl">
            A selection of projects that showcase my journey in full-stack development, AI integration, and UI design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {projects.map((project, index) => (
            <ProjectCard key={`proj-${index}`} project={project} index={index} />
          ))}
        </div>

        {/* Other Repositories */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <FolderGit2 className="text-accent" />
            Other Repositories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {otherRepos.map((repo, index) => (
                <ProjectCard key={`repo-${index}`} project={repo} index={index} />
             ))}
          </div>
        </div>

        {/* Custom Sections */}
        {customSections.map((section) => (
          <div key={section.id} className="mb-20">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              {section.icon ? (
                <span className="text-2xl">{section.icon}</span>
              ) : (
                <Layers className="text-primary" />
              )}
              {section.title}
            </h3>
            {section.items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.items.map((item, index) => (
                  <ProjectCard key={`${section.id}-${index}`} project={item} index={index} />
                ))}
              </div>
            ) : (
              <p className="text-muted italic">Coming soon...</p>
            )}
          </div>
        ))}

      </div>
    </section>
  );
};

export default Projects;