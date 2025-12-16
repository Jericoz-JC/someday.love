"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { getIconComponent } from "@/lib/types";

interface VenueCardProps {
  icon: string;
  label: string;
  examples: string;
  personality: string;
  selected: boolean;
  onSelect: () => void;
}

export function VenueCard({
  icon,
  label,
  examples,
  personality,
  selected,
  onSelect,
}: VenueCardProps) {
  const IconComponent = getIconComponent(icon);

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-2xl border-2 p-5 text-center transition-all",
        "min-h-[160px] gap-2",
        selected
          ? "border-primary bg-primary/10 shadow-lg"
          : "border-border bg-card hover:border-primary/50 hover:bg-accent/50"
      )}
    >
      <div
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-full",
          selected ? "bg-primary/20" : "bg-muted"
        )}
      >
        <IconComponent 
          size="medium" 
          className={cn(
            selected ? "text-primary" : "text-muted-foreground"
          )} 
        />
      </div>
      <span className="text-lg font-semibold">{label}</span>
      <span className="text-sm text-muted-foreground">{examples}</span>
      <span className="text-xs font-medium text-primary">{personality}</span>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow-md"
        >
          ✓
        </motion.div>
      )}
    </motion.button>
  );
}

export function VenueGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {children}
    </div>
  );
}
