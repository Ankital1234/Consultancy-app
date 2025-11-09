import { Gig, Category, Seller } from '@/types/marketplace';

export const categories: Category[] = [
  {
    id: 'business-strategy',
    name: 'Business Strategy',
    icon: '',
    description: 'Strategic planning, market analysis, growth consulting, and business transformation',
    subcategories: ['Strategic Planning', 'Market Entry Strategy', 'Business Model Innovation', 'Digital Transformation', 'Growth Strategy']
  },
  {
    id: 'financial-consulting',
    name: 'Financial Consulting',
    icon: '',
    description: 'Financial planning, investment advisory, tax consulting, and CFO services',
    subcategories: ['Financial Planning', 'Investment Advisory', 'Tax Consulting', 'CFO Services', 'Risk Management']
  },
  {
    id: 'hr-consulting',
    name: 'HR & People',
    icon: '',
    description: 'Talent acquisition, organizational development, HR strategy, and leadership consulting',
    subcategories: ['Talent Acquisition', 'Organizational Development', 'HR Strategy', 'Leadership Development', 'Performance Management']
  },
  {
    id: 'it-consulting',
    name: 'IT & Technology',
    icon: '',
    description: 'IT strategy, cloud consulting, cybersecurity, digital solutions, and tech advisory',
    subcategories: ['IT Strategy', 'Cloud Consulting', 'Cybersecurity', 'Digital Solutions', 'Technology Advisory']
  },
  {
    id: 'marketing-consulting',
    name: 'Marketing & Sales',
    icon: '',
    description: 'Marketing strategy, brand consulting, sales optimization, and market research',
    subcategories: ['Marketing Strategy', 'Brand Consulting', 'Sales Optimization', 'Market Research', 'Digital Marketing']
  },
  {
    id: 'legal-advisory',
    name: 'Legal Advisory',
    icon: '',
    description: 'Legal consulting, contract review, compliance, intellectual property, and regulatory advice',
    subcategories: ['Legal Consulting', 'Contract Review', 'Compliance', 'Intellectual Property', 'Regulatory Advice']
  },
  {
    id: 'operations-consulting',
    name: 'Operations',
    icon: '',
    description: 'Operations optimization, supply chain, process improvement, and quality management',
    subcategories: ['Operations Optimization', 'Supply Chain', 'Process Improvement', 'Quality Management', 'Lean Consulting']
  },
  {
    id: 'startup-consulting',
    name: 'Startup Advisory',
    icon: '',
    description: 'Startup strategy, fundraising, product-market fit, scaling, and mentorship',
    subcategories: ['Startup Strategy', 'Fundraising', 'Product-Market Fit', 'Scaling', 'Mentorship']
  }
];

export const mockSellers: Seller[] = [
  {
    id: 'seller1',
    name: 'Sarah Johnson',
    username: 'sarahbusiness',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    level: 'top',
    rating: 4.9,
    totalReviews: 342,
    totalGigs: 8,
    totalOrders: 1250,
    responseRate: 100,
    responseTime: '1 hour',
    languages: ['English', 'Spanish'],
    skills: ['Business Strategy', 'Strategic Planning', 'Growth Consulting'],
    description: 'Senior business strategist with 15+ years of experience helping companies scale and transform.',
    memberSince: '2018-03-15',
    verified: true,
    online: true
  },
  {
    id: 'seller2',
    name: 'Michael Chen',
    username: 'michaeltech',
    email: 'michael@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    level: 'level2',
    rating: 4.8,
    totalReviews: 189,
    totalGigs: 5,
    totalOrders: 567,
    responseRate: 98,
    responseTime: '2 hours',
    languages: ['English', 'Mandarin'],
    skills: ['IT Consulting', 'Digital Transformation', 'Cloud Strategy'],
    description: 'IT transformation expert specializing in cloud adoption and digital strategy for enterprises.',
    memberSince: '2019-07-22',
    verified: true,
    online: false
  },
  {
    id: 'seller3',
    name: 'Emily Rodriguez',
    username: 'emilyfinance',
    email: 'emily@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    level: 'level1',
    rating: 4.7,
    totalReviews: 156,
    totalGigs: 6,
    totalOrders: 423,
    responseRate: 95,
    responseTime: '3 hours',
    languages: ['English', 'French'],
    skills: ['Financial Planning', 'Investment Advisory', 'CFO Services'],
    description: 'Certified financial consultant helping businesses optimize financial performance and growth.',
    memberSince: '2020-01-10',
    verified: false,
    online: true
  }
];

