
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center starpolis-bg">
      <div className="medieval-panel p-8 max-w-md text-center">
        <h1 className="text-4xl font-bold text-[#4a3e1b] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[#4a3e1b] mb-6">Page Not Found</h2>
        <p className="text-[#4a3e1b] mb-8">
          The cosmic map you're looking for doesn't exist or has been destroyed by aliens.
        </p>
        <Button className="medieval-button" onClick={() => navigate('/')}>
          Return to Starpolis
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
