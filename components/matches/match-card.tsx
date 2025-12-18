"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Match, VENUE_VIBES, getIconComponent } from "@/lib/types";
import { MatchDetailSheet } from "@/components/matches/match-detail-sheet";
import { motion } from "framer-motion";

// Helper component to render dynamic icons
function DynamicIcon({ iconName, size, className }: { iconName: string; size: 'small' | 'medium' | 'large' | 'xl'; className?: string }) {
  const IconComponent = getIconComponent(iconName);
  return <IconComponent size={size} className={className} />;
}

interface MatchCardProps {
  match: Match;
  index: number;
}

export function MatchCard({ match, index }: MatchCardProps) {
  const router = useRouter();
  const [sheetOpen, setSheetOpen] = useState(false);
  const venueInfo = VENUE_VIBES.find(v => v.value === match.profile.venue_vibe);
  const timeAgo = getTimeAgo(match.matched_at);

  const handleSayHello = () => {
    router.push(`/chat/${match.id}`);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-start gap-4 p-4">
              {/* Avatar */}
              <Avatar className="h-16 w-16 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-2xl">
                  {venueInfo?.icon ?
                    <DynamicIcon iconName={venueInfo.icon} size="medium" className="text-primary" />
                    : "💜"
                  }
                </AvatarFallback>
              </Avatar>

              {/* Info */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    {match.profile.name}, {match.profile.age}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {Math.round(match.compatibility_score)}% match
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{match.profile.location}</p>
                <div className="flex items-center gap-2 pt-1">
                  <Badge variant="outline" className="gap-1 text-xs">
                    {venueInfo?.icon && <DynamicIcon iconName={venueInfo.icon} size="small" className="text-primary" />}
                    {venueInfo?.label}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{timeAgo}</span>
                </div>
              </div>
            </div>

            {/* Match explanation */}
            {match.match_explanation && (
              <div className="border-t bg-muted/30 px-4 py-3">
                <p className="text-sm text-muted-foreground">
                  💡 {match.match_explanation}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 border-t p-3">
              <Button
                variant="outline"
                className="flex-1"
                size="lg"
                onClick={() => setSheetOpen(true)}
              >
                View Profile
              </Button>
              <Button className="flex-1" size="lg" onClick={handleSayHello}>
                Say Hello 👋
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <MatchDetailSheet
        match={match}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </>
  );
}

function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
}


