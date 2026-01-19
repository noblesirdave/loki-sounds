import { instruments, instrumentCategories } from "@/lib/instruments";
import { Music } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InstrumentSelectorProps {
  selected: string;
  onSelect: (instrument: string) => void;
}

export const InstrumentSelector = ({ selected, onSelect }: InstrumentSelectorProps) => {
  return (
    <div className="flex items-center gap-3">
      <Music className="w-4 h-4 text-primary" />
      <Select value={selected} onValueChange={onSelect}>
        <SelectTrigger className="w-48 bg-card border-border">
          <SelectValue placeholder="Select instrument" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          {instrumentCategories.map((category) => (
            <SelectGroup key={category.name}>
              <SelectLabel className="text-xs uppercase tracking-widest text-muted-foreground/60 font-mono">
                {category.name}
              </SelectLabel>
              {category.instruments.map((instKey) => {
                const inst = instruments[instKey];
                return (
                  <SelectItem key={instKey} value={instKey} className="font-mono">
                    {inst.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
