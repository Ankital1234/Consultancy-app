import { SubscriptionPlan } from '@/types/subscription';

// Consultant/Service Provider Plans
export const consultantPlans: SubscriptionPlan[] = [
  {
    id: 'consultant-basic',
    name: 'Basic',
    tier: 'basic',
    role: 'consultant',
    price: 0,
    currency: 'INR',
    billingPeriod: 'monthly',
    trialDays: 7,
    features: {
      profileVisibility: 'Basic profile visibility after trial',
      searchRanking: 'Standard search ranking',
      connectionCredits: 5,
      chatMessagesPerDay: 10,
      videoMinutes: 0,
      analytics: false,
      advancedAnalytics: false,
      customBranding: false,
      customURL: false,
      featuredLanding: false,
      creditRollover: false,
      prioritySupport: false,
      verificationRequired: true,
    },
    highlights: [
      'Full Pro features for first 7 days',
      '5 free connection credits/month',
      'Up to 10 chat messages per day',
      'Must complete verification for Pro upgrade',
    ],
    limitations: [
      'Limited profile visibility after trial',
      'No advanced analytics',
      'Basic support only',
    ],
  },
  {
    id: 'consultant-pro',
    name: 'Pro',
    tier: 'pro',
    role: 'consultant',
    price: 2499, // ₹2,499/month (approx $29.99)
    currency: 'INR',
    billingPeriod: 'monthly',
    popular: true,
    features: {
      profileVisibility: 'Top 15% of search results',
      searchRanking: 'Priority ranking',
      connectionCredits: 150,
      chatMessagesPerDay: 'unlimited',
      videoMinutes: 'unlimited',
      analytics: true,
      advancedAnalytics: true,
      customBranding: false,
      customURL: false,
      featuredLanding: false,
      creditRollover: false,
      prioritySupport: false,
      verificationRequired: false,
    },
    highlights: [
      'Profile in top 15% of search results',
      '150 connection credits/month',
      'Unlimited chats & video minutes',
      'Advanced analytics dashboard',
      'Profile views & engagement stats',
      'Competitor bid insights',
    ],
  },
  {
    id: 'consultant-premium',
    name: 'Premium',
    tier: 'premium',
    role: 'consultant',
    price: 8299, // ₹8,299/month (approx $99.99)
    currency: 'INR',
    billingPeriod: 'monthly',
    features: {
      profileVisibility: 'Featured on platform landing',
      searchRanking: 'Top priority ranking',
      connectionCredits: 150,
      chatMessagesPerDay: 'unlimited',
      videoMinutes: 'unlimited',
      analytics: true,
      advancedAnalytics: true,
      customBranding: true,
      customURL: true,
      featuredLanding: true,
      creditRollover: true,
      prioritySupport: true,
      verificationRequired: false,
    },
    highlights: [
      'All Pro features included',
      'Featured platform landing position',
      'Priority access to support',
      'Custom public URL & branding',
      'Rollover unused credits',
      'Capped overage protection',
    ],
  },
];

// Company/Client Plans
export const companyPlans: SubscriptionPlan[] = [
  {
    id: 'company-basic',
    name: 'Basic',
    tier: 'basic',
    role: 'company',
    price: 0,
    currency: 'INR',
    billingPeriod: 'monthly',
    features: {
      projectSlots: 1,
      chatMessagesPerDay: 10,
      serviceFee: 5,
      teamAccess: 1,
      meetingScheduler: false,
      advancedSearch: false,
      analytics: false,
      prioritySupport: false,
    },
    highlights: [
      'Free account & project posting',
      '10 chat messages/day',
      'One active project slot',
      'Full access to basic search',
      'View consultant profiles',
      '5% service fee per payment',
    ],
    limitations: [
      'Limited to 1 active project',
      'Basic search filters only',
      'No team collaboration',
    ],
  },
  {
    id: 'company-pro',
    name: 'Pro',
    tier: 'pro',
    role: 'company',
    price: 4149, // ₹4,149/month (approx $49.99)
    currency: 'INR',
    billingPeriod: 'monthly',
    popular: true,
    features: {
      projectSlots: 'unlimited',
      chatMessagesPerDay: 'unlimited',
      serviceFee: 3,
      teamAccess: 5,
      meetingScheduler: true,
      advancedSearch: true,
      analytics: true,
      prioritySupport: false,
    },
    highlights: [
      'All Basic features included',
      '3% service fee (save 2%)',
      'Unlimited project slots',
      'Unlimited pre-contract chats',
      'Built-in meeting scheduler',
      'Advanced search filters',
      'Team access (up to 5 members)',
    ],
  },
  {
    id: 'company-enterprise',
    name: 'Enterprise',
    tier: 'enterprise',
    role: 'company',
    price: 0, // Custom quote
    currency: 'INR',
    billingPeriod: 'monthly',
    features: {
      projectSlots: 'unlimited',
      chatMessagesPerDay: 'unlimited',
      serviceFee: 0, // Negotiated
      teamAccess: 999, // Custom
      meetingScheduler: true,
      advancedSearch: true,
      analytics: true,
      advancedAnalytics: true,
      prioritySupport: true,
      accountManager: true,
      apiAccess: true,
      complianceTools: true,
    },
    highlights: [
      'All Pro features included',
      'Negotiated lowest or zero commission',
      'Dedicated account manager',
      'Automated compliance tools',
      'Contract generation & tax docs',
      'API access for HR integration',
      'Custom team size',
      'Priority support',
    ],
  },
];

export const allPlans = [...consultantPlans, ...companyPlans];

// Helper functions
export const getPlanById = (planId: string): SubscriptionPlan | undefined => {
  return allPlans.find(plan => plan.id === planId);
};

export const getPlansByRole = (role: 'consultant' | 'company'): SubscriptionPlan[] => {
  return role === 'consultant' ? consultantPlans : companyPlans;
};

export const getPlanByTier = (role: 'consultant' | 'company', tier: string): SubscriptionPlan | undefined => {
  const plans = getPlansByRole(role);
  return plans.find(plan => plan.tier === tier);
};
