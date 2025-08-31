
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Github, Mail, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Age } from '@/components/age';
import { ProjectCard } from '@/components/project-card';
import { TypingAnimation } from '@/components/typing-animation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Starfield } from '@/components/starfield';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// --- Static Data ---
const GITHUB_USERNAME = 'CloudSnapManage';
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;
const GITHUB_AVATAR_URL = `https://github.com/CloudSnapManage.png`;
const EMAIL = 'cloudsnapmanage@gmail.com';

const projects = [
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
    tech: ["Next.js", "React 18", "Tailwind CSS", "Radix UI", "shadcn/ui", "Firebase", "Genkit AI", "Lucide Icons", "TypeScript"],
    liveUrl: "https://cloudsnapmanage.github.io/VIBE",
    repoUrl: "https://github.com/CloudSnapManage/VIBE"
  }
];

const skills = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express",
  "Python", "Django", "PostgreSQL", "MongoDB", "Prisma", "GraphQL", "Docker", "Git"
];
// --- End Static Data ---

export default function Home() {
  const [scrollTop, setScrollTop] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  const handleAvatarClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isFlipping) return;

    setIsFlipping(true);
    setTimeout(() => {
      window.open(GITHUB_URL, '_blank');
      setIsFlipping(false);
    }, 700); // Duration of the animation
  };

  return (
    <>
      <Starfield scrollTop={scrollTop}/>
      <ScrollArea className="flex flex-col h-screen bg-transparent text-foreground" onScroll={handleScroll}>
        <main className="flex-1 z-10">
          <div className="container mx-auto px-4 md:px-6">

            <section id="hero" className="py-20 md:py-32 flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <Link href={GITHUB_URL} onClick={handleAvatarClick} className="relative group animate-in fade-in zoom-in duration-500" style={{ perspective: '1000px' }}>
                <div 
                  className={cn(
                    "absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary/50 to-accent/50",
                    "transition-all duration-1000 group-hover:opacity-100 group-hover:shadow-2xl group-hover:shadow-primary/50",
                    "opacity-50"
                  )}
                  style={{
                    animation: "border-spin 8s linear infinite"
                  }}
                />
                <div className={cn(
                    "relative rounded-full p-1 bg-background transition-transform duration-700",
                    isFlipping && "animate-coin-flip"
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
                  <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-md">
                      <Github className="h-6 w-6 text-primary transition-colors group-hover:text-yellow-accent" />
                  </div>
                </div>
              </Link>

              <div className="text-center md:text-left animate-in fade-in slide-in-from-bottom-10 duration-700">
                  <Badge variant="outline" className="mb-4 border-accent text-accent">Available for hire</Badge>
                  <TypingAnimation text="Hi, I'm Shrijan" className="text-4xl md:text-5xl font-extrabold tracking-tight" speed={100} />
                  <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                    I’m a <span className="text-primary font-semibold transition-all hover:[text-shadow:0_0_8px_hsl(var(--primary-foreground))]"><Age />-year-old</span> self-taught developer from Nepal,
                    exploring the world of code with curiosity and creativity.
                    Learning is a journey—and thanks to the rise of AI, it's been an exciting way to transform imagination into reality.
                    I enjoy building projects that feel alive, whether it's tools that make work easier or interfaces that inspire.
                    With AI as my coding partner, I’m constantly experimenting, learning, and shaping ideas into products.
                    You could call me a <span className="text-primary font-semibold transition-all hover:[text-shadow:0_0_8px_hsl(var(--primary-foreground))]">“vibe coder”</span>.
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Button asChild size="lg">
                        <Link href="#contact">Contact Me <Mail className="ml-2" /></Link>
                    </Button>
                    <Button asChild variant="secondary" size="lg">
                        <Link href="#projects">View My Work <ArrowRight className="ml-2" /></Link>
                    </Button>
                  </div>
              </div>
            </section>

            <section id="projects" className="py-16 md:py-24 animate-in fade-in-0 slide-in-from-bottom-10 duration-700">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Projects</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, i) => (
                  <ProjectCard key={i} project={project} />
                ))}
              </div>
            </section>

            <section id="skills" className="py-16 md:py-24 bg-card/50 rounded-2xl animate-in fade-in-0 slide-in-from-bottom-10 duration-900">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">My Tech Stack</h2>
              <div className="flex flex-wrap justify-center gap-3 px-4 md:gap-4">
                {skills.map(skill => (
                  <Badge key={skill} className="text-base px-4 py-2 bg-background/50 border border-transparent transition-all hover:bg-primary/20 hover:text-primary hover:scale-105 hover:border-primary/50 cursor-default">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
            
            <section id="contact" className="text-center py-20 md:py-32 animate-in fade-in-0 slide-in-from-bottom-10 duration-1000">
                <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
                <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
                    I'm currently looking for new opportunities. Feel free to reach out via email or connect with me on GitHub.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Button asChild variant="default" size="lg">
                        <Link href={`mailto:${EMAIL}`}>
                            <Mail className="mr-2" /> Email Me
                        </Link>
                    </Button>
                    <Button asChild variant="secondary" size="lg">
                        <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2" /> GitHub
                        </Link>
                    </Button>
                </div>
            </section>

          </div>
        </main>

        <footer className="border-t border-border/40 z-10">
          <div className="container py-6 text-center text-muted-foreground text-sm">
              <p>&copy; {new Date().getFullYear()} Shrijan. All rights reserved.</p>
          </div>
        </footer>
      </ScrollArea>
    </>
  )
}
