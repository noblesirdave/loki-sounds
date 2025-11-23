import { useEffect, useState } from "react";
import { Keyboard, KeyboardOff } from "lucide-react";

export const ModeIndicator = () => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const checkMode = () => {
      const activeElement = document.activeElement as HTMLElement;
      const isTyping =
        activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA" ||
        activeElement.isContentEditable;
      setIsActive(!isTyping);
    };

    // Check on focus/blur events
    window.addEventListener("focusin", checkMode);
    window.addEventListener("focusout", checkMode);
    checkMode();

    return () => {
      window.removeEventListener("focusin", checkMode);
      window.removeEventListener("focusout", checkMode);
    };
  }, []);

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
        isActive
          ? "bg-primary/10 border-primary/40 text-primary"
          : "bg-muted/50 border-muted-foreground/30 text-muted-foreground"
      }`}
    >
      {isActive ? (
        <Keyboard className="w-4 h-4" />
      ) : (
        <KeyboardOff className="w-4 h-4" />
      )}
      <span className="text-sm font-mono">
        {isActive ? "Keyboard Active" : "Keyboard Disabled"}
      </span>
    </div>
  );
};
