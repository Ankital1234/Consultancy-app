import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  UserCircle,
  Shield,
  FileText,
  TrendingUp,
  DollarSign,
  Star,
  Users,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Calendar,
  MessageSquare,
  Award,
  Target,
  Zap
} from 'lucide-react';

const ConsultantLanding = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = [
    { label: 'Profile Views', value: '1,247', icon: Users, trend: '+12%' },
    { label: 'Total Earnings', value: '$15,420', icon: DollarSign, trend: '+8%' },
    { label: 'Active Projects', value: '8', icon: Briefcase, trend: '+3' },
    { label: 'Avg Rating', value: '4.9', icon: Star, trend: '+0.2' },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Verified Profile',
      description: 'Build trust with verified credentials and certifications',
      color: 'from-[#0088CC] to-[#00A8E8]',
    },
    {
      icon: Target,
      title: 'Targeted Leads',
      description: 'Get matched with clients looking for your expertise',
      color: 'from-[#E8D4C4] to-[#D4C4B4]',
    },
    {
      icon: DollarSign,
      title: 'Flexible Pricing',
      description: 'Set your own rates and payment terms',
      color: 'from-[#0088CC] to-[#00A8E8]',
    },
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'Manage appointments with integrated calendar',
      color: 'from-[#E8D4C4] to-[#D4C4B4]',
    },
    {
      icon: MessageSquare,
      title: 'Direct Communication',
      description: 'Chat directly with clients in real-time',
      color: 'from-[#0088CC] to-[#00A8E8]',
    },
    {
      icon: Award,
      title: 'Build Reputation',
      description: 'Earn badges and showcase client reviews',
      color: 'from-[#E8D4C4] to-[#D4C4B4]',
    },
  ];

  const steps = [
    {
      number: 1,
      title: 'Complete Your Profile',
      description: 'Add your expertise, experience, and certifications to stand out',
    },
    {
      number: 2,
      title: 'Get Verified',
      description: 'Submit documents for verification to build client trust',
    },
    {
      number: 3,
      title: 'Start Earning',
      description: 'Accept projects and grow your consulting business',
    },
  ];

  const profileCompletion = 65; // Mock data

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5EFE9] via-white to-[#F5EFE9]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0088CC] via-[#00A8E8] to-[#0088CC] text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2">
              Professional Consultant Dashboard
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome, {user?.name || 'Consultant'}!
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Grow your consulting business with powerful tools and insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-[#0088CC] hover:bg-gray-100 shadow-lg"
                onClick={() => navigate('/consultant-profile')}
              >
                <UserCircle className="mr-2 h-5 w-5" />
                Complete Profile
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate('/marketplace')}
              >
                Browse Opportunities
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Become Consultant Card - Moved to top for visibility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 -mt-16 relative z-20"
        >
          <Card className="border-none shadow-xl bg-gradient-to-r from-[#0088CC] to-[#00A8E8] text-white overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                    Ready to Share Your Expertise?
                  </h3>
                  <p className="text-white/90 mb-4">
                    Join our network of professional consultants and start earning
                  </p>
                  <ul className="space-y-2 mb-6">
                    {[
                      'Earn income by sharing your expertise',
                      'Build your professional brand',
                      'Flexible schedule - work on your terms',
                      'Connect with clients worldwide',
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-white" />
                        <span className="text-white/90">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    size="lg"
                    className="bg-white text-[#0088CC] hover:bg-gray-100 shadow-lg"
                    onClick={() => navigate('/become-consultant')}
                  >
                    <Briefcase className="mr-2 h-5 w-5" />
                    Get Started - Become a Consultant
                  </Button>
                </div>
                <div className="hidden md:block">
                  <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <TrendingUp className="h-24 w-24 text-white" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="border-none shadow-xl bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="h-8 w-8 text-[#0088CC]" />
                    <Badge className="bg-green-100 text-green-700 border-none">
                      {stat.trend}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-[#2C3E50]">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">
              Powerful Features for Consultants
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage and grow your consulting business
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-all h-full">
                  <CardContent className="p-6">
                    <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-lg inline-block mb-4`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#2C3E50] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Get Started Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">
              Get Started in 3 Simple Steps
            </h2>
            <p className="text-lg text-gray-600">
              Launch your consulting career today
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + index * 0.2 }}
                className="relative"
              >
                <Card className="mb-6 border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="bg-gradient-to-br from-[#0088CC] to-[#00A8E8] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                        {step.number}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#2C3E50] mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                      <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
                {index < steps.length - 1 && (
                  <div className="h-8 w-0.5 bg-gradient-to-b from-[#0088CC] to-[#00A8E8] ml-6 mb-2" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Statistics Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mb-16"
        >
          <Card className="border-none shadow-xl bg-gradient-to-br from-[#0088CC] to-[#00A8E8] text-white overflow-hidden">
            <CardContent className="p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-5xl font-bold mb-2">10K+</div>
                  <p className="text-white/80">Active Consultants</p>
                </div>
                <div>
                  <div className="text-5xl font-bold mb-2">$2M+</div>
                  <p className="text-white/80">Total Earnings</p>
                </div>
                <div>
                  <div className="text-5xl font-bold mb-2">98%</div>
                  <p className="text-white/80">Satisfaction Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="text-center mb-16"
        >
          <Card className="border-none shadow-xl bg-gradient-to-r from-[#E8D4C4] to-[#F5EFE9]">
            <CardContent className="p-12">
              <Zap className="h-16 w-16 text-[#0088CC] mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">
                Ready to Grow Your Business?
              </h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Join thousands of successful consultants and start earning today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-[#0088CC] hover:bg-[#0077B3] text-white shadow-lg"
                  onClick={() => navigate('/consultant-profile')}
                >
                  <UserCircle className="mr-2 h-5 w-5" />
                  Complete Your Profile
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-[#0088CC] text-[#0088CC] hover:bg-[#0088CC] hover:text-white"
                  onClick={() => navigate('/help')}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2C3E50] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/80">
            © 2025 Consultancy Platform. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="/terms" className="text-white/60 hover:text-white transition-colors">Terms</a>
            <a href="/privacy" className="text-white/60 hover:text-white transition-colors">Privacy</a>
            <a href="/support" className="text-white/60 hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ConsultantLanding;
