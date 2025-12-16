"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated, hasCompletedOnboarding, signIn, isLoading } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(hasCompletedOnboarding ? "/discover" : "/onboarding");
    }
  }, [isLoading, isAuthenticated, hasCompletedOnboarding, router]);

  const handleGetStarted = () => {
    signIn();
    router.push("/onboarding");
  };

  const features = [
    {
      icon: "💰",
      title: "Financial Alignment",
      description: "Budget preferences predict relationship success",
    },
    {
      icon: "👥",
      title: "Social Compatibility",
      description: "Guest count reveals your social style",
    },
    {
      icon: "✨",
      title: "Aesthetic Harmony",
      description: "Venue vibes map to personality types",
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Boundary Matching",
      description: "Family involvement shows boundary styles",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="mx-auto max-w-lg space-y-8 text-center">
          {/* Logo/Brand */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-6xl bg-white">💜</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-pink-500 via-primary to-purple-600 bg-clip-text text-transparent">
                SomeDay.love
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Find your forever through wedding vision
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              Psychometric matching, not just photos
            </Badge>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid grid-cols-2 gap-4 pt-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="rounded-2xl border bg-card p-4 text-left shadow-sm"
              >
                <span className="text-2xl">{feature.icon}</span>
                <h3 className="mt-2 font-semibold text-sm">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Research badge */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-sm text-muted-foreground"
          >
            📊 Based on relationship research showing financial alignment
            predicts 1.6-3.5x better relationship outcomes
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="space-y-4 pt-4"
          >
            <Button
              size="xl"
              onClick={handleGetStarted}
              className="w-full bg-gradient-to-r from-pink-500 to-primary text-lg shadow-lg hover:from-pink-600 hover:to-primary/90"
            >
              Get Started — It&apos;s Free
            </Button>
            <p className="text-xs text-muted-foreground">
              7 questions • 3 minutes • Find your match
            </p>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="mx-auto max-w-lg px-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>© 2024 SomeDay.love</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
