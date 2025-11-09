import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Star, Clock, TrendingUp, Sparkles, Users, Building2, Briefcase, Shield, Award, CheckCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { categories, mockGigs } from '@/data/gigsData';
import { motion, useInView } from 'framer-motion';
import PremiumFooter from '@/components/PremiumFooter';
import { formatINR } from '@/utils/formatINR';
import TypingAnimation from '@/components/ui/TypingAnimation';
import FloatingElement from '@/components/ui/FloatingElement';
import { useRef } from 'react';

const MarketplaceHome = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const categoriesRef = useRef(null);
  const statsRef = useRef(null);

  const servicesInView = useInView(servicesRef, { once: true, amount: 0.2 });
  const categoriesInView = useInView(categoriesRef, { once: true, amount: 0.2 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.5 });

  // Start typing animation only on page load/refresh
  useEffect(() => {
    setStartTyping(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/marketplace');
    }
  };

  const displayedGigs = mockGigs;

  // Particle animation variants
  const particleVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      opacity: [0.3, 0.7, 0.3],
      scale: [1, 1.2, 1],
    },
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FDFBF7] to-[#FAF3E6] border-b border-[#E8E3DE]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-[#D4C5B9] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <div ref={heroRef} className="relative container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="mb-6">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#2B2520] min-h-[120px] md:min-h-[150px] flex items-center justify-center">
                {startTyping ? (
                  <TypingAnimation
                    text="Connect Consultants & Companies"
                    speed={50}
                    className="relative inline-block"
                    onComplete={() => setTypingComplete(true)}
                  />
                ) : (
                  <span className="opacity-0">Connect Consultants & Companies</span>
                )}
                {typingComplete && (
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '100%', opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute bottom-4 md:bottom-6 left-0 right-0 h-1 bg-[#C9A876] opacity-60 mx-auto max-w-4xl"
                  />
                )}
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={typingComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl md:text-2xl mb-8 text-[#8B8680]"
            >
              Your trusted platform for expert consulting services and business growth
            </motion.p>

            {/* Dual CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={typingComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  onClick={() => navigate('/signup?type=consultant')}
                  className="bg-white hover:bg-[#F9F1E8] text-[#2B2520] border-2 border-[#C9A876] shadow-sm px-8 transition-all duration-200"
                >
                  Become a Consultant
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  onClick={() => navigate('/signup?type=user')}
                  className="bg-[#F5E6D3] hover:bg-[#E8DCC8] text-[#2B2520] border-2 border-[#D4C5B9] shadow-sm px-8 transition-all duration-200"
                >
                  Find Consultants
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Search Bar */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={typingComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              onSubmit={handleSearch}
              className="max-w-2xl mx-auto"
            >
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileFocus={{ scale: 1.01 }}
                className="flex gap-2 bg-white rounded-lg p-2 shadow-sm border-2 border-[#D4C5B9] focus-within:border-[#C9A876] transition-colors"
              >
                <div className="flex items-center justify-center ml-3">
                  <FloatingElement>
                    <Search className="w-5 h-5 text-[#8B8680]" />
                  </FloatingElement>
                </div>
                <Input
                  type="text"
                  placeholder="Try 'business strategy' or 'financial consulting'"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 focus-ring-0 text-[#2B2520] placeholder:text-[#A8A892] text-lg flex-1"
                />
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" size="lg" className="bg-[#C9A876] hover:bg-[#B89B7F] text-white border border-[#C9A876] transition-all duration-200">
                    Search
                  </Button>
                </motion.div>
              </motion.div>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={typingComplete ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-600"
            >
              {[
                { icon: TrendingUp, text: 'Trending: Business Strategy' },
                { icon: Star, text: 'IT Consulting' },
                { icon: Star, text: 'Financial Planning' },
              ].map((item, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={typingComplete ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  className="flex items-center gap-1"
                >
                  <item.icon className="w-4 h-4" />
                  {item.text}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section ref={servicesRef} className="container mx-auto px-4 py-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={servicesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={servicesInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold text-[#2B2520] mb-4 relative inline-block"
          >
            About Us
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-[#C9A876] rounded-full"
              initial={{ scaleX: 0 }}
              animate={servicesInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.h2>
        </motion.div>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-[#8B8680] mb-6 leading-relaxed"
          >
            We're revolutionizing the consulting industry by creating a seamless platform that connects talented consultants with companies seeking expert guidance. Our mission is to make professional consulting accessible, transparent, and effective for businesses of all sizes.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-[#8B8680] leading-relaxed"
          >
            Our vision is to build a thriving ecosystem where expertise meets opportunity, enabling consultants to grow their practice while helping companies achieve their strategic goals.
          </motion.p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { number: '5,000+', label: 'Verified Consultants', icon: Users },
            { number: '2,500+', label: 'Companies Registered', icon: Building2 },
            { number: '25,000+', label: 'Projects Completed', icon: Briefcase },
            { number: '4.9/5', label: 'Average Rating', icon: Star },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={servicesInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.4, type: 'spring' }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#E8E3DE] hover:border-[#D4C5B9] transition-all duration-300 h-full">
                <motion.div
                  className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#C9A876] flex items-center justify-center"
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </motion.div>
                <div className="text-3xl font-bold text-[#C9A876] mb-2">{stat.number}</div>
                <div className="text-sm text-[#8B8680]">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Trust & Transparency', description: 'Every consultant is verified and reviewed to ensure quality and reliability', icon: Shield },
            { title: 'Excellence', description: 'We maintain high standards to deliver exceptional consulting experiences', icon: Award },
            { title: 'Innovation', description: 'Continuously improving our platform to serve you better', icon: Sparkles },
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 border-2 border-[#D4C5B9] hover:border-[#C9A876] transition-all duration-300"
            >
              <value.icon className="w-10 h-10 text-[#C9A876] mb-4" />
              <h3 className="text-xl font-bold text-[#2B2520] mb-3">{value.title}</h3>
              <p className="text-[#8B8680] leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-[#FDFBF7] py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#2B2520] mb-4">Why Choose Our Platform</h2>
            <p className="text-lg text-[#8B8680] max-w-2xl mx-auto">Discover the advantages that make us the preferred choice for consultants and companies</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Verified Consultants', description: 'All consultants undergo rigorous verification to ensure expertise and credibility', icon: CheckCircle },
              { title: 'Secure Payments', description: 'Integrated with Razorpay for safe, encrypted payment processing', icon: Shield },
              { title: 'Wide Range of Services', description: 'Access consultants across diverse industries and specializations', icon: Sparkles },
              { title: 'Easy Management', description: 'Intuitive admin dashboard to track projects, payments, and communications', icon: Zap },
              { title: 'Transparent Reviews', description: 'Honest ratings and reviews help you make informed decisions', icon: Star },
              { title: '24/7 Support', description: 'Our dedicated support team is always ready to assist you', icon: Clock },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-[#E8E3DE] hover:border-[#D4C5B9] hover:bg-[#F9F6F3] transition-all duration-300 h-full">
                  <motion.div
                    className="w-14 h-14 mb-6 rounded-xl bg-[#C9A876] flex items-center justify-center"
                    whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-[#2B2520] mb-3">{feature.title}</h3>
                  <p className="text-[#8B8680] leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#2B2520] mb-4">How It Works</h2>
          <p className="text-lg text-[#8B8680] max-w-2xl mx-auto">Simple steps to connect and collaborate</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* For Users */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#F5E6D3] rounded-2xl p-8 border-2 border-[#E8E3DE]"
          >
            <h3 className="text-2xl font-bold text-[#2B2520] mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-[#C9A876]" />
              For Users
            </h3>
            <div className="space-y-6">
              {[
                { step: 1, title: 'Sign Up & Browse', description: 'Create your account and explore verified consultants' },
                { step: 2, title: 'Review Profiles', description: 'Check expertise, ratings, and past project reviews' },
                { step: 3, title: 'Hire & Collaborate', description: 'Connect securely and start your project' },
                { step: 4, title: 'Rate & Review', description: 'Share your experience to help others' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C9A876] text-white flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2B2520] mb-1">{item.title}</h4>
                    <p className="text-[#8B8680] text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* For Consultants */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#F5E6D3] rounded-2xl p-8 border-2 border-[#E8E3DE]"
          >
            <h3 className="text-2xl font-bold text-[#2B2520] mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-[#C9A876]" />
              For Consultants
            </h3>
            <div className="space-y-6">
              {[
                { step: 1, title: 'Create Profile', description: 'Sign up and showcase your expertise and experience' },
                { step: 2, title: 'Get Verified', description: 'Complete verification to build trust with clients' },
                { step: 3, title: 'Receive Requests', description: 'Companies discover and contact you for projects' },
                { step: 4, title: 'Deliver & Earn', description: 'Complete projects and receive secure payments' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#D4C5B9] text-white flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2B2520] mb-1">{item.title}</h4>
                    <p className="text-[#8B8680] text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section ref={categoriesRef} className="bg-[#E8E3DE] py-16 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(201, 168, 118, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(212, 197, 185, 0.3) 0%, transparent 50%)',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={categoriesInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, type: 'spring' }}
              className="text-3xl md:text-4xl font-bold text-[#2B2520] mb-4"
            >
              Explore by Category
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[#8B8680] text-lg"
            >
              Discover expert consultants across various business domains
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={categoriesInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                onClick={() => navigate(`/marketplace?category=${category.id}`)}
                className="group cursor-pointer bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 border-2 border-[#E8E3DE] hover:border-[#C9A876] relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#C9A876]/0 to-[#D4C5B9]/0 group-hover:from-[#C9A876]/5 group-hover:to-[#D4C5B9]/5 transition-all duration-500"
                />
                <motion.div
                  className="w-12 h-12 rounded-lg bg-[#F5E6D3] flex items-center justify-center mb-3 group-hover:bg-[#C9A876] transition-colors relative"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-[#C9A876]/10 rounded-lg"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
                <h3 className="font-semibold text-[#2B2520] mb-2 group-hover:text-[#C9A876] transition-colors relative z-10">
                  {category.name}
                </h3>
                <p className="text-sm text-[#8B8680] mb-4 line-clamp-2 relative z-10">
                  {category.description}
                </p>
                <motion.div
                  className="flex items-center text-[#C9A876] font-medium text-sm relative z-10"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  Explore
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section ref={statsRef} className="bg-[#FDFBF7] py-12 border-t border-[#E8E3DE] relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: '10K+', label: 'Companies Served' },
              { number: '500+', label: 'Expert Consultants' },
              { number: '50K+', label: 'Consultation Hours' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={statsInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  type: 'spring',
                  stiffness: 100
                }}
                whileHover={{ scale: 1.1, y: -10 }}
                className="relative"
              >
                <motion.div
                  className="absolute inset-0 bg-[#C9A876] opacity-0 blur-xl group-hover:opacity-10 transition-opacity"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0, 0.1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />
                <motion.div
                  className="text-3xl font-bold text-[#C9A876] mb-2 relative z-10"
                  animate={statsInView ? {
                    backgroundImage: [`linear-gradient(to right, #1f2937, #1f2937)`, `linear-gradient(to right, var(--tw-gradient-stops))`],
                  } : {}}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={statsInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  >
                    {stat.number.split('').map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        initial={{ opacity: 0, y: -20 }}
                        animate={statsInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ 
                          duration: 0.3, 
                          delay: index * 0.2 + charIndex * 0.1 
                        }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={statsInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
                  className="text-[#8B8680] relative z-10"
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <PremiumFooter />
    </div>
  );
};

interface GigCardProps {
  gig: typeof mockGigs[0];
  index: number;
  isInView?: boolean;
}

const GigCard = ({ gig, index, isInView = true }: GigCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'top':
        return <Badge className="bg-purple-100 text-purple-800 text-xs">Top Rated</Badge>;
      case 'level2':
        return <Badge className="bg-blue-100 text-blue-800 text-xs">Level 2</Badge>;
      case 'level1':
        return <Badge className="bg-green-100 text-green-800 text-xs">Level 1</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">New</Badge>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100
      }}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        className="cursor-pointer hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-200 relative"
        onClick={() => navigate(`/gig/${gig.id}`)}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 pointer-events-none"
        />
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          <motion.img
            src={gig.images[0]}
            alt={gig.title}
            className="w-full h-full object-cover"
            animate={isHovered ? { scale: 1.15 } : { scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          {gig.packages.standard.popular && (
            <motion.div
              className="absolute top-2 right-2"
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3, type: 'spring' }}
            >
              <Badge className="bg-yellow-500 text-white text-xs">
                <Sparkles className="w-3 h-3 mr-1 inline" />
                Popular
              </Badge>
            </motion.div>
          )}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
        <CardContent className="p-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
            className="flex items-start justify-between mb-2"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <motion.img
                src={gig.sellerAvatar}
                alt={gig.sellerName}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">{gig.sellerName}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {getLevelBadge(gig.sellerLevel)}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
            className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors text-sm min-h-[40px]"
          >
            {gig.title}
          </motion.h3>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
            className="flex items-center gap-2 mb-3"
          >
            <div className="flex items-center gap-1">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </motion.div>
              <span className="text-sm font-medium text-gray-900">{gig.rating}</span>
            </div>
            <span className="text-gray-400 text-xs">({gig.totalReviews})</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
            className="flex items-center justify-between pt-3 border-t"
          >
            <div>
              <span className="text-xs text-gray-500">Starting at</span>
              <motion.p
                className="text-lg font-bold text-gray-900"
                animate={isHovered ? { scale: 1.1, color: '#2563eb' } : {}}
                transition={{ duration: 0.2 }}
              >
                {formatINR(gig.price.basic)}
              </motion.p>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Clock className="w-3 h-3" />
              </motion.div>
              <span>{gig.packages.basic.deliveryTime} {gig.packages.basic.deliveryTime === 1 ? 'day' : 'days'}</span>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MarketplaceHome;
