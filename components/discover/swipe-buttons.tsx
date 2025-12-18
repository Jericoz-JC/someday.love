"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface SwipeButtonsProps {
  onPass: () => void;
  onLike: () => void;
  onUndo?: () => void;
  onSuperLike?: () => void;
  disabled?: boolean;
  canUndo?: boolean;
}

export function SwipeButtons({
  onPass,
  onLike,
  onUndo,
  onSuperLike,
  disabled,
  canUndo = false,
}: SwipeButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      {/* Undo button */}
      {onUndo && (
        <motion.div whileTap={{ scale: 0.9 }}>
          <Button
            onClick={onUndo}
            disabled={disabled || !canUndo}
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full border-2 border-yellow-400 text-yellow-500 shadow-md hover:bg-yellow-50 hover:border-yellow-500 disabled:opacity-40"
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
          </Button>
        </motion.div>
      )}

      {/* Pass button */}
      <motion.div whileTap={{ scale: 0.9 }}>
        <Button
          onClick={onPass}
          disabled={disabled}
          variant="outline"
          size="icon"
          className="h-14 w-14 rounded-full border-2 border-red-300 text-red-500 shadow-lg hover:bg-red-50 hover:border-red-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </Button>
      </motion.div>

      {/* Super Like button */}
      {onSuperLike && (
        <motion.div whileTap={{ scale: 0.9 }}>
          <Button
            onClick={onSuperLike}
            disabled={disabled}
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full border-2 border-blue-400 text-blue-500 shadow-md hover:bg-blue-50 hover:border-blue-500"
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
          </Button>
        </motion.div>
      )}

      {/* Like button */}
      <motion.div whileTap={{ scale: 0.9 }}>
        <Button
          onClick={onLike}
          disabled={disabled}
          size="icon"
          className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-500 to-primary text-white shadow-xl hover:from-pink-600 hover:to-primary/90"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 w-8"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </Button>
      </motion.div>
    </div>
  );
}

