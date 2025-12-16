"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MatchCard } from "@/components/matches/match-card";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Button } from "@/components/ui/button";
import { getMatches } from "@/lib/mock-db";
import { useAuth } from "@/hooks/use-auth";
import { Match } from "@/lib/types";
import { FavoriteIcon } from "@/components/ui/icons";

export default function MatchesPage() {
  const router = useRouter();
  const { isAuthenticated, hasCompletedOnboarding, isLoading } = useAuth();
  
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoadingMatches, setIsLoadingMatches] = useState(true);

  // Redirect if not authenticated or onboarding incomplete
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !hasCompletedOnboarding)) {
      router.push(isAuthenticated ? "/onboarding" : "/");
    }
  }, [isLoading, isAuthenticated, hasCompletedOnboarding, router]);

  // Load matches
  useEffect(() => {
    function loadMatches() {
      setIsLoadingMatches(true);
      const data = getMatches();
      setMatches(data);
      setIsLoadingMatches(false);
    }

    if (isAuthenticated && hasCompletedOnboarding) {
      loadMatches();
    }
  }, [isAuthenticated, hasCompletedOnboarding]);

  if (isLoading || isLoadingMatches) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <FavoriteIcon size="large" className="text-rose-gold" />
          </motion.div>
          <p className="text-muted-foreground">Loading your matches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
          <h1 className="text-xl font-bold">Matches</h1>
          <span className="text-sm text-muted-foreground">
            {matches.length} {matches.length === 1 ? "match" : "matches"}
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 py-4">
        <div className="mx-auto max-w-lg space-y-4">
          {matches.length > 0 ? (
            matches.map((match, index) => (
              <MatchCard key={match.id} match={match} index={index} />
            ))
          ) : (
            <div className="flex flex-col items-center gap-6 py-20 text-center">
              <span className="text-6xl">💜</span>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">No matches yet</h2>
                <p className="text-muted-foreground">
                  Keep swiping to find your perfect match
                </p>
              </div>
              <Button
                size="lg"
                onClick={() => router.push("/discover")}
              >
                Start Discovering
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
}
