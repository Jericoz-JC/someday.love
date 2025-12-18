"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { BottomNav } from "@/components/layout/bottom-nav";

export function SwipeCardSkeleton() {
    return (
        <div className="flex min-h-screen flex-col bg-background pb-20">
            {/* Header Skeleton */}
            <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
                <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-4 w-20" />
                </div>
            </header>

            {/* Main content */}
            <main className="flex flex-1 flex-col items-center justify-center px-4 py-6">
                {/* Card skeleton */}
                <div className="relative h-[480px] w-full max-w-sm">
                    <Card className="mx-auto max-w-sm overflow-hidden shadow-xl">
                        {/* Image skeleton */}
                        <Skeleton className="h-72 w-full rounded-none" />

                        <CardContent className="space-y-4 p-5">
                            {/* Compatibility skeleton */}
                            <div className="flex items-center justify-between rounded-xl bg-muted/30 p-3">
                                <Skeleton className="h-4 w-24" />
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-2 w-20 rounded-full" />
                                    <Skeleton className="h-5 w-10" />
                                </div>
                            </div>

                            {/* Vision skeleton */}
                            <div className="space-y-3">
                                <Skeleton className="h-4 w-28" />
                                <div className="flex flex-wrap gap-2">
                                    <Skeleton className="h-8 w-24 rounded-full" />
                                    <Skeleton className="h-8 w-20 rounded-full" />
                                    <Skeleton className="h-8 w-16 rounded-full" />
                                </div>
                            </div>

                            {/* Text skeleton */}
                            <Skeleton className="h-4 w-3/4" />
                        </CardContent>
                    </Card>
                </div>

                {/* Buttons skeleton */}
                <div className="mt-6 flex gap-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <Skeleton className="h-16 w-16 rounded-full" />
                </div>

                {/* Instructions skeleton */}
                <Skeleton className="mt-4 h-4 w-48" />
            </main>

            <BottomNav />
        </div>
    );
}

export function MatchListSkeleton({ count = 3 }: { count?: number }) {
    return (
        <div className="flex min-h-screen flex-col bg-background pb-20">
            {/* Header Skeleton */}
            <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
                <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-4 w-16" />
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1 px-4 py-4">
                <div className="mx-auto max-w-lg space-y-4">
                    {Array.from({ length: count }).map((_, i) => (
                        <Card key={i} className="overflow-hidden">
                            <CardContent className="p-0">
                                <div className="flex items-start gap-4 p-4">
                                    {/* Avatar */}
                                    <Skeleton className="h-16 w-16 rounded-full" />

                                    {/* Info */}
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Skeleton className="h-5 w-32" />
                                            <Skeleton className="h-5 w-16 rounded-full" />
                                        </div>
                                        <Skeleton className="h-4 w-24" />
                                        <div className="flex items-center gap-2 pt-1">
                                            <Skeleton className="h-6 w-20 rounded-full" />
                                            <Skeleton className="h-3 w-12" />
                                        </div>
                                    </div>
                                </div>

                                {/* Match explanation */}
                                <div className="border-t bg-muted/30 px-4 py-3">
                                    <Skeleton className="h-4 w-full" />
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 border-t p-3">
                                    <Skeleton className="h-12 flex-1 rounded-xl" />
                                    <Skeleton className="h-12 flex-1 rounded-xl" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>

            <BottomNav />
        </div>
    );
}

export function ProfileSkeleton() {
    return (
        <div className="flex min-h-screen flex-col bg-background pb-20">
            {/* Header Skeleton */}
            <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
                <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-9 w-20 rounded-xl" />
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1 px-4 py-6">
                <div className="mx-auto max-w-lg space-y-6">
                    {/* Profile header */}
                    <div className="flex flex-col items-center gap-4 text-center">
                        <Skeleton className="h-24 w-24 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-7 w-32 mx-auto" />
                            <Skeleton className="h-4 w-40 mx-auto" />
                        </div>
                    </div>

                    {/* Wedding Vision Card */}
                    <Card>
                        <div className="p-6 pb-0">
                            <Skeleton className="h-5 w-40" />
                        </div>
                        <CardContent className="space-y-4 pt-4">
                            <div className="grid grid-cols-2 gap-4">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="rounded-xl bg-muted/50 p-4 text-center">
                                        <Skeleton className="h-10 w-10 mx-auto rounded-lg" />
                                        <Skeleton className="h-4 w-16 mx-auto mt-2" />
                                        <Skeleton className="h-3 w-12 mx-auto mt-1" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Personality Card */}
                    <Card>
                        <div className="p-6 pb-0">
                            <Skeleton className="h-5 w-48" />
                        </div>
                        <CardContent className="space-y-3 pt-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-6 w-24 rounded-full" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="space-y-3 pt-4">
                        <Skeleton className="h-12 w-full rounded-xl" />
                        <Skeleton className="h-12 w-full rounded-xl" />
                    </div>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
