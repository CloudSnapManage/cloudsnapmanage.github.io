
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Github, Mail, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Age } from '@/components/age';
import { ProjectCard } from '@/components/project-card';
import { TypingAnimation } from '@/components/typing-animation';
import { Starfield } from '@/components/starfield';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { SmoothScroll } from '@/components/smooth-scroll';
import { useIsMobile } from '@/hooks/use-mobile';
import { LoadingScreen } from '@/components/loading-screen';

// --- Static Data ---
const GITHUB_USERNAME = 'CloudSnapManage';
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;
const GITHUB_AVATAR_URL = `https://github.com/${GITHUB_USERNAME}.png`;
const EMAIL = 'cloudsnapmanage@gmail.com';

const projects = [
  {
    title: "ScribbleCraft: Handwriting Simulator",
    description: "Transform your typed text into beautiful, realistic handwriting. This web application provides a real-time canvas that converts your input from a rich text editor into elegant, customizable handwriting.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "ShadCN UI", "jsPDF", "Lucide React"],
    liveUrl: "https://cloudsnapmanage.github.io/ScribbleCraft/",
    repoUrl: "https://github.com/CloudSnapManage/ScribbleCraft"
  },
  {
    title: "ReadmePro",
    description: "Create beautiful, professional README.md files in minutes. Features a live preview, pre-built sections, drag-and-drop reordering, custom sections, theming (light/dark mode), and one-click export to Markdown or PDF.",
    tech: ["Next.js", "React", "Tailwind CSS", "shadcn/ui", "TypeScript", "Lucide React", "react-markdown"],
    liveUrl: "https://cloudsnapmanage.github.io/ReadmePro/",
    repoUrl: "https://github.com/CloudSnapManage/ReadmePro"
  },
  {
    title: "VIBE",
    description: "A macOS-inspired web dashboard that functions like a desktop environment. Includes sticky notes, note-taking, search functionality, quick website access, and customizable UI.",
    tech: ["Next.js", "React 18", "Tailwind CSS", "Radix UI", "shadcn/ui", "Firebase", "Genkit AI", "Lucide AI", "Lucide Icons", "TypeScript"],
    liveUrl: "https://cloudsnapmanage.github.io/VIBE",
    repoUrl: "https://github.com/CloudSnapManage/VIBE"
  },
  {
   title: "LyricLand",
    description: "Lyric Land is a sleek web application for music lovers. It allows you to instantly search for song lyrics and save your favorites to a personal library. This library is beautifully displayed as a virtual bookshelf, giving you a unique and visual way to organize the songs you love. The app also includes quick links to listen to tracks on YouTube and download lyrics for offline use. ",
    tech: ["Next.js", "React", "Tailwind CSS", "shadcn/ui", "TypeScript", "Lucide React", "next-themes"],
    liveUrl: "https://cloudsnapmanage.github.io/lyricland/",
    repoUrl: "https://github.com/CloudSnapManage/lyricland",
  },
  {
  title: "Book Verse",
    description: "BookVerse is a modern, personal web application that lets you manage your entire media library with ease. Search for books, movies, anime, and K-dramas, add them to your collection, track your progress, add personal notes and ratings, and view your entire library on a polished, filterable dashboard.",
    tech: ["Next.js", "React", "Tailwind CSS", "shadcn/ui", "TypeScript", "Lucide React", "next-themes", "Zod", "React Hook Form", "Recharts", "Axios"],
    liveUrl: "https://cloudsnapmanage.github.io/BookVerse/",
    repoUrl: "https://github.com/CloudSnapManage/BookVerse",
  },

];

const publications = [
  {
    title: "Linux Mint Customization",
    description: "A personal reference for transforming the Cinnamon desktop environment into a modern, macOS-inspired workspace, complete with themes, icons, and tools.",
    tech: ["Linux Mint", "Cinnamon DE", "Desktop Customization", "GTK Themes", "Plank Dock"],
    liveUrl: "https://cloudsnapmanage.github.io/linux-mint-customization/",
    repoUrl: "https://github.com/CloudSnapManage/linux-mint-customization/"
  }
];

const skills = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express",
  "Python", "Django", "PostgreSQL", "MongoDB", "Prisma", "GraphQL", "Docker", "Git"
];

// --- Note for owner ---
// JUST UPDATE THE STATIC DATA TO UPDATE THE PROJECTS THE UI WILL BE GENERATED AUTOMATICALLY.

// --- End Static Data ---

