import { motion } from 'framer-motion';
import { Check, Star, Crown, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { ConsultantTier, ClientTier } from '../../types';

interface SubscriptionPlansProps {
  type: 'consultant' | 'client';
  onPlanSelect?: (tier: ConsultantTier | ClientTier, billingInterval: 'monthly' | 'yearly') => void;
  currentTier?: ConsultantTier | ClientTier;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({
  type,
  onPlanSelect,
  currentTier
}) => {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');

  const consultantPlans = [
    {
      tier: 'basic' as ConsultantTier,
      name: 'Basic',
      price: 0,
      yearlyPrice: 0,
      description: 'Perfect for getting started',
      icon: Zap,
      color: 'from-slate-600 to-slate-700',
      features: [
        '7-day Pro trial included',
        'Basic profile visibility',
        '5 connection credits/month',
        '10 chat messages/day',
        'Verification required for upgrade'
      ],
      limits: {
        connectionCredits: 5,
        dailyMessages: 10
      }
    },
    {
      tier: 'pro' as ConsultantTier,
      name: 'Pro',
      price: 29.99,
      yearlyPrice: 29.99 * 10,
      description: 'For growing consultants',
      icon: Star,
      color: 'from-blue-600 to-purple-600',
      popular: true,
      features: [
        'Top 15% search placement',
        '150 connection credits/month',
        'Unlimited messaging via credits',
        'Unlimited video/voice sessions',
        'Advanced analytics dashboard',
        'Profile views & competitor insights'
      ],
      limits: {
        connectionCredits: 150
      }
    },
    {
      tier: 'premium' as ConsultantTier,
      name: 'Premium',
      price: 99.99,
      yearlyPrice: 99.99 * 10,
      description: 'Maximum visibility & features',
      icon: Crown,
      color: 'from-purple-600 to-pink-600',
      featured: true,
      features: [
        'All Pro features included',
        'Featured placement on landing page',
        'Priority support access',
        'Custom branded URL/profile',
        'Credit rollover capability',
        'Advanced analytics & insights'
      ],
      limits: {
        connectionCredits: 150,
        creditRollover: true
      }
    }
  ];

  const clientPlans = [
    {
      tier: 'basic' as ClientTier,
      name: 'Basic',
      price: 0,
      yearlyPrice: 0,
      description: 'Free registration & basic features',
      icon: Zap,
      color: 'from-slate-600 to-slate-700',
      features: [
        'Free registration',
        '10 chat messages/day',
        '1 active project slot',
        'Basic search access',
        'Consultant profile viewing',
        '5% service fee per hire'
      ],
      limits: {
        dailyMessages: 10,
        projectSlots: 1,
        serviceFee: 5
      }
    },
    {
      tier: 'pro' as ClientTier,
      name: 'Pro',
      price: 49.99,
      yearlyPrice: 49.99 * 10,
      description: 'For teams and growing businesses',
      icon: Star,
      color: 'from-blue-600 to-purple-600',
      popular: true,
      features: [
        'All Basic features',
        '3% service fee (reduced)',
        'Unlimited project slots',
        'Unlimited pre-contract chats',
        'Advanced search filters',
        'Built-in meeting scheduler',
        'Team access for 5 members'
      ],
      limits: {
        serviceFee: 3,
        projectSlots: -1,
        teamMembers: 5
      }
    },
    {
      tier: 'enterprise' as ClientTier,
      name: 'Enterprise',
      price: 0,
      yearlyPrice: 0,
      description: 'Custom solutions for large teams',
      icon: Crown,
      color: 'from-purple-600 to-pink-600',
      featured: true,
      customPricing: true,
      features: [
        'All Pro features included',
        'Negotiated commission rates',
        'Dedicated account manager',
        'Automated contract/tax docs',
        'API for HR integration',
        'Compliance toolkit',
        'Custom enterprise features'
      ],
      limits: {
        serviceFee: 0,
        teamMembers: -1
      }
    }
  ];

  const plans = type === 'consultant' ? consultantPlans : clientPlans;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const handlePlanSelect = (tier: ConsultantTier | ClientTier) => {
    if (onPlanSelect) {
      onPlanSelect(tier, billingInterval);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Choose Your {type === 'consultant' ? 'Consultant' : 'Client'} Plan
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Select the perfect plan for your needs. Upgrade or downgrade at any time.
        </p>
      </motion.div>

      {/* Billing Toggle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center mb-8"
      >
        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-1 flex items-center gap-1">
          <button
            onClick={() => setBillingInterval('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              billingInterval === 'monthly'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingInterval('yearly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              billingInterval === 'yearly'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Yearly
            <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
              Save 20%
            </Badge>
          </button>
        </div>
      </motion.div>

      {/* Plans Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          const isSelected = currentTier === plan.tier;
          const displayPrice = plan.customPricing ? 'Custom' : 
            billingInterval === 'monthly' ? plan.price : plan.yearlyPrice;

          return (
            <motion.div
              key={plan.tier}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="relative"
            >
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                >
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 text-xs font-semibold">
                    Most Popular
                  </Badge>
                </motion.div>
              )}

              {plan.featured && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                >
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 text-xs font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Featured
                  </Badge>
                </motion.div>
              )}

              <Card className={`relative h-full transition-all duration-300 ${
                isSelected 
                  ? 'ring-2 ring-blue-500 shadow-xl shadow-blue-500/20' 
                  : 'shadow-lg hover:shadow-xl'
              } ${
                plan.popular || plan.featured ? 'scale-105' : ''
              }`}>
                <CardContent className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                      {plan.description}
                    </p>
                    
                    {/* Price */}
                    <div className="mb-4">
                      {plan.customPricing ? (
                        <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                          Custom Quote
                        </div>
                      ) : (
                        <div className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                          ${displayPrice}
                          <span className="text-lg font-normal text-slate-600 dark:text-slate-400">
                            {displayPrice !== 0 ? `/${billingInterval}` : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + featureIndex * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300 text-sm">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => handlePlanSelect(plan.tier)}
                      className={`w-full py-3 font-semibold transition-all duration-300 ${
                        isSelected
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : plan.popular || plan.featured
                          ? `bg-gradient-to-r ${plan.color} hover:opacity-90 text-white`
                          : 'bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900'
                      }`}
                      size="lg"
                    >
                      {isSelected ? 'Current Plan' : plan.customPricing ? 'Contact Sales' : 'Get Started'}
                      {!isSelected && !plan.customPricing && (
                        <ArrowRight className="w-4 h-4 ml-2" />
                      )}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center"
      >
        <p className="text-sm text-slate-600 dark:text-slate-400">
          All plans include our core platform features. 
          <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
            View full feature comparison
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default SubscriptionPlans;
