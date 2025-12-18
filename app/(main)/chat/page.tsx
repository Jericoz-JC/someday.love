"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChatListItem } from "@/components/chat/chat-list-item";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getConversations, getMatches } from "@/lib/mock-db";
import { useAuth } from "@/hooks/use-auth";
import { Conversation, Match } from "@/lib/types";

export default function ChatPage() {
    const router = useRouter();
    const { isAuthenticated, hasCompletedOnboarding, isLoading } = useAuth();

    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [matches, setMatches] = useState<Match[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    // Redirect if not authenticated or onboarding incomplete
    useEffect(() => {
        if (!isLoading && (!isAuthenticated || !hasCompletedOnboarding)) {
            router.push(isAuthenticated ? "/onboarding" : "/");
        }
    }, [isLoading, isAuthenticated, hasCompletedOnboarding, router]);

    // Load conversations and matches
    useEffect(() => {
        function loadData() {
            setIsLoadingData(true);
            const convs = getConversations();
            const matchList = getMatches();
            setConversations(convs);
            setMatches(matchList);
            setIsLoadingData(false);
        }

        if (isAuthenticated && hasCompletedOnboarding) {
            loadData();
        }
    }, [isAuthenticated, hasCompletedOnboarding]);

    // Get match for each conversation
    const getMatchForConversation = (conv: Conversation): Match | undefined => {
        return matches.find(m => m.id === conv.match_id);
    };

    if (isLoading || isLoadingData) {
        return (
            <div className="flex min-h-screen flex-col bg-background pb-20">
                <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
                        <h1 className="text-xl font-bold">Messages</h1>
                    </div>
                </header>
                <main className="flex-1 px-4 py-4">
                    <div className="mx-auto max-w-lg space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3 p-4">
                                <Skeleton className="h-14 w-14 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-3 w-48" />
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
                <BottomNav />
            </div>
        );
    }

    const totalUnread = conversations.reduce((sum, c) => sum + c.unread_count, 0);

    return (
        <div className="flex min-h-screen flex-col bg-background pb-20">
            {/* Header */}
            <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
                    <h1 className="text-xl font-bold">Messages</h1>
                    {totalUnread > 0 && (
                        <span className="text-sm text-muted-foreground">
                            {totalUnread} unread
                        </span>
                    )}
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1 px-4 py-2">
                <div className="mx-auto max-w-lg">
                    {conversations.length > 0 ? (
                        <div className="space-y-1">
                            {conversations.map((conv, index) => {
                                const match = getMatchForConversation(conv);
                                if (!match) return null;
                                return (
                                    <ChatListItem
                                        key={conv.id}
                                        conversation={conv}
                                        match={match}
                                        index={index}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-6 py-20 text-center">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-6xl"
                            >
                                💬
                            </motion.div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold">No messages yet</h2>
                                <p className="text-muted-foreground">
                                    Match with someone to start chatting
                                </p>
                            </div>
                            <Button
                                size="lg"
                                onClick={() => router.push("/discover")}
                            >
                                Find Matches
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
