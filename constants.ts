import { Project, TechItem } from './types';

export const HERO_CONTENT = {
  name: "Shrijan Paudel",
  title: "Available for hire",
  greeting: "Hi, I'm Shrijan",
  bio: `I’m a 16-year-old self-taught developer from Nepal, exploring the world of code with curiosity and creativity. Learning is a journey—and thanks to the rise of AI, it's been an exciting way to transform imagination into reality. I enjoy building projects that feel alive, whether it's tools that make work easier or interfaces that inspire. With AI as my coding partner, I’m constantly experimenting, learning, and shaping ideas into products.`,
};

export const PROJECTS: Project[] = [
  {
    title: "PyVerse",
    description: "PyVerse is an immersive 3D interactive journey to master Python. Travel through the Constellation of Code, unlocking nodes from Variables to Advanced Metaprogramming with an AI-powered tutor.",
    tags: ["React", "TypeScript", "Vite", "R3F", "Three.js", "Tailwind CSS", "Gemini AI"],
    codeUrl: "#",
    demoUrl: "#",
    image: "https://picsum.photos/seed/pyverse/600/400"
  },
  {
    title: "MorphoConvert",
    description: "MorphoConvert is a modern, full-stack web application designed to make file conversion effortless. With a sleek user interface and powerful serverless backend, users can drag and drop files to convert images, audio, video, and documents instantly.",
    tags: ["React", "TypeScript", "Vite", "Tailwind", "Axios", "FFmpeg", "Sharp"],
    status: "Under Development!",
    codeUrl: "#",
    demoUrl: "#",
    image: "https://picsum.photos/seed/morpho/600/400"
  },
  {
    title: "ScribbleCraft",
    description: "Transform your typed text into beautiful, realistic handwriting. This web application provides a real-time canvas that converts your input from a rich text editor into elegant, customizable handwriting.",
    tags: ["Next.js", "TypeScript", "Tailwind", "ShadCN UI", "jsPDF", "Lucide React"],
    codeUrl: "#",
    demoUrl: "#",
    image: "https://picsum.photos/seed/scribble/600/400"
  },
  {
    title: "ReadmePro",
    description: "Create beautiful, professional README.md files in minutes. Features a live preview, pre-built sections, drag-and-drop reordering, custom sections, theming, and one-click export to Markdown or PDF.",
    tags: ["Next.js", "React", "Tailwind", "ShadCN UI", "TypeScript", "Markdown"],
    codeUrl: "#",
    demoUrl: "#",
    image: "https://picsum.photos/seed/readme/600/400"
  },
  {
    title: "VIBE",
    description: "A macOS-inspired web dashboard that functions like a desktop environment. Includes sticky notes, note-taking, search functionality, quick website access, and customizable UI.",
    tags: ["Next.js", "React 18", "Tailwind", "Radix UI", "Firebase", "Genkit AI"],
    codeUrl: "#",
    demoUrl: "#",
    image: "https://picsum.photos/seed/vibe/600/400"
  },
  {
    title: "LyricLand",
    description: "A sleek web application for music lovers. Instantly search for song lyrics and save your favorites to a personal library displayed as a virtual bookshelf. Includes YouTube links and offline download.",
    tags: ["Next.js", "React", "Tailwind", "ShadCN UI", "TypeScript", "Lucide React"],
    codeUrl: "#",
    demoUrl: "#",
    image: "https://picsum.photos/seed/lyric/600/400"
  },
  {
    title: "Book Verse",
    description: "A modern, personal web application that lets you manage your entire media library with ease. Search for books, movies, anime, and K-dramas, add them to your collection, and track your progress.",
    tags: ["Next.js", "React", "Tailwind", "ShadCN UI", "Zod", "Recharts", "Axios"],
    codeUrl: "#",
    demoUrl: "#",
    image: "https://picsum.photos/seed/book/600/400"
  }
];

export const OTHER_REPOS: Project[] = [
  {
    title: "Linux Mint Customization",
    description: "A personal reference for transforming the Cinnamon desktop environment into a modern, macOS-inspired workspace, complete with themes, icons, and tools.",
    tags: ["Linux Mint", "Cinnamon DE", "GTK Themes", "Plank Dock"],
    codeUrl: "#",
    image: "https://picsum.photos/seed/linux/600/400"
  }
];

export const TECH_STACK: TechItem[] = [
  { name: "JavaScript", category: "Language" },
  { name: "TypeScript", category: "Language" },
  { name: "Python", category: "Language" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express", category: "Backend" },
  { name: "Django", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Prisma", category: "Database" },
  { name: "GraphQL", category: "Backend" },
  { name: "Docker", category: "Tools" },
  { name: "Git", category: "Tools" },
];