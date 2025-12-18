"use client";

import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Candidate, VENUE_VIBES, BUDGET_TIERS, GUEST_COUNTS, getIconComponent } from "@/lib/types";
import { cn } from "@/lib/utils";

// Helper component to render dynamic icons
function DynamicIcon({ iconName, size, className }: { iconName: string; size: 'small' | 'medium' | 'large' | 'xl'; className?: string }) {
  const IconComponent = getIconComponent(iconName);
  return <IconComponent size={size} className={className} />;
}

interface SwipeCardProps {
  candidate: Candidate;
  onSwipe: (direction: "left" | "right") => void;
  isTop?: boolean;
}

export function SwipeCard({ candidate, onSwipe, isTop = false }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  // Like/Nope indicators
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const venueInfo = VENUE_VIBES.find(v => v.value === candidate.venue_vibe);
  const budgetInfo = BUDGET_TIERS.find(b => b.value === candidate.budget_tier);
  const guestInfo = GUEST_COUNTS.find(g => g.value === candidate.guest_count);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      onSwipe("right");
    } else if (info.offset.x < -100) {
      onSwipe("left");
    }
  };

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      className={cn(
        "absolute w-full touch-pan-y",
        isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
      )}
    >
      <Card className="mx-auto max-w-sm overflow-hidden shadow-xl">
        {/* Like/Nope indicators */}
        {isTop && (
          <>
            <motion.div
              style={{ opacity: likeOpacity }}
              className="absolute right-4 top-4 z-10 rotate-12 rounded-lg border-4 border-green-500 px-4 py-2"
            >
              <span className="text-2xl font-bold text-green-500">LIKE</span>
            </motion.div>
            <motion.div
              style={{ opacity: nopeOpacity }}
              className="absolute left-4 top-4 z-10 -rotate-12 rounded-lg border-4 border-red-500 px-4 py-2"
            >
              <span className="text-2xl font-bold text-red-500">NOPE</span>
            </motion.div>
          </>
        )}

        {/* Profile Image Placeholder */}
        <div className="relative h-72 bg-gradient-to-br from-primary/30 to-primary/10">
          <div className="absolute inset-0 flex items-center justify-center">
            {venueInfo?.icon ?
              <DynamicIcon iconName={venueInfo.icon} size="xl" className="text-primary" />
              : <span className="text-8xl">💜</span>
            }
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <h2 className="text-3xl font-bold text-white">
              {candidate.name}, {candidate.age}
            </h2>
            <p className="text-white/80">{candidate.location}</p>
          </div>
        </div>

        <CardContent className="space-y-4 p-5">
          {/* Compatibility Score */}
          <div className="flex items-center justify-between rounded-xl bg-primary/10 p-3">
            <span className="font-medium">Compatibility</span>
            <div className="flex items-center gap-2">
              <div className="h-2 w-20 rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${candidate.similarity * 100}%` }}
                />
              </div>
              <span className="font-bold text-primary">
                {Math.round(candidate.similarity * 100)}%
              </span>
            </div>
          </div>

          {/* Wedding Vision */}
          <div className="space-y-3">
            <h3 className="font-semibold text-muted-foreground">Wedding Vision</h3>
            <div className="flex flex-wrap gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="secondary" className="gap-1 px-3 py-1.5 text-sm cursor-help">
                    {venueInfo?.icon && <DynamicIcon iconName={venueInfo.icon} size="small" className="text-primary" />}
                    {venueInfo?.label}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{venueInfo?.personality}</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="secondary" className="gap-1 px-3 py-1.5 text-sm cursor-help">
                    {budgetInfo?.icon && <DynamicIcon iconName={budgetInfo.icon} size="small" className="text-primary" />}
                    {budgetInfo?.label}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{budgetInfo?.tagline}</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="secondary" className="gap-1 px-3 py-1.5 text-sm cursor-help">
                    {guestInfo?.icon && <DynamicIcon iconName={guestInfo.icon} size="small" className="text-primary" />}
                    {guestInfo?.range}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{guestInfo?.description}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Psychometric insight */}
          <p className="text-sm text-muted-foreground">
            {venueInfo?.personality && `Values ${venueInfo.personality.toLowerCase()}`}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

