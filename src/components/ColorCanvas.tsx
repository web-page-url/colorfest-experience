
import { useState, useRef, useEffect } from "react";
import ColorParticle from "./ColorParticle";

interface ColorSplash {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
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
  const [isPointerDown, setIsPointerDown] = useState(false);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const timerRef = useRef<number | null>(null);
  const splashIdRef = useRef(0);

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
    
    const size = Math.random() * 40 + 30; // Random size between 30 and 70
    
    setColorSplashes((prev) => [
      ...prev.slice(-25), // Keep only the last 25 splashes for performance
      {
        id: splashIdRef.current++,
        x,
        y,
        color: getRandomColor(),
        size,
      },
    ]);
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

  return (
    <div
      ref={canvasRef}
      className="relative w-full h-[60vh] bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onTouchEnd={handlePointerUp}
    >
      <div className="absolute inset-0 flex items-center justify-center text-white/50 pointer-events-none">
        <p className="text-lg md:text-xl font-light tracking-wider">Click or drag to splash colors</p>
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
          }}
        />
      ))}
    </div>
  );
};

export default ColorCanvas;
