export type SubscriptionTier = 'basic' | 'pro' | 'premium' | 'enterprise';
export type UserRole = 'consultant' | 'company';

export interface SubscriptionFeature {
  name: string;
  included: boolean;
  value?: string | number;
  tooltip?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: SubscriptionTier;
  role: UserRole;
  price: number;
  currency: string;
  billingPeriod: 'monthly' | 'yearly';
  trialDays?: number;
  popular?: boolean;
  features: {
    // Core Features
    profileVisibility?: string;
    searchRanking?: string;
    connectionCredits?: number;
    chatMessagesPerDay?: number | 'unlimited';
    videoMinutes?: number | 'unlimited';
    
    // Analytics & Insights
    analytics?: boolean;
    advancedAnalytics?: boolean;
    
    // Branding & Customization
    customBranding?: boolean;
    customURL?: boolean;
    featuredLanding?: boolean;
    
    // Company Features
    projectSlots?: number | 'unlimited';
    serviceFee?: number;
    teamAccess?: number;
    meetingScheduler?: boolean;
    advancedSearch?: boolean;
    
    // Premium Features
    creditRollover?: boolean;
    prioritySupport?: boolean;
    accountManager?: boolean;
    apiAccess?: boolean;
    complianceTools?: boolean;
    
    // Requirements
    verificationRequired?: boolean;
  };
  limitations?: string[];
  highlights?: string[];
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  tier: SubscriptionTier;
  status: 'active' | 'trial' | 'cancelled' | 'expired' | 'past_due';
  startDate: string;
  endDate?: string;
  trialEndDate?: string;
  cancelledAt?: string;
  creditsRemaining?: number;
  creditsUsed?: number;
  autoRenew: boolean;
  paymentMethod?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  type: 'subscription' | 'upgrade' | 'downgrade' | 'service_fee' | 'refund';
  description: string;
  createdAt: string;
  paymentMethod?: string;
  receiptUrl?: string;
}

export interface SubscriptionAnalytics {
  totalRevenue: number;
  mrr: number; // Monthly Recurring Revenue
  arr: number; // Annual Recurring Revenue
  churnRate: number;
  activeSubscriptions: number;
  trialConversions: number;
  averageLifetimeValue: number;
  tierDistribution: {
    tier: SubscriptionTier;
    count: number;
    revenue: number;
  }[];
}
