import { Music, Music2, Music3, Music4 } from "lucide-react";

export type InstrumentType = "sine" | "square" | "sawtooth" | "triangle";

interface InstrumentSelectorProps {
  selected: InstrumentType;
  onSelect: (instrument: InstrumentType) => void;
}

const instruments: { type: InstrumentType; label: string; icon: any }[] = [
  { type: "sine", label: "Sine", icon: Music },
  { type: "square", label: "Square", icon: Music2 },
  { type: "sawtooth", label: "Sawtooth", icon: Music3 },
  { type: "triangle", label: "Triangle", icon: Music4 },
];

export const InstrumentSelector = ({ selected, onSelect }: InstrumentSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground font-mono mr-2">Waveform:</span>
      <div className="flex gap-2">
        {instruments.map(({ type, label, icon: Icon }) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
              selected === type
                ? "bg-accent/20 border-accent text-accent-foreground scale-105"
                : "bg-card/50 border-border/50 text-muted-foreground hover:bg-card hover:border-border hover:scale-105"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-mono">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
