import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, AdminCredentials, CustomSection, HeroData } from '../types';
import { PROJECTS as INITIAL_PROJECTS, OTHER_REPOS as INITIAL_REPOS, HERO_CONTENT as INITIAL_HERO } from '../constants';

interface DataContextType {
  projects: Project[];
  otherRepos: Project[];
  customSections: CustomSection[];
  heroData: HeroData;
  isAuthenticated: boolean;
  currentUser: string | null;
  
  // Project Actions
  addProject: (project: Project) => void;
  updateProject: (index: number, project: Project) => void;
  removeProject: (index: number) => void;
  
  // Repo Actions
  addRepo: (repo: Project) => void;
  updateRepo: (index: number, repo: Project) => void;
  removeRepo: (index: number) => void;

  // Custom Section Actions
  addCustomSection: (title: string, icon?: string) => void;
  removeCustomSection: (id: string) => void;
  addItemToSection: (sectionId: string, item: Project) => void;
  updateItemInSection: (sectionId: string, itemIndex: number, item: Project) => void;
  removeItemFromSection: (sectionId: string, itemIndex: number) => void;

  // Hero Actions
  updateHeroData: (data: HeroData) => void;

  // User Actions
  users: AdminCredentials[];
  addUser: (creds: AdminCredentials) => boolean;
  removeUser: (email: string) => void;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  updatePassword: (newPass: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from LocalStorage or Constants
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('portfolio_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [otherRepos, setOtherRepos] = useState<Project[]>(() => {
    const saved = localStorage.getItem('portfolio_repos');
    return saved ? JSON.parse(saved) : INITIAL_REPOS;
  });

  const [customSections, setCustomSections] = useState<CustomSection[]>(() => {
    const saved = localStorage.getItem('portfolio_custom_sections');
    return saved ? JSON.parse(saved) : [];
  });

  const [heroData, setHeroData] = useState<HeroData>(() => {
    const saved = localStorage.getItem('portfolio_hero');
    return saved ? JSON.parse(saved) : INITIAL_HERO;
  });

  const [users, setUsers] = useState<AdminCredentials[]>(() => {
    const saved = localStorage.getItem('portfolio_users');
    return saved ? JSON.parse(saved) : [{ 
      email: 'std.shrijan@gmail.com', 
      passwordHash: 'shrijaniscoding' 
    }];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('portfolio_repos', JSON.stringify(otherRepos));
  }, [otherRepos]);

  useEffect(() => {
    localStorage.setItem('portfolio_custom_sections', JSON.stringify(customSections));
  }, [customSections]);

  useEffect(() => {
    localStorage.setItem('portfolio_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('portfolio_hero', JSON.stringify(heroData));
  }, [heroData]);

  // Project Actions
  const addProject = (project: Project) => setProjects([...projects, project]);
  
  const updateProject = (index: number, updatedProject: Project) => {
    const newProjects = [...projects];
    newProjects[index] = updatedProject;
    setProjects(newProjects);
  };

  const removeProject = (index: number) => setProjects(projects.filter((_, i) => i !== index));

  // Repo Actions
  const addRepo = (repo: Project) => setOtherRepos([...otherRepos, repo]);
  
  const updateRepo = (index: number, updatedRepo: Project) => {
    const newRepos = [...otherRepos];
    newRepos[index] = updatedRepo;
    setOtherRepos(newRepos);
  };

  const removeRepo = (index: number) => setOtherRepos(otherRepos.filter((_, i) => i !== index));

  // Custom Section Actions
  const addCustomSection = (title: string, icon?: string) => {
    const newSection: CustomSection = {
      id: Date.now().toString(),
      title,
      icon,
      items: []
    };
    setCustomSections([...customSections, newSection]);
  };

  const removeCustomSection = (id: string) => {
    setCustomSections(customSections.filter(s => s.id !== id));
  };

  const addItemToSection = (sectionId: string, item: Project) => {
    setCustomSections(customSections.map(s => {
      if (s.id === sectionId) {
        return { ...s, items: [...s.items, item] };
      }
      return s;
    }));
  };

  const updateItemInSection = (sectionId: string, itemIndex: number, updatedItem: Project) => {
    setCustomSections(customSections.map(s => {
      if (s.id === sectionId) {
        const newItems = [...s.items];
        newItems[itemIndex] = updatedItem;
        return { ...s, items: newItems };
      }
      return s;
    }));
  };

  const removeItemFromSection = (sectionId: string, itemIndex: number) => {
    setCustomSections(customSections.map(s => {
      if (s.id === sectionId) {
        return { ...s, items: s.items.filter((_, i) => i !== itemIndex) };
      }
      return s;
    }));
  };

  // Hero Actions
  const updateHeroData = (data: HeroData) => setHeroData(data);

  // User Actions
  const addUser = (creds: AdminCredentials) => {
    if (users.some(u => u.email === creds.email)) return false;
    setUsers([...users, creds]);
    return true;
  };

  const removeUser = (email: string) => {
    setUsers(users.filter(u => u.email !== email));
  };

  const login = (email: string, pass: string) => {
    const user = users.find(u => u.email === email && u.passwordHash === pass);
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user.email);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const updatePassword = (newPass: string) => {
    if (!currentUser) return;
    setUsers(users.map(u => {
      if (u.email === currentUser) {
        return { ...u, passwordHash: newPass };
      }
      return u;
    }));
  };

  return (
    <DataContext.Provider value={{
      projects,
      otherRepos,
      customSections,
      heroData,
      isAuthenticated,
      currentUser,
      addProject,
      updateProject,
      removeProject,
      addRepo,
      updateRepo,
      removeRepo,
      addCustomSection,
      removeCustomSection,
      addItemToSection,
      updateItemInSection,
      removeItemFromSection,
      updateHeroData,
      users,
      addUser,
      removeUser,
      login,
      logout,
      updatePassword
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};