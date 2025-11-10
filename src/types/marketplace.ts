export interface Gig {
  id: string;
  title: string;
  description: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  sellerLevel: 'new' | 'level1' | 'level2' | 'top';
  category: string;
  subcategory?: string;
  images: string[];
  price: {
    basic: number;
    standard: number;
    premium: number;
  };
  packages: {
    basic: {
      name: string;
      price: number;
      deliveryTime: number;
      revisions: number;
      description: string;
      features: string[];
    };
    standard: {
      name: string;
      price: number;
      deliveryTime: number;
      revisions: number;
      description: string;
      features: string[];
      popular?: boolean;
    };
    premium: {
      name: string;
      price: number;
      deliveryTime: number;
      revisions: number;
      description: string;
      features: string[];
    };
  };
  rating: number;
  totalReviews: number;
  totalOrders: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'paused' | 'draft';
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  subcategories?: string[];
}

export interface Review {
  id: string;
  gigId: string;
  orderId: string;
  buyerId: string;
  buyerName: string;
  buyerAvatar: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
  helpful?: number;
}

export interface Order {
  id: string;
  gigId: string;
  gigTitle: string;
  gigImage: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  buyerId: string;
  buyerName: string;
  package: 'basic' | 'standard' | 'premium';
  price: number;
  status: 'pending' | 'in_progress' | 'delivered' | 'completed' | 'cancelled' | 'disputed';
  deliveryTime: number;
  deliveryDate?: string;
  requirements?: string;
  deliverables?: string[];
  createdAt: string;
  updatedAt: string;
  messages?: OrderMessage[];
}

export interface OrderMessage {
  id: string;
  orderId: string;
  senderId: string;
  senderName: string;
  senderType: 'buyer' | 'seller';
  message: string;
  attachments?: string[];
  createdAt: string;
}

export interface Seller {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  level: 'new' | 'level1' | 'level2' | 'top';
  rating: number;
  totalReviews: number;
  totalGigs: number;
  totalOrders: number;
  responseRate: number;
  responseTime: string;
  languages: string[];
  skills: string[];
  description: string;
  memberSince: string;
  verified: boolean;
  online: boolean;
}

export interface SellerVerificationDocument {
  id: string;
  sellerId: string;
  type: 'aadhaar_front' | 'aadhaar_back' | 'pan_card' | 'selfie' | 'address_proof';
  url: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewerNotes?: string;
  rejectionReason?: string;
}

export interface SellerApplication {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  professionalDetails: {
    specialization: string;
    yearsOfExperience: number;
    bio: string;
    skills: string[];
  };
  documents: SellerVerificationDocument[];
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
}

