"use client";

import {
  Sun,
  Leaf,
  Sparkles,
  Diamond,
  Heart,
  Users,
  PartyPopper,
  Building2,
  Wheat,
  Building,
  Landmark,
  Mountain,
  TrendingUp,
  BarChart3,
  DollarSign,
  User,
  CircleUser,
  UsersRound,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'xl';
}

const sizeMap = {
  small: 16,
  medium: 24,
  large: 32,
  xl: 48
};

// Budget tier icons
export function SunriseIcon({ className, size = 'large' }: IconProps) {
  return (
    <Sun 
      size={sizeMap[size]}
      className={cn('text-primary', className)} 
    />
  );
}

export function LeafIcon({ className, size = 'large' }: IconProps) {
  return (
    <Leaf 
      size={sizeMap[size]}
      className={cn('text-primary', className)} 
    />
  );
}

export function SparklesIcon({ className, size = 'large' }: IconProps) {
  return (
    <Sparkles 
      size={sizeMap[size]}
      className={cn('text-primary', className)} 
    />
  );
}

export function DiamondIcon({ className, size = 'large' }: IconProps) {
  return (
    <Diamond 
      size={sizeMap[size]}
      className={cn('text-primary', className)} 
    />
  );
}

// Guest count icons
export function CoupleIcon({ className, size = 'large' }: IconProps) {
  return (
    <Heart 
      size={sizeMap[size]}
      className={cn('text-primary', className)} 
    />
  );
}

export function SmallGroupIcon({ className, size = 'large' }: IconProps) {
  return (
    <Users 
      size={sizeMap[size]}
      className={cn('text-primary', className)} 
    />
  );
}

export function PartyIcon({ className, size = 'large' }: IconProps) {
  return (
    <PartyPopper 
      size={sizeMap[size]}
      className={cn('text-primary', className)} 
    />
  );
}

export function LargeGroupIcon({ className, size = 'large' }: IconProps) {
  return (
    <Building2 
      size={sizeMap[size]}
      className={cn('text-primary', className)} 
    />
  );
}

// Venue type icons
export function RusticIcon({ className, size = 'large' }: IconProps) {
  return (
    <Wheat 
      size={sizeMap[size]}
      className={cn('text-primary', className)} 
    />
  );
}

export function ModernIcon({ className, size = 'large' }: IconProps) {
  return (
    <Building 
      size={sizeMap[size]}
      className={cn('text-primary', className)} 
    />
  );
}

export function ClassicIcon({ className, size = 'large' }: IconProps) {
  return (
    <Landmark 
      size={sizeMap[size]}
      className={cn('text-primary', className)} 
    />
  );
}

export function AdventureIcon({ className, size = 'large' }: IconProps) {
  return (
    <Mountain 
      size={sizeMap[size]}
      className={cn('text-primary', className)} 
    />
  );
}

// Gender icons
export function WomanIcon({ className, size = 'large' }: IconProps) {
  return (
    <CircleUser 
      size={sizeMap[size]}
      className={cn('text-primary', className)} 
    />
  );
}

export function ManIcon({ className, size = 'large' }: IconProps) {
  return (
    <User 
      size={sizeMap[size]}
      className={cn('text-primary', className)} 
    />
  );
}

export function NonBinaryIcon({ className, size = 'large' }: IconProps) {
  return (
    <UsersRound 
      size={sizeMap[size]}
      className={cn('text-primary', className)} 
    />
  );
}

// Family involvement icon
export function FamilyIcon({ className, size = 'large' }: IconProps) {
  return (
    <UsersRound 
      size={sizeMap[size]}
      className={cn('text-primary', className)} 
    />
  );
}

// Landing page feature icons
export function MoneyIcon({ className, size = 'large' }: IconProps) {
  return (
    <DollarSign 
      size={sizeMap[size]}
      className={cn('text-primary', className)} 
    />
  );
}

export function GroupsIcon({ className, size = 'large' }: IconProps) {
  return (
    <Users 
      size={sizeMap[size]}
      className={cn('text-primary', className)} 
    />
  );
}

export function AnalyticsIcon({ className, size = 'large' }: IconProps) {
  return (
    <BarChart3 
      size={sizeMap[size]}
      className={cn('text-primary', className)} 
    />
  );
}

export function TrendingIcon({ className, size = 'large' }: IconProps) {
  return (
    <TrendingUp 
      size={sizeMap[size]}
      className={cn('text-primary', className)} 
    />
  );
}

// Generic fallback
export function PersonIcon({ className, size = 'large' }: IconProps) {
  return (
    <User 
      size={sizeMap[size]}
      className={cn('text-primary', className)} 
    />
  );
}

export function FavoriteIcon({ className, size = 'large' }: IconProps) {
  return (
    <Heart 
      size={sizeMap[size]}
      className={cn('text-primary', className)} 
    />
  );
}

export function CelebrationIcon({ className, size = 'large' }: IconProps) {
  return (
    <PartyPopper 
      size={sizeMap[size]}
      className={cn('text-primary', className)} 
    />
  );
}

export function AutoAwesomeIcon({ className, size = 'large' }: IconProps) {
  return (
    <Sparkles 
      size={sizeMap[size]}
      className={cn('text-primary', className)} 
    />
  );
}

export function AttachMoneyIcon({ className, size = 'large' }: IconProps) {
  return (
    <DollarSign 
      size={sizeMap[size]}
      className={cn('text-primary', className)} 
    />
  );
}

export function PeopleIcon({ className, size = 'large' }: IconProps) {
  return (
    <Users 
      size={sizeMap[size]}
      className={cn('text-primary', className)} 
    />
  );
}
