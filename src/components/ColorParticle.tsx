
import { useEffect, useState } from "react";

interface ColorParticleProps {
  color: string;
  size: number;
  duration: number;
  delay: number;
  x: number;
  y: number;
}

const ColorParticle = ({ color, size, duration, delay, x, y }: ColorParticleProps) => {
  const [style, setStyle] = useState({
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: color,
    left: `${x}px`,
    top: `${y}px`,
    opacity: "0",
    transform: "scale(0)",
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    boxShadow: `0 0 ${size/4}px ${color}`,
  });

  useEffect(() => {
    // Add more random movement with rotation for a livelier effect
    const randomX = Math.random() * 150 - 75; // -75 to 75
    const randomY = Math.random() * -150 - 20; // -20 to -170 (more upward motion)
    const randomRotate = Math.random() * 360; // Random rotation
    const randomScale = 0.8 + Math.random() * 0.7; // Scale between 0.8 and 1.5
    
    setTimeout(() => {
      setStyle((prev) => ({
        ...prev,
        transform: `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg) scale(${randomScale})`,
        opacity: "0.9",
        transition: `transform ${duration}s cubic-bezier(0.1, 0.7, 0.3, 1), opacity ${duration}s ease-out`,
      }));
    }, delay * 1000);

    // Fade out with a more dramatic movement
    setTimeout(() => {
      setStyle((prev) => ({
        ...prev,
        opacity: "0",
        transform: `translate(${randomX * 1.5}px, ${randomY - 80}px) rotate(${randomRotate + 45}deg) scale(${randomScale * 0.3})`,
      }));
    }, (delay + duration * 0.6) * 1000);
  }, [delay, duration]);

  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={style}
    />
  );
};

export default ColorParticle;
