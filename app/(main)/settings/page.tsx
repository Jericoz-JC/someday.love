"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BottomNav } from "@/components/layout/bottom-nav";
import { useAuth } from "@/hooks/use-auth";

export default function SettingsPage() {
    const router = useRouter();
    const clerk = useClerk();
    const { isAuthenticated, hasCompletedOnboarding, isLoading, signOut, resetAllData } = useAuth();

    // Settings state (mock - would be stored in profile/preferences)
    const [settings, setSettings] = useState({
        // Discovery
        ageMin: 21,
        ageMax: 45,
        distance: 50,

        // Notifications
        matchNotifications: true,
        messageNotifications: true,
        dailyPicks: true,
        marketingEmails: false,

        // Privacy
        showOnlineStatus: true,
        showLastActive: true,

        // App
        darkMode: false,
        hapticFeedback: true,
    });

    // Redirect if not authenticated
    useEffect(() => {
        if (!isLoading && (!isAuthenticated || !hasCompletedOnboarding)) {
            router.push(isAuthenticated ? "/onboarding" : "/");
        }
    }, [isLoading, isAuthenticated, hasCompletedOnboarding, router]);

    const handleSignOut = async () => {
        try {
            if (clerk.user) {
                await clerk.signOut();
            }
        } catch (error) {
            console.error("Error signing out from Clerk:", error);
        }
        signOut();
        window.location.href = "/";
    };

    const handleDeleteAccount = () => {
        if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            resetAllData();
            router.push("/");
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen flex-col bg-background pb-20">
                <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
                    <div className="mx-auto flex h-14 max-w-lg items-center px-4">
                        <Skeleton className="h-6 w-20" />
                    </div>
                </header>
                <main className="flex-1 px-4 py-4">
                    <div className="mx-auto max-w-lg space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="h-16 w-full" />
                        ))}
                    </div>
                </main>
                <BottomNav />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-background pb-20">
            {/* Header */}
            <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="mx-auto flex h-14 max-w-lg items-center gap-3 px-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push("/profile")}
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
                    </Button>
                    <h1 className="text-xl font-bold">Settings</h1>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1 px-4 py-4">
                <div className="mx-auto max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <Accordion type="single" collapsible className="w-full">
                            {/* Discovery Preferences */}
                            <AccordionItem value="discovery">
                                <AccordionTrigger className="text-base">
                                    🔍 Discovery Preferences
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4 pt-2">
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <Label>Age Range</Label>
                                            <span className="text-sm text-muted-foreground">
                                                {settings.ageMin} - {settings.ageMax}
                                            </span>
                                        </div>
                                        <Slider
                                            value={[settings.ageMin, settings.ageMax]}
                                            onValueChange={([min, max]) =>
                                                setSettings(s => ({ ...s, ageMin: min, ageMax: max }))
                                            }
                                            min={18}
                                            max={65}
                                            step={1}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <Label>Max Distance</Label>
                                            <span className="text-sm text-muted-foreground">
                                                {settings.distance} miles
                                            </span>
                                        </div>
                                        <Slider
                                            value={[settings.distance]}
                                            onValueChange={([val]) =>
                                                setSettings(s => ({ ...s, distance: val }))
                                            }
                                            min={5}
                                            max={100}
                                            step={5}
                                        />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Notifications */}
                            <AccordionItem value="notifications">
                                <AccordionTrigger className="text-base">
                                    🔔 Notifications
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4 pt-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label>New Matches</Label>
                                            <p className="text-xs text-muted-foreground">Get notified for new matches</p>
                                        </div>
                                        <Switch
                                            checked={settings.matchNotifications}
                                            onCheckedChange={(checked) =>
                                                setSettings(s => ({ ...s, matchNotifications: checked }))
                                            }
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label>Messages</Label>
                                            <p className="text-xs text-muted-foreground">Get notified for new messages</p>
                                        </div>
                                        <Switch
                                            checked={settings.messageNotifications}
                                            onCheckedChange={(checked) =>
                                                setSettings(s => ({ ...s, messageNotifications: checked }))
                                            }
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label>Daily Picks</Label>
                                            <p className="text-xs text-muted-foreground">Daily match recommendations</p>
                                        </div>
                                        <Switch
                                            checked={settings.dailyPicks}
                                            onCheckedChange={(checked) =>
                                                setSettings(s => ({ ...s, dailyPicks: checked }))
                                            }
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label>Marketing</Label>
                                            <p className="text-xs text-muted-foreground">Tips and updates from us</p>
                                        </div>
                                        <Switch
                                            checked={settings.marketingEmails}
                                            onCheckedChange={(checked) =>
                                                setSettings(s => ({ ...s, marketingEmails: checked }))
                                            }
                                        />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Privacy */}
                            <AccordionItem value="privacy">
                                <AccordionTrigger className="text-base">
                                    🔒 Privacy
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4 pt-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label>Show Online Status</Label>
                                            <p className="text-xs text-muted-foreground">Let others see when you're online</p>
                                        </div>
                                        <Switch
                                            checked={settings.showOnlineStatus}
                                            onCheckedChange={(checked) =>
                                                setSettings(s => ({ ...s, showOnlineStatus: checked }))
                                            }
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label>Show Last Active</Label>
                                            <p className="text-xs text-muted-foreground">Display when you were last active</p>
                                        </div>
                                        <Switch
                                            checked={settings.showLastActive}
                                            onCheckedChange={(checked) =>
                                                setSettings(s => ({ ...s, showLastActive: checked }))
                                            }
                                        />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* App Settings */}
                            <AccordionItem value="app">
                                <AccordionTrigger className="text-base">
                                    ⚙️ App Settings
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4 pt-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label>Haptic Feedback</Label>
                                            <p className="text-xs text-muted-foreground">Vibration on interactions</p>
                                        </div>
                                        <Switch
                                            checked={settings.hapticFeedback}
                                            onCheckedChange={(checked) =>
                                                setSettings(s => ({ ...s, hapticFeedback: checked }))
                                            }
                                        />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Support */}
                            <AccordionItem value="support">
                                <AccordionTrigger className="text-base">
                                    💬 Support
                                </AccordionTrigger>
                                <AccordionContent className="space-y-2 pt-2">
                                    <Button variant="ghost" className="w-full justify-start">
                                        Help Center
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start">
                                        Report a Problem
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start">
                                        Send Feedback
                                    </Button>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Legal */}
                            <AccordionItem value="legal">
                                <AccordionTrigger className="text-base">
                                    📄 Legal
                                </AccordionTrigger>
                                <AccordionContent className="space-y-2 pt-2">
                                    <Button variant="ghost" className="w-full justify-start">
                                        Terms of Service
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start">
                                        Privacy Policy
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start">
                                        Licenses
                                    </Button>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        {/* Danger Zone */}
                        <Card className="border-destructive/50">
                            <CardContent className="pt-6 space-y-3">
                                <h3 className="font-medium text-destructive">Danger Zone</h3>
                                <Button
                                    variant="outline"
                                    className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
                                    onClick={handleSignOut}
                                >
                                    Sign Out
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full text-destructive hover:bg-destructive/10"
                                    onClick={handleDeleteAccount}
                                >
                                    Delete Account
                                </Button>
                            </CardContent>
                        </Card>

                        {/* App Version */}
                        <p className="text-center text-xs text-muted-foreground pt-4">
                            SomeDay.love v0.1.0
                        </p>
                    </motion.div>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
