import { motion } from 'framer-motion';
import { 
  Zap, 
  Shield, 
  Users, 
  TrendingUp, 
  Video, 
  Calendar,
  MessageSquare,
  Award,
  Clock,
  Star,
  Target,
  Sparkles
} from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const Features: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'Instant Matching',
      description: 'Get matched with expert mentors in seconds using our AI-powered algorithm.',
      color: 'from-brand-blue-500 to-brand-purple-500',
      bgColor: 'bg-brand-blue-100 dark:bg-brand-blue-900/20',
    },
    {
      icon: Shield,
      title: 'Verified Experts',
      description: 'All mentors are thoroughly vetted and verified for their expertise and experience.',
      color: 'from-brand-purple-500 to-brand-pink-500',
      bgColor: 'bg-brand-purple-100 dark:bg-brand-purple-900/20',
    },
    {
      icon: Video,
      title: 'Video Sessions',
      description: 'Connect face-to-face with unlimited video and voice sessions for active contracts.',
      color: 'from-brand-pink-500 to-brand-rose-500',
      bgColor: 'bg-brand-pink-100 dark:bg-brand-pink-900/20',
    },
    {
      icon: Calendar,
      title: 'Flexible Scheduling',
      description: 'Book sessions at your convenience with our built-in scheduling system.',
      color: 'from-brand-blue-500 to-brand-purple-500',
      bgColor: 'bg-brand-blue-100 dark:bg-brand-blue-900/20',
    },
    {
      icon: MessageSquare,
      title: 'Real-time Chat',
      description: 'Stay connected with instant messaging and get quick answers to your questions.',
      color: 'from-brand-purple-500 to-brand-pink-500',
      bgColor: 'bg-brand-purple-100 dark:bg-brand-purple-900/20',
    },
    {
      icon: Award,
      title: 'Track Progress',
      description: 'Monitor your growth with detailed analytics and achievement tracking.',
      color: 'from-brand-pink-500 to-brand-rose-500',
      bgColor: 'bg-brand-pink-100 dark:bg-brand-pink-900/20',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as any,
      },
    },
  };

  return (
    <section id="features" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue-100 dark:bg-brand-blue-900/20 text-brand-blue-600 dark:text-brand-blue-400 mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Why Choose MentorMe</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everything You Need to
            <span className="bg-gradient-to-r from-brand-blue-600 via-brand-purple-600 to-brand-pink-600 bg-clip-text text-transparent">
              {' '}Succeed
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Our platform provides all the tools and features you need to accelerate your career growth
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-brand-blue-200 dark:hover:border-brand-blue-800">
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>

                      {/* Content */}
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>

                      {/* Decorative Element */}
                      <motion.div
                        className={`h-1 w-16 rounded-full bg-gradient-to-r ${feature.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: 64 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { icon: Users, value: '10,000+', label: 'Active Users' },
            { icon: Star, value: '4.9/5', label: 'Average Rating' },
            { icon: Clock, value: '50,000+', label: 'Sessions Completed' },
            { icon: Target, value: '95%', label: 'Success Rate' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-brand-blue-600 dark:text-brand-blue-400 mr-2" />
                  <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
