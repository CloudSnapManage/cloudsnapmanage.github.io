
"use client";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  isLoading: boolean;
}

export const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500",
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <h2
        className={cn(
            "text-2xl font-bold text-primary mb-4 opacity-0",
            isLoading && "animate-fade-in-slide-up"
        )}
        style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
      >
        Welcome
      </h2>
      <svg
        width="300"
        height="100"
        viewBox="0 0 300 100"
        className="w-2/3 max-w-xs md:max-w-sm"
      >
        <style>{`
          .signature-path {
            stroke: hsl(var(--primary));
            stroke-width: 2;
            fill: none;
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: draw 2s ease-in-out forwards;
          }
          .animate-fade-in-slide-up {
              animation: fade-in-slide-up 1s ease-out forwards;
          }
        `}</style>
        {/* Shrijan */}
        <path
          className="signature-path"
          d="M 20 60 Q 30 20 50 50 Q 70 80 90 50" 
        />
        <path
          className="signature-path"
          style={{ animationDelay: '0.2s' }}
          d="M 95 55 C 100 40, 110 40, 115 55"
        />
        <path
          className="signature-path"
          style={{ animationDelay: '0.4s' }}
          d="M 120 60 L 120 30"
        />
        <path
          className="signature-path"
          style={{ animationDelay: '0.5s' }}
          d="M 125 55 C 130 40, 140 40, 145 55"
        />
        <path
          className="signature-path"
          style={{ animationDelay: '0.7s' }}
          d="M 150 55 C 155 70, 165 70, 170 55"
        />
        <path
          className="signature-path"
          style={{ animationDelay: '0.9s' }}
          d="M 175 60 Q 185 30 195 60"
        />
        <path
          className="signature-path"
          style={{ animationDelay: '1.1s' }}
          d="M 200 60 C 210 40, 220 70, 230 50"
        />
      </svg>
    </div>
  );
};
