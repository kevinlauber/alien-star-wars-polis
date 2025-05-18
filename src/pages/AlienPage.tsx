
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResourceBar from '@/components/ResourceBar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlienFaction, Technology } from '@/types/game';

// Mock data
const mockFactions: AlienFaction[] = [
  {
    id: '1',
    name: 'Verdanites',
    description: 'Green-skinned aliens who specialize in terraforming and biological technology.',
    imageUrl: '/lovable-uploads/62697cfa-48f3-458f-bb9c-8eb30cad0129.png', // Image from your upload - this will show the full image, you may need to crop/position appropriately
    relationship: 'friendly'
  },
  {
    id: '2',
    name: 'Pyraxians',
    description: 'Orange-skinned aliens with horns who have mastered fire and defensive technologies.',
    imageUrl: '/lovable-uploads/62697cfa-48f3-458f-bb9c-8eb30cad0129.png', // Image from your upload
    relationship: 'neutral'
  },
  {
    id: '3',
    name: 'Aquarians',
    description: 'Blue-skinned aliens who control water and have advanced offensive capabilities.',
    imageUrl: '/lovable-uploads/62697cfa-48f3-458f-bb9c-8eb30cad0129.png', // Image from your upload
    relationship: 'hostile'
  }
];

const mockTechnologies: Technology[] = [
  {
    id: '1',
    name: 'Enhanced Farming',
    description: 'Increases gold production by 10% in all gold mines.',
    favorCost: 25,
    level: 1
  },
  {
    id: '2',
    name: 'Defensive Shields',
    description: 'Provides 15% additional protection to your city.',
    favorCost: 30,
    level: 2
  },
  {
    id: '3',
    name: 'Alien Weaponry',
    description: 'Increases attack damage by 20%.',
    favorCost: 40,
    diamondCost: 5,
    level: 3
  }
];

const mockResources = {
  gold: 5000,
  favor: 15,
  maxFavor: 20,
  diamonds: 10
};