function PortfolioContent() {
  const [scrollTop, setScrollTop] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  const handleAvatarClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isPressed) return;

    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
      window.open(GITHUB_URL, '_blank');
    }, 400);
  };

  const handleScroll = (scrollValue: number) => {
    setScrollTop(scrollValue);
  };

  const content = (
    <>
      <main className="z-10 flex-1">
        <div className="container mx-auto px-4 md:px-6">
          <section id="hero" className="flex min-h-screen flex-col items-center justify-center gap-8 py-20 md:flex-row md:gap-16 md:py-32">
            <Link href={GITHUB_URL} onClick={handleAvatarClick} className="group relative animate-in fade-in zoom-in-75-slow duration-1000" style={{ perspective: '1000px' }}>
              <div
                className={cn(
                  "absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary/50 to-accent/50",
                  "opacity-50 transition-all duration-1000 group-hover:opacity-100 group-hover:shadow-2xl group-hover:shadow-primary/50 group-hover:scale-105",
                )}
                style={{
                  animation: "border-spin 8s linear infinite"
                }}
              />
              <div className={cn(
                "relative rounded-full bg-background p-1 transition-transform duration-700",
                isPressed && "animate-push-and-release"
              )}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Image
                  src={GITHUB_AVATAR_URL}
                  alt="Shrijan Paudel"
                  width={160}
                  height={160}
                  className="rounded-full shadow-lg"
                  priority
                  data-ai-hint="Shrijan Paudel github avatar"
                />
                <div className="absolute bottom-2 right-2 rounded-full bg-background/80 p-2 shadow-md backdrop-blur-sm">
                  <Github className="h-6 w-6 text-primary transition-colors group-hover:text-yellow-accent" />
                </div>
              </div>
            </Link>

            <div className="animate-in fade-in-0 slide-in-from-bottom-10-slow duration-1000 text-center md:text-left">
              <Badge variant="outline" className="mb-4 border-accent text-accent">Available for hire</Badge>
              <TypingAnimation text="Hi, I'm Shrijan" className="text-4xl font-extrabold tracking-tight sm:text-5xl" startAnimation={!isLoading} />
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                I’m a <span className="text-primary font-semibold transition-all hover:[text-shadow:0_0_8px_hsl(var(--primary-foreground))]"><Age />-year-old</span> self-taught developer from Nepal,
                exploring the world of code with curiosity and creativity.
                Learning is a journey—and thanks to the rise of AI, it's been an exciting way to transform imagination into reality.
                I enjoy building projects that feel alive, whether it's tools that make work easier or interfaces that inspire.
                With AI as my coding partner, I’m constantly experimenting, learning, and shaping ideas into products.
                You could call me a <span className="text-primary font-semibold transition-all hover:[text-shadow:0_0_8px_hsl(var(--primary-foreground))]">“vibe coder”</span>.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
                <Button asChild size="lg" pushAnimation>
                  <Link href="#contact">Contact Me <Mail className="ml-2" /></Link>
                </Button>
                <Button asChild variant="secondary" size="lg" pushAnimation>
                  <Link href="#projects">View My Work <ArrowRight className="ml-2" /></Link>
                </Button>
              </div>
            </div>
          </section>

          <section id="projects" className="animate-in fade-in-0 slide-in-from-bottom-10-slow py-16 duration-1000 md:py-24">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Featured Projects</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <ProjectCard key={i} project={project} />
              ))}
            </div>
          </section>

          <section id="other-repositories" className="animate-in fade-in-0 slide-in-from-bottom-10-slow py-16 duration-1000 md:py-24">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Other Repositories</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {publications.map((publication, i) => (
                <ProjectCard
                  key={i}
                  project={publication}
                  repoButtonText="Repo"
                  liveButtonText="Learn More"
                />
              ))}
            </div>
          </section>

          <section id="skills" className="animate-in fade-in-0 slide-in-from-bottom-10-slow rounded-2xl bg-card/50 py-16 duration-1000 md:py-24">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">My Tech Stack</h2>
            <div className="flex flex-wrap justify-center gap-3 px-4 md:gap-4">
              {skills.map(skill => (
                <Badge key={skill} className="cursor-text border border-transparent bg-background/50 px-4 py-2 text-base transition-all hover:scale-105 hover:border-primary/50 hover:bg-primary/20 hover:text-primary">
                  {skill}
                </Badge>
              ))}
            </div>
          </section>

          <section id="contact" className="animate-in fade-in-0 slide-in-from-bottom-10-slow py-20 text-center duration-1000 md:py-32">
            <h2 className="text-3xl font-bold md:text-4xl">Get In Touch</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              I'm currently looking for new opportunities. Feel free to reach out via email or connect with me on GitHub.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild variant="default" size="lg" pushAnimation>
                <Link href={`mailto:${EMAIL}`}>
                  <Mail className="mr-2" /> Email Me
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" pushAnimation>
                <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2" /> GitHub
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </main>

      <footer className="z-10 border-t border-border/40">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Shrijan. All rights reserved.</p>
        </div>
      </footer>
    </>
  );

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s ease-in' }}>
        <Starfield scrollTop={scrollTop} />
        {isMobile ? (
          <div onScroll={(e) => handleScroll(e.currentTarget.scrollTop)} className="h-screen w-full overflow-y-auto">
            {content}
          </div>
        ) : (
          <SmoothScroll onScroll={handleScroll}>
            {content}
          </SmoothScroll>
        )}
      </div>
    </>
  )
}

export default function Home() {
  return <PortfolioContent />;
}
