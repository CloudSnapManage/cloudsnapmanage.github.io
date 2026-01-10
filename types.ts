
export interface Project {
  title: string;
  description: string;
  tags: string[];
  codeUrl?: string;
  demoUrl?: string;
  status?: string;
  image: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface TechItem {
  name: string;
  category: 'Language' | 'Frontend' | 'Backend' | 'Database' | 'Tools';
}

export interface CustomSection {
  id: string;
  title: string;
  icon?: string;
  items: Project[];
}

export interface HeroData {
  name: string;
  title: string;
  greeting: string;
  bio: string;
  image?: string;
}

export interface AdminCredentials {
  email: string;
  passwordHash: string;
}
