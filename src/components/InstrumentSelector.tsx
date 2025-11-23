import { instruments, instrumentCategories } from "@/lib/instruments";
import { Music } from "lucide-react";

interface InstrumentSelectorProps {
  selected: string;
  onSelect: (instrument: string) => void;
}

export const InstrumentSelector = ({ selected, onSelect }: InstrumentSelectorProps) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2 justify-center">
        <Music className="w-5 h-5 text-primary" />
        <span className="text-sm text-muted-foreground font-mono">Instrument</span>
      </div>
      
      <div className="space-y-6">
        {instrumentCategories.map((category) => (
          <div key={category.name} className="space-y-2">
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground/60 font-mono text-center">
              {category.name}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {category.instruments.map((instKey) => {
                const inst = instruments[instKey];
                return (
                  <button
                    key={instKey}
                    onClick={() => onSelect(instKey)}
                    className={`px-3 py-2 rounded-lg border transition-all duration-200 text-sm font-mono ${
                      selected === instKey
                        ? "bg-primary/20 border-primary text-primary scale-105 shadow-lg"
                        : "bg-card/50 border-border/50 text-muted-foreground hover:bg-card hover:border-border hover:scale-102"
                    }`}
                  >
                    {inst.name}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
