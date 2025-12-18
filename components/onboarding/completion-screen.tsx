"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

interface CompletionScreenProps {
    userName: string;
    onContinue: () => void;
}

export function CompletionScreen({ userName, onContinue }: CompletionScreenProps) {
    const hasConfettiFired = useRef(false);

    useEffect(() => {
        if (!hasConfettiFired.current) {
            hasConfettiFired.current = true;

            // Fire confetti from both sides
            const duration = 3000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0, y: 0.7 },
                    colors: ["#E8B4A0", "#D4A574", "#8B3A4C", "#FFB6C1"],
                });
                confetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1, y: 0.7 },
                    colors: ["#E8B4A0", "#D4A574", "#8B3A4C", "#FFB6C1"],
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };
            frame();

            // Big burst in the middle
            setTimeout(() => {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { x: 0.5, y: 0.5 },
                    colors: ["#E8B4A0", "#D4A574", "#8B3A4C", "#FFB6C1"],
                });
            }, 500);
        }
    }, []);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="flex flex-col items-center gap-8 text-center max-w-sm"
            >
                {/* Logo */}
                <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Logo size="xl" animated />
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-2"
                >
                    <h1 className="text-3xl font-bold">
                        Welcome, {userName}! 🎉
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Your profile is ready. Time to find your perfect match!
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex gap-8 py-6"
                >
                    <div className="text-center">
                        <p className="text-3xl font-bold text-primary">8</p>
                        <p className="text-sm text-muted-foreground">Matches waiting</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold text-primary">92%</p>
                        <p className="text-sm text-muted-foreground">Profile complete</p>
                    </div>
                </motion.div>

                {/* What's next */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="w-full space-y-3 text-left"
                >
                    <p className="text-sm font-medium text-muted-foreground">What's next:</p>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                            <span className="text-xl">💜</span>
                            <span className="text-sm">Browse matches in your area</span>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                            <span className="text-xl">📸</span>
                            <span className="text-sm">Add a photo to get 3x more matches</span>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                            <span className="text-xl">✨</span>
                            <span className="text-sm">Swipe right on someone you like!</span>
                        </div>
                    </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="w-full pt-4"
                >
                    <Button
                        size="lg"
                        className="w-full h-14 text-lg"
                        onClick={onContinue}
                    >
                        Start Discovering 💜
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
}
