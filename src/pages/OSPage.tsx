import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Desktop from "@/components/Desktop";
import BootScreen from "@/components/BootScreen";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const OSPage = () => {
  const [isBooted, setIsBooted] = useState(false);

  return (
    <div className="w-full h-screen overflow-hidden bg-background">
      {!isBooted ? (
        <BootScreen onBootComplete={() => setIsBooted(true)} />
      ) : (
        <>
          <ThemeToggle className="fixed top-4 right-4 z-50" />
          <Link 
            to="/"
            className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border text-foreground hover:bg-secondary transition-all hover:scale-105 shadow-lg"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm font-semibold">Retour Portfolio</span>
          </Link>
          <Desktop />
        </>
      )}
    </div>
  );
};

export default OSPage;
