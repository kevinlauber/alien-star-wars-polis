
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ResourceBar from '@/components/ResourceBar';
import MedievalWorldMap from '@/components/MedievalWorldMap';
import { Island } from '@/types/game';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const mockIslands: Island[] = [
  {
    id: '1',
    position: { x: 150, y: 150 },
    isOwn: true,
    isDestroyed: false,
    health: 100
  },
  {
    id: '2',
    position: { x: 300, y: 200 },
    ownerName: 'Enemy1',
    isOwn: false,
    isDestroyed: false,
    health: 85
  },
  {
    id: '3',
    position: { x: 450, y: 300 },
    isOwn: false,
    isDestroyed: false,
    health: 100
  },
  {
    id: '4',
    position: { x: 180, y: 350 },
    isOwn: false,
    isDestroyed: true,
    health: 0
  },
  {
    id: '5',
    position: { x: 400, y: 120 },
    ownerName: 'Enemy2',
    isOwn: false,
    isDestroyed: false,
    health: 65
  }
];

const mockResources = {
  gold: 5000,
  favor: 15,
  maxFavor: 20,
  diamonds: 10
};

const WorldMapPage = () => {
  const navigate = useNavigate();
  const [selectedIsland, setSelectedIsland] = useState<Island | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleIslandClick = (island: Island) => {
    setSelectedIsland(island);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-game-background">
      <ResourceBar resources={mockResources} />
      
      <div className="flex items-center justify-between px-4 py-2 medieval-header">
        <Button 
          variant="outline" 
          className="text-white border-white"
          onClick={() => navigate('/city')}
        >
          Return to City
        </Button>
        <h1 className="text-xl font-bold text-center">World Map</h1>
        <Button variant="outline" className="text-white border-white">
          Filter
        </Button>
      </div>
      
      <div className="flex-1 relative">
        <MedievalWorldMap 
          islands={mockIslands}
          onIslandClick={handleIslandClick}
        />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="medieval-panel">
          <DialogHeader>
            <DialogTitle className="text-center text-[#4a3e1b]">
              {selectedIsland?.isOwn ? 'Your Island' : selectedIsland?.ownerName ? `${selectedIsland.ownerName}'s Island` : 'Empty Island'}
            </DialogTitle>
          </DialogHeader>
          
          <DialogDescription className="text-[#4a3e1b]">
            {selectedIsland?.isDestroyed ? (
              <p>This island has been destroyed and is uninhabitable.</p>
            ) : selectedIsland?.isOwn ? (
              <div>
                <p>Health: {selectedIsland.health}%</p>
                <p>This is your island. You have established a settlement here.</p>
                <div className="mt-4 flex justify-center">
                  <Button 
                    className="medieval-button"
                    onClick={() => {
                      setIsDialogOpen(false);
                      navigate('/city');
                    }}
                  >
                    Visit City
                  </Button>
                </div>
              </div>
            ) : selectedIsland?.ownerName ? (
              <div>
                <p>Occupied by: {selectedIsland.ownerName}</p>
                <p>Health: {selectedIsland.health}%</p>
                <div className="mt-4 flex justify-center">
                  <Button className="medieval-button">
                    Attack Island
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <p>This island is unoccupied and available for colonization.</p>
                <div className="mt-4 flex justify-center">
                  <Button className="medieval-button">
                    Colonize Island
                  </Button>
                </div>
              </div>
            )}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorldMapPage;
