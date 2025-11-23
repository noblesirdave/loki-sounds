import { useState } from "react";
import { MusicKey } from "@/components/MusicKey";
import { ModeIndicator } from "@/components/ModeIndicator";
import { InstrumentSelector } from "@/components/InstrumentSelector";
import { instruments } from "@/lib/instruments";

const Index = () => {
  const [selectedInstrument, setSelectedInstrument] = useState("piano");

  const leftHandKeys = [
    { note: "C", frequency: 261.63, key: "a", color: "--key-1", label: "Pinky L" },
    { note: "D", frequency: 293.66, key: "s", color: "--key-2", label: "Ring L" },
    { note: "E", frequency: 329.63, key: "d", color: "--key-3", label: "Middle L" },
    { note: "F", frequency: 349.23, key: "f", color: "--key-4", label: "Index L" },
    { note: "G", frequency: 392.0, key: "g", color: "--key-5", label: "Thumb L" },
  ];

  const rightHandKeys = [
    { note: "A", frequency: 440.0, key: "h", color: "--key-6", label: "Thumb R" },
    { note: "B", frequency: 493.88, key: "j", color: "--key-7", label: "Index R" },
    { note: "C2", frequency: 523.25, key: "k", color: "--key-8", label: "Middle R" },
    { note: "D2", frequency: 587.33, key: "l", color: "--key-9", label: "Ring R" },
    { note: "E2", frequency: 659.25, key: ";", color: "--key-10", label: "Pinky R" },
  ];

  const currentInstrument = instruments[selectedInstrument];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-7xl w-full space-y-12">
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              DECA
            </h1>
            <p className="text-muted-foreground text-lg tracking-wide">
              10-Key Musical Device • One key per finger
            </p>
            <p className="text-sm text-muted-foreground/60 font-mono">
              Press keys A-S-D-F-G and H-J-K-L-; or click to play
            </p>
          </div>

          <div className="flex items-center justify-center">
            <ModeIndicator />
          </div>
        </div>

        <InstrumentSelector selected={selectedInstrument} onSelect={setSelectedInstrument} />

        <div className="text-center">
          <p className="text-accent text-sm font-mono">
            Now Playing: {currentInstrument.name} ({currentInstrument.category})
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center text-primary/80 tracking-wider">
              LEFT HAND
            </h2>
            <div className="grid grid-cols-5 gap-3">
              {leftHandKeys.map((key) => (
                <MusicKey
                  key={key.key}
                  note={key.note}
                  frequency={key.frequency}
                  keyBinding={key.key}
                  color={key.color}
                  label={key.label}
                  instrument={currentInstrument}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center text-accent/80 tracking-wider">
              RIGHT HAND
            </h2>
            <div className="grid grid-cols-5 gap-3">
              {rightHandKeys.map((key) => (
                <MusicKey
                  key={key.key}
                  note={key.note}
                  frequency={key.frequency}
                  keyBinding={key.key}
                  color={key.color}
                  label={key.label}
                  instrument={currentInstrument}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="text-center space-y-2 pt-8">
          <div className="inline-block px-4 py-2 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
            <p className="text-xs text-muted-foreground font-mono">
              16 Instruments • Web Audio Synthesis • ADSR Envelopes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
