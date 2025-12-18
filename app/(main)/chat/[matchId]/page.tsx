"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ChatMessage } from "@/components/chat/chat-message";
import { ChatInput } from "@/components/chat/chat-input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    getMatches,
    getOrCreateConversation,
    getMessages,
    sendMessage as sendMessageToDb,
    markConversationRead
} from "@/lib/mock-db";
import { useAuth } from "@/hooks/use-auth";
import { Message, Match, VENUE_VIBES, getIconComponent } from "@/lib/types";

// Helper component to render dynamic icons
function DynamicIcon({ iconName, size, className }: { iconName: string; size: 'small' | 'medium' | 'large' | 'xl'; className?: string }) {
    const IconComponent = getIconComponent(iconName);
    return <IconComponent size={size} className={className} />;
}

export default function ChatDetailPage() {
    const router = useRouter();
    const params = useParams();
    const matchId = params.matchId as string;
    const { isAuthenticated, hasCompletedOnboarding, isLoading } = useAuth();

    const [match, setMatch] = useState<Match | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [isLoadingData, setIsLoadingData] = useState(true);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom when messages change
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Redirect if not authenticated or onboarding incomplete
    useEffect(() => {
        if (!isLoading && (!isAuthenticated || !hasCompletedOnboarding)) {
            router.push(isAuthenticated ? "/onboarding" : "/");
        }
    }, [isLoading, isAuthenticated, hasCompletedOnboarding, router]);

    // Load match and conversation
    useEffect(() => {
        function loadData() {
            setIsLoadingData(true);

            const matches = getMatches();
            const foundMatch = matches.find(m => m.id === matchId);

            if (!foundMatch) {
                router.push("/chat");
                return;
            }

            setMatch(foundMatch);

            // Get or create conversation
            const conv = getOrCreateConversation(matchId, foundMatch.profile);
            setConversationId(conv.id);

            // Load messages
            const msgs = getMessages(conv.id);
            setMessages(msgs);

            // Mark as read
            markConversationRead(conv.id);

            setIsLoadingData(false);
        }

        if (isAuthenticated && hasCompletedOnboarding && matchId) {
            loadData();
        }
    }, [isAuthenticated, hasCompletedOnboarding, matchId, router]);

    const handleSendMessage = (content: string) => {
        if (!conversationId) return;

        const newMessage = sendMessageToDb(conversationId, content);
        setMessages(prev => [...prev, newMessage]);
    };

    const venueInfo = match ? VENUE_VIBES.find(v => v.value === match.profile.venue_vibe) : null;

    if (isLoading || isLoadingData) {
        return (
            <div className="flex min-h-screen flex-col bg-background">
                <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="mx-auto flex h-14 max-w-lg items-center gap-3 px-4">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-5 w-24" />
                        </div>
                    </div>
                </header>
                <main className="flex-1 p-4">
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
                                <Skeleton className="h-12 w-48 rounded-2xl" />
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        );
    }

    if (!match) {
        return null;
    }

    return (
        <div className="flex min-h-screen flex-col bg-background">
            {/* Header */}
            <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="mx-auto flex h-14 max-w-lg items-center gap-3 px-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push("/chat")}
                        className="shrink-0"
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
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        <span className="sr-only">Back</span>
                    </Button>

                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Avatar className="h-10 w-10 border-2 border-primary/20">
                            <AvatarFallback className="bg-primary/10">
                                {venueInfo?.icon ? (
                                    <DynamicIcon iconName={venueInfo.icon} size="small" className="text-primary" />
                                ) : (
                                    "💜"
                                )}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <h1 className="font-semibold truncate">{match.profile.name}</h1>
                            <p className="text-xs text-muted-foreground">
                                {Math.round(match.compatibility_score)}% match
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Messages */}
            <main className="flex-1 overflow-y-auto px-4 py-4">
                <div className="mx-auto max-w-lg space-y-3">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center gap-4 py-12 text-center">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-4xl"
                            >
                                👋
                            </motion.div>
                            <div className="space-y-1">
                                <p className="font-medium">Start the conversation!</p>
                                <p className="text-sm text-muted-foreground">
                                    Say hello to {match.profile.name}
                                </p>
                            </div>
                        </div>
                    ) : (
                        messages.map((message) => (
                            <ChatMessage
                                key={message.id}
                                message={message}
                                isOwn={message.sender_id === "current-user"}
                            />
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </main>

            {/* Input */}
            <ChatInput
                onSend={handleSendMessage}
                placeholder={`Message ${match.profile.name}...`}
            />
        </div>
    );
}
