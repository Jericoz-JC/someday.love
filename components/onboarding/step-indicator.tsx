"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="font-medium text-primary">
          {Math.round(progress)}% complete
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}

interface StepDotsProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

export function StepDots({ currentStep, totalSteps, onStepClick }: StepDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <button
          key={step}
          onClick={() => onStepClick?.(step)}
          disabled={step > currentStep}
          className={cn(
            "h-2 rounded-full transition-all",
            step === currentStep
              ? "w-8 bg-primary"
              : step < currentStep
              ? "w-2 bg-primary/50 hover:bg-primary/70"
              : "w-2 bg-muted"
          )}
        />
      ))}
    </div>
  );
}
