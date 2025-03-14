
import { useState, useEffect } from "react";
import BackgroundParticles from "@/components/BackgroundParticles";
import ColorCanvas from "@/components/ColorCanvas";
import FestivalHeader from "@/components/FestivalHeader";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

const Index = () => {
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Show a welcome toast after a short delay
    const timer = setTimeout(() => {
      toast("Welcome to the Holi Festival!", {
        description: "Click or drag on the canvas to splash some colors!",
        position: "bottom-center",
        duration: 5000,
        icon: <Sparkles className="text-holi-pink animate-spin-slow" />,
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-purple-900 via-violet-800 to-indigo-900">
      {/* Animated background with floating particles */}
      <BackgroundParticles count={40} />
      
      {/* Floating color orbs */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-holi-pink/60 blur-xl animate-float" style={{ animationDuration: "8s" }}></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-holi-yellow/60 blur-xl animate-float" style={{ animationDuration: "12s" }}></div>
      <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-holi-blue/60 blur-xl animate-float" style={{ animationDuration: "10s" }}></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 rounded-full bg-holi-green/60 blur-xl animate-float" style={{ animationDuration: "9s" }}></div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/40 pointer-events-none" />
      
      <div className="container px-4 py-10 relative z-10 flex flex-col items-center">
        {/* Festival header with animated title */}
        <FestivalHeader />
        
        {/* Interactive color canvas */}
        <div 
          className="w-full max-w-4xl my-8 relative transform transition-all duration-700 hover:scale-[1.02]"
          onClick={() => !hasInteracted && setHasInteracted(true)}
        >
          <ColorCanvas />
          
          {/* Decorative elements around the canvas */}
          <div className="absolute -top-6 -left-6 w-12 h-12 bg-holi-pink rounded-full animate-bounce-light opacity-70" style={{ animationDelay: "0.3s" }}></div>
          <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-holi-yellow rounded-full animate-bounce-light opacity-70" style={{ animationDelay: "0.7s" }}></div>
          <div className="absolute -top-6 -right-6 w-10 h-10 bg-holi-green rounded-full animate-bounce-light opacity-70" style={{ animationDelay: "0.5s" }}></div>
          <div className="absolute -bottom-6 -left-6 w-10 h-10 bg-holi-blue rounded-full animate-bounce-light opacity-70" style={{ animationDelay: "0.1s" }}></div>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-4 animate-fade-in-up" style={{ animationDelay: "1s" }}>
            Holi symbolizes the triumph of good over evil and the arrival of spring.
          </p>
          <p className="text-white/70 italic animate-fade-in-up" style={{ animationDelay: "1.5s" }}>
            May your life be as colorful as the festival of Holi!
          </p>
        </div>
        
        <footer className="mt-auto pt-8 text-center text-white/60">
          <p className="text-sm">
            Created with{" "}
            <span className="inline-block animate-pulse text-holi-pink">❤️</span>{" "}
            by Anubhav
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
