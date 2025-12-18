"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ProfileSkeleton } from "@/components/ui/skeleton-cards";
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
  const clerk = useClerk();
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

  const handleSignOut = async () => {
    // Sign out from both Clerk and mock auth
    try {
      if (clerk.user) {
        await clerk.signOut();
      }
    } catch (error) {
      console.error("Error signing out from Clerk:", error);
    }

    signOut();

    // Use hard navigation to ensure complete sign out
    window.location.href = "/";
  };

  const handleResetData = () => {
    if (confirm("This will reset all your data. Are you sure?")) {
      resetAllData();
      router.push("/");
    }
  };

  if (isLoading || !profile) {
    return <ProfileSkeleton />;
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
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/settings")}
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
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 py-6">
        <div className="mx-auto max-w-lg space-y-6">
          {/* Profile header */}
          <div className="flex flex-col items-center gap-4 text-center">
            <Avatar className="h-24 w-24 border-4 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-4xl">
                {venueInfo?.icon ? (
                  <DynamicIcon iconName={venueInfo.icon} size="xl" className="text-primary" />
                ) : (
                  "💜"
                )}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-muted-foreground">
                {profile.age} • {profile.location}
              </p>
            </div>
          </div>

          {/* Tabs for organized content */}
          <Tabs defaultValue="vision" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="vision">Vision</TabsTrigger>
              <TabsTrigger value="personality">Personality</TabsTrigger>
              <TabsTrigger value="story">Story</TabsTrigger>
            </TabsList>

            {/* Wedding Vision Tab */}
            <TabsContent value="vision">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="rounded-xl bg-muted/50 p-4 text-center cursor-help transition-colors hover:bg-muted/70">
                          {venueInfo?.icon && <DynamicIcon iconName={venueInfo.icon} size="large" className="text-rose-gold mx-auto" />}
                          <p className="mt-2 font-medium">{venueInfo?.label}</p>
                          <p className="text-xs text-muted-foreground">Venue Style</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{venueInfo?.personality}</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="rounded-xl bg-muted/50 p-4 text-center cursor-help transition-colors hover:bg-muted/70">
                          {budgetInfo?.icon && <DynamicIcon iconName={budgetInfo.icon} size="large" className="text-rose-gold mx-auto" />}
                          <p className="mt-2 font-medium">{budgetInfo?.label}</p>
                          <p className="text-xs text-muted-foreground">Budget</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{budgetInfo?.tagline}</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="rounded-xl bg-muted/50 p-4 text-center cursor-help transition-colors hover:bg-muted/70">
                          {guestInfo?.icon && <DynamicIcon iconName={guestInfo.icon} size="large" className="text-rose-gold mx-auto" />}
                          <p className="mt-2 font-medium">{guestInfo?.label}</p>
                          <p className="text-xs text-muted-foreground">Guest Count</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{guestInfo?.description}</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="rounded-xl bg-muted/50 p-4 text-center cursor-help transition-colors hover:bg-muted/70">
                          <FamilyIcon size="large" className="text-rose-gold mx-auto" />
                          <p className="mt-2 font-medium">{profile.family_involvement}/5</p>
                          <p className="text-xs text-muted-foreground">Family Input</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>How involved family should be in decisions</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Personality Signals Tab */}
            <TabsContent value="personality">
              <Card>
                <CardContent className="space-y-4 pt-6">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-help">
                        <span className="text-sm text-muted-foreground">Financial Worldview</span>
                        <Badge variant="secondary">{signals.financialWorldview}</Badge>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Based on your {budgetInfo?.label} budget preference</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-help">
                        <span className="text-sm text-muted-foreground">Social Style</span>
                        <Badge variant="secondary">{signals.socialStyle}</Badge>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Based on your {guestInfo?.label} guest count preference</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-help">
                        <span className="text-sm text-muted-foreground">Aesthetic Type</span>
                        <Badge variant="secondary">{signals.aestheticPersonality}</Badge>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Based on your {venueInfo?.label} venue vibe preference</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-help">
                        <span className="text-sm text-muted-foreground">Boundary Style</span>
                        <Badge variant="secondary">{signals.boundaryStyle}</Badge>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Based on your family involvement level ({profile.family_involvement}/5)</p>
                    </TooltipContent>
                  </Tooltip>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Story Tab */}
            <TabsContent value="story">
              <Card>
                <CardContent className="pt-6">
                  {profile.narrative ? (
                    <p className="text-sm leading-relaxed text-muted-foreground italic">
                      &ldquo;{profile.narrative}&rdquo;
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Complete your profile to see your story
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

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
