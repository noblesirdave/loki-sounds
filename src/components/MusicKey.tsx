import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type WaveformType = "sine" | "square" | "sawtooth" | "triangle";

interface MusicKeyProps {
  note: string;
  frequency: number;
  keyBinding: string;
  color: string;
  label: string;
  waveform: WaveformType;
}

export const MusicKey = ({ note, frequency, keyBinding, color, label, waveform }: MusicKeyProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(context);

    return () => {
      context.close();
    };
  }, []);

  const playSound = () => {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = waveform;

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);

    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input field
      const target = e.target as HTMLElement;
      const isTyping = 
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      
      if (!isTyping && e.key.toLowerCase() === keyBinding.toLowerCase() && !isPressed) {
        playSound();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keyBinding, isPressed]);

  return (
    <button
      onClick={playSound}
      className={cn(
        "relative flex flex-col items-center justify-center gap-2 rounded-xl p-6 transition-all duration-200",
        "border-2 border-border/50 backdrop-blur-sm",
        "hover:scale-105 active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-ring",
        isPressed && "animate-key-press scale-95"
      )}
      style={{
        backgroundColor: `hsl(var(${color}) / 0.15)`,
        borderColor: `hsl(var(${color}) / 0.4)`,
        boxShadow: isPressed
          ? `0 0 30px hsl(var(${color}) / 0.6), 0 0 60px hsl(var(${color}) / 0.4)`
          : `0 0 10px hsl(var(${color}) / 0.2)`,
      }}
    >
      <div
        className="text-4xl font-bold tracking-wider"
        style={{ color: `hsl(var(${color}))` }}
      >
        {note}
      </div>
      <div className="text-xs uppercase tracking-widest opacity-60">{label}</div>
      <div
        className="absolute bottom-2 right-2 text-xs font-mono opacity-40"
        style={{ color: `hsl(var(${color}))` }}
      >
        {keyBinding}
      </div>
    </button>
  );
};
