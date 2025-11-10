import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Users, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as any,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as any,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-brand-blue-500/20 rounded-full blur-3xl"
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
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-brand-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <Badge className="bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 text-white px-4 py-2 text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4 mr-2 inline" />
                Trusted by 10,000+ Professionals
              </Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="bg-gradient-to-r from-brand-blue-600 via-brand-purple-600 to-brand-pink-600 bg-clip-text text-transparent">
                Connect with
              </span>
              <br />
              <span className="text-slate-900 dark:text-slate-100">
                Expert Mentors
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-slate-600 dark:text-slate-400 max-w-xl"
            >
              Accelerate your career growth with personalized guidance from industry experts. 
              Join thousands of professionals transforming their careers.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 hover:from-brand-blue-500 hover:to-brand-purple-500 text-white px-8 py-6 text-lg font-semibold shadow-xl shadow-brand-blue-500/25 group"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg font-semibold border-2 border-slate-300 dark:border-slate-700 hover:border-brand-blue-500 dark:hover:border-brand-blue-500"
                >
                  View Pricing
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200 dark:border-slate-800"
            >
              {[
                { icon: Users, value: '10K+', label: 'Active Users' },
                { icon: TrendingUp, value: '95%', label: 'Success Rate' },
                { icon: Zap, value: '24/7', label: 'Support' },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Icon className="w-5 h-5 text-brand-blue-600 mr-2" />
                      <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {stat.value}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column - Visual Element */}
          <motion.div
            variants={itemVariants}
            className="relative hidden lg:block"
          >
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="relative"
            >
              {/* Main Card */}
              <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 border border-slate-200 dark:border-slate-700">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue-500 to-brand-purple-500 flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        Expert Mentors
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        Available 24/7
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { name: 'Sarah Johnson', role: 'Senior Developer', rating: 4.9 },
                      { name: 'Mike Chen', role: 'Product Manager', rating: 5.0 },
                      { name: 'Emily Davis', role: 'UX Designer', rating: 4.8 },
                    ].map((mentor, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.2 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-pink-400 to-brand-purple-500" />
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-slate-100">
                              {mentor.name}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {mentor.role}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-brand-yellow-500 text-lg">★</span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">
                            {mentor.rating}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                className="absolute -top-6 -right-6 bg-gradient-to-r from-brand-pink-600 to-brand-purple-600 text-white px-6 py-3 rounded-full shadow-xl"
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <p className="font-bold text-lg">🎉 7-Day Free Trial</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
