
import { useState } from "react";
import { AlienFaction, Technology } from "../types/game";
import { Button } from "@/components/ui/button";
import { Shield, Users, Zap } from "lucide-react";

interface AlienInteractionProps {
  faction: AlienFaction;
  technologies: Technology[];
  favor: number;
  onPayTribute: () => void;
  onActivateProtection: () => void;
  onAttackPlayer: () => void;
  onWatchAd: () => void;
}

const AlienInteraction: React.FC<AlienInteractionProps> = ({
  faction,
  technologies,
  favor,
  onPayTribute,
  onActivateProtection,
  onAttackPlayer,
  onWatchAd
}) => {
  const [selectedTab, setSelectedTab] = useState<'status' | 'techs'>('status');

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-center p-4">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-game-secondary">
          <img src={faction.imageUrl} alt={faction.name} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 w-full bg-black bg-opacity-70 text-center py-1">
            <p className="text-xs font-medium">{faction.name}</p>
          </div>
        </div>
      </div>

      <div className="flex border-b border-game-muted">
        <button 
          className={`flex-1 py-2 text-center ${selectedTab === 'status' ? 'border-b-2 border-game-secondary' : ''}`}
          onClick={() => setSelectedTab('status')}
        >
          Status
        </button>
        <button 
          className={`flex-1 py-2 text-center ${selectedTab === 'techs' ? 'border-b-2 border-game-secondary' : ''}`}
          onClick={() => setSelectedTab('techs')}
        >
          Technologies
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {selectedTab === 'status' ? (
          <div className="space-y-4">
            <div className="border border-game-muted rounded p-3 bg-opacity-30 bg-black">
              <h3 className="font-medium text-lg mb-2">Relationship: {faction.relationship}</h3>
              <p className="text-sm text-gray-300">{faction.description}</p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium">Daily Actions</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="border-game-favor text-game-favor flex justify-between items-center"
                  onClick={onPayTribute}
                  disabled={favor < 10}
                >
                  <span>Pay Tribute</span>
                  <span className="flex items-center ml-2">
                    10 <Users className="h-3 w-3 ml-1" />
                  </span>
                </Button>
                
                <Button
                  variant="outline"
                  className="border-game-favor text-game-favor flex justify-between items-center"
                  onClick={onActivateProtection}
                  disabled={favor < 10}
                >
                  <span>Protection</span>
                  <span className="flex items-center ml-2">
                    10 <Shield className="h-3 w-3 ml-1" />
                  </span>
                </Button>
              </div>
              
              <Button
                variant="outline"
                className="w-full border-game-damage text-game-damage"
                onClick={onAttackPlayer}
                disabled={favor < 10}
              >
                Attack Player (10 <Users className="h-3 w-3 inline" />)
              </Button>
              
              <Button
                className="w-full bg-game-accent hover:bg-orange-600"
                onClick={onWatchAd}
              >
                Watch Ad: +5 <Users className="h-3 w-3 inline" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm">Unlock alien technologies with favor points:</p>
            
            <div className="space-y-3">
              {technologies.map(tech => (
                <div key={tech.id} className="border border-game-muted rounded p-3 bg-opacity-30 bg-black">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{tech.name} (Lvl {tech.level})</h4>
                    <div className="flex items-center text-game-favor">
                      {tech.favorCost} <Users className="h-3 w-3 ml-1" />
                      {tech.diamondCost && (
                        <span className="ml-2 text-blue-300">+{tech.diamondCost} 💎</span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 mt-1">{tech.description}</p>
                  <Button
                    size="sm"
                    className="mt-2 w-full bg-game-secondary hover:bg-indigo-600"
                    disabled={favor < tech.favorCost}
                  >
                    <Zap className="mr-1 h-3 w-3" />
                    Unlock
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlienInteraction;
