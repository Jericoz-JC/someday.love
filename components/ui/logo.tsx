"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "icon" | "full";
  animated?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { icon: 32, text: "text-lg" },
  md: { icon: 48, text: "text-xl" },
  lg: { icon: 64, text: "text-2xl" },
  xl: { icon: 96, text: "text-4xl" },
};

export function Logo({
  size = "md",
  variant = "icon",
  animated = false,
  className,
}: LogoProps) {
  const { icon: iconSize, text: textSize } = sizeMap[size];

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        variant === "full" && "flex-col",
        className
      )}
    >
      <LogoIcon size={iconSize} animated={animated} />
      {variant === "full" && (
        <div className="flex flex-col items-center">
          <span
            className={cn(
              "font-semibold tracking-[0.2em] text-foreground",
              textSize
            )}
          >
            SOMEDAY
          </span>
          <span className="text-xs tracking-wider text-muted-foreground">
            someday.love
          </span>
        </div>
      )}
    </div>
  );
}

interface LogoIconProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

export function LogoIcon({ size = 48, animated = false, className }: LogoIconProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        animated && "animate-logo-mark",
        className
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src="/assets/logo.svg"
        alt="Someday Logo"
        width={size}
        height={size}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  );
}

// Loading component using the animated logo
export function LogoLoader({ 
  size = "lg", 
  text,
  className 
}: { 
  size?: "sm" | "md" | "lg" | "xl"; 
  text?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <Logo size={size} animated />
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
      )}
    </div>
  );
}
