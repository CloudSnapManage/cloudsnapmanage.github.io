import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Starfield }from '@/components/starfield';

export const metadata: Metadata = {
  title: 'Vibe Coder Portfolio | Shrijan',
  description: "A portfolio for Shrijan, a full-stack developer passionate about building beautiful and functional web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Starfield />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
