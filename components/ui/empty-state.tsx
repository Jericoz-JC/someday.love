"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
    icon?: React.ReactNode;
    emoji?: string;
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}

export function EmptyState({
    icon,
    emoji,
    title,
    description,
    action,
    className,
}: EmptyStateProps) {
    return (
        <div className={cn("flex flex-col items-center gap-6 py-16 text-center", className)}>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
            >
                {icon ? (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                        {icon}
                    </div>
                ) : emoji ? (
                    <span className="text-6xl">{emoji}</span>
                ) : null}
            </motion.div>

            <div className="space-y-2 max-w-[280px]">
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-muted-foreground">{description}</p>
            </div>

            {action && (
                <Button size="lg" onClick={action.onClick}>
                    {action.label}
                </Button>
            )}
        </div>
    );
}
