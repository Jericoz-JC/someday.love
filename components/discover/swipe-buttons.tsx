"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface SwipeButtonsProps {
  onPass: () => void;
  onLike: () => void;
  disabled?: boolean;
}

export function SwipeButtons({ onPass, onLike, disabled }: SwipeButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-6">
      {/* Pass button */}
      <motion.div whileTap={{ scale: 0.9 }}>
        <Button
          onClick={onPass}
          disabled={disabled}
          variant="outline"
          size="icon"
          className="h-16 w-16 rounded-full border-2 border-red-300 text-red-500 shadow-lg hover:bg-red-50 hover:border-red-400 active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </Button>
      </motion.div>

      {/* Like button */}
      <motion.div whileTap={{ scale: 0.9 }}>
        <Button
          onClick={onLike}
          disabled={disabled}
          size="icon"
          className="h-20 w-20 rounded-full bg-gradient-to-r from-pink-500 to-primary text-white shadow-xl hover:from-pink-600 hover:to-primary/90 active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-10 w-10"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </Button>
      </motion.div>
    </div>
  );
}
