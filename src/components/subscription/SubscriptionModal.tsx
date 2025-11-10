import { motion } from 'framer-motion';
import { X, Check, CreditCard, Shield, Star } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { ConsultantTier, ClientTier } from '../../types';
import { formatINR } from '@/utils/formatINR';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'consultant' | 'client';
  selectedTier: ConsultantTier | ClientTier | null;
  onConfirm: (tier: ConsultantTier | ClientTier, paymentMethod: string) => void;
  currentTier?: ConsultantTier | ClientTier;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  type,
  selectedTier,
  onConfirm,
  currentTier
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const getTierInfo = (tier: ConsultantTier | ClientTier) => {
    if (type === 'consultant') {
      const consultantTiers = {
        basic: {
          name: 'Basic',
          price: 0,
          description: 'Free tier with essential features',
          features: ['7-day Pro trial', '5 connection credits/month', 'Basic visibility']
        },
        pro: {
          name: 'Pro',
          price: 29.99,
          description: 'Perfect for growing consultants',
          features: ['Top 15% search placement', '150 connection credits/month', 'Advanced analytics']
        },
        premium: {
          name: 'Premium',
          price: 99.99,
          description: 'Maximum visibility and features',
          features: ['Featured placement', 'Custom URL', 'Priority support', 'Credit rollover']
        }
      };
      return consultantTiers[tier as ConsultantTier];
    } else {
      const clientTiers = {
        basic: {
          name: 'Basic',
          price: 0,
          description: 'Free registration and basic features',
          features: ['10 messages/day', '1 project slot', '5% service fee']
        },
        pro: {
          name: 'Pro',
          price: 49.99,
          description: 'For teams and growing businesses',
          features: ['Unlimited projects', '3% service fee', 'Team access (5 members)', 'Advanced filters']
        },
        enterprise: {
          name: 'Enterprise',
          price: 0,
          description: 'Custom solutions for large teams',
          features: ['Custom pricing', 'Dedicated manager', 'API access', 'Automated compliance']
        }
      };
      return clientTiers[tier as ClientTier];
    }
  };

  const handleConfirm = async () => {
    if (!selectedTier) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onConfirm(selectedTier, paymentMethod);
    setIsProcessing(false);
    onClose();
  };

  const isUpgrade = currentTier && selectedTier && 
    (tiers.indexOf(selectedTier as any) > tiers.indexOf(currentTier as any));
  
  const isDowngrade = currentTier && selectedTier && 
    (tiers.indexOf(selectedTier as any) < tiers.indexOf(currentTier as any));

  const tiers = type === 'consultant' 
    ? ['basic', 'pro', 'premium'] 
    : ['basic', 'pro', 'enterprise'];

  const tierInfo = selectedTier ? getTierInfo(selectedTier) : null;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {isUpgrade ? 'Upgrade Your Plan' : isDowngrade ? 'Downgrade Your Plan' : 'Confirm Your Selection'}
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription className="text-slate-600 dark:text-slate-400">
              {isUpgrade 
                ? "You're upgrading to a plan with more features and capabilities."
                : isDowngrade
                ? "You're downgrading to a plan with fewer features. Changes will take effect at the next billing cycle."
                : "Review your subscription selection and confirm."
              }
            </DialogDescription>
          </DialogHeader>

          {tierInfo && (
            <div className="space-y-6">
              {/* Selected Plan Summary */}
              <Card className="border-2 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                          {tierInfo.name}
                        </h3>
                        {selectedTier === 'pro' && (
                          <Badge variant="secondary">Most Popular</Badge>
                        )}
                        {(selectedTier === 'premium' || selectedTier === 'enterprise') && (
                          <Badge variant="secondary">Premium</Badge>
                        )}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-4">
                        {tierInfo.description}
                      </p>
                      
                      <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                        {tierInfo.price === 0 ? 'Free' : `${formatINR(tierInfo.price)}/month`}
                      </div>

                      <div className="space-y-2">
                        {tierInfo.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-slate-700 dark:text-slate-300">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              {tierInfo.price > 0 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Payment Method
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
                      { id: 'paypal', name: 'PayPal', icon: CreditCard },
                    ].map((method) => {
                      const Icon = method.icon;
                      return (
                        <motion.div
                          key={method.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card
                            className={`cursor-pointer transition-all duration-200 ${
                              paymentMethod === method.id
                                ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/20'
                                : 'hover:bg-slate-50 dark:hover:bg-slate-900/50'
                            }`}
                            onClick={() => setPaymentMethod(method.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3">
                                <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                                <span className="font-medium text-slate-900 dark:text-slate-100">
                                  {method.name}
                                </span>
                                {paymentMethod === method.id && (
                                  <Check className="w-4 h-4 text-blue-500 ml-auto" />
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                <div className="flex-1">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Your payment information is secure and encrypted. 
                    You can cancel or change your plan at any time.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirm}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
                  disabled={isProcessing || !selectedTier}
                >
                  {isProcessing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : tierInfo.price === 0 ? (
                    'Activate Free Plan'
                  ) : (
                    `Confirm $${tierInfo.price}/month`
                  )}
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
