import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Desktop from "@/components/Desktop";
import BootScreen from "@/components/BootScreen";
import { useAnalytics } from "@/hooks/useAnalytics";

const OSPage = () => {
  const [isBooted, setIsBooted] = useState(false);

  return (
    <div className="w-full h-screen overflow-hidden bg-background">
      {!isBooted ? (
        <BootScreen onBootComplete={() => setIsBooted(true)} />
      ) : (
        <>
          <ThemeToggle className="fixed top-4 right-4 z-50" />
          <Desktop />
        </>
      )}
    </div>
  );
};

export default OSPage;
