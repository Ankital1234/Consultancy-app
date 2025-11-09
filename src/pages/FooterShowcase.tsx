import { motion } from 'framer-motion';
import PremiumFooter from '../components/PremiumFooter';
import { Sparkles, Zap, Shield, Award } from 'lucide-react';

const FooterShowcase = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'Premium Design',
      description: 'Glassmorphic elements with luxury aesthetics',
      gradient: 'from-blue-500 to-purple-500',
    },
    {
      icon: Zap,
      title: 'Smooth Animations',
      description: 'Framer Motion powered interactions',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Shield,
      title: 'Modern Stack',
      description: 'Built with React, TypeScript & Tailwind',
      gradient: 'from-teal-500 to-blue-500',
    },
    {
      icon: Award,
      title: 'Best Practices',
      description: 'Following Apple, Stripe, Vercel design principles',
      gradient: 'from-rose-500 to-orange-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1.3, 1, 1.3],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-slate-300">
                <Sparkles className="w-4 h-4 text-blue-400" />
                Premium Footer Component
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              <span className="block">Premium Footer</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                Dark Navy Aesthetic
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
              A stunning footer section featuring glassmorphic design, smooth animations,
              and luxury accent colors. Perfect for modern web applications.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 hover:from-blue-500 hover:via-purple-500 hover:to-teal-500 text-white rounded-lg font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
              >
                View Component
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 text-white rounded-lg font-medium transition-all duration-300"
              >
                Documentation
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="relative group"
                >
                  <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-20 mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10 blur-xl`}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Design System Preview */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Design System Features
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Built with a comprehensive design system following luxury brand principles
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Color Palette */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Color Palette</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg" />
                <div>
                  <p className="text-sm font-medium text-white">Blue</p>
                  <p className="text-xs text-slate-400">Primary</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg" />
                <div>
                  <p className="text-sm font-medium text-white">Purple</p>
                  <p className="text-xs text-slate-400">Accent</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg" />
                <div>
                  <p className="text-sm font-medium text-white">Teal</p>
                  <p className="text-xs text-slate-400">Secondary</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-rose-500 to-rose-600 shadow-lg" />
                <div>
                  <p className="text-sm font-medium text-white">Rose Gold</p>
                  <p className="text-xs text-slate-400">Luxury</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Typography</h3>
            <div className="space-y-4">
              <div>
                <p className="text-2xl font-bold text-white">Heading</p>
                <p className="text-xs text-slate-400 mt-1">Bold, 24px</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-white">Subheading</p>
                <p className="text-xs text-slate-400 mt-1">Semibold, 18px</p>
              </div>
              <div>
                <p className="text-base text-slate-300">Body Text</p>
                <p className="text-xs text-slate-400 mt-1">Regular, 16px</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Caption</p>
                <p className="text-xs text-slate-400 mt-1">Regular, 14px</p>
              </div>
            </div>
          </motion.div>

          {/* Spacing */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Spacing</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-500 rounded" />
                <p className="text-sm text-slate-300">4px - Tight</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-4 bg-purple-500 rounded" />
                <p className="text-sm text-slate-300">8px - Small</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-4 bg-teal-500 rounded" />
                <p className="text-sm text-slate-300">12px - Medium</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 h-4 bg-rose-500 rounded" />
                <p className="text-sm text-slate-300">16px - Large</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 h-4 bg-orange-500 rounded" />
                <p className="text-sm text-slate-300">24px - XLarge</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex justify-center pb-12"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-slate-500 text-sm"
        >
          Scroll down to see the footer ↓
        </motion.div>
      </motion.div>

      {/* Premium Footer Component */}
      <PremiumFooter />
    </div>
  );
};

export default FooterShowcase;
