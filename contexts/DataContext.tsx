
import React, { createContext, useContext, useState } from 'react';
import { Project, CustomSection, HeroData, AdminCredentials } from '../types';
import { 
  PROJECTS as INITIAL_PROJECTS, 
  OTHER_REPOS as INITIAL_REPOS, 
  HERO_CONTENT as INITIAL_HERO,
  CUSTOM_SECTIONS as INITIAL_SECTIONS
} from '../constants';

interface DataContextType {
  projects: Project[];
  otherRepos: Project[];
  customSections: CustomSection[];
  heroData: HeroData;
  
  // Auth
  isAuthenticated: boolean;
  currentUser: string;
  users: AdminCredentials[];
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  updatePassword: (newPass: string) => void;
  addUser: (user: AdminCredentials) => boolean;
  removeUser: (email: string) => void;

  // Actions
  addProject: (p: Project) => void;
  updateProject: (index: number, p: Project) => void;
  removeProject: (index: number) => void;

  addRepo: (p: Project) => void;
  updateRepo: (index: number, p: Project) => void;
  removeRepo: (index: number) => void;

  addCustomSection: (title: string, icon: string) => void;
  removeCustomSection: (id: string) => void;
  addItemToSection: (sectionId: string, item: Project) => void;
  updateItemInSection: (sectionId: string, index: number, item: Project) => void;
  removeItemFromSection: (sectionId: string, index: number) => void;

  updateHeroData: (data: HeroData) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State initialization from constants
  const [heroData, setHeroData] = useState<HeroData>(INITIAL_HERO);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [otherRepos, setOtherRepos] = useState<Project[]>(INITIAL_REPOS);
  const [customSections, setCustomSections] = useState<CustomSection[]>(INITIAL_SECTIONS);

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [users, setUsers] = useState<AdminCredentials[]>([
    { email: 'admin@example.com', passwordHash: 'admin123' }
  ]);

  // Auth Actions
  const login = (email: string, pass: string) => {
    const user = users.find(u => u.email === email && u.passwordHash === pass);
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(email);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser('');
  };

  const updatePassword = (newPass: string) => {
    setUsers(users.map(u => u.email === currentUser ? { ...u, passwordHash: newPass } : u));
  };

  const addUser = (newUser: AdminCredentials) => {
    if (users.find(u => u.email === newUser.email)) return false;
    setUsers([...users, newUser]);
    return true;
  };

  const removeUser = (email: string) => {
    if (users.length <= 1) return; // Prevent deleting last user
    setUsers(users.filter(u => u.email !== email));
    if (currentUser === email) logout();
  };

  // Content Actions
  const addProject = (p: Project) => setProjects([...projects, p]);
  const updateProject = (index: number, p: Project) => {
    const newProjects = [...projects];
    newProjects[index] = p;
    setProjects(newProjects);
  };
  const removeProject = (index: number) => setProjects(projects.filter((_, i) => i !== index));

  const addRepo = (p: Project) => setOtherRepos([...otherRepos, p]);
  const updateRepo = (index: number, p: Project) => {
    const newRepos = [...otherRepos];
    newRepos[index] = p;
    setOtherRepos(newRepos);
  };
  const removeRepo = (index: number) => setOtherRepos(otherRepos.filter((_, i) => i !== index));

  const addCustomSection = (title: string, icon: string) => {
    const id = title.toLowerCase().replace(/\s+/g, '-');
    setCustomSections([...customSections, { id, title, icon, items: [] }]);
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

  const updateItemInSection = (sectionId: string, index: number, item: Project) => {
    setCustomSections(customSections.map(s => {
      if (s.id === sectionId) {
        const newItems = [...s.items];
        newItems[index] = item;
        return { ...s, items: newItems };
      }
      return s;
    }));
  };

  const removeItemFromSection = (sectionId: string, index: number) => {
    setCustomSections(customSections.map(s => {
      if (s.id === sectionId) {
        return { ...s, items: s.items.filter((_, i) => i !== index) };
      }
      return s;
    }));
  };

  const updateHeroData = (data: HeroData) => setHeroData(data);

  return (
    <DataContext.Provider value={{
      projects,
      otherRepos,
      customSections,
      heroData,
      isAuthenticated,
      currentUser,
      users,
      login,
      logout,
      updatePassword,
      addUser,
      removeUser,
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
