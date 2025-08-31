
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

function PortfolioContent() {
  const [scrollTop, setScrollTop] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const isMobile = useIsMobile();

  const handleAvatarClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isFlipping || isPressed) return;

    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
      setIsFlipping(true);
      setTimeout(() => {
        window.open(GITHUB_URL, '_blank');
        setIsFlipping(false);
      }, 700); // coin-flip duration
    }, 400); // push-and-release duration
  };

    const handleScroll = (scrollValue: number) => {
        setScrollTop(scrollValue);
    };

    const ScrollWrapper = isMobile ? 'div' : SmoothScroll;
    const scrollWrapperProps = isMobile 
        ? { onScroll: (e: React.UIEvent<HTMLElement>) => handleScroll(e.currentTarget.scrollTop), className: "h-screen w-full overflow-y-auto" } 
        : { onScroll: handleScroll };

    return (
        <>
            <Starfield scrollTop={scrollTop}/>
            <ScrollWrapper {...scrollWrapperProps}>
                <main className="z-10 flex-1">
                    <div className="container mx-auto px-4 md:px-6">
                        <section id="hero" className="flex min-h-screen flex-col items-center justify-center gap-8 py-20 md:flex-row md:gap-16 md:py-32">
                            <Link href={GITHUB_URL} onClick={handleAvatarClick} className="group relative animate-in fade-in zoom-in-75-slow duration-1000" style={{ perspective: '1000px' }}>
                                <div
                                    className={cn(
                                        "absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary/50 to-accent/50",
                                        "opacity-50 transition-all duration-1000 group-hover:opacity-100 group-hover:shadow-2xl group-hover:shadow-primary/50",
                                    )}
                                    style={{
                                        animation: "border-spin 8s linear infinite"
                                    }}
                                />
                                <div className={cn(
                                    "relative rounded-full bg-background p-1 transition-transform duration-700",
                                    isFlipping && "animate-coin-flip",
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
                                <TypingAnimation text="Hi, I'm Shrijan" className="text-4xl font-extrabold tracking-tight sm:text-5xl" speed={50} />
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

                        <section id="skills" className="animate-in fade-in-0 slide-in-from-bottom-10-slow rounded-2xl bg-card/50 py-16 duration-1000 md:py-24">
                            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">My Tech Stack</h2>
                            <div className="flex flex-wrap justify-center gap-3 px-4 md:gap-4">
                                {skills.map(skill => (
                                    <Badge key={skill} className="border border-transparent bg-background/50 px-4 py-2 text-base transition-all hover:scale-105 hover:border-primary/50 hover:bg-primary/20 hover:text-primary">
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
            </ScrollWrapper>
        </>
    )
}

export default function Home() {
    return <PortfolioContent />;
}
