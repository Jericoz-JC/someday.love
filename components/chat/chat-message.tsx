"use client";

import { cn } from "@/lib/utils";
import { Message } from "@/lib/types";

interface ChatMessageProps {
    message: Message;
    isOwn: boolean;
}

export function ChatMessage({ message, isOwn }: ChatMessageProps) {
    const formattedTime = formatMessageTime(message.created_at);

    return (
        <div
            className={cn(
                "flex w-full",
                isOwn ? "justify-end" : "justify-start"
            )}
        >
            <div
                className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm",
                    isOwn
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                )}
            >
                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {message.content}
                </p>
                <p
                    className={cn(
                        "mt-1 text-[10px] leading-none",
                        isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}
                >
                    {formattedTime}
                </p>
            </div>
        </div>
    );
}

function formatMessageTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, "0");

    return `${displayHours}:${displayMinutes} ${ampm}`;
}
