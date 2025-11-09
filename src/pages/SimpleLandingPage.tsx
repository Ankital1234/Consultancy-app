import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Briefcase,
  Search,
  CheckCircle2,
  Star,
  Users,
  Shield,
  TrendingUp,
  Clock,
  Award,
  MessageSquare,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const SimpleLandingPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const consultantFeatures = [
    'Set your own hourly rates',
    'Build your professional brand',
    'Flexible work schedule',
    'Secure payment processing',
    'Connect with clients worldwide',
  ];

  const clientFeatures = [
    'Browse verified consultants',
    'Compare expertise and rates',
    'Read reviews and ratings',
    'Secure booking system',
    'Direct messaging with consultants',
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Consultant',
      image: 'SJ',
      rating: 5,
      text: 'This platform has transformed my consulting business. I\'ve connected with amazing clients and grown my income significantly.',
    },
    {
      name: 'Michael Chen',
      role: 'Business Owner',
      image: 'MC',
      rating: 5,
      text: 'Finding the right consultant was so easy! The platform made it simple to compare options and book the perfect expert for our needs.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'IT Consultant',
      image: 'ER',
      rating: 5,
      text: 'Love the flexibility and professional tools. The payment system is seamless and clients are always satisfied.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F5EFE9]">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-gradient-to-br from-[#0088CC] to-[#00A8E8] rounded-lg flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-[#2C3E50]">consultancy.co</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-gray-700 hover:text-[#0088CC] transition-colors">
                How It Works
              </a>
              <a href="#features" className="text-gray-700 hover:text-[#0088CC] transition-colors">
                Features
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-[#0088CC] transition-colors">
                Testimonials
              </a>
              <Button
                variant="outline"
                onClick={() => navigate('/auth')}
                className="border-[#0088CC] text-[#0088CC] hover:bg-[#0088CC] hover:text-white"
              >
                Sign In
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden py-4 space-y-4"
            >
              <a href="#how-it-works" className="block text-gray-700 hover:text-[#0088CC]">
                How It Works
              </a>
              <a href="#features" className="block text-gray-700 hover:text-[#0088CC]">
                Features
              </a>
              <a href="#testimonials" className="block text-gray-700 hover:text-[#0088CC]">
                Testimonials
              </a>
              <Button
                variant="outline"
                onClick={() => navigate('/auth')}
                className="w-full border-[#0088CC] text-[#0088CC]"
              >
                Sign In
              </Button>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#2C3E50] mb-6">
            Connect with Expert Consultants
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Whether you're looking to share your expertise or find the perfect consultant,
            we make professional consulting simple and accessible.
          </p>
        </motion.div>

        {/* Two Clear Option Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* Become a Consultant Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-none shadow-2xl hover:shadow-3xl transition-all duration-300 h-full bg-gradient-to-br from-[#0088CC] to-[#00A8E8] text-white overflow-hidden group">
              <CardContent className="p-8">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Briefcase className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold mb-3">Become a Consultant</h2>
                    <p className="text-white/90 mb-6">
                      Share your expertise and earn income on your terms
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {consultantFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                        <span className="text-white/90">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    size="lg"
                    className="w-full bg-white text-[#0088CC] hover:bg-gray-100 shadow-lg group-hover:scale-105 transition-transform"
                    onClick={() => navigate('/signup/consultant')}
                  >
                    Get Started as Consultant
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Find Consultants Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-none shadow-2xl hover:shadow-3xl transition-all duration-300 h-full bg-gradient-to-br from-[#E8D4C4] to-[#D4C4B4] overflow-hidden group">
              <CardContent className="p-8">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Search className="h-8 w-8 text-[#2C3E50]" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#2C3E50] mb-3">Find Consultants</h2>
                    <p className="text-gray-700 mb-6">
                      Discover and hire expert consultants for your projects
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {clientFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#0088CC] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    size="lg"
                    className="w-full bg-[#0088CC] hover:bg-[#0077B3] text-white shadow-lg group-hover:scale-105 transition-transform"
                    onClick={() => navigate('/signup/user')}
                  >
                    Start Finding Consultants
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#2C3E50] mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide everything you need for successful consulting relationships
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Shield,
                title: 'Verified Profiles',
                description: 'All consultants go through a thorough verification process to ensure quality and professionalism.',
              },
              {
                icon: Star,
                title: 'Rating System',
                description: 'Transparent reviews and ratings help you make informed decisions when choosing consultants.',
              },
              {
                icon: Clock,
                title: 'Flexible Scheduling',
                description: 'Book consultations at times that work for you with our easy-to-use scheduling system.',
              },
              {
                icon: Shield,
                title: 'Secure Payments',
                description: 'Protected payment processing ensures safe transactions for both consultants and clients.',
              },
              {
                icon: MessageSquare,
                title: 'Direct Messaging',
                description: 'Communicate directly with consultants to discuss your project requirements and expectations.',
              },
              {
                icon: Award,
                title: 'Quality Assurance',
                description: 'We maintain high standards to ensure you get the best consulting experience possible.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0088CC] to-[#00A8E8] rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#2C3E50] mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-gradient-to-b from-[#F5EFE9] to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#2C3E50] mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">Simple steps to get started</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* For Clients */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-[#2C3E50] mb-6 flex items-center gap-3">
                <Users className="h-8 w-8 text-[#0088CC]" />
                For Clients
              </h3>
              <div className="space-y-6">
                {[
                  { step: 1, title: 'Sign Up & Browse', description: 'Create your account and explore verified consultants' },
                  { step: 2, title: 'Compare & Review', description: 'Check expertise, ratings, and past project reviews' },
                  { step: 3, title: 'Book & Collaborate', description: 'Connect securely and start your project' },
                  { step: 4, title: 'Rate & Review', description: 'Share your experience to help others' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0088CC] text-white flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#2C3E50] mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.description}</p>
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
            >
              <h3 className="text-2xl font-bold text-[#2C3E50] mb-6 flex items-center gap-3">
                <Briefcase className="h-8 w-8 text-[#E8D4C4]" />
                For Consultants
              </h3>
              <div className="space-y-6">
                {[
                  { step: 1, title: 'Create Profile', description: 'Sign up and showcase your expertise and experience' },
                  { step: 2, title: 'Get Verified', description: 'Complete verification to build trust with clients' },
                  { step: 3, title: 'Receive Requests', description: 'Clients discover and contact you for projects' },
                  { step: 4, title: 'Deliver & Earn', description: 'Complete projects and receive secure payments' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#E8D4C4] text-[#2C3E50] flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#2C3E50] mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#2C3E50] mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of satisfied consultants and clients
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-none shadow-lg h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0088CC] to-[#00A8E8] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{testimonial.image}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#2C3E50]">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700">{testimonial.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#0088CC] to-[#00A8E8] py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join our platform today and experience the future of professional consulting
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-[#0088CC] hover:bg-gray-100 shadow-lg"
                onClick={() => navigate('/signup/consultant')}
              >
                <Briefcase className="mr-2 h-5 w-5" />
                Become a Consultant
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0088CC]"
                onClick={() => navigate('/signup/user')}
              >
                <Search className="mr-2 h-5 w-5" />
                Find Consultants
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C3E50] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#0088CC] to-[#00A8E8] rounded-lg flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">consultancy.co</span>
              </div>
              <p className="text-gray-400 text-sm">
                Connecting expert consultants with clients worldwide
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Clients</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Find Consultants</a></li>
                <li><a href="#" className="hover:text-white">How It Works</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Consultants</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Become a Consultant</a></li>
                <li><a href="#" className="hover:text-white">Resources</a></li>
                <li><a href="#" className="hover:text-white">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 consultancy.co. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SimpleLandingPage;
