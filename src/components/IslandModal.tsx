
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Island } from "../types/game";
import { Shield } from "lucide-react";

interface IslandModalProps {
  isOpen: boolean;
  onClose: () => void;
  island: Island | null;
  onAttack?: () => void;
  onColonize?: () => void;
}

const IslandModal: React.FC<IslandModalProps> = ({
  isOpen,
  onClose,
  island,
  onAttack,
  onColonize
}) => {
  if (!island) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-game-background border-game-muted text-game-foreground">
        <DialogHeader>
          <DialogTitle>
            Island {island.position.x},{island.position.y}
          </DialogTitle>
          <DialogDescription>
            {island.isDestroyed
              ? "This island has been destroyed by alien forces."
              : island.isOwn
              ? "This is your island."
              : island.ownerName
              ? `This island belongs to ${island.ownerName}.`
              : "This island is unclaimed and ready for colonization."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {!island.isDestroyed && (
            <div className="border border-game-muted rounded p-3 bg-opacity-30 bg-black">
              <h4 className="font-medium mb-1">Status</h4>
              <div className="flex items-center">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-game-health h-2 rounded-full"
                    style={{ width: `${island.health}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm">{island.health}%</span>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          {!island.isDestroyed && !island.isOwn && island.ownerName && (
            <Button
              onClick={onAttack}
              className="bg-game-damage hover:bg-red-700"
            >
              Attack
            </Button>
          )}
          
          {!island.isDestroyed && !island.isOwn && !island.ownerName && (
            <Button
              onClick={onColonize}
              className="bg-game-primary hover:bg-blue-700"
            >
              Colonize
            </Button>
          )}
          
          {island.isOwn && (
            <Button
              onClick={onClose}
              className="bg-game-secondary hover:bg-indigo-700"
            >
              <Shield className="mr-2 h-4 w-4" />
              Defend
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IslandModal;
