"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    getNotifications,
    markNotificationRead,
    markAllNotificationsRead
} from "@/lib/mock-db";
import { Notification } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NotificationDropdownProps {
    isOpen: boolean;
    onClose: () => void;
}

export function NotificationDropdown({ isOpen, onClose }: NotificationDropdownProps) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        if (isOpen) {
            const notifs = getNotifications();
            setNotifications(notifs);
        }
    }, [isOpen]);

    const handleMarkRead = (id: string) => {
        markNotificationRead(id);
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    const handleMarkAllRead = () => {
        markAllNotificationsRead();
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const getIcon = (type: Notification["type"]) => {
        switch (type) {
            case "match": return "💜";
            case "message": return "💬";
            case "like": return "❤️";
            default: return "📢";
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40"
                        onClick={onClose}
                    />

                    {/* Dropdown */}
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute right-4 top-16 z-50 w-80 max-h-96 overflow-hidden rounded-xl border bg-card shadow-lg"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b px-4 py-3">
                            <h3 className="font-semibold">Notifications</h3>
                            {notifications.some(n => !n.read) && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs h-auto py-1"
                                    onClick={handleMarkAllRead}
                                >
                                    Mark all read
                                </Button>
                            )}
                        </div>

                        {/* Notifications list */}
                        <div className="max-h-72 overflow-y-auto">
                            {notifications.length > 0 ? (
                                notifications.map((notif) => (
                                    <div
                                        key={notif.id}
                                        className={cn(
                                            "flex gap-3 px-4 py-3 border-b last:border-0 cursor-pointer transition-colors",
                                            !notif.read
                                                ? "bg-primary/5 hover:bg-primary/10"
                                                : "hover:bg-muted/50"
                                        )}
                                        onClick={() => handleMarkRead(notif.id)}
                                    >
                                        <span className="text-xl shrink-0">{getIcon(notif.type)}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className={cn(
                                                "text-sm truncate",
                                                !notif.read && "font-medium"
                                            )}>
                                                {notif.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground truncate">
                                                {notif.body}
                                            </p>
                                            <p className="text-[10px] text-muted-foreground mt-1">
                                                {getTimeAgo(notif.created_at)}
                                            </p>
                                        </div>
                                        {!notif.read && (
                                            <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-8 text-center text-muted-foreground">
                                    <p>No notifications yet</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
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