export const mockGigs: Gig[] = [
  {
    id: 'gig1',
    title: 'Business Strategy Consultation & Strategic Planning',
    description: 'Comprehensive business strategy consultation to help your company achieve sustainable growth. Services include: • Strategic planning and roadmap development • Market analysis and competitive positioning • Business model innovation • Growth strategy formulation • KPI and performance metrics • 30-day implementation support Package options include different engagement levels and deliverables.',
    sellerId: 'seller1',
    sellerName: 'Sarah Johnson',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    sellerLevel: 'top',
    category: 'business-strategy',
    subcategory: 'Strategic Planning',
    images: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556155092-8c96b4b90dc6?w=800&h=600&fit=crop'
    ],
    price: {
      basic: 25000,
      standard: 75000,
      premium: 150000
    },
    packages: {
      basic: {
        name: 'Strategy Session',
        price: 25000,
        deliveryTime: 1,
        revisions: 1,
        description: '2-hour strategic consultation session',
        features: [
          '2-hour consultation session',
          'Strategic assessment report',
          'Key recommendations document',
          '1 Follow-up call',
          '1 Day delivery'
        ]
      },
      standard: {
        name: 'Strategic Planning Package',
        price: 75000,
        deliveryTime: 7,
        revisions: 2,
        description: 'Complete strategic planning engagement',
        features: [
          'Initial consultation (2 hours)',
          'Comprehensive strategy document',
          'Market analysis report',
          'Competitive analysis',
          '3-month roadmap',
          '2 Revisions',
          '2 Follow-up sessions',
          '7 Day delivery',
          'Email support for 1 month'
        ],
        popular: true
      },
      premium: {
        name: 'Executive Strategy Program',
        price: 150000,
        deliveryTime: 14,
        revisions: 3,
        description: 'Full strategic transformation program',
        features: [
          'Initial deep-dive consultation (4 hours)',
          'Complete strategic framework',
          'Market & competitive analysis',
          'Business model innovation',
          '12-month strategic roadmap',
          'Implementation plan',
          '3 Revisions',
          '4 Follow-up sessions',
          'KPI dashboard design',
          '14 Day delivery',
          '3 Months ongoing support'
        ]
      }
    },
    rating: 4.9,
    totalReviews: 342,
    totalOrders: 1250,
    tags: ['business strategy', 'strategic planning', 'consultation', 'growth strategy'],
    createdAt: '2023-01-15',
    updatedAt: '2024-01-20',
    status: 'active',
    faqs: [
      {
        question: 'What industries do you specialize in?',
        answer: 'I work with companies across various industries including technology, healthcare, retail, and manufacturing.'
      },
      {
        question: 'How long does a typical engagement last?',
        answer: 'Basic sessions are 2 hours, while full strategic planning engagements can take 7-14 days depending on the package.'
      },
      {
        question: 'Do you provide implementation support?',
        answer: 'Yes! Standard and Premium packages include follow-up sessions and ongoing support to help implement the strategy.'
      }
    ]
  },
  {
    id: 'gig2',
    title: 'IT Transformation & Digital Strategy Consulting',
    description: 'Expert IT transformation consulting to modernize your technology infrastructure and digital capabilities. Services include: • IT strategy and roadmap • Cloud migration planning • Digital transformation roadmap • Technology stack assessment • Cybersecurity evaluation • Digital innovation strategy',
    sellerId: 'seller2',
    sellerName: 'Michael Chen',
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    sellerLevel: 'level2',
    category: 'it-consulting',
    subcategory: 'IT Strategy',
    images: [
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop'
    ],
    price: {
      basic: 50000,
      standard: 150000,
      premium: 300000
    },
    packages: {
      basic: {
        name: 'IT Assessment',
        price: 50000,
        deliveryTime: 5,
        revisions: 1,
        description: 'Technology stack and infrastructure assessment',
        features: [
          'IT infrastructure audit',
          'Technology assessment report',
          'Recommendations document',
          '1 Consultation session',
          '5 Day delivery'
        ]
      },
      standard: {
        name: 'Digital Transformation Plan',
        price: 150000,
        deliveryTime: 14,
        revisions: 2,
        description: 'Complete digital transformation strategy',
        features: [
          'IT strategy document',
          'Cloud migration roadmap',
          'Digital transformation plan',
          'Technology stack recommendations',
          'Implementation timeline',
          '2 Revisions',
          '2 Consultation sessions',
          '14 Day delivery',
          '2 Months support'
        ],
        popular: true
      },
      premium: {
        name: 'Full IT Transformation Program',
        price: 300000,
        deliveryTime: 30,
        revisions: 3,
        description: 'End-to-end IT transformation engagement',
        features: [
          'Comprehensive IT strategy',
          'Cloud architecture design',
          'Cybersecurity assessment',
          'Digital innovation roadmap',
          'Vendor evaluation & selection',
          'Implementation roadmap',
          '3 Revisions',
          '4 Consultation sessions',
          '30 Day delivery',
          '6 Months support',
          'Quarterly reviews'
        ]
      }
    },
    rating: 4.8,
    totalReviews: 189,
    totalOrders: 567,
    tags: ['IT consulting', 'digital transformation', 'cloud strategy', 'technology advisory'],
    createdAt: '2023-05-10',
    updatedAt: '2024-01-15',
    status: 'active'
  },
  {
    id: 'gig3',
    title: 'Financial Planning & Investment Advisory Consultation',
    description: 'Expert financial planning and investment advisory services to optimize your business finances. Services include: • Financial planning and analysis • Investment strategy development • Cash flow optimization • Financial risk assessment • CFO advisory services • Tax planning strategies',
    sellerId: 'seller3',
    sellerName: 'Emily Rodriguez',
    sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    sellerLevel: 'level1',
    category: 'financial-consulting',
    subcategory: 'Financial Planning',
    images: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop'
    ],
    price: {
      basic: 30000,
      standard: 80000,
      premium: 150000
    },
    packages: {
      basic: {
        name: 'Financial Review Session',
        price: 30000,
        deliveryTime: 3,
        revisions: 1,
        description: '2-hour financial consultation',
        features: [
          '2-hour financial consultation',
          'Financial health assessment',
          'Key recommendations report',
          '1 Revision',
          '3 Day delivery'
        ]
      },
      standard: {
        name: 'Financial Planning Package',
        price: 80000,
        deliveryTime: 7,
        revisions: 2,
        description: 'Comprehensive financial planning',
        features: [
          'Initial consultation (3 hours)',
          'Financial planning document',
          'Cash flow analysis',
          'Investment strategy recommendations',
          'Risk assessment report',
          '2 Revisions',
          '2 Follow-up sessions',
          '7 Day delivery',
          '1 Month support'
        ],
        popular: true
      },
      premium: {
        name: 'CFO Advisory Program',
        price: 150000,
        deliveryTime: 14,
        revisions: 3,
        description: 'Full financial advisory engagement',
        features: [
          'Deep-dive consultation (4 hours)',
          'Comprehensive financial strategy',
          'Multi-year financial planning',
          'Investment portfolio optimization',
          'Tax planning strategies',
          'Risk management framework',
          '3 Revisions',
          '4 Follow-up sessions',
          '14 Day delivery',
          '3 Months ongoing advisory'
        ]
      }
    },
    rating: 4.7,
    totalReviews: 156,
    totalOrders: 423,
    tags: ['financial planning', 'investment advisory', 'CFO services', 'financial consulting'],
    createdAt: '2023-08-20',
    updatedAt: '2024-01-18',
    status: 'active'
  },
  {
    id: 'gig4',
    title: 'HR Strategy & Organizational Development Consulting',
    description: 'Comprehensive HR consulting services to transform your people strategy and organizational effectiveness. Services include: • HR strategy development • Talent acquisition strategy • Organizational structure design • Performance management systems • Leadership development programs • Employee engagement strategies',
    sellerId: 'seller1',
    sellerName: 'Sarah Johnson',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    sellerLevel: 'top',
    category: 'hr-consulting',
    subcategory: 'HR Strategy',
    images: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop'
    ],
    price: {
      basic: 40000,
      standard: 100000,
      premium: 200000
    },
    packages: {
      basic: {
        name: 'HR Assessment',
        price: 40000,
        deliveryTime: 5,
        revisions: 1,
        description: 'HR function assessment and recommendations',
        features: [
          'HR function audit',
          'Assessment report',
          'Key recommendations',
          '1 Consultation session',
          '5 Day delivery'
        ]
      },
      standard: {
        name: 'HR Strategy Development',
        price: 100000,
        deliveryTime: 14,
        revisions: 2,
        description: 'Complete HR strategy and programs',
        features: [
          'HR strategy document',
          'Talent acquisition plan',
          'Performance management framework',
          'Organizational structure design',
          'Implementation roadmap',
          '2 Revisions',
          '2 Consultation sessions',
          '14 Day delivery',
          '2 Months support'
        ],
        popular: true
      },
      premium: {
        name: 'Full HR Transformation',
        price: 200000,
        deliveryTime: 30,
        revisions: 3,
        description: 'End-to-end HR transformation',
        features: [
          'Comprehensive HR strategy',
          'Talent management system',
          'Leadership development program',
          'Culture transformation plan',
          'Change management strategy',
          '3 Revisions',
          '4 Consultation sessions',
          '30 Day delivery',
          '6 Months support',
          'Quarterly reviews'
        ]
      }
    },
    rating: 4.9,
    totalReviews: 298,
    totalOrders: 987,
    tags: ['HR consulting', 'organizational development', 'talent strategy', 'HR strategy'],
    createdAt: '2023-02-05',
    updatedAt: '2024-01-22',
    status: 'active'
  },
  {
    id: 'gig5',
    title: 'Marketing Strategy & Brand Consulting Services',
    description: 'Strategic marketing and brand consulting to elevate your market presence and drive growth. Services include: • Marketing strategy development • Brand positioning and identity • Market research and analysis • Go-to-market strategy • Digital marketing roadmap • Brand storytelling and messaging',
    sellerId: 'seller2',
    sellerName: 'Michael Chen',
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    sellerLevel: 'level2',
    category: 'marketing-consulting',
    subcategory: 'Marketing Strategy',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
    ],
    price: {
      basic: 35000,
      standard: 90000,
      premium: 180000
    },
    packages: {
      basic: {
        name: 'Marketing Review',
        price: 35000,
        deliveryTime: 5,
        revisions: 1,
        description: 'Marketing strategy assessment',
        features: [
          'Marketing audit',
          'Strategy assessment report',
          'Key recommendations',
          '1 Consultation session',
          '5 Day delivery'
        ]
      },
      standard: {
        name: 'Marketing Strategy Package',
        price: 90000,
        deliveryTime: 14,
        revisions: 2,
        description: 'Complete marketing strategy',
        features: [
          'Marketing strategy document',
          'Brand positioning framework',
          'Go-to-market strategy',
          'Market research summary',
          'Digital marketing roadmap',
          '2 Revisions',
          '2 Consultation sessions',
          '14 Day delivery',
          '2 Months support'
        ],
        popular: true
      },
      premium: {
        name: 'Full Brand & Marketing Program',
        price: 180000,
        deliveryTime: 30,
        revisions: 3,
        description: 'Complete brand and marketing transformation',
        features: [
          'Comprehensive marketing strategy',
          'Brand identity framework',
          'Market research and insights',
          'Go-to-market plan',
          'Content strategy',
          'Digital marketing roadmap',
          '3 Revisions',
          '4 Consultation sessions',
          '30 Day delivery',
          '6 Months support',
          'Quarterly strategy reviews'
        ]
      }
    },
    rating: 4.8,
    totalReviews: 234,
    totalOrders: 678,
    tags: ['marketing strategy', 'brand consulting', 'go-to-market', 'marketing'],
    createdAt: '2023-06-12',
    updatedAt: '2024-01-19',
    status: 'active'
  },
  {
    id: 'gig6',
    title: 'Startup Advisory & Growth Strategy Consulting',
    description: 'Comprehensive startup advisory services to accelerate your growth and scale your business. Services include: • Startup strategy and roadmap • Fundraising advisory • Product-market fit analysis • Growth strategy development • Scaling and operations • Investor pitch preparation',
    sellerId: 'seller3',
    sellerName: 'Emily Rodriguez',
    sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    sellerLevel: 'level1',
    category: 'startup-consulting',
    subcategory: 'Startup Strategy',
    images: [
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556155092-8c96b4b90dc6?w=800&h=600&fit=crop'
    ],
    price: {
      basic: 30000,
      standard: 75000,
      premium: 150000
    },
    packages: {
      basic: {
        name: 'Startup Strategy Session',
        price: 30000,
        deliveryTime: 3,
        revisions: 1,
        description: '2-hour startup advisory session',
        features: [
          '2-hour strategy session',
          'Business model review',
          'Growth recommendations',
          '1 Revision',
          '3 Day delivery'
        ]
      },
      standard: {
        name: 'Startup Growth Package',
        price: 75000,
        deliveryTime: 10,
        revisions: 2,
        description: 'Complete startup strategy and growth plan',
        features: [
          'Initial consultation (3 hours)',
          'Startup strategy document',
          'Product-market fit analysis',
          'Growth strategy roadmap',
          'Fundraising guidance',
          '2 Revisions',
          '2 Follow-up sessions',
          '10 Day delivery',
          '2 Months mentorship'
        ],
        popular: true
      },
      premium: {
        name: 'Full Startup Advisory Program',
        price: 150000,
        deliveryTime: 21,
        revisions: 3,
        description: 'Comprehensive startup advisory and mentorship',
        features: [
          'Deep-dive consultation (4 hours)',
          'Complete startup strategy',
          'Fundraising strategy and materials',
          'Product-market fit framework',
          'Scaling and operations plan',
          'Investor pitch deck review',
          '3 Revisions',
          '4 Follow-up sessions',
          '21 Day delivery',
          '6 Months mentorship',
          'Quarterly strategy sessions'
        ]
      }
    },
    rating: 4.7,
    totalReviews: 142,
    totalOrders: 389,
    tags: ['startup advisory', 'growth strategy', 'fundraising', 'startup consulting'],
    createdAt: '2023-09-08',
    updatedAt: '2024-01-21',
    status: 'active'
  }
];
