"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { getIconComponent } from "@/lib/types";

interface OptionCardProps {
  icon: string;
  label: string;
  sublabel?: string;
  description?: string;
  selected: boolean;
  onSelect: () => void;
  size?: "default" | "large";
}

export function OptionCard({
  icon,
  label,
  sublabel,
  description,
  selected,
  onSelect,
  size = "default",
}: OptionCardProps) {
  const IconComponent = getIconComponent(icon);

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-2xl border-2 p-4 text-center transition-all active:scale-[0.98]",
        size === "large" ? "min-h-[140px] gap-2" : "min-h-[100px] gap-1",
        selected
          ? "border-primary bg-primary/10 shadow-md"
          : "border-border bg-card hover:border-primary/50 hover:bg-accent/50"
      )}
    >
      <IconComponent 
        size={size === "large" ? "large" : "medium"} 
        className={cn(
          selected ? "text-primary" : "text-muted-foreground"
        )} 
      />
      <span className={cn("font-semibold", size === "large" ? "text-lg" : "text-base")}>
        {label}
      </span>
      {sublabel && (
        <span className="text-sm text-muted-foreground">{sublabel}</span>
      )}
      {description && (
        <span className="text-xs text-muted-foreground">{description}</span>
      )}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white"
        >
          ✓
        </motion.div>
      )}
    </motion.button>
  );
}

interface OptionGridProps {
  children: React.ReactNode;
  columns?: 2 | 4;
}

export function OptionGrid({ children, columns = 2 }: OptionGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        columns === 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4"
      )}
    >
      {children}
    </div>
  );
}

