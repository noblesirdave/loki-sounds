export interface InstrumentConfig {
  name: string;
  category: string;
  waveform: OscillatorType;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  filterFreq?: number;
  filterQ?: number;
  harmonics?: number[];
}

export const instruments: Record<string, InstrumentConfig> = {
  // Brass
  trumpet: {
    name: "Trumpet",
    category: "Brass",
    waveform: "sawtooth",
    attack: 0.05,
    decay: 0.1,
    sustain: 0.7,
    release: 0.2,
    filterFreq: 2000,
    filterQ: 5,
  },
  trombone: {
    name: "Trombone",
    category: "Brass",
    waveform: "sawtooth",
    attack: 0.08,
    decay: 0.15,
    sustain: 0.6,
    release: 0.3,
    filterFreq: 1200,
    filterQ: 3,
  },
  frenchHorn: {
    name: "French Horn",
    category: "Brass",
    waveform: "sawtooth",
    attack: 0.1,
    decay: 0.2,
    sustain: 0.65,
    release: 0.25,
    filterFreq: 1500,
    filterQ: 4,
  },

  // Woodwinds
  saxophone: {
    name: "Saxophone",
    category: "Woodwinds",
    waveform: "sawtooth",
    attack: 0.03,
    decay: 0.1,
    sustain: 0.8,
    release: 0.15,
    filterFreq: 1800,
    filterQ: 6,
  },
  clarinet: {
    name: "Clarinet",
    category: "Woodwinds",
    waveform: "square",
    attack: 0.04,
    decay: 0.08,
    sustain: 0.75,
    release: 0.12,
    filterFreq: 2500,
    filterQ: 4,
  },
  flute: {
    name: "Flute",
    category: "Woodwinds",
    waveform: "sine",
    attack: 0.02,
    decay: 0.05,
    sustain: 0.9,
    release: 0.1,
    filterFreq: 3500,
    filterQ: 2,
  },
  oboe: {
    name: "Oboe",
    category: "Woodwinds",
    waveform: "square",
    attack: 0.06,
    decay: 0.12,
    sustain: 0.7,
    release: 0.18,
    filterFreq: 2200,
    filterQ: 5,
  },

  // Strings
  violin: {
    name: "Violin",
    category: "Strings",
    waveform: "sawtooth",
    attack: 0.08,
    decay: 0.15,
    sustain: 0.85,
    release: 0.2,
    filterFreq: 2800,
    filterQ: 3,
  },
  cello: {
    name: "Cello",
    category: "Strings",
    waveform: "sawtooth",
    attack: 0.12,
    decay: 0.2,
    sustain: 0.8,
    release: 0.3,
    filterFreq: 1500,
    filterQ: 3,
  },
  viola: {
    name: "Viola",
    category: "Strings",
    waveform: "sawtooth",
    attack: 0.1,
    decay: 0.18,
    sustain: 0.82,
    release: 0.25,
    filterFreq: 2000,
    filterQ: 3,
  },
  doubleBass: {
    name: "Double Bass",
    category: "Strings",
    waveform: "sawtooth",
    attack: 0.15,
    decay: 0.25,
    sustain: 0.75,
    release: 0.4,
    filterFreq: 800,
    filterQ: 2,
  },

  // Keyboard
  piano: {
    name: "Piano",
    category: "Keyboard",
    waveform: "triangle",
    attack: 0.01,
    decay: 0.3,
    sustain: 0.4,
    release: 0.5,
    filterFreq: 3000,
    filterQ: 1,
  },
  organ: {
    name: "Organ",
    category: "Keyboard",
    waveform: "sine",
    attack: 0.02,
    decay: 0.05,
    sustain: 0.95,
    release: 0.1,
    filterFreq: 4000,
    filterQ: 1,
  },
  harpsichord: {
    name: "Harpsichord",
    category: "Keyboard",
    waveform: "sawtooth",
    attack: 0.005,
    decay: 0.2,
    sustain: 0.3,
    release: 0.3,
    filterFreq: 3500,
    filterQ: 2,
  },

  // Plucked Strings
  guitar: {
    name: "Guitar",
    category: "Plucked",
    waveform: "triangle",
    attack: 0.01,
    decay: 0.2,
    sustain: 0.5,
    release: 0.4,
    filterFreq: 2500,
    filterQ: 2,
  },
  harp: {
    name: "Harp",
    category: "Plucked",
    waveform: "sine",
    attack: 0.005,
    decay: 0.25,
    sustain: 0.4,
    release: 0.6,
    filterFreq: 3000,
    filterQ: 1,
  },
  banjo: {
    name: "Banjo",
    category: "Plucked",
    waveform: "triangle",
    attack: 0.005,
    decay: 0.15,
    sustain: 0.3,
    release: 0.25,
    filterFreq: 3500,
    filterQ: 3,
  },
};

export const instrumentCategories = [
  { name: "Brass", instruments: ["trumpet", "trombone", "frenchHorn"] },
  { name: "Woodwinds", instruments: ["saxophone", "clarinet", "flute", "oboe"] },
  { name: "Strings", instruments: ["violin", "cello", "viola", "doubleBass"] },
  { name: "Keyboard", instruments: ["piano", "organ", "harpsichord"] },
  { name: "Plucked", instruments: ["guitar", "harp", "banjo"] },
];
