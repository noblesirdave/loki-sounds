import { useState, useRef, useCallback } from "react";
import { Play, Square, Trash2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { InstrumentConfig } from "@/lib/instruments";

interface Note {
  frequency: number;
  note: string;
  time: number;
}

interface SequencerProps {
  instrument: InstrumentConfig;
}

export const Sequencer = ({ instrument }: SequencerProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(120);
  const [notes, setNotes] = useState<Note[]>([]);
  const startTimeRef = useRef<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  const startRecording = () => {
    setNotes([]);
    startTimeRef.current = Date.now();
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const recordNote = useCallback((frequency: number, note: string) => {
    if (!isRecording) return;
    const time = Date.now() - startTimeRef.current;
    setNotes(prev => [...prev, { frequency, note, time }]);
  }, [isRecording]);

  const playNote = (frequency: number) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    oscillator.type = instrument.waveform;
    oscillator.frequency.setValueAtTime(frequency, now);

    if (instrument.filterFreq) {
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(instrument.filterFreq, now);
      filter.Q.setValueAtTime(instrument.filterQ || 1, now);
      oscillator.connect(filter);
      filter.connect(gainNode);
    } else {
      oscillator.connect(gainNode);
    }
    gainNode.connect(ctx.destination);

    const { attack, decay, sustain, release } = instrument;
    const sustainLevel = sustain * 0.3;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + attack);
    gainNode.gain.linearRampToValueAtTime(sustainLevel, now + attack + decay);
    gainNode.gain.linearRampToValueAtTime(0, now + attack + decay + release);

    oscillator.start(now);
    oscillator.stop(now + attack + decay + release + 0.1);
  };

  const playSequence = async () => {
    if (notes.length === 0 || isPlaying) return;
    setIsPlaying(true);

    const tempoMultiplier = 120 / tempo;
    
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      const nextNote = notes[i + 1];
      
      playNote(note.frequency);
      
      if (nextNote) {
        const delay = (nextNote.time - note.time) * tempoMultiplier;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    setIsPlaying(false);
  };

  const clearSequence = () => {
    setNotes([]);
  };

  // Expose recordNote globally for MusicKey to use
  if (typeof window !== 'undefined') {
    (window as any).__sequencerRecordNote = isRecording ? recordNote : null;
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-card/50 rounded-xl border border-border/50 backdrop-blur-sm">
      <div className="flex items-center gap-4 flex-wrap justify-center">
        <div className="flex items-center gap-2">
          <Button
            variant={isRecording ? "destructive" : "outline"}
            size="sm"
            onClick={isRecording ? stopRecording : startRecording}
            className="gap-2"
          >
            {isRecording ? (
              <>
                <Square className="w-3 h-3" /> Stop
              </>
            ) : (
              <>
                <Circle className="w-3 h-3 fill-current" /> Record
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={playSequence}
            disabled={notes.length === 0 || isPlaying}
            className="gap-2"
          >
            <Play className="w-3 h-3" /> Play
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSequence}
            disabled={notes.length === 0}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground font-mono">Tempo</span>
          <Slider
            value={[tempo]}
            onValueChange={([val]) => setTempo(val)}
            min={40}
            max={200}
            step={5}
            className="w-24"
          />
          <span className="text-xs font-mono w-12">{tempo} BPM</span>
        </div>
      </div>

      <div className="flex items-center gap-1 min-h-8 flex-wrap justify-center max-w-md">
        {notes.length === 0 ? (
          <span className="text-xs text-muted-foreground/60 font-mono">
            {isRecording ? "Play keys to record..." : "Press Record & play keys"}
          </span>
        ) : (
          notes.map((n, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-primary/20 text-primary text-xs font-mono rounded"
            >
              {n.note}
            </span>
          ))
        )}
      </div>
    </div>
  );
};
