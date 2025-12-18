/**
 * Mock Database Module
 * 
 * This module provides placeholder data and mock database operations.
 * Replace with actual Supabase implementation in production.
 */

import { Profile, Candidate, Match, Swipe, BudgetTier, GuestCount, VenueVibe, Gender } from "./types";

const SWIPES_STORAGE_KEY = "someday_mock_swipes";
const MATCHES_STORAGE_KEY = "someday_mock_matches";

// Generate mock candidates for the discover page
const MOCK_CANDIDATES: Candidate[] = [
  {
    id: "cand-1",
    name: "Alex",
    age: 28,
    venue_vibe: "rustic",
    similarity: 0.92,
    budget_tier: "modest",
    guest_count: "intimate",
    location: "Austin, TX",
  },
  {
    id: "cand-2",
    name: "Jordan",
    age: 31,
    venue_vibe: "modern",
    similarity: 0.87,
    budget_tier: "moderate",
    guest_count: "medium",
    location: "Austin, TX",
  },
  {
    id: "cand-3",
    name: "Taylor",
    age: 26,
    venue_vibe: "adventure",
    similarity: 0.85,
    budget_tier: "micro",
    guest_count: "elopement",
    location: "Austin, TX",
  },
  {
    id: "cand-4",
    name: "Morgan",
    age: 29,
    venue_vibe: "classic",
    similarity: 0.83,
    budget_tier: "lavish",
    guest_count: "large",
    location: "Austin, TX",
  },
  {
    id: "cand-5",
    name: "Riley",
    age: 27,
    venue_vibe: "rustic",
    similarity: 0.81,
    budget_tier: "modest",
    guest_count: "medium",
    location: "Austin, TX",
  },
  {
    id: "cand-6",
    name: "Casey",
    age: 30,
    venue_vibe: "modern",
    similarity: 0.79,
    budget_tier: "moderate",
    guest_count: "intimate",
    location: "Austin, TX",
  },
  {
    id: "cand-7",
    name: "Quinn",
    age: 25,
    venue_vibe: "adventure",
    similarity: 0.77,
    budget_tier: "micro",
    guest_count: "elopement",
    location: "Austin, TX",
  },
  {
    id: "cand-8",
    name: "Avery",
    age: 32,
    venue_vibe: "classic",
    similarity: 0.75,
    budget_tier: "lavish",
    guest_count: "medium",
    location: "Austin, TX",
  },
];

