import { motion } from 'framer-motion';
import { Check, X, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface PricingComparisonProps {
  type: 'consultant' | 'client';
}

const PricingComparison: React.FC<PricingComparisonProps> = ({ type }) => {
  const consultantFeatures = [
    {
      feature: 'Price',
      basic: 'Free',
      pro: '₹2,499/mo',
      premium: '₹8,299/mo',
      description: 'Monthly subscription cost'
    },
    {
      feature: 'Free Trial',
      basic: '7 days Pro features',
      pro: 'N/A',
      premium: 'N/A',
      description: 'Trial period for new users'
    },
    {
      feature: 'Profile Visibility',
      basic: 'Basic',
      pro: 'Top 15% search',
      premium: 'Featured placement',
      description: 'How prominently your profile appears'
    },
    {
      feature: 'Connection Credits',
      basic: '5/month',
      pro: '150/month',
      premium: '150/month + rollover',
      description: 'Credits for outreach activities'
    },
    {
      feature: 'Daily Messages',
      basic: '10/day',
      pro: 'Unlimited via credits',
      premium: 'Unlimited via credits',
      description: 'Chat message limit'
    },
    {
      feature: 'Video/Voice Sessions',
      basic: 'Limited',
      pro: 'Unlimited for active contracts',
      premium: 'Unlimited for active contracts',
      description: 'Video and voice call capabilities'
    },
    {
      feature: 'Analytics Dashboard',
      basic: 'Basic',
      pro: 'Advanced',
      premium: 'Premium + insights',
      description: 'Profile views and performance metrics'
    },
    {
      feature: 'Support',
      basic: 'Standard',
      pro: 'Priority',
      premium: 'Dedicated priority',
      description: 'Customer support level'
    },
    {
      feature: 'Custom URL',
      basic: 'No',
      pro: 'No',
      premium: 'Yes',
      description: 'Branded profile URL'
    },
    {
      feature: 'Credit Rollover',
      basic: 'No',
      pro: 'No',
      premium: 'Yes (capped)',
      description: 'Unused credits carry over'
    }
  ];

  const clientFeatures = [
    {
      feature: 'Price',
      basic: 'Free',
      pro: '₹4,149/mo',
      enterprise: 'Custom Quote',
      description: 'Monthly subscription cost'
    },
    {
      feature: 'Daily Messages',
      basic: '10/day',
      pro: 'Unlimited',
      enterprise: 'Unlimited',
      description: 'Chat message limit'
    },
    {
      feature: 'Project Slots',
      basic: '1 active',
      pro: 'Unlimited',
      enterprise: 'Unlimited',
      description: 'Active projects on dashboard'
    },
    {
      feature: 'Service Fee',
      basic: '5%',
      pro: '3%',
      enterprise: 'Negotiated',
      description: 'Fee per successful hire/payment'
    },
    {
      feature: 'Search Filters',
      basic: 'Basic',
      pro: 'Advanced (expert-vetted, skills)',
      enterprise: 'Advanced + custom',
      description: 'Search and filtering capabilities'
    },
    {
      feature: 'Meeting Scheduler',
      basic: 'No',
      pro: 'Built-in',
      enterprise: 'Built-in + integrations',
      description: 'Schedule meetings with consultants'
    },
    {
      feature: 'Team Access',
      basic: '1 user',
      pro: 'Up to 5 members',
      enterprise: 'Unlimited',
      description: 'Number of team members'
    },
    {
      feature: 'Account Manager',
      basic: 'No',
      pro: 'No',
      enterprise: 'Dedicated concierge',
      description: 'Personal account management'
    },
    {
      feature: 'Contract/Tax Docs',
      basic: 'Manual',
      pro: 'Manual',
      enterprise: 'Automated toolkit',
      description: 'Document automation'
    },
    {
      feature: 'API Access',
      basic: 'No',
      pro: 'No',
      enterprise: 'HR integration API',
      description: 'API for internal systems'
    }
  ];

  const features = type === 'consultant' ? consultantFeatures : clientFeatures;
  const tiers = type === 'consultant' 
    ? ['basic', 'pro', 'premium'] 
    : ['basic', 'pro', 'enterprise'];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'basic': return 'text-slate-600 dark:text-slate-400';
      case 'pro': return 'text-blue-600 dark:text-blue-400';
      case 'premium': 
      case 'enterprise': return 'text-purple-600 dark:text-purple-400';
      default: return 'text-slate-600 dark:text-slate-400';
    }
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'pro': return 'Most Popular';
      case 'premium': 
      case 'enterprise': return 'Premium';
      default: return null;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Detailed Feature Comparison
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Compare all features across our {type} subscription tiers
        </p>
      </motion.div>

      <TooltipProvider>
        <Card className="shadow-xl">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Header */}
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left p-6 font-semibold text-slate-900 dark:text-slate-100 w-1/3">
                      Feature
                    </th>
                    {tiers.map((tier, index) => (
                      <th key={tier} className="text-center p-6">
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + index * 0.1 }}
                        >
                          <div className={`text-lg font-bold capitalize ${getTierColor(tier)}`}>
                            {tier}
                          </div>
                          {getTierBadge(tier) && (
                            <Badge variant="secondary" className="mt-2 text-xs">
                              {getTierBadge(tier)}
                            </Badge>
                          )}
                        </motion.div>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Body */}
                <motion.tbody
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {features.map((row, rowIndex) => (
                    <motion.tr
                      key={row.feature}
                      variants={rowVariants}
                      className={`border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors`}
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-900 dark:text-slate-100">
                            {row.feature}
                          </span>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-4 h-4 text-slate-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs text-sm">{row.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </td>
                      {tiers.map((tier) => {
                        const value = row[tier as keyof typeof row];
                        const isPositive = value === 'Yes' || value === 'Unlimited' || 
                                         (typeof value === 'string' && value.includes('Unlimited'));
                        const isNegative = value === 'No' || value === 'Limited' || value === 'N/A';
                        
                        return (
                          <td key={tier} className="p-6 text-center">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2 + rowIndex * 0.05 }}
                              className="flex items-center justify-center gap-2"
                            >
                              {isPositive && (
                                <Check className="w-5 h-5 text-green-500" />
                              )}
                              {isNegative && (
                                <X className="w-5 h-5 text-red-500" />
                              )}
                              <span className={`text-sm ${
                                isPositive ? 'text-green-600 dark:text-green-400 font-medium' :
                                isNegative ? 'text-red-600 dark:text-red-400' :
                                'text-slate-700 dark:text-slate-300'
                              }`}>
                                {value}
                              </span>
                            </motion.div>
                          </td>
                        );
                      })}
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </TooltipProvider>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-center"
      >
        <p className="text-sm text-slate-600 dark:text-slate-400">
          <span className="font-medium">Note:</span> Features and pricing are subject to change. 
          Current subscribers are grandfathered into their existing plans.
        </p>
      </motion.div>
    </div>
  );
};

export default PricingComparison;
