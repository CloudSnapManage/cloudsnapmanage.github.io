
import Link from "next/link";
import type { FC } from 'react';
import { Github, ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

type Project = {
    title: string;
    description: string;
    tech: string[];
    liveUrl: string;
    repoUrl: string;
};

interface ProjectCardProps {
    project: Project;
    repoButtonText?: string;
    liveButtonText?: string;
}

export const ProjectCard: FC<ProjectCardProps> = ({ project, repoButtonText = "Code", liveButtonText = "Live Demo" }) => {
    return (
        <Card className="flex flex-col h-full bg-card/60 backdrop-blur-sm border-border/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20">
            <CardHeader>
                <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                <CardDescription className="text-muted-foreground pt-2">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                    {project.tech.map(tech => (
                        <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                            {tech}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 pt-4">
                <Button asChild variant="ghost" size="sm" pushAnimation>
                    <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> {repoButtonText}
                    </Link>
                </Button>
                <Button asChild variant="default" size="sm" pushAnimation>
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        {liveButtonText} <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};
