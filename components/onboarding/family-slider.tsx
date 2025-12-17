"use client";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface FamilySliderProps {
  value: number;
  onChange: (value: number) => void;
}

const FAMILY_LEVELS = [
  { value: 1, label: "Just Us", description: "We make all decisions together, independently" },
  { value: 2, label: "Minimal", description: "We value family opinions but keep boundaries" },
  { value: 3, label: "Balanced", description: "Family has input on major decisions" },
  { value: 4, label: "Involved", description: "Family is an important part of planning" },
  { value: 5, label: "Central", description: "Family tradition guides our choices" },
];

export function FamilySlider({ value, onChange }: FamilySliderProps) {
  const currentLevel = FAMILY_LEVELS.find(l => l.value === value) || FAMILY_LEVELS[2];

  return (
    <div className="space-y-8">
      {/* Current selection display */}
      <div className="flex flex-col items-center gap-2 rounded-2xl bg-primary/10 p-6 text-center">
        <span className="text-5xl">👨‍👩‍👧‍👦</span>
        <h3 className="text-2xl font-bold text-primary">{currentLevel.label}</h3>
        <p className="text-muted-foreground">{currentLevel.description}</p>
      </div>

      {/* Slider */}
      <div className="px-2">
        <Slider
          value={[value]}
          onValueChange={([newValue]) => onChange(newValue)}
          min={1}
          max={5}
          step={1}
          className="touch-none"
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between px-1 text-sm">
        <span className="text-muted-foreground">Independent</span>
        <span className="text-muted-foreground">Family-Centered</span>
      </div>

      {/* Level indicators */}
      <div className="grid grid-cols-5 gap-2">
        {FAMILY_LEVELS.map((level) => (
          <button
            key={level.value}
            onClick={() => onChange(level.value)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-xl p-3 transition-all",
              value === level.value
                ? "bg-primary/20 text-primary"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            )}
          >
            <span className="text-lg font-bold">{level.value}</span>
            <span className="text-[10px] leading-tight">{level.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

