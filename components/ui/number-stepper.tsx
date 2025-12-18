"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NumberStepperProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    className?: string;
}

function NumberStepper({
    value,
    onChange,
    min = 18,
    max = 100,
    step = 1,
    className,
}: NumberStepperProps) {
    const handleDecrement = () => {
        if (value > min) {
            onChange(Math.max(min, value - step));
        }
    };

    const handleIncrement = () => {
        if (value < max) {
            onChange(Math.min(max, value + step));
        }
    };

    return (
        <div
            data-slot="number-stepper"
            className={cn(
                "flex items-center justify-center gap-6",
                className
            )}
        >
            <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleDecrement}
                disabled={value <= min}
                className="h-14 w-14 rounded-2xl text-xl"
                aria-label="Decrease"
            >
                <Minus className="size-6" />
            </Button>
            <div className="flex flex-col items-center justify-center min-w-[4rem]">
                <span className="text-5xl font-bold tabular-nums">{value}</span>
                <span className="text-sm text-muted-foreground">years old</span>
            </div>
            <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleIncrement}
                disabled={value >= max}
                className="h-14 w-14 rounded-2xl text-xl"
                aria-label="Increase"
            >
                <Plus className="size-6" />
            </Button>
        </div>
    );
}

export { NumberStepper };
