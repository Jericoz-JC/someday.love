"use client";

import { Match, VENUE_VIBES, BUDGET_TIERS, GUEST_COUNTS, getIconComponent } from "@/lib/types";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FamilyIcon } from "@/components/ui/icons";

// Helper component to render dynamic icons
function DynamicIcon({ iconName, size, className }: { iconName: string; size: 'small' | 'medium' | 'large' | 'xl'; className?: string }) {
    const IconComponent = getIconComponent(iconName);
    return <IconComponent size={size} className={className} />;
}

interface MatchDetailSheetProps {
    match: Match;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function MatchDetailSheet({ match, open, onOpenChange }: MatchDetailSheetProps) {
    const venueInfo = VENUE_VIBES.find(v => v.value === match.profile.venue_vibe);
    const budgetInfo = BUDGET_TIERS.find(b => b.value === match.profile.budget_tier);
    const guestInfo = GUEST_COUNTS.find(g => g.value === match.profile.guest_count);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="bottom" className="h-[85vh]">
                <ScrollArea className="h-full pb-6">
                    <SheetHeader className="pb-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20 border-4 border-primary/20">
                                <AvatarFallback className="bg-primary/10 text-3xl">
                                    {venueInfo?.icon ?
                                        <DynamicIcon iconName={venueInfo.icon} size="large" className="text-primary" />
                                        : "💜"
                                    }
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-left">
                                <SheetTitle className="text-2xl">
                                    {match.profile.name}, {match.profile.age}
                                </SheetTitle>
                                <SheetDescription className="text-base">
                                    {match.profile.location}
                                </SheetDescription>
                            </div>
                        </div>
                    </SheetHeader>

                    <div className="space-y-6 px-6">
                        {/* Compatibility Score */}
                        <div className="flex items-center justify-between rounded-2xl bg-primary/10 p-4">
                            <span className="font-medium">Compatibility Score</span>
                            <div className="flex items-center gap-3">
                                <div className="h-3 w-24 rounded-full bg-muted">
                                    <div
                                        className="h-full rounded-full bg-primary transition-all"
                                        style={{ width: `${match.compatibility_score}%` }}
                                    />
                                </div>
                                <span className="text-xl font-bold text-primary">
                                    {Math.round(match.compatibility_score)}%
                                </span>
                            </div>
                        </div>

                        {/* Match Explanation */}
                        {match.match_explanation && (
                            <div className="rounded-2xl bg-muted/50 p-4">
                                <p className="text-sm text-muted-foreground">
                                    💡 {match.match_explanation}
                                </p>
                            </div>
                        )}

                        {/* Wedding Vision */}
                        <div className="space-y-4">
                            <h3 className="font-semibold">Wedding Vision</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-xl bg-muted/50 p-4 text-center">
                                    {venueInfo?.icon && <DynamicIcon iconName={venueInfo.icon} size="large" className="text-rose-gold mx-auto" />}
                                    <p className="mt-2 font-medium text-sm">{venueInfo?.label}</p>
                                    <p className="text-xs text-muted-foreground">Venue Style</p>
                                </div>
                                <div className="rounded-xl bg-muted/50 p-4 text-center">
                                    {budgetInfo?.icon && <DynamicIcon iconName={budgetInfo.icon} size="large" className="text-rose-gold mx-auto" />}
                                    <p className="mt-2 font-medium text-sm">{budgetInfo?.label}</p>
                                    <p className="text-xs text-muted-foreground">Budget</p>
                                </div>
                                <div className="rounded-xl bg-muted/50 p-4 text-center">
                                    {guestInfo?.icon && <DynamicIcon iconName={guestInfo.icon} size="large" className="text-rose-gold mx-auto" />}
                                    <p className="mt-2 font-medium text-sm">{guestInfo?.label}</p>
                                    <p className="text-xs text-muted-foreground">Guest Count</p>
                                </div>
                                <div className="rounded-xl bg-muted/50 p-4 text-center">
                                    <FamilyIcon size="large" className="text-rose-gold mx-auto" />
                                    <p className="mt-2 font-medium text-sm">{match.profile.family_involvement}/5</p>
                                    <p className="text-xs text-muted-foreground">Family Input</p>
                                </div>
                            </div>
                        </div>

                        {/* Personality Traits */}
                        {venueInfo && (
                            <div className="space-y-3">
                                <h3 className="font-semibold">Personality</h3>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="text-sm py-1.5 px-3">
                                        {venueInfo.personality}
                                    </Badge>
                                </div>
                            </div>
                        )}

                        {/* Narrative */}
                        {match.profile.narrative && (
                            <div className="space-y-3">
                                <h3 className="font-semibold">Their Story</h3>
                                <p className="text-sm leading-relaxed text-muted-foreground italic rounded-xl bg-muted/30 p-4">
                                    &ldquo;{match.profile.narrative}&rdquo;
                                </p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3 pt-4 pb-safe">
                            <Button
                                variant="outline"
                                size="xl"
                                className="flex-1"
                                onClick={() => onOpenChange(false)}
                            >
                                Close
                            </Button>
                            <Button size="xl" className="flex-1">
                                Say Hello 👋
                            </Button>
                        </div>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
