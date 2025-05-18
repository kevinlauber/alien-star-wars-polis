
import { useNavigate } from "react-router-dom";
import { mockAlienFaction, mockTechnologies, mockCity } from "../data/mockData";
import ResourceBar from "../components/ResourceBar";
import AlienInteraction from "../components/AlienInteraction";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AlienPage = () => {
  const navigate = useNavigate();

  const handlePayTribute = () => {
    // In a real app, this would call an API
    toast({
      title: "Tribute Paid",
      description: "Your daily tribute has been paid to the Zephyrians.",
    });
  };

  const handleActivateProtection = () => {
    // In a real app, this would call an API
    toast({
      title: "Protection Activated",
      description: "You are now under Zephyrian protection for the day.",
    });
  };

  const handleAttackPlayer = () => {
    // In a real app, this would open a player selection modal
    toast({
      title: "Select Target",
      description: "Choose a player to attack with alien forces.",
    });
  };

  const handleWatchAd = () => {
    // In a real app, this would show an ad
    toast({
      title: "Ad Reward",
      description: "You earned 5 favor points!",
    });
  };

  return (
    <div className="h-full flex flex-col starpolis-bg">
      <div className="flex items-center p-2 border-b border-game-muted">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/')}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold flex-1 text-center">Alien Interaction</h1>
        <div className="w-5"></div> {/* Placeholder for alignment */}
      </div>
      
      <ResourceBar resources={mockCity.resources} />
      
      <div className="flex-1 overflow-y-auto">
        <AlienInteraction
          faction={mockAlienFaction}
          technologies={mockTechnologies}
          favor={mockCity.resources.favor}
          onPayTribute={handlePayTribute}
          onActivateProtection={handleActivateProtection}
          onAttackPlayer={handleAttackPlayer}
          onWatchAd={handleWatchAd}
        />
      </div>
    </div>
  );
};

export default AlienPage;
