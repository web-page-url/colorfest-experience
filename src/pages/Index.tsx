
import { useState, useEffect } from "react";
import BackgroundParticles from "@/components/BackgroundParticles";
import ColorCanvas from "@/components/ColorCanvas";
import FestivalHeader from "@/components/FestivalHeader";
import { toast } from "sonner";

const Index = () => {
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Show a welcome toast after a short delay
    const timer = setTimeout(() => {
      toast("Welcome to the Holi Festival!", {
        description: "Click or drag on the canvas to splash some colors!",
        position: "bottom-center",
        duration: 5000,
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-purple-900 via-violet-800 to-indigo-900">
      {/* Animated background with floating particles */}
      <BackgroundParticles count={30} />
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/40 pointer-events-none" />
      
      <div className="container px-4 py-10 relative z-10 flex flex-col items-center">
        {/* Festival header with animated title */}
        <FestivalHeader />
        
        {/* Interactive color canvas */}
        <div 
          className="w-full max-w-4xl my-8 relative"
          onClick={() => !hasInteracted && setHasInteracted(true)}
        >
          <ColorCanvas />
        </div>
        
        <footer className="mt-auto pt-8 text-center text-white/60">
          <p className="text-sm">
            Created with ❤️ by Anubhav
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
