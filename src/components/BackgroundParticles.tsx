
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  delay: number;
}

const COLORS = [
  "rgb(217, 70, 239, 0.4)", // Pink
  "rgb(139, 92, 246, 0.4)",  // Purple
  "rgb(249, 115, 22, 0.4)",  // Orange
  "rgb(14, 165, 233, 0.4)",  // Blue
  "rgb(252, 211, 77, 0.4)",  // Yellow
  "rgb(16, 185, 129, 0.4)",  // Green
];

const BackgroundParticles = ({ count = 25 }: { count?: number }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    
    // Create initial particles
    const initialParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      initialParticles.push(createRandomParticle(i, windowSize.width, windowSize.height));
    }
    setParticles(initialParticles);

    return () => window.removeEventListener('resize', handleResize);
  }, [count]);

  useEffect(() => {
    // Re-create particles when window size changes
    setParticles(
      particles.map((p) => ({
        ...p,
        x: (p.x / windowSize.width) * window.innerWidth,
        y: (p.y / windowSize.height) * window.innerHeight,
      }))
    );
  }, [windowSize]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-0 animate-float"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            animationDuration: `${particle.speed}s`,
            animationDelay: `${particle.delay}s`,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
};

function createRandomParticle(id: number, maxWidth: number, maxHeight: number): Particle {
  return {
    id,
    x: Math.random() * maxWidth,
    y: Math.random() * maxHeight,
    size: Math.random() * 30 + 10, // 10-40px
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    speed: Math.random() * 10 + 10, // 10-20s
    delay: Math.random() * 5, // 0-5s delay
  };
}

export default BackgroundParticles;
