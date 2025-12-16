"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface MatchNotificationProps {
  matchName: string;
  isVisible: boolean;
  onClose: () => void;
  onViewMatches: () => void;
}

export function MatchNotification({
  matchName,
  isVisible,
  onClose,
  onViewMatches,
}: MatchNotificationProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-3xl bg-gradient-to-br from-pink-500 via-primary to-purple-600 p-1"
          >
            <div className="flex flex-col items-center gap-6 rounded-[22px] bg-background p-8 text-center">
              {/* Hearts animation */}
              <div className="relative">
                <motion.span
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                  className="text-7xl"
                >
                  💕
                </motion.span>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-primary bg-clip-text text-transparent">
                  It&apos;s a Match!
                </h2>
                <p className="text-lg text-muted-foreground">
                  You and <span className="font-semibold text-foreground">{matchName}</span> liked each other
                </p>
              </div>

              {/* Subtext */}
              <p className="text-sm text-muted-foreground">
                Your wedding visions align ✨
              </p>

              {/* Actions */}
              <div className="flex w-full flex-col gap-3">
                <Button
                  onClick={onViewMatches}
                  size="xl"
                  className="w-full bg-gradient-to-r from-pink-500 to-primary"
                >
                  View Matches
                </Button>
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="lg"
                  className="w-full"
                >
                  Keep Swiping
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