const AlienPage = () => {
  const navigate = useNavigate();
  const [selectedFaction, setSelectedFaction] = useState<AlienFaction>(mockFactions[0]);
  const [alienAnimationState, setAlienAnimationState] = useState(0);
  
  // Simple animation effect for aliens
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setAlienAnimationState(prev => (prev + 1) % 60);
    }, 50);
    
    return () => clearInterval(animationInterval);
  }, []);
  
  // Get alien position based on faction id and animation state
  const getAlienImageStyle = (factionId: string) => {
    // The image contains all three aliens, we need to position it to show just one
    // We'll use object-position to focus on different parts of the image
    
    let xPosition = '50%';
    // Left alien (green) = 33%, Center alien (orange) = 50%, Right alien (blue) = 67%
    if (factionId === '1') xPosition = '29%';
    if (factionId === '2') xPosition = '50%';
    if (factionId === '3') xPosition = '71%';
    
    // Add some subtle animation
    const translateY = Math.sin(alienAnimationState / 10) * 3; // Small up/down movement
    
    return {
      objectPosition: `${xPosition} 40%`, // Focus on the alien's face
      objectFit: 'cover' as 'cover',
      transform: `translateY(${translateY}px)`,
      transition: 'transform 0.3s ease-in-out'
    };
  };
  
  // Get tooltip style based on relationship
  const getRelationshipStyle = (relationship: string) => {
    switch (relationship) {
      case 'friendly': return 'bg-green-100 text-green-800 border-green-300';
      case 'neutral': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'hostile': return 'bg-red-100 text-red-800 border-red-300';
      default: return '';
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-game-background">
      <ResourceBar resources={mockResources} />
      
      <div className="medieval-header px-4 py-2 flex items-center justify-between">
        <Button 
          variant="outline" 
          className="text-white border-white"
          onClick={() => navigate('/city')}
        >
          Return to City
        </Button>
        <h1 className="text-xl font-bold">Alien Factions</h1>
        <div className="w-24"></div>
      </div>
      
      <div className="flex flex-col md:flex-row flex-1">
        <div className="md:w-1/3 p-4 bg-black bg-opacity-30">
          <div className="space-y-4">
            {mockFactions.map(faction => (
              <Card 
                key={faction.id} 
                className={`cursor-pointer transition-all medieval-panel ${selectedFaction.id === faction.id ? 'ring-2 ring-[#d0b978]' : ''}`}
                onClick={() => setSelectedFaction(faction)}
              >
                <CardHeader className="p-3">
                  <CardTitle className="text-lg text-[#4a3e1b]">{faction.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden mr-3">
                      <img 
                        src={faction.imageUrl} 
                        alt={faction.name}
                        className="w-full h-full"
                        style={getAlienImageStyle(faction.id)}
                      />
                    </div>
                    <div className="text-sm">
                      <div className={`capitalize px-2 py-0.5 rounded-full text-xs inline-block border ${getRelationshipStyle(faction.relationship)}`}>
                        {faction.relationship}
                      </div>
                      <p className="text-xs text-[#4a3e1b] mt-1">Daily tribute: 10 favor</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="flex-1 p-4 bg-[#1e293b] bg-opacity-50">
          <div className="h-full overflow-auto">
            <div className="medieval-panel">
              <div className="p-4 relative">
                <div className="absolute top-0 right-0 w-40 h-40 overflow-hidden opacity-20 pointer-events-none">
                  <img 
                    src={selectedFaction.imageUrl}
                    alt={`${selectedFaction.name} background`}
                    className="w-full h-full"
                    style={getAlienImageStyle(selectedFaction.id)}
                  />
                </div>
                
                <h2 className="text-2xl font-semibold text-[#4a3e1b] mb-2">{selectedFaction.name}</h2>
                
                <div className="flex items-center mb-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden mr-4 border-2 border-[#c8b372] shadow-lg">
                    <img 
                      src={selectedFaction.imageUrl}
                      alt={selectedFaction.name}
                      className="w-full h-full"
                      style={getAlienImageStyle(selectedFaction.id)}
                    />
                  </div>
                  <p className="text-[#4a3e1b]">{selectedFaction.description}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-[#4a3e1b]">Relationship Status</h3>
                    <div className="h-2.5 w-full bg-gray-200 rounded-full">
                      <div 
                        className={`h-2.5 rounded-full ${
                          selectedFaction.relationship === 'friendly' ? 'bg-green-500 w-3/4' : 
                          selectedFaction.relationship === 'neutral' ? 'bg-yellow-500 w-1/2' : 
                          'bg-red-500 w-1/4'
                        }`}
                      ></div>
                    </div>
                    <p className="text-sm text-[#4a3e1b]">
                      {selectedFaction.relationship === 'friendly' ? 'This faction is friendly toward you.' : 
                       selectedFaction.relationship === 'neutral' ? 'This faction is neutral toward you.' : 
                       'This faction is hostile toward you.'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Button className="medieval-button w-full">
                        Pay Daily Tribute (10 favor)
                      </Button>
                      <p className="text-xs text-center mt-1 text-[#4a3e1b]">Prevents random attacks</p>
                    </div>
                    
                    <div>
                      <Button className="medieval-button w-full">
                        Request Protection (10 favor)
                      </Button>
                      <p className="text-xs text-center mt-1 text-[#4a3e1b]">24h protection from attacks</p>
                    </div>
                  </div>
                  
                  <Tabs defaultValue="technologies" className="mt-6">
                    <TabsList className="w-full grid grid-cols-2">
                      <TabsTrigger value="technologies">Technologies</TabsTrigger>
                      <TabsTrigger value="attack">Attack Options</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="technologies" className="space-y-4 mt-4">
                      {mockTechnologies.map(tech => (
                        <Card key={tech.id} className="medieval-panel">
                          <CardHeader className="p-3">
                            <CardTitle className="text-[#4a3e1b]">{tech.name} (Lvl {tech.level})</CardTitle>
                            <CardDescription>{tech.description}</CardDescription>
                          </CardHeader>
                          
                          <CardFooter className="p-3 pt-0 flex justify-between">
                            <div className="text-sm text-[#4a3e1b]">
                              Cost: {tech.favorCost} favor
                              {tech.diamondCost && ` + ${tech.diamondCost} diamonds`}
                            </div>
                            <Button className="medieval-button" disabled={mockResources.favor < tech.favorCost}>
                              Acquire
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="attack" className="mt-4">
                      <Card className="medieval-panel">
                        <CardHeader>
                          <CardTitle className="text-[#4a3e1b]">Attack Another Player</CardTitle>
                          <CardDescription>
                            Use this faction to attack another player's city.
                            This will cost 10 favor and can only be done once per day.
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent>
                          <div className="space-y-2">
                            <p className="text-[#4a3e1b]">Select a target from the world map:</p>
                            <Button className="medieval-button" onClick={() => navigate('/map')}>
                              Open World Map
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlienPage;
