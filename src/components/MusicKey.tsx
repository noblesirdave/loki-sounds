import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { InstrumentConfig } from "@/lib/instruments";

interface MusicKeyProps {
  note: string;
  frequency: number;
  keyBinding: string;
  color: string;
  label: string;
  instrument: InstrumentConfig;
}

export const MusicKey = ({ note, frequency, keyBinding, color, label, instrument }: MusicKeyProps) => {
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

    const now = audioContext.currentTime;
    
    // Create oscillator
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    // Configure oscillator
    oscillator.frequency.value = frequency;
    oscillator.type = instrument.waveform;

    // Configure filter if specified
    if (instrument.filterFreq) {
      filter.type = "lowpass";
      filter.frequency.value = instrument.filterFreq;
      filter.Q.value = instrument.filterQ || 1;
      oscillator.connect(filter);
      filter.connect(gainNode);
    } else {
      oscillator.connect(gainNode);
    }

    gainNode.connect(audioContext.destination);

    // ADSR Envelope
    const { attack, decay, sustain, release } = instrument;
    const sustainLevel = sustain * 0.3; // Max volume 0.3
    const totalDuration = attack + decay + 0.3 + release; // 0.3s sustain time

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + attack);
    gainNode.gain.linearRampToValueAtTime(sustainLevel, now + attack + decay);
    gainNode.gain.setValueAtTime(sustainLevel, now + attack + decay + 0.3);
    gainNode.gain.linearRampToValueAtTime(0.01, now + totalDuration);

    oscillator.start(now);
    oscillator.stop(now + totalDuration);

    // Record note if sequencer is recording
    if (typeof window !== 'undefined' && (window as any).__sequencerRecordNote) {
      (window as any).__sequencerRecordNote(frequency, note);
    }

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
  }, [keyBinding, isPressed, instrument]);

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
