
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col starpolis-bg">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-game-primary to-game-secondary">
            STARPOLIS
          </h1>
          
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="text-game-favor animate-float" 
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              ))}
            </div>
            <p className="text-xl text-game-foreground relative z-10 py-8">
              Build your cosmic civilization across the galaxy
            </p>
          </div>
          
          <div className="space-y-4">
            <Button
              className="bg-game-primary hover:bg-blue-600 w-64 py-6 text-lg"
              onClick={() => navigate('/city')}
            >
              Start Playing
            </Button>
            
            <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
              <Button variant="outline" className="border-game-muted">
                How to Play
              </Button>
              <Button variant="outline" className="border-game-muted">
                Settings
              </Button>
            </div>
          </div>
          
          <div className="mt-12 text-sm text-game-muted">
            <p>A strategy game where you build, expand, and defend</p>
            <p>your civilization in an alien archipelago.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
