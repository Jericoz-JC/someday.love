"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getUnreadNotificationCount } from "@/lib/mock-db";

interface NotificationBellProps {
    onClick?: () => void;
}

export function NotificationBell({ onClick }: NotificationBellProps) {
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        // Load unread count
        const count = getUnreadNotificationCount();
        setUnreadCount(count);
    }, []);

    return (
        <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9"
            onClick={onClick}
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
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {unreadCount > 9 ? "9+" : unreadCount}
                </span>
            )}
        </Button>
    );
}
