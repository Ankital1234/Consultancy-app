import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Briefcase,
  Code,
  TrendingUp,
  DollarSign,
  Users,
  Gavel,
  Heart,
  Clipboard,
  UserSearch,
  UserCheck,
  Handshake,
  BarChart,
  Shield,
  Star,
  Clock,
  CheckCircle,
  ArrowRight,
  Filter,
  FileText,
} from 'lucide-react';
import { useState } from 'react';
import PremiumFooter from '@/components/PremiumFooter';

const CompanyLanding = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Business Strategy', icon: Briefcase, count: 450 },
    { name: 'IT Consulting', icon: Code, count: 380 },
    { name: 'Marketing', icon: TrendingUp, count: 320 },
    { name: 'Finance', icon: DollarSign, count: 290 },
    { name: 'HR Consulting', icon: Users, count: 260 },
    { name: 'Legal', icon: Gavel, count: 180 },
    { name: 'Healthcare', icon: Heart, count: 150 },
    { name: 'Operations', icon: BarChart, count: 210 },
  ];

  const howToFindSteps = [
    {
      title: 'Define Your Needs',
      description: 'Identify what type of consulting you need',
      detail: 'Use our project requirement template to clearly outline your goals, timeline, and budget',
      icon: Clipboard,
    },
    {
      title: 'Browse & Search',
      description: 'Filter consultants by expertise, rating, and price',
      detail: 'Use advanced filters to find consultants that match your specific requirements',
      icon: UserSearch,
    },
    {
      title: 'Review Profiles',
      description: 'Check experience, certifications, and reviews',
      detail: 'View detailed profiles including past projects, client testimonials, and ratings',
      icon: UserCheck,
    },
    {
      title: 'Send Request or Hire',
      description: 'Contact consultants and discuss project details',
      detail: 'Send project requests or hire directly. Communicate through our secure messaging system',
      icon: Handshake,
    },
    {
      title: 'Manage & Pay',
      description: 'Track progress and make secure payments',
      detail: 'Monitor project milestones and pay securely through our Razorpay integration',
      icon: BarChart,
    },
  ];

  const benefits = [
    {
      title: 'Access to Verified Experts',
      description: 'All consultants are thoroughly vetted and verified for expertise and credibility',
      icon: Shield,
    },
    {
      title: 'Transparent Pricing',
      description: 'Clear pricing structure with no hidden fees. Compare rates easily',
      icon: DollarSign,
    },
    {
      title: 'Secure Payment System',
      description: 'Integrated with Razorpay for safe, encrypted payment processing',
      icon: CheckCircle,
    },
    {
      title: 'Project Management Tools',
      description: 'Built-in tools to track progress, manage deliverables, and communicate',
      icon: BarChart,
    },
    {
      title: 'Quality Guarantee',
      description: 'Our review system ensures accountability and high-quality service delivery',
      icon: Star,
    },
    {
      title: '24/7 Support',
      description: 'Dedicated support team ready to assist you throughout your project',
      icon: Clock,
    },
  ];

  const featuredConsultants = [
    {
      name: 'Sarah Johnson',
      title: 'Business Strategy Consultant',
      rating: 4.9,
      reviews: 127,
      hourlyRate: 5000,
      expertise: ['Strategy', 'Growth', 'Operations'],
      hasResume: true,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    },
    {
      name: 'Michael Chen',
      title: 'IT & Digital Transformation',
      rating: 5.0,
      reviews: 98,
      hourlyRate: 6000,
      expertise: ['Cloud', 'DevOps', 'AI/ML'],
      hasResume: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    },
    {
      name: 'Emily Rodriguez',
      title: 'Marketing Strategist',
      rating: 4.8,
      reviews: 156,
      hourlyRate: 4500,
      expertise: ['Digital Marketing', 'SEO', 'Content'],
      hasResume: false,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/consultants?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Welcome Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FDFBF7] to-[#F5F0ED] border-b border-[#E8E3DE]">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-[#D4C5B9] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-[#2B2520]"
            >
              Welcome, {user?.name || 'Company'}!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl mb-8 text-[#8B8680]"
            >
              Find the Perfect Consultant for Your Business
            </motion.p>

            {/* Search Bar */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onSubmit={handleSearch}
              className="max-w-2xl mx-auto"
            >
              <div className="flex gap-2 bg-white rounded-lg p-2 shadow-sm border-2 border-[#D4C5B9] focus-within:border-[#C9A876] transition-colors">
                <div className="flex items-center justify-center ml-3">
                  <Search className="w-5 h-5 text-[#8B8680]" />
                </div>
                <Input
                  type="text"
                  placeholder="Search for consultants by expertise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 focus-visible:ring-0 text-[#2B2520] placeholder:text-[#A8A892] text-lg flex-1"
                />
                <Button type="submit" size="lg" className="bg-[#D4C5B9] hover:bg-[#C4B5A9] text-white transition-all duration-200">
                  Search
                </Button>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Browse Services Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#2B2520] mb-4">
            Browse Consulting Services
          </h2>
          <p className="text-lg text-[#8B8680] max-w-2xl mx-auto">
            Explore our diverse range of consulting categories and find the expertise you need
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -10, scale: 1.05 }}
              onClick={() => navigate(`/consultants?category=${category.name}`)}
              className="cursor-pointer"
            >
              <Card className="h-full border-2 border-[#E8E3DE] hover:border-[#D4C5B9] hover:bg-[#F9F6F3] transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[#F5E6D3] group-hover:bg-[#D4C5B9] flex items-center justify-center transition-colors duration-300"
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <category.icon className="w-8 h-8 text-[#8B8680] group-hover:text-white transition-colors duration-300" />
                  </motion.div>
                  <h3 className="font-bold text-[#2B2520] mb-2">{category.name}</h3>
                  <p className="text-sm text-[#8B8680]">{category.count} consultants</p>
                  <div className="mt-3 flex items-center justify-center text-[#D4C5B9] font-medium text-sm group-hover:translate-x-1 transition-transform">
                    Browse
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            onClick={() => navigate('/consultants')}
            className="bg-[#D4C5B9] hover:bg-[#C4B5A9] text-white shadow-sm transition-all duration-200"
          >
            <Filter className="mr-2 w-5 h-5" />
            View All Consultants
          </Button>
        </motion.div>
      </section>

      {/* How to Find Consultants Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B2520] mb-4">
              How to Get Started
            </h2>
            <p className="text-lg text-[#8B8680] max-w-2xl mx-auto">
              Finding and hiring the right consultant is easy with our streamlined process
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {howToFindSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex gap-6 mb-8">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-[#B89B8E] text-white flex items-center justify-center font-bold text-xl shadow-sm">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-6 border-2 border-[#E8E3DE] hover:border-[#B89B8E] transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <step.icon className="w-7 h-7 text-[#B89B8E] flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-[#2B2520] mb-2">{step.title}</h3>
                        <p className="text-[#8B8680] font-medium mb-2">{step.description}</p>
                        <p className="text-[#8B8680] text-sm leading-relaxed">{step.detail}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {index < howToFindSteps.length - 1 && (
                  <div className="absolute left-7 top-14 bottom-0 w-0.5 bg-gradient-to-b from-[#B89B8E] to-[#E8E3DE]" />
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              onClick={() => navigate('/consultants')}
              className="bg-[#B89B8E] hover:bg-[#A88B7E] text-white shadow-sm transition-all duration-200"
            >
              Browse Consultants Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Consultants Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#2B2520] mb-4">
            Top Rated Consultants
          </h2>
          <p className="text-lg text-[#8B8680] max-w-2xl mx-auto">
            Meet some of our highest-rated consultants ready to help your business succeed
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredConsultants.map((consultant, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card className="h-full border-2 border-[#E8E3DE] hover:border-[#D4C5B9] hover:bg-[#F9F6F3] transition-all duration-300 overflow-hidden group">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <img
                      src={consultant.image}
                      alt={consultant.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-[#E8E3DE] group-hover:border-[#D4C5B9] transition-all"
                    />
                    <h3 className="text-xl font-bold text-[#2B2520] mb-1">{consultant.name}</h3>
                    <p className="text-[#8B8680] mb-3">{consultant.title}</p>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-[#2B2520]">{consultant.rating}</span>
                      <span className="text-[#8B8680] text-sm">({consultant.reviews} reviews)</span>
                    </div>
                  </div>
                  {consultant.hasResume && (
                    <div className="mb-3 flex items-center justify-center gap-2 px-3 py-1.5 bg-[#FAF3E6] border border-[#C9A876] rounded-full">
                      <FileText className="w-4 h-4 text-[#C9A876]" />
                      <span className="text-sm font-medium text-[#C9A876]">Resume Available</span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mb-4 justify-center">
                    {consultant.expertise.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-[#F5E6D3] text-[#8B8680]">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-center mb-4">
                    <p className="text-sm text-[#8B8680]">Starting at</p>
                    <p className="text-2xl font-bold text-[#2B2520]">₹{consultant.hourlyRate.toLocaleString()}/hr</p>
                  </div>
                  <Button
                    onClick={() => navigate('/consultants')}
                    className="w-full bg-[#D4C5B9] hover:bg-[#C4B5A9] text-white transition-all duration-200"
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Companies Choose Us Section */}
      <section className="bg-[#F5E6D3] py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B2520] mb-4">
              Why Companies Choose Us
            </h2>
            <p className="text-lg text-[#8B8680] max-w-2xl mx-auto">
              Discover the advantages that make us the preferred platform for hiring consultants
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="h-full border-2 border-[#E8E3DE] hover:border-[#D4C5B9] bg-white hover:bg-[#F9F6F3] transition-all duration-300">
                  <CardContent className="p-6">
                    <benefit.icon className="w-12 h-12 text-[#D4C5B9] mb-4" />
                    <h3 className="text-xl font-bold text-[#2B2520] mb-3">{benefit.title}</h3>
                    <p className="text-[#8B8680] leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#D4C5B9] to-[#B89B8E] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Find Your Perfect Consultant?
            </h2>
            <p className="text-xl mb-8 text-[#F9F6F3] max-w-2xl mx-auto">
              Browse thousands of verified consultants and start your project today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/consultants')}
                className="bg-white text-[#2B2520] hover:bg-[#F9F6F3] shadow-lg transition-all duration-200"
              >
                Browse Consultants
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                onClick={() => navigate('/dashboard')}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 transition-all duration-200"
              >
                View Dashboard
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <PremiumFooter />
    </div>
  );
};

export default CompanyLanding;
