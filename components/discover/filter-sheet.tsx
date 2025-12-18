"use client";

import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
    BUDGET_TIERS,
    VENUE_VIBES,
    GUEST_COUNTS,
    DiscoverFilters,
    DEFAULT_FILTERS,
    BudgetTier,
    VenueVibe,
    GuestCount,
} from "@/lib/types";
import { cn } from "@/lib/utils";

interface FilterSheetProps {
    filters: DiscoverFilters;
    onFiltersChange: (filters: DiscoverFilters) => void;
    children: React.ReactNode;
}

export function FilterSheet({ filters, onFiltersChange, children }: FilterSheetProps) {
    const [localFilters, setLocalFilters] = useState<DiscoverFilters>(filters);

    const handleApply = () => {
        onFiltersChange(localFilters);
    };

    const handleReset = () => {
        setLocalFilters(DEFAULT_FILTERS);
    };

    const toggleBudget = (tier: BudgetTier) => {
        setLocalFilters(prev => ({
            ...prev,
            budgetTiers: prev.budgetTiers.includes(tier)
                ? prev.budgetTiers.filter(t => t !== tier)
                : [...prev.budgetTiers, tier],
        }));
    };

    const toggleVenue = (vibe: VenueVibe) => {
        setLocalFilters(prev => ({
            ...prev,
            venueVibes: prev.venueVibes.includes(vibe)
                ? prev.venueVibes.filter(v => v !== vibe)
                : [...prev.venueVibes, vibe],
        }));
    };

    const toggleGuest = (count: GuestCount) => {
        setLocalFilters(prev => ({
            ...prev,
            guestCounts: prev.guestCounts.includes(count)
                ? prev.guestCounts.filter(c => c !== count)
                : [...prev.guestCounts, count],
        }));
    };

    const hasFiltersApplied =
        localFilters.budgetTiers.length > 0 ||
        localFilters.venueVibes.length > 0 ||
        localFilters.guestCounts.length > 0 ||
        localFilters.recentlyActive ||
        localFilters.ageRange[0] !== DEFAULT_FILTERS.ageRange[0] ||
        localFilters.ageRange[1] !== DEFAULT_FILTERS.ageRange[1] ||
        localFilters.distance !== DEFAULT_FILTERS.distance;

    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
                <SheetHeader className="text-left pb-4">
                    <SheetTitle className="flex items-center justify-between">
                        <span>Filters</span>
                        {hasFiltersApplied && (
                            <Button variant="ghost" size="sm" onClick={handleReset}>
                                Reset
                            </Button>
                        )}
                    </SheetTitle>
                </SheetHeader>

                <div className="space-y-6 overflow-y-auto max-h-[calc(85vh-140px)] pb-4 hide-scrollbar">
                    {/* Age Range */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label className="text-base font-medium">Age Range</Label>
                            <span className="text-sm text-muted-foreground">
                                {localFilters.ageRange[0]} - {localFilters.ageRange[1]}
                            </span>
                        </div>
                        <Slider
                            value={localFilters.ageRange}
                            onValueChange={(value) => setLocalFilters(prev => ({ ...prev, ageRange: value as [number, number] }))}
                            min={18}
                            max={65}
                            step={1}
                        />
                    </div>

                    {/* Distance */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label className="text-base font-medium">Max Distance</Label>
                            <span className="text-sm text-muted-foreground">
                                {localFilters.distance} miles
                            </span>
                        </div>
                        <Slider
                            value={[localFilters.distance]}
                            onValueChange={(value) => setLocalFilters(prev => ({ ...prev, distance: value[0] }))}
                            min={5}
                            max={100}
                            step={5}
                        />
                    </div>

                    {/* Budget Tier */}
                    <div className="space-y-3">
                        <Label className="text-base font-medium">Budget Preference</Label>
                        <div className="flex flex-wrap gap-2">
                            {BUDGET_TIERS.map((tier) => (
                                <Badge
                                    key={tier.value}
                                    variant={localFilters.budgetTiers.includes(tier.value) ? "default" : "outline"}
                                    className={cn(
                                        "cursor-pointer transition-all",
                                        localFilters.budgetTiers.includes(tier.value) && "bg-primary"
                                    )}
                                    onClick={() => toggleBudget(tier.value)}
                                >
                                    {tier.label}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Venue Vibe */}
                    <div className="space-y-3">
                        <Label className="text-base font-medium">Venue Style</Label>
                        <div className="flex flex-wrap gap-2">
                            {VENUE_VIBES.map((vibe) => (
                                <Badge
                                    key={vibe.value}
                                    variant={localFilters.venueVibes.includes(vibe.value) ? "default" : "outline"}
                                    className={cn(
                                        "cursor-pointer transition-all",
                                        localFilters.venueVibes.includes(vibe.value) && "bg-primary"
                                    )}
                                    onClick={() => toggleVenue(vibe.value)}
                                >
                                    {vibe.label}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Guest Count */}
                    <div className="space-y-3">
                        <Label className="text-base font-medium">Guest Count</Label>
                        <div className="flex flex-wrap gap-2">
                            {GUEST_COUNTS.map((count) => (
                                <Badge
                                    key={count.value}
                                    variant={localFilters.guestCounts.includes(count.value) ? "default" : "outline"}
                                    className={cn(
                                        "cursor-pointer transition-all",
                                        localFilters.guestCounts.includes(count.value) && "bg-primary"
                                    )}
                                    onClick={() => toggleGuest(count.value)}
                                >
                                    {count.label}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Recently Active */}
                    <div className="flex items-center justify-between py-2">
                        <div className="space-y-0.5">
                            <Label className="text-base font-medium">Recently Active</Label>
                            <p className="text-sm text-muted-foreground">
                                Show users active in the last 24 hours
                            </p>
                        </div>
                        <Switch
                            checked={localFilters.recentlyActive}
                            onCheckedChange={(checked) => setLocalFilters(prev => ({ ...prev, recentlyActive: checked }))}
                        />
                    </div>
                </div>

                <SheetFooter className="pt-4 border-t">
                    <SheetClose asChild>
                        <Button className="w-full" size="lg" onClick={handleApply}>
                            Apply Filters
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
