"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { useAuth } from "@/hooks/use-auth";
import { getPsychometricSignals } from "@/lib/tbnlg";
import {
  VENUE_VIBES,
  BUDGET_TIERS,
  GUEST_COUNTS,
  BudgetTier,
  GuestCount,
  VenueVibe,
  getIconComponent,
} from "@/lib/types";
import { FamilyIcon } from "@/components/ui/icons";

// Helper component to render dynamic icons
function DynamicIcon({ iconName, size, className }: { iconName: string; size: 'small' | 'medium' | 'large' | 'xl'; className?: string }) {
  const IconComponent = getIconComponent(iconName);
  return <IconComponent size={size} className={className} />;
}

export default function ProfilePage() {
  const router = useRouter();
  const {
    isAuthenticated,
    hasCompletedOnboarding,
    isLoading,
    user,
    getUserProfile,
    signOut,
    resetAllData,
  } = useAuth();

  const profile = getUserProfile();

  // Redirect if not authenticated or onboarding incomplete
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !hasCompletedOnboarding)) {
      router.push(isAuthenticated ? "/onboarding" : "/");
    }
  }, [isLoading, isAuthenticated, hasCompletedOnboarding, router]);

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  const handleResetData = () => {
    if (confirm("This will reset all your data. Are you sure?")) {
      resetAllData();
      router.push("/");
    }
  };

  if (isLoading || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-5xl"
        >
          💜
        </motion.div>
      </div>
    );
  }

  const venueInfo = VENUE_VIBES.find((v) => v.value === profile.venue_vibe);
  const budgetInfo = BUDGET_TIERS.find((b) => b.value === profile.budget_tier);
  const guestInfo = GUEST_COUNTS.find((g) => g.value === profile.guest_count);

  const signals = getPsychometricSignals({
    budget_tier: profile.budget_tier as BudgetTier,
    guest_count: profile.guest_count as GuestCount,
    venue_vibe: profile.venue_vibe as VenueVibe,
    family_involvement: profile.family_involvement || 3,
  });

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
          <h1 className="text-xl font-bold">Profile</h1>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 py-6">
        <div className="mx-auto max-w-lg space-y-6">
          {/* Profile header */}
          <div className="flex flex-col items-center gap-4 text-center">
            <Avatar className="h-24 w-24 border-4 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-4xl">
                {venueInfo?.icon || "💜"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-muted-foreground">
                {profile.age} • {profile.location}
              </p>
            </div>
          </div>

          {/* Wedding Vision */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Wedding Vision</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-muted/50 p-4 text-center">
                  {venueInfo?.icon && <DynamicIcon iconName={venueInfo.icon} size="large" className="text-rose-gold mx-auto" />}
                  <p className="mt-2 font-medium">{venueInfo?.label}</p>
                  <p className="text-xs text-muted-foreground">Venue Style</p>
                </div>
                <div className="rounded-xl bg-muted/50 p-4 text-center">
                  {budgetInfo?.icon && <DynamicIcon iconName={budgetInfo.icon} size="large" className="text-rose-gold mx-auto" />}
                  <p className="mt-2 font-medium">{budgetInfo?.label}</p>
                  <p className="text-xs text-muted-foreground">Budget</p>
                </div>
                <div className="rounded-xl bg-muted/50 p-4 text-center">
                  {guestInfo?.icon && <DynamicIcon iconName={guestInfo.icon} size="large" className="text-rose-gold mx-auto" />}
                  <p className="mt-2 font-medium">{guestInfo?.label}</p>
                  <p className="text-xs text-muted-foreground">Guest Count</p>
                </div>
                <div className="rounded-xl bg-muted/50 p-4 text-center">
                  <FamilyIcon size="large" className="text-rose-gold mx-auto" />
                  <p className="mt-2 font-medium">{profile.family_involvement}/5</p>
                  <p className="text-xs text-muted-foreground">Family Input</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Psychometric insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Personality Signals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Financial Worldview</span>
                <Badge variant="secondary">{signals.financialWorldview}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Social Style</span>
                <Badge variant="secondary">{signals.socialStyle}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Aesthetic Type</span>
                <Badge variant="secondary">{signals.aestheticPersonality}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Boundary Style</span>
                <Badge variant="secondary">{signals.boundaryStyle}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Narrative */}
          {profile.narrative && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Story</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground italic">
                  &ldquo;{profile.narrative}&rdquo;
                </p>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="space-y-3 pt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/onboarding")}
            >
              Edit Preferences
            </Button>
            <Button
              variant="ghost"
              className="w-full text-destructive hover:text-destructive"
              onClick={handleResetData}
            >
              Reset All Data
            </Button>
          </div>
        </div>
      </main>

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
}
