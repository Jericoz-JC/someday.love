"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SwipeCard } from "@/components/discover/swipe-card";
import { SwipeButtons } from "@/components/discover/swipe-buttons";
import { FilterSheet } from "@/components/discover/filter-sheet";
import { MatchNotification } from "@/components/matches/match-notification";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Button } from "@/components/ui/button";
import { SwipeCardSkeleton } from "@/components/ui/skeleton-cards";
import { toast } from "@/components/ui/sonner";
import { getCandidates, recordSwipe, getLastSwipe, undoLastSwipe } from "@/lib/mock-db";
import { useAuth } from "@/hooks/use-auth";
import { Candidate, DiscoverFilters, DEFAULT_FILTERS } from "@/lib/types";
import { CelebrationIcon } from "@/components/ui/icons";

export default function DiscoverPage() {
  const router = useRouter();
  const { isAuthenticated, hasCompletedOnboarding, user, isLoading } = useAuth();

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoadingCandidates, setIsLoadingCandidates] = useState(true);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedName, setMatchedName] = useState("");
  const [canUndo, setCanUndo] = useState(false);
  const [filters, setFilters] = useState<DiscoverFilters>(DEFAULT_FILTERS);

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

  // Check if undo is available
  useEffect(() => {
    const lastSwipe = getLastSwipe();
    setCanUndo(!!lastSwipe);
  }, [currentIndex]);

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
      toast.success(`It's a match! 💜`, {
        description: `You and ${candidate.name} both liked each other!`,
      });
    } else if (liked) {
      toast("Liked!", { icon: "❤️", duration: 1500 });
    }

    setCurrentIndex((prev) => prev + 1);
  }, [candidates, currentIndex, user?.id]);

  const handlePass = () => handleSwipe("left");
  const handleLike = () => handleSwipe("right");

  const handleUndo = useCallback(() => {
    const undoneCandidate = undoLastSwipe();
    if (undoneCandidate && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      toast("Undo", { icon: "↩️", description: "Previous swipe undone", duration: 1500 });
      setCanUndo(false);
    }
  }, [currentIndex]);

  const handleSuperLike = useCallback(async () => {
    const candidate = candidates[currentIndex];
    if (!candidate || !user?.id) return;

    // Super like is like a regular like but with extra notification
    const result = await recordSwipe(
      user.id,
      candidate.id,
      true,
      candidate.similarity * 100
    );

    toast.success("Super Liked!", {
      icon: "⭐",
      description: `${candidate.name} will be notified!`,
      duration: 2000
    });

    if (result.isMatch) {
      setMatchedName(candidate.name);
      setShowMatch(true);
    }

    setCurrentIndex((prev) => prev + 1);
  }, [candidates, currentIndex, user?.id]);

  const handleFiltersChange = (newFilters: DiscoverFilters) => {
    setFilters(newFilters);
    // In production, would refetch candidates with filters
    toast("Filters applied", { icon: "✓", duration: 1500 });
  };

  const currentCandidate = candidates[currentIndex];
  const nextCandidate = candidates[currentIndex + 1];
  const hasMoreCandidates = currentIndex < candidates.length;

  if (isLoading || isLoadingCandidates) {
    return <SwipeCardSkeleton />;
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
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {candidates.length - currentIndex} left
            </span>
            <FilterSheet filters={filters} onFiltersChange={handleFiltersChange}>
              <Button variant="ghost" size="icon" className="h-9 w-9">
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
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
              </Button>
            </FilterSheet>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-6">
        {hasMoreCandidates ? (
          <>
            {/* Card stack */}
            <div className="relative h-[480px] w-full max-w-sm z-10">
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
                      onSwipe={() => { }}
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
            <div className="mt-6 relative z-0">
              <SwipeButtons
                onPass={handlePass}
                onLike={handleLike}
                onUndo={handleUndo}
                onSuperLike={handleSuperLike}
                disabled={!currentCandidate}
                canUndo={canUndo}
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
            <CelebrationIcon size="large" className="text-rose-gold" />
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

