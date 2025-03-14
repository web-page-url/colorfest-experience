
import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

const colors = ["text-holi-purple", "text-holi-pink", "text-holi-orange", "text-holi-blue", "text-holi-yellow", "text-holi-green"];

const FestivalHeader = () => {
  const [activeColors, setActiveColors] = useState<string[]>(
    Array(5).fill("").map((_, i) => colors[i % colors.length])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveColors(current => {
        const newColors = [...current];
        for (let i = 0; i < newColors.length; i++) {
          if (Math.random() > 0.7) { // 30% chance to change color
            const currentIndex = colors.indexOf(newColors[i]);
            const nextIndex = (currentIndex + 1) % colors.length;
            newColors[i] = colors[nextIndex];
          }
        }
        return newColors;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center space-y-6 py-10">
      <div className="flex justify-center items-center mb-2">
        <Sparkles size={24} className="text-holi-yellow animate-pulse-scale" />
        <h2 className="text-xl font-medium mx-2 text-white/70">Festival of Colors</h2>
        <Sparkles size={24} className="text-holi-yellow animate-pulse-scale" />
      </div>
      
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
        <span className="inline-block mx-1 animate-bounce-light" style={{ animationDelay: "0s" }}>
          <span className={`${activeColors[0]} transition-colors duration-700`}>H</span>
        </span>
        <span className="inline-block mx-1 animate-bounce-light" style={{ animationDelay: "0.1s" }}>
          <span className={`${activeColors[1]} transition-colors duration-700`}>A</span>
        </span>
        <span className="inline-block mx-1 animate-bounce-light" style={{ animationDelay: "0.2s" }}>
          <span className={`${activeColors[2]} transition-colors duration-700`}>P</span>
        </span>
        <span className="inline-block mx-1 animate-bounce-light" style={{ animationDelay: "0.3s" }}>
          <span className={`${activeColors[3]} transition-colors duration-700`}>P</span>
        </span>
        <span className="inline-block mx-1 animate-bounce-light" style={{ animationDelay: "0.4s" }}>
          <span className={`${activeColors[4]} transition-colors duration-700`}>Y</span>
        </span>
        
        <span className="block md:inline">&nbsp;</span>
        
        <span className="inline-block mt-2 md:mt-0 relative">
          <span className="relative z-10 bg-gradient-to-r from-holi-pink via-holi-purple to-holi-blue text-transparent bg-clip-text animate-color-rotate">
            HOLI
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-holi-pink via-holi-purple to-holi-blue text-transparent bg-clip-text animate-color-rotate blur-md opacity-70 z-0">
            HOLI
          </span>
        </span>
      </h1>
      
      <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/70 animate-fade-in-up">
        Celebrate the victory of good over evil with colors that spread joy and happiness!
      </p>
    </div>
  );
};

export default FestivalHeader;
