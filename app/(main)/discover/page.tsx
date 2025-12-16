"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SwipeCard } from "@/components/discover/swipe-card";
import { SwipeButtons } from "@/components/discover/swipe-buttons";
import { MatchNotification } from "@/components/matches/match-notification";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Button } from "@/components/ui/button";
import { getCandidates, recordSwipe } from "@/lib/mock-db";
import { useAuth } from "@/hooks/use-auth";
import { Candidate } from "@/lib/types";

export default function DiscoverPage() {
  const router = useRouter();
  const { isAuthenticated, hasCompletedOnboarding, user, isLoading } = useAuth();
  
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoadingCandidates, setIsLoadingCandidates] = useState(true);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedName, setMatchedName] = useState("");

  // Redirect if not authenticated or onboarding incomplete
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !hasCompletedOnboarding)) {
      router.push(isAuthenticated ? "/onboarding" : "/");
    }
  }, [isLoading, isAuthenticated, hasCompletedOnboarding, router]);

  // Load candidates
  useEffect(() => {
    async function loadCandidates() {
      if (!user?.id) return;
      
      setIsLoadingCandidates(true);
      const data = await getCandidates(user.id);
      setCandidates(data);
      setIsLoadingCandidates(false);
    }

    if (isAuthenticated && hasCompletedOnboarding) {
      loadCandidates();
    }
  }, [isAuthenticated, hasCompletedOnboarding, user?.id]);

  const handleSwipe = useCallback(async (direction: "left" | "right") => {
    const candidate = candidates[currentIndex];
    if (!candidate || !user?.id) return;

    const liked = direction === "right";
    const result = await recordSwipe(
      user.id,
      candidate.id,
      liked,
      candidate.similarity * 100
    );

    if (result.isMatch) {
      setMatchedName(candidate.name);
      setShowMatch(true);
    }

    setCurrentIndex((prev) => prev + 1);
  }, [candidates, currentIndex, user?.id]);

  const handlePass = () => handleSwipe("left");
  const handleLike = () => handleSwipe("right");

  const currentCandidate = candidates[currentIndex];
  const nextCandidate = candidates[currentIndex + 1];
  const hasMoreCandidates = currentIndex < candidates.length;

  if (isLoading || isLoadingCandidates) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="text-5xl"
          >
            💜
          </motion.div>
          <p className="text-muted-foreground">Finding your matches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
          <h1 className="text-xl font-bold">
            <span className="bg-gradient-to-r from-pink-500 to-primary bg-clip-text text-transparent">
              SomeDay
            </span>
          </h1>
          <span className="text-sm text-muted-foreground">
            {candidates.length - currentIndex} profiles left
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-6">
        {hasMoreCandidates ? (
          <>
            {/* Card stack */}
            <div className="relative h-[480px] w-full max-w-sm">
              <AnimatePresence>
                {/* Next card (background) */}
                {nextCandidate && (
                  <motion.div
                    key={nextCandidate.id}
                    initial={{ scale: 0.95, opacity: 0.5 }}
                    animate={{ scale: 0.95, opacity: 0.5 }}
                    className="absolute inset-0"
                  >
                    <SwipeCard
                      candidate={nextCandidate}
                      onSwipe={() => {}}
                      isTop={false}
                    />
                  </motion.div>
                )}

                {/* Current card (top) */}
                {currentCandidate && (
                  <SwipeCard
                    key={currentCandidate.id}
                    candidate={currentCandidate}
                    onSwipe={handleSwipe}
                    isTop={true}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Swipe buttons */}
            <div className="mt-6">
              <SwipeButtons
                onPass={handlePass}
                onLike={handleLike}
                disabled={!currentCandidate}
              />
            </div>

            {/* Instructions */}
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Swipe right to like, left to pass
            </p>
          </>
        ) : (
          /* No more candidates */
          <div className="flex flex-col items-center gap-6 text-center">
            <span className="text-6xl">🎉</span>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">You&apos;ve seen everyone!</h2>
              <p className="text-muted-foreground">
                Check back later for new matches in your area
              </p>
            </div>
            <Button
              size="lg"
              onClick={() => router.push("/matches")}
            >
              View Your Matches
            </Button>
          </div>
        )}
      </main>

      {/* Match notification */}
      <MatchNotification
        matchName={matchedName}
        isVisible={showMatch}
        onClose={() => setShowMatch(false)}
        onViewMatches={() => {
          setShowMatch(false);
          router.push("/matches");
        }}
      />

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
}
