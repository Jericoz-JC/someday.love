"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SuperLikeButtonProps {
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}

export function SuperLikeButton({ onClick, disabled, className }: SuperLikeButtonProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
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
                        : "border-blue-500 text-blue-500 hover:bg-blue-500/10",
                    className
                )}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                >
                    <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                    />
                </svg>
                <span className="sr-only">Super like</span>
            </Button>
        </motion.div>
    );
}
