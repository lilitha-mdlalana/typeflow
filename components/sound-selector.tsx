"use client";

import { Volume2 } from "lucide-react";
import { useState } from "react";

export const SOUND_OPTIONS = [
  {
    id: "typewriter",
    name: "Classic Typewriter",
    file: "/sounds/keypress.mp3",
  },
  { id: "none", name: "Silent", file: "" },
];

interface SoundSelectorProps {
  show: boolean;
  selectedSound: string;
  onSoundChange: (soundId: string) => void;
}

export function SoundSelector({
  show,
  selectedSound,
  onSoundChange,
}: SoundSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`fixed top-8 left-8 transition-all duration-500 ease-out ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-full bg-secondary/50 backdrop-blur-sm hover:bg-secondary transition-colors flex items-center gap-2"
          aria-label="Select typing sound"
        >
          <Volume2 className="w-4 h-4 text-foreground" />
        </button>

        {isOpen && (
          <div className="absolute top-14 left-0 bg-background/95 backdrop-blur-md rounded-lg border border-border shadow-lg min-w-[180px] overflow-hidden">
            {SOUND_OPTIONS.map((sound) => (
              <button
                key={sound.id}
                onClick={() => {
                  onSoundChange(sound.id);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                  selectedSound === sound.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground hover:bg-secondary/50"
                }`}
              >
                {sound.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
