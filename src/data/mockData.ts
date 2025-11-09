import { Consultant, Booking } from '@/types';

// Converted rates from USD to INR (approx. 1 USD = 83 INR)
export const mockConsultants: Consultant[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    specialization: 'Business Strategy',
    hourlyRate: 12500, // ₹12,500/hour (was $150)
    bio: 'Experienced business strategist with 10+ years helping startups scale. Specialized in market entry strategies and growth optimization.',
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    yearsOfExperience: 12,
    rating: 4.9,
    totalReviews: 127,
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
  },
  {
    id: '2',
    name: 'Michael Chen',
    specialization: 'Tech & AI',
    hourlyRate: 16500, // ₹16,500/hour (was $200)
    bio: 'AI and machine learning expert. Former tech lead at major companies. Helping businesses integrate AI solutions.',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    yearsOfExperience: 15,
    rating: 5.0,
    totalReviews: 89,
    availability: ['Tuesday', 'Wednesday', 'Friday'],
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    specialization: 'Marketing & Branding',
    hourlyRate: 10000, // ₹10,000/hour (was $120)
    bio: 'Creative marketing consultant specializing in brand development and digital marketing strategies for growing businesses.',
    profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    yearsOfExperience: 8,
    rating: 4.8,
    totalReviews: 156,
    availability: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
  },
  {
    id: '4',
    name: 'David Park',
    specialization: 'Financial Planning',
    hourlyRate: 14500, // ₹14,500/hour (was $175)
    bio: 'Certified financial planner helping individuals and businesses make smart financial decisions and investment strategies.',
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    yearsOfExperience: 10,
    rating: 4.7,
    totalReviews: 92,
    availability: ['Monday', 'Tuesday', 'Thursday'],
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    specialization: 'HR & Leadership',
    hourlyRate: 11500, // ₹11,500/hour (was $140)
    bio: 'Human resources expert and leadership coach. Specialized in team building, culture development, and leadership training.',
    profilePicture: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
    yearsOfExperience: 14,
    rating: 4.9,
    totalReviews: 203,
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
  },
  {
    id: '6',
    name: 'James Wilson',
    specialization: 'Legal Advisory',
    hourlyRate: 20000, // ₹20,000/hour (was $250)
    bio: 'Corporate lawyer specializing in startup law, contracts, and intellectual property. Helping businesses navigate legal complexities.',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    yearsOfExperience: 18,
    rating: 5.0,
    totalReviews: 74,
    availability: ['Tuesday', 'Thursday', 'Friday'],
  },
];

export const mockBookings: Booking[] = [
  {
    id: '1',
    consultantId: '1',
    consultantName: 'Sarah Johnson',
    consultantImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    date: '2025-05-15',
    time: '10:00 AM',
    status: 'confirmed',
    duration: 60,
  },
  {
    id: '2',
    consultantId: '2',
    consultantName: 'Michael Chen',
    consultantImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    date: '2025-05-18',
    time: '2:00 PM',
    status: 'pending',
    duration: 90,
  },
  {
    id: '3',
    consultantId: '3',
    consultantName: 'Emily Rodriguez',
    consultantImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    date: '2025-05-12',
    time: '11:00 AM',
    status: 'completed',
    duration: 60,
  },
];
