import { SubscriptionTier } from './subscription';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'consultant' | 'company';
  tier: SubscriptionTier;
  status: 'active' | 'suspended' | 'pending' | 'cancelled';
  verified: boolean;
  profilePicture?: string;
  joinDate: string;
  lastActive: string;
  profileCompletion: number;
  totalRevenue?: number;
  projectsCompleted?: number;
  rating?: number;
  phone?: string;
  location?: string;
}

export interface KPIData {
  label: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
  color: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface AdminTransaction {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  type: 'subscription' | 'upgrade' | 'downgrade' | 'service_fee' | 'refund';
  description: string;
  date: string;
  paymentMethod?: string;
  receiptUrl?: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  documentType: 'identity' | 'certification' | 'business' | 'tax' | 'aadhaar_front' | 'aadhaar_back' | 'pan_card' | 'selfie' | 'address_proof';
  documentUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  reviewedDate?: string;
  reviewedBy?: string;
  notes?: string;
  rejectionReason?: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'account' | 'feature_request' | 'other';
  createdDate: string;
  updatedDate: string;
  assignedTo?: string;
  responses?: TicketResponse[];
}

export interface TicketResponse {
  id: string;
  ticketId: string;
  userId: string;
  userName: string;
  message: string;
  isAdmin: boolean;
  createdDate: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  description: string;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface ContentItem {
  id: string;
  title: string;
  category: 'faq' | 'help' | 'guide' | 'policy';
  content: string;
  status: 'published' | 'draft' | 'archived';
  author: string;
  createdDate: string;
  updatedDate: string;
  views: number;
  helpful: number;
}

export interface AnalyticsMetrics {
  dau: number;
  mau: number;
  conversionRate: number;
  arpu: number;
  churnRate: number;
  ltv: number;
  activeSubscriptions: number;
  trialConversions: number;
}

export interface RevenueData {
  date: string;
  mrr: number;
  arr: number;
  newRevenue: number;
  churnedRevenue: number;
}

export interface UserGrowthData {
  date: string;
  newUsers: number;
  activeUsers: number;
  churnedUsers: number;
}

export interface TierDistribution {
  tier: SubscriptionTier;
  count: number;
  revenue: number;
  percentage: number;
}