// Mock matches
const MOCK_MATCHES: Match[] = [
  {
    id: "match-1",
    profile: {
      id: "cand-1",
      clerk_id: "clerk_cand_1",
      name: "Alex",
      age: 28,
      gender: "woman",
      seeking: "man",
      location: "Austin, TX",
      budget_tier: "modest",
      guest_count: "intimate",
      venue_vibe: "rustic",
      family_involvement: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    compatibility_score: 92,
    match_explanation: "You both value intimate celebrations and prefer rustic, authentic venues. Your financial outlooks align well, suggesting strong compatibility on major life decisions.",
    matched_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
];

/**
 * Get candidates for the discover page
 * In production, this would call the Supabase hybrid search function
 */
export async function getCandidates(userId: string): Promise<Candidate[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Get already swiped candidates
  const swipes = getSwipes();
  const swipedIds = new Set(swipes.map(s => s.target_id));

  // Filter out already swiped candidates
  return MOCK_CANDIDATES.filter(c => !swipedIds.has(c.id));
}

/**
 * Record a swipe
 */
export async function recordSwipe(
  userId: string,
  targetId: string,
  liked: boolean,
  compatibilityScore?: number
): Promise<{ isMatch: boolean }> {
  await new Promise(resolve => setTimeout(resolve, 300));

  const swipe: Swipe = {
    id: `swipe-${Date.now()}`,
    user_id: userId,
    target_id: targetId,
    liked,
    compatibility_score: compatibilityScore,
    created_at: new Date().toISOString(),
  };

  // Save swipe to localStorage
  const swipes = getSwipes();
  swipes.push(swipe);
  if (typeof window !== "undefined") {
    localStorage.setItem(SWIPES_STORAGE_KEY, JSON.stringify(swipes));
  }

  // Simulate match (30% chance if liked)
  const isMatch = liked && Math.random() > 0.7;

  if (isMatch) {
    // Add to matches
    const candidate = MOCK_CANDIDATES.find(c => c.id === targetId);
    if (candidate) {
      const match: Match = {
        id: `match-${Date.now()}`,
        profile: {
          id: candidate.id,
          clerk_id: `clerk_${candidate.id}`,
          name: candidate.name,
          age: candidate.age,
          gender: "woman", // Mock
          seeking: "man", // Mock
          location: candidate.location,
          budget_tier: candidate.budget_tier,
          guest_count: candidate.guest_count,
          venue_vibe: candidate.venue_vibe,
          family_involvement: 3,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        compatibility_score: candidate.similarity * 100,
        match_explanation: generateMatchExplanation(candidate),
        matched_at: new Date().toISOString(),
      };

      const matches = getMatches();
      matches.push(match);
      if (typeof window !== "undefined") {
        localStorage.setItem(MATCHES_STORAGE_KEY, JSON.stringify(matches));
      }
    }
  }

  return { isMatch };
}

/**
 * Get all swipes
 */
export function getSwipes(): Swipe[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(SWIPES_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

/**
 * Get all matches
 */
export function getMatches(): Match[] {
  if (typeof window === "undefined") return [...MOCK_MATCHES];
  const stored = localStorage.getItem(MATCHES_STORAGE_KEY);
  const savedMatches: Match[] = stored ? JSON.parse(stored) : [];

  // Combine and deduplicate by profile ID (savedMatches take priority as they're newer)
  const matchMap = new Map<string, Match>();
  for (const match of MOCK_MATCHES) {
    matchMap.set(match.profile.id, match);
  }
  for (const match of savedMatches) {
    matchMap.set(match.profile.id, match);
  }

  return Array.from(matchMap.values());
}

/**
 * Generate a match explanation (mock LLM response)
 */
function generateMatchExplanation(candidate: Candidate): string {
  const explanations: Record<VenueVibe, string> = {
    rustic: `You both appreciate authenticity and natural beauty. ${candidate.name}'s preference for rustic venues suggests a grounded, nature-loving personality that aligns with your values.`,
    modern: `You share a love for contemporary aesthetics and efficiency. ${candidate.name}'s modern taste indicates someone who values innovation and clean design, matching your style.`,
    classic: `You both cherish tradition and timeless elegance. ${candidate.name}'s classic preferences suggest someone who values heritage and established customs, just like you.`,
    adventure: `You share a spirit of adventure and spontaneity. ${candidate.name}'s love for unique experiences indicates a free-spirited personality that matches your energy.`,
  };

  return explanations[candidate.venue_vibe];
}

/**
 * Create or update user profile
 * In production, this would upsert to Supabase
 */
export async function upsertProfile(profile: Partial<Profile>): Promise<Profile> {
  await new Promise(resolve => setTimeout(resolve, 500));

  const fullProfile: Profile = {
    id: profile.id || `profile-${Date.now()}`,
    clerk_id: profile.clerk_id || "mock-clerk-id",
    name: profile.name || "User",
    age: profile.age || 25,
    gender: profile.gender || "woman",
    seeking: profile.seeking || "man",
    location: profile.location || "Austin, TX",
    budget_tier: profile.budget_tier || "modest",
    guest_count: profile.guest_count || "intimate",
    venue_vibe: profile.venue_vibe || "rustic",
    family_involvement: profile.family_involvement || 3,
    narrative: profile.narrative,
    created_at: profile.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return fullProfile;
}

/**
 * Get user profile by clerk ID
 */
export async function getProfileByClerkId(clerkId: string): Promise<Profile | null> {
  await new Promise(resolve => setTimeout(resolve, 300));

  // In production, this would query Supabase
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(`someday_mock_profile:${clerkId}`);
  return stored ? JSON.parse(stored) : null;
}

// ============================================
// CHAT SYSTEM (Mock - migrate to Supabase Realtime later)
// ============================================

const CONVERSATIONS_STORAGE_KEY = "someday_mock_conversations";
const MESSAGES_STORAGE_KEY = "someday_mock_messages";
const NOTIFICATIONS_STORAGE_KEY = "someday_mock_notifications";

import { Conversation, Message, Notification } from "./types";

// Initialize mock conversation for the pre-existing match
function initializeMockConversations(): Conversation[] {
  return [
    {
      id: "conv-1",
      match_id: "match-1",
      participant_1: "current-user",
      participant_2: "cand-1",
      last_message: "Hey! I saw we matched. Love your venue choice! 💜",
      last_message_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      unread_count: 1,
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ];
}

function initializeMockMessages(): Message[] {
  return [
    {
      id: "msg-1",
      conversation_id: "conv-1",
      sender_id: "cand-1",
      content: "Hey! I saw we matched. Love your venue choice! 💜",
      type: "text",
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
  ];
}

function initializeMockNotifications(): Notification[] {
  return [
    {
      id: "notif-1",
      user_id: "current-user",
      type: "match",
      title: "New Match! 💜",
      body: "You and Alex matched! Start a conversation now.",
      read: false,
      data: { matchId: "match-1" },
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ];
}

/**
 * Get all conversations for current user
 * TODO: Replace with Supabase query with RLS
 */
export function getConversations(): Conversation[] {
  if (typeof window === "undefined") return initializeMockConversations();
  const stored = localStorage.getItem(CONVERSATIONS_STORAGE_KEY);
  if (!stored) {
    const initial = initializeMockConversations();
    localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(stored);
}

/**
 * Get or create a conversation for a match
 * TODO: Replace with Supabase upsert
 */
export function getOrCreateConversation(matchId: string, matchProfile: Profile): Conversation {
  const conversations = getConversations();
  let conversation = conversations.find(c => c.match_id === matchId);

  if (!conversation) {
    conversation = {
      id: `conv-${Date.now()}`,
      match_id: matchId,
      participant_1: "current-user",
      participant_2: matchProfile.id,
      unread_count: 0,
      created_at: new Date().toISOString(),
    };
    conversations.push(conversation);
    if (typeof window !== "undefined") {
      localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(conversations));
    }
  }

  return conversation;
}

/**
 * Get messages for a conversation
 * TODO: Replace with Supabase query + Realtime subscription
 */
export function getMessages(conversationId: string): Message[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(MESSAGES_STORAGE_KEY);
  const messages: Message[] = stored ? JSON.parse(stored) : initializeMockMessages();

  // Initialize if empty
  if (!stored) {
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
  }

  return messages.filter(m => m.conversation_id === conversationId);
}

/**
 * Send a message
 * TODO: Replace with Supabase insert + Broadcast for instant delivery
 */
export function sendMessage(conversationId: string, content: string, senderId: string = "current-user"): Message {
  const message: Message = {
    id: `msg-${Date.now()}`,
    conversation_id: conversationId,
    sender_id: senderId,
    content,
    type: "text",
    created_at: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(MESSAGES_STORAGE_KEY);
    const messages: Message[] = stored ? JSON.parse(stored) : [];
    messages.push(message);
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));

    // Update conversation last message
    const conversations = getConversations();
    const conv = conversations.find(c => c.id === conversationId);
    if (conv) {
      conv.last_message = content;
      conv.last_message_at = message.created_at;
      localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(conversations));
    }
  }

  return message;
}

/**
 * Mark conversation as read
 * TODO: Replace with Supabase update
 */
export function markConversationRead(conversationId: string): void {
  if (typeof window === "undefined") return;

  const conversations = getConversations();
  const conv = conversations.find(c => c.id === conversationId);
  if (conv) {
    conv.unread_count = 0;
    localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(conversations));
  }
}

/**
 * Get notifications for current user
 * TODO: Replace with Supabase query
 */
export function getNotifications(): Notification[] {
  if (typeof window === "undefined") return initializeMockNotifications();
  const stored = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
  if (!stored) {
    const initial = initializeMockNotifications();
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(stored);
}

/**
 * Get unread notification count
 */
export function getUnreadNotificationCount(): number {
  const notifications = getNotifications();
  return notifications.filter(n => !n.read).length;
}

/**
 * Mark notification as read
 * TODO: Replace with Supabase update
 */
export function markNotificationRead(notificationId: string): void {
  if (typeof window === "undefined") return;

  const notifications = getNotifications();
  const notif = notifications.find(n => n.id === notificationId);
  if (notif) {
    notif.read = true;
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
  }
}

/**
 * Mark all notifications as read
 */
export function markAllNotificationsRead(): void {
  if (typeof window === "undefined") return;

  const notifications = getNotifications();
  notifications.forEach(n => n.read = true);
  localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
}

/**
 * Add a notification (used when match occurs)
 * TODO: Replace with Supabase insert + push notification
 */
export function addNotification(notification: Omit<Notification, "id" | "created_at">): Notification {
  const newNotif: Notification = {
    ...notification,
    id: `notif-${Date.now()}`,
    created_at: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    const notifications = getNotifications();
    notifications.unshift(newNotif);
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
  }

  return newNotif;
}

// ============================================
// SWIPE UNDO FUNCTIONALITY (Mock)
// ============================================

const LAST_SWIPE_KEY = "someday_last_swipe";

/**
 * Get the last swipe (for undo feature)
 */
export function getLastSwipe(): Swipe | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(LAST_SWIPE_KEY);
  return stored ? JSON.parse(stored) : null;
}

/**
 * Undo the last swipe
 * TODO: Replace with Supabase delete
 */
export function undoLastSwipe(): Candidate | null {
  if (typeof window === "undefined") return null;

  const lastSwipe = getLastSwipe();
  if (!lastSwipe) return null;

  // Remove from swipes
  const swipes = getSwipes();
  const filtered = swipes.filter(s => s.id !== lastSwipe.id);
  localStorage.setItem(SWIPES_STORAGE_KEY, JSON.stringify(filtered));

  // Clear last swipe
  localStorage.removeItem(LAST_SWIPE_KEY);

  // Return the candidate that was swiped on
  return MOCK_CANDIDATES.find(c => c.id === lastSwipe.target_id) || null;
}

