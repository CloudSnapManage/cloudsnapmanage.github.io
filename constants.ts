import { Project, TechItem, HeroData, CustomSection, AdminCredentials } from './types';

// =================================================================================
// 🟢 HERO SECTION
// =================================================================================
export const HERO_CONTENT: HeroData = {
  "name": "Shrijan Paudel",
  "title": "Available for hire",
  "greeting": "Hi, I'm Shrijan",
  "bio": "I’m a 16-year-old self-taught developer from Nepal, exploring the world of code with curiosity and creativity. Learning is a journey—and thanks to the rise of AI, it's been an exciting way to transform imagination into reality. I enjoy building projects that feel alive, whether it's tools that make work easier or interfaces that inspire. With AI as my coding partner, I’m constantly experimenting, learning, and shaping ideas into products.",
  "image": "https://raw.githubusercontent.com/CloudSnapManage/site-images-cloudsnapmanage/refs/heads/master/Me/Me%20(6).jpg"
};

// =================================================================================
// 🟢 PROJECTS SECTION
// =================================================================================
export const PROJECTS: Project[] = [
  {
    "title": "PyVerse",
    "description": "PyVerse is an immersive 3D interactive journey to master Python. Travel through the Constellation of Code, unlocking nodes from Variables to Advanced Metaprogramming with an AI-powered tutor.",
    "tags": [
      "React",
      "TypeScript",
      "Vite",
      "R3F",
      "Three.js",
      "Tailwind CSS",
      "Gemini AI"
    ],
    "codeUrl": "https://github.com/CloudSnapManage/PyVerse",
    "demoUrl": "https://cloudsnapmanage.github.io/PyVerse/",
    "image": "https://raw.githubusercontent.com/CloudSnapManage/site-images-cloudsnapmanage/refs/heads/master/Screenshots/Pyverse-S1.png"
  },
  {
    "title": "MorphoConvert",
    "description": "MorphoConvert is a modern, full-stack web application designed to make file conversion effortless. With a sleek user interface and powerful serverless backend, users can drag and drop files to convert images, audio, video, and documents instantly.",
    "tags": [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind",
      "Axios",
      "FFmpeg",
      "Sharp"
    ],
    "status": "Under Development!",
    "codeUrl": "#",
    "demoUrl": "#",
    "image": "https://raw.githubusercontent.com/CloudSnapManage/site-images-cloudsnapmanage/refs/heads/master/Screenshots/Morphoconvert-S1.png"
  },
  {
    "title": "ScribbleCraft",
    "description": "Transform your typed text into beautiful, realistic handwriting. This web application provides a real-time canvas that converts your input from a rich text editor into elegant, customizable handwriting.",
    "tags": [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "ShadCN UI",
      "jsPDF",
      "Lucide React"
    ],
    "codeUrl": "https://github.com/CloudSnapManage/scribblecraft",
    "demoUrl": "https://cloudsnapmanage.github.io/ScribbleCraft/",
    "image": "https://raw.githubusercontent.com/CloudSnapManage/site-images-cloudsnapmanage/refs/heads/master/Screenshots/ScribbleCraft-S1.png"
  },
  {
    "title": "ReadmePro",
    "description": "Create beautiful, professional README.md files in minutes. Features a live preview, pre-built sections, drag-and-drop reordering, custom sections, theming, and one-click export to Markdown or PDF.",
    "tags": [
      "Next.js",
      "React",
      "Tailwind",
      "ShadCN UI",
      "TypeScript",
      "Markdown"
    ],
    "codeUrl": "https://github.com/CloudSnapManage/ReadmePro",
    "demoUrl": "https://cloudsnapmanage.github.io/ReadmePro/",
    "image": "https://raw.githubusercontent.com/CloudSnapManage/site-images-cloudsnapmanage/refs/heads/master/Screenshots/ReadmePro-S1.png",
    "status": "Live"
  },
  {
    "title": "VIBE",
    "description": "A macOS-inspired web dashboard that functions like a desktop environment. Includes sticky notes, note-taking, search functionality, quick website access, and customizable UI.",
    "tags": [
      "Next.js",
      "React 18",
      "Tailwind",
      "Radix UI",
      "Firebase",
      "Genkit AI"
    ],
    "codeUrl": "https://github.com/CloudSnapManage/vibe",
    "demoUrl": "https://cloudsnapmanage.github.io/VIBE/",
    "image": "https://raw.githubusercontent.com/CloudSnapManage/site-images-cloudsnapmanage/refs/heads/master/Screenshots/Vibe-S1.png",
    "status": "Live"
  },
  {
    "title": "LyricLand",
    "description": "A sleek web application for music lovers. Instantly search for song lyrics and save your favorites to a personal library displayed as a virtual bookshelf. Includes YouTube links and offline download.",
    "tags": [
      "Next.js",
      "React",
      "Tailwind",
      "ShadCN UI",
      "TypeScript",
      "Lucide React"
    ],
    "codeUrl": "https://github.com/CloudSnapManage/lyricland",
    "demoUrl": "https://cloudsnapmanage.github.io/lyricland/",
    "image": "https://raw.githubusercontent.com/CloudSnapManage/site-images-cloudsnapmanage/refs/heads/master/Screenshots/Lyricland-S1.png",
    "status": "Live"
  },
  {
    "title": "Book Verse",
    "description": "A modern, personal web application that lets you manage your entire media library with ease. Search for books, movies, anime, and K-dramas, add them to your collection, and track your progress.",
    "tags": [
      "Next.js",
      "React",
      "Tailwind",
      "ShadCN UI",
      "Zod",
      "Recharts",
      "Axios"
    ],
    "codeUrl": "https://github.com/CloudSnapManage/BookVerse",
    "demoUrl": "https://cloudsnapmanage.github.io/BookVerse/",
    "image": "https://raw.githubusercontent.com/CloudSnapManage/site-images-cloudsnapmanage/refs/heads/master/Screenshots/BookVerse-S1.png",
    "status": "Live"
  }
];

// =================================================================================
// 🟢 REPOSITORIES SECTION
// =================================================================================
export const OTHER_REPOS: Project[] = [
  {
    "title": "Linux Mint Customization",
    "description": "A personal reference for transforming the Cinnamon desktop environment into a modern, macOS-inspired workspace, complete with themes, icons, and tools.",
    "tags": [
      "Linux Mint",
      "Cinnamon DE",
      "GTK Themes",
      "Plank Dock"
    ],
    "codeUrl": "https://github.com/CloudSnapManage/linux-mint-customization",
    "image": "https://raw.githubusercontent.com/CloudSnapManage/linux-mint-customization/refs/heads/main/images/screenshot.png",
    "demoUrl": "https://cloudsnapmanage.github.io/linux-mint-customization/",
    "status": "Released V1.0"
  }
];

// =================================================================================
// 🟢 CUSTOM SECTIONS
// =================================================================================
export const CUSTOM_SECTIONS: CustomSection[] = [];

// =================================================================================
// 🟢 TECH STACK
// =================================================================================
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

// =================================================================================
// 🟢 ADMIN USERS
// =================================================================================
export const ADMIN_USERS: AdminCredentials[] = [
  {
    "email": "admin@example.com",
    "passwordHash": "admin123"
  }
];
