"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Conversation, Match, VENUE_VIBES, getIconComponent } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ChatListItemProps {
    conversation: Conversation;
    match: Match;
    index: number;
}

// Helper component to render dynamic icons
function DynamicIcon({ iconName, size, className }: { iconName: string; size: 'small' | 'medium' | 'large' | 'xl'; className?: string }) {
    const IconComponent = getIconComponent(iconName);
    return <IconComponent size={size} className={className} />;
}

export function ChatListItem({ conversation, match, index }: ChatListItemProps) {
    const venueInfo = VENUE_VIBES.find(v => v.value === match.profile.venue_vibe);
    const timeAgo = getTimeAgo(conversation.last_message_at || conversation.created_at);
    const hasUnread = conversation.unread_count > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
        >
            <Link
                href={`/chat/${match.id}`}
                className={cn(
                    "flex items-center gap-3 p-4 rounded-xl transition-colors",
                    hasUnread
                        ? "bg-primary/5 hover:bg-primary/10"
                        : "hover:bg-muted/50"
                )}
            >
                {/* Avatar */}
                <div className="relative">
                    <Avatar className="h-14 w-14 border-2 border-primary/20">
                        <AvatarFallback className="bg-primary/10 text-xl">
                            {venueInfo?.icon ? (
                                <DynamicIcon iconName={venueInfo.icon} size="medium" className="text-primary" />
                            ) : (
                                "💜"
                            )}
                        </AvatarFallback>
                    </Avatar>
                    {hasUnread && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                            {conversation.unread_count}
                        </span>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                        <h3 className={cn(
                            "font-semibold truncate",
                            hasUnread && "text-foreground"
                        )}>
                            {match.profile.name}
                        </h3>
                        <span className="text-xs text-muted-foreground shrink-0">
                            {timeAgo}
                        </span>
                    </div>
                    <p className={cn(
                        "text-sm truncate mt-0.5",
                        hasUnread
                            ? "text-foreground font-medium"
                            : "text-muted-foreground"
                    )}>
                        {conversation.last_message || "Start a conversation..."}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
}

function getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "Now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d`;
    return date.toLocaleDateString();
}
