import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Star, Users, Clock, Sparkles, Zap, Shield, Award, TrendingUp, CheckCircle, ChevronLeft, ChevronRight, Quote, Building2, Briefcase } from 'lucide-react';
import ConsultantCard from '@/components/ConsultantCard';
import PremiumFooter from '@/components/PremiumFooter';
import { mockConsultants } from '@/data/mockData';
import { useState, useEffect } from 'react';

const Home = () => {
  const featuredConsultants = mockConsultants.slice(0, 6);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      content: 'MentorMe connected me with an incredible business consultant who helped us scale from 10 to 50 employees in just 6 months. The platform is intuitive and the consultants are top-notch.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Founder, Digital Solutions',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      content: 'As a consultant on this platform, I\'ve been able to connect with amazing clients and grow my practice significantly. The booking system is seamless and professional.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director, GrowthCo',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      content: 'The quality of consultants on MentorMe is exceptional. I found a marketing strategist who transformed our entire approach. Highly recommend this platform!',
      rating: 5,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextFeatured = () => {
    setCurrentFeaturedIndex((prev) => Math.min(prev + 3, featuredConsultants.length - 3));
  };

  const prevFeatured = () => {
    setCurrentFeaturedIndex((prev) => Math.max(prev - 3, 0));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Professional Imagery */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80 z-10" />
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&q=80"
            alt="Professional consulting team collaboration"
            className="w-full h-full object-cover"
          />
          {/* Animated overlay elements */}
          <motion.div
            className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl z-20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-30">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20"
              >
                <Award className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Trusted by 10,000+ Professionals</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold text-foreground leading-tight"
              >
                Connect with
                <span className="block bg-gradient-to-r from-primary via-purple-500 to-teal-500 bg-clip-text text-transparent">
                  Expert Consultants
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-muted-foreground leading-relaxed max-w-xl"
              >
                Transform your business with personalized guidance from verified industry experts. Book sessions instantly and accelerate your growth.
              </motion.p>
              
              {/* CTA Buttons - Role Based */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/auth?tab=signup&role=company">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25">
                    Register as Company
                  </Button>
                </Link>
                <Link to="/auth?tab=signup&role=consultant">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 hover:bg-teal-500/5 hover:border-teal-500">
                    Register as Consultant
                  </Button>
                </Link>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-8 pt-4"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-muted-foreground">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-muted-foreground">Instant booking</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Featured Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block relative"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=700&fit=crop&q=80"
                  alt="Professional consultant in modern workspace"
                  className="rounded-2xl shadow-2xl"
                />
                {/* Floating Stats Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -bottom-6 -left-6 bg-card/95 backdrop-blur-lg border border-border rounded-xl p-6 shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">98%</div>
                      <div className="text-sm text-muted-foreground">Success Rate</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, label: 'Expert Consultants', value: '500+', gradient: 'from-blue-500 to-purple-500' },
              { icon: Star, label: 'Average Rating', value: '4.9', gradient: 'from-purple-500 to-pink-500' },
              { icon: Clock, label: 'Sessions Completed', value: '10,000+', gradient: 'from-teal-500 to-blue-500' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="text-center relative group"
              >
                <div className="p-8 rounded-2xl bg-background/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${stat.gradient} bg-opacity-10 mb-4`}>
                    <stat.icon className="h-12 w-12 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
                {/* Hover glow effect */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10 blur-xl`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Consultants */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Consultants
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet some of our top-rated consultants ready to help you succeed
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredConsultants.map((consultant, index) => (
              <ConsultantCard
                key={consultant.id}
                consultant={consultant}
                index={index}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/consultants">
              <Button size="lg" variant="outline">
                View All Consultants
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-gradient-to-b from-card to-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real stories from professionals who transformed their business with our consultants
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 shadow-xl">
                  {/* Quote Icon */}
                  <div className="absolute -top-6 left-8 p-4 rounded-full bg-gradient-to-br from-primary to-purple-600">
                    <Quote className="w-6 h-6 text-white" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-6 mt-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">
                    "{testimonials[currentTestimonial].content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                    />
                    <div>
                      <div className="font-semibold text-foreground text-lg">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-muted-foreground">
                        {testimonials[currentTestimonial].role}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-card border border-border hover:bg-primary/10 hover:border-primary transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </motion.button>

              {/* Dots Indicator */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? 'w-8 bg-primary'
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-card border border-border hover:bg-primary/10 hover:border-primary transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-b from-background to-card relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose MentorMe?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We connect you with the best consultants to accelerate your growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'Verified Experts',
                description: 'All consultants are thoroughly vetted and verified professionals with proven track records.',
                gradient: 'from-blue-500 to-purple-500',
              },
              {
                icon: Zap,
                title: 'Instant Booking',
                description: 'Book sessions instantly with our streamlined scheduling system. No waiting, no hassle.',
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                icon: Shield,
                title: 'Secure & Private',
                description: 'Your data and conversations are protected with enterprise-grade security measures.',
                gradient: 'from-teal-500 to-blue-500',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 h-full">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-10 mb-6`}>
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                {/* Hover glow effect */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10 blur-xl`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <PremiumFooter />
    </div>
  );
};

export default Home;
