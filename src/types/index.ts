export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'consultant' | 'admin';
  profilePicture?: string;
  subscriptionTier?: ConsultantTier | ClientTier;
  subscriptionStatus?: 'active' | 'trial' | 'expired' | 'cancelled';
  credits?: number;
  verified?: boolean;
  createdAt: string;
  lastActiveAt: string;
}

export interface Consultant {
  id: string;
  name: string;
  specialization: string;
  hourlyRate: number;
  bio: string;
  profilePicture: string;
  yearsOfExperience: number;
  rating: number;
  totalReviews: number;
  availability: string[];
  subscriptionTier?: ConsultantTier;
  verified: boolean;
  profileViews: number;
  connectionCredits: number;
}

export interface Booking {
  id: string;
  consultantId: string;
  consultantName: string;
  consultantImage: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  duration: number;
}

export type ConsultantTier = 'basic' | 'pro' | 'premium';
export type ClientTier = 'basic' | 'pro' | 'enterprise';

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: ConsultantTier | ClientTier;
  type: 'consultant' | 'client';
  price: number;
  currency: string;
  billingInterval: 'monthly' | 'yearly';
  features: string[];
  limits: {
    connectionCredits?: number;
    dailyMessages?: number;
    projectSlots?: number;
    teamMembers?: number;
    serviceFee?: number;
  };
  trialDays?: number;
  popular?: boolean;
  featured?: boolean;
}

export interface ConsultantSubscriptionConfig {
  basic: {
    price: 0;
    trialDays: 7;
    connectionCredits: 5;
    dailyMessages: 10;
    features: string[];
  };
  pro: {
    price: 29.99;
    connectionCredits: 150;
    searchPlacement: number;
    features: string[];
  };
  premium: {
    price: 99.99;
    connectionCredits: 150;
    searchPlacement: number;
    customUrl: boolean;
    creditRollover: boolean;
    features: string[];
  };
}

export interface ClientSubscriptionConfig {
  basic: {
    price: 0;
    dailyMessages: 10;
    projectSlots: 1;
    serviceFee: 5;
    features: string[];
  };
  pro: {
    price: 49.99;
    serviceFee: 3;
    projectSlots: number;
    teamMembers: 5;
    features: string[];
  };
  enterprise: {
    price: number;
    serviceFee: number;
    teamMembers: number;
    dedicatedManager: boolean;
    apiAccess: boolean;
    features: string[];
  };
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  type: 'subscription' | 'credit_purchase' | 'service_fee';
  description: string;
  createdAt: string;
  processedAt?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'manager' | 'editor' | 'support';
  permissions: string[];
  lastLogin: string;
  active: boolean;
}

export interface AnalyticsData {
  totalUsers: number;
  totalRevenue: number;
  activeSubscriptions: number;
  monthlyRecurringRevenue: number;
  customerLifetimeValue: number;
  churnRate: number;
  growthMetrics: {
    newUsers: number;
    newSubscriptions: number;
    revenueGrowth: number;
  };
  cohortData: Array<{
    period: string;
    retention: number[];
    revenue: number[];
  }>;
}

export interface VerificationDocument {
  id: string;
  userId: string;
  type: 'id_document' | 'professional_certificate' | 'portfolio';
  url: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewerNotes?: string;
}
