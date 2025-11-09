import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, Crown, Zap, ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { consultantPlans, companyPlans } from '@/data/subscriptionPlans';
import { SubscriptionPlan } from '@/types/subscription';
import { formatINR } from '@/utils/formatINR';
import { Link } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import PremiumFooter from '@/components/PremiumFooter';
import { useAuth } from '@/contexts/AuthContext';

const Pricing = () => {
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'consultant' | 'company'>('consultant');
  // When logged in, lock the role to user's role
  useEffect(() => {
    if (user?.role === 'company') setSelectedRole('company');
    else if (user?.role === 'consultant') setSelectedRole('consultant');
  }, [user?.role]);
  const plans = selectedRole === 'consultant' ? consultantPlans : companyPlans;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 border-b border-gray-200">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <Badge className="mx-auto bg-gray-100 text-gray-700 border-gray-300">
              <Sparkles className="w-3 h-3 mr-1" />
              Simple, Transparent Pricing
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
              Choose Your Plan
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start free, upgrade when you're ready. All plans include our core features.
            </p>

            {/* Role Toggle: visible only when not logged in */}
            {!user && (
              <div className="flex items-center justify-center gap-4 pt-4">
                <motion.button
                  onClick={() => setSelectedRole('consultant')}
                  className={`relative px-8 py-4 rounded-xl font-semibold transition-all ${
                    selectedRole === 'consultant'
                      ? 'text-white bg-black'
                      : 'text-gray-600 hover:text-gray-900 bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    For Consultants
                  </span>
                </motion.button>

                <motion.button
                  onClick={() => setSelectedRole('company')}
                  className={`relative px-8 py-4 rounded-xl font-semibold transition-all ${
                    selectedRole === 'company'
                      ? 'text-white bg-black'
                      : 'text-gray-600 hover:text-gray-900 bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Crown className="w-5 h-5" />
                    For Companies
                  </span>
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4 pt-12">
        <div className="container mx-auto max-w-7xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {plans.map((plan, index) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  index={index}
                  isPopular={plan.popular}
                  isPremium={plan.tier === 'premium' || plan.tier === 'enterprise'}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Trusted by 10,000+ Professionals</h2>
          <p className="text-gray-600 text-lg">
            Join thousands of consultants and companies already growing with consultancy.co
          </p>
          <div className="flex flex-wrap justify-center gap-8 pt-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">500+</div>
              <div className="text-gray-600">Expert Consultants</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">10K+</div>
              <div className="text-gray-600">Sessions Completed</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <FAQItem
              question="Can I switch plans anytime?"
              answer="Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the difference."
            />
            <FAQItem
              question="What happens after my trial ends?"
              answer="After your 7-day trial, you'll automatically move to the Basic (free) plan. You can upgrade to Pro or Premium anytime."
            />
            <FAQItem
              question="Do you offer refunds?"
              answer="Yes, we offer a 30-day money-back guarantee on all paid plans. No questions asked."
            />
            <FAQItem
              question="What payment methods do you accept?"
              answer="We accept all major credit/debit cards, UPI, net banking, and digital wallets."
            />
          </div>
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
};

// Pricing Card Component
interface PricingCardProps {
  plan: SubscriptionPlan;
  index: number;
  isPopular?: boolean;
  isPremium?: boolean;
}

const PricingCard = ({ plan, index, isPopular, isPremium }: PricingCardProps) => {
  const getCardStyle = () => {
    if (isPremium) {
      return 'border-2 border-gray-300 shadow-xl bg-white';
    }
    if (isPopular) {
      return 'border-2 border-black shadow-xl scale-105 bg-white';
    }
    return 'border border-gray-200 shadow-lg bg-white';
  };

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        className="relative"
      >
        <Card className={`p-8 rounded-2xl ${getCardStyle()} transition-all duration-300 h-full flex flex-col`}>
          {/* Badge */}
          {(isPopular || isPremium || plan.trialDays) && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className={`px-4 py-1 text-xs font-bold shadow-lg ${
                isPremium 
                  ? 'bg-gray-800 text-white'
                  : isPopular 
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 border-gray-300'
              }`}>
                {isPremium && <Crown className="w-3 h-3 mr-1" />}
                {isPremium ? 'PREMIUM' : isPopular ? 'MOST POPULAR' : plan.trialDays ? `${plan.trialDays}-DAY TRIAL` : ''}
              </Badge>
            </div>
          )}

          {/* Header */}
          <div className="text-center space-y-4 pb-6 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
            <div className="space-y-2">
              {plan.price === 0 && plan.tier !== 'enterprise' ? (
                <div className="text-5xl font-bold text-gray-900">Free</div>
              ) : plan.tier === 'enterprise' ? (
                <>
                  <div className="text-4xl font-bold text-gray-900">Custom</div>
                  <div className="text-gray-500 text-sm">Contact for pricing</div>
                </>
              ) : (
                <>
                  <div className="text-5xl font-bold text-gray-900">
                    {formatINR(plan.price)}
                  </div>
                  <div className="text-gray-500 text-sm">per month</div>
                </>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="flex-1 py-6 space-y-3">
            {plan.highlights?.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full p-1 bg-gray-100">
                  <Check className="w-4 h-4 text-gray-700" />
                </div>
                <span className="text-gray-700 text-sm flex-1">{feature}</span>
              </div>
            ))}

            {/* Key Features with Tooltips */}
            {plan.features.connectionCredits && (
              <FeatureItem
                icon={<Zap className="w-4 h-4" />}
                text={`${plan.features.connectionCredits} connection credits/month`}
                tooltip="Use credits for chats, contact requests, and video invites"
                isPremium={isPremium}
              />
            )}
            
            {plan.features.chatMessagesPerDay && (
              <FeatureItem
                icon={<Check className="w-4 h-4" />}
                text={`${plan.features.chatMessagesPerDay === 'unlimited' ? 'Unlimited' : plan.features.chatMessagesPerDay} chat messages`}
                tooltip="Daily message limit for consultant communication"
                isPremium={isPremium}
              />
            )}

            {plan.features.projectSlots && (
              <FeatureItem
                icon={<Check className="w-4 h-4" />}
                text={`${plan.features.projectSlots === 'unlimited' ? 'Unlimited' : plan.features.projectSlots} active project${plan.features.projectSlots !== 1 ? 's' : ''}`}
                tooltip="Number of simultaneous projects you can manage"
                isPremium={isPremium}
              />
            )}

            {plan.features.serviceFee !== undefined && (
              <FeatureItem
                icon={<Check className="w-4 h-4" />}
                text={`${plan.features.serviceFee}% service fee`}
                tooltip="Platform commission on each transaction"
                isPremium={isPremium}
              />
            )}
          </div>

          {/* CTA Button */}
          <Link to={`/pay/checkout?planId=${plan.id}&name=${encodeURIComponent(plan.name)}&tier=${plan.tier}&role=${plan.role}&price=${plan.price}`} className="w-full">
            <Button
              className={`w-full py-6 text-lg font-semibold rounded-xl transition-all ${
                isPremium
                  ? 'bg-gray-800 hover:bg-gray-900 text-white shadow-lg'
                  : isPopular
                  ? 'bg-black hover:bg-gray-900 text-white shadow-lg'
                  : 'bg-gray-900 hover:bg-black text-white shadow-lg'
              }`}
            >
              {plan.price === 0 ? 'Start Free' : plan.tier === 'enterprise' ? 'Contact Sales' : 'Get Started'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
};

// Feature Item with Tooltip
interface FeatureItemProps {
  icon: React.ReactNode;
  text: string;
  tooltip: string;
  isPremium?: boolean;
}

const FeatureItem = ({ icon, text, tooltip, isPremium }: FeatureItemProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <div className="flex items-start gap-3 cursor-help">
        <div className="mt-0.5 rounded-full p-1 bg-gray-100">
          {icon}
        </div>
        <span className="text-gray-700 text-sm flex-1 flex items-center gap-1">
          {text}
          <Info className="w-3 h-3 text-gray-400" />
        </span>
      </div>
    </TooltipTrigger>
    <TooltipContent>
      <p className="text-xs">{tooltip}</p>
    </TooltipContent>
  </Tooltip>
);

// FAQ Item Component
interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border border-gray-200 rounded-xl overflow-hidden bg-white"
      initial={false}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight className="w-5 h-5 text-gray-400 transform rotate-90" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4 text-gray-600">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Pricing;
