
import { useState, useRef, useEffect } from "react";
import ColorParticle from "./ColorParticle";

interface ColorSplash {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

interface ParticleEffect {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
}

const COLORS = [
  "#D946EF", // Pink
  "#8B5CF6", // Purple
  "#F97316", // Orange
  "#0EA5E9", // Blue
  "#FCD34D", // Yellow
  "#10B981", // Green
];

const ColorCanvas = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [colorSplashes, setColorSplashes] = useState<ColorSplash[]>([]);
  const [particleEffects, setParticleEffects] = useState<ParticleEffect[]>([]);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const timerRef = useRef<number | null>(null);
  const splashIdRef = useRef(0);
  const particleIdRef = useRef(0);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const getRandomColor = () => {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  };

  const createSplash = (clientX: number, clientY: number) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    // Don't create splashes that are too close to the previous ones
    const dx = x - lastPositionRef.current.x;
    const dy = y - lastPositionRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 20 && colorSplashes.length > 0) return;
    
    lastPositionRef.current = { x, y };
    
    const size = Math.random() * 60 + 40; // Random size between 40 and 100
    const color = getRandomColor();
    
    setColorSplashes((prev) => [
      ...prev.slice(-25), // Keep only the last 25 splashes for performance
      {
        id: splashIdRef.current++,
        x,
        y,
        color,
        size,
      },
    ]);

    // Create particle effects for each splash
    const particleCount = Math.floor(Math.random() * 8) + 8; // 8-15 particles
    const newParticles: ParticleEffect[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: particleIdRef.current++,
        x,
        y,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 15 + 5, // Size between 5-20px
        duration: Math.random() * 2 + 1, // 1-3 seconds
        delay: Math.random() * 0.3, // 0-0.3 second delay
      });
    }
    
    setParticleEffects((prev) => [...prev.slice(-100), ...newParticles]);
    
    // Add haptic feedback for mobile devices
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsPointerDown(true);
    createSplash(e.clientX, e.clientY);
    
    // Start continuous splash creation
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      if (lastPositionRef.current.x !== 0 && isPointerDown) {
        createSplash(lastPositionRef.current.x, lastPositionRef.current.y);
      }
    }, 150);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDown) return;
    createSplash(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    setIsPointerDown(false);
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Clean up old particle effects
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      setParticleEffects((prev) => 
        prev.filter((p) => now - p.id < 4000) // Remove particles older than 4 seconds
      );
    }, 2000);
    
    return () => clearInterval(cleanup);
  }, []);

  return (
    <div
      ref={canvasRef}
      className="relative w-full h-[60vh] bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden cursor-pointer touch-none shadow-lg border border-white/20"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onTouchEnd={handlePointerUp}
    >
      <div className="absolute inset-0 flex items-center justify-center text-white/50 pointer-events-none">
        <p className="text-lg md:text-xl font-light tracking-wider animate-pulse">Click or drag to splash colors</p>
      </div>
      
      {colorSplashes.map((splash) => (
        <div
          key={splash.id}
          className="absolute rounded-full animate-color-splash"
          style={{
            left: `${splash.x}px`,
            top: `${splash.y}px`,
            width: `${splash.size}px`,
            height: `${splash.size}px`,
            backgroundColor: splash.color,
            marginLeft: `-${splash.size / 2}px`,
            marginTop: `-${splash.size / 2}px`,
            filter: "blur(4px)",
            boxShadow: `0 0 20px ${splash.color}`,
          }}
        />
      ))}
      
      {particleEffects.map((particle) => (
        <ColorParticle
          key={particle.id}
          x={particle.x}
          y={particle.y}
          color={particle.color}
          size={particle.size}
          duration={particle.duration}
          delay={particle.delay}
        />
      ))}
    </div>
  );
};

export default ColorCanvas;
