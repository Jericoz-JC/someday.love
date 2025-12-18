"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UndoButtonProps {
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}

export function UndoButton({ onClick, disabled, className }: UndoButtonProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Button
                variant="outline"
                size="icon"
                onClick={onClick}
                disabled={disabled}
                className={cn(
                    "h-12 w-12 rounded-full border-2 transition-all",
                    disabled
                        ? "opacity-50"
                        : "border-yellow-500 text-yellow-500 hover:bg-yellow-500/10",
                    className
                )}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                >
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                </svg>
                <span className="sr-only">Undo last swipe</span>
            </Button>
        </motion.div>
    );
}
