
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
  });

  useEffect(() => {
    // Add a small random movement to make it more natural
    const randomX = Math.random() * 100 - 50; // -50 to 50
    const randomY = Math.random() * -100; // Move upward
    
    setTimeout(() => {
      setStyle((prev) => ({
        ...prev,
        transform: `translate(${randomX}px, ${randomY}px) scale(1)`,
        opacity: "0.7",
        transition: `transform ${duration}s ease-out, opacity ${duration}s ease-out`,
      }));
    }, delay * 1000);

    // Fade out
    setTimeout(() => {
      setStyle((prev) => ({
        ...prev,
        opacity: "0",
        transform: `translate(${randomX}px, ${randomY - 50}px) scale(0.5)`,
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
