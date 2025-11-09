import EnhancedNavbar from '../components/landing/EnhancedNavbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import SubscriptionPlans from '../components/subscription/SubscriptionPlans';
import PricingComparison from '../components/subscription/PricingComparison';
import PremiumFooter from '../components/PremiumFooter';
import { useState } from 'react';
import { ConsultantTier, ClientTier } from '../types';
import SubscriptionModal from '../components/subscription/SubscriptionModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const LandingPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'consultant' | 'client'>('consultant');
  const [selectedTier, setSelectedTier] = useState<ConsultantTier | ClientTier | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTier, setCurrentTier] = useState<ConsultantTier | ClientTier>('basic');

  const handlePlanSelect = (tier: ConsultantTier | ClientTier, billingInterval: 'monthly' | 'yearly') => {
    setSelectedTier(tier);
    setIsModalOpen(true);
  };

  const handleConfirmSubscription = (tier: ConsultantTier | ClientTier, paymentMethod: string) => {
    console.log(`Confirmed ${tier} subscription with ${paymentMethod}`);
    setCurrentTier(tier);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <EnhancedNavbar />
      
      <Hero />
      
      <Features />
      
      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-brand-blue-600 via-brand-purple-600 to-brand-pink-600 bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Flexible pricing for consultants and clients. Start free, upgrade anytime.
            </p>
          </div>

          <Tabs 
            value={selectedType} 
            onValueChange={(value) => setSelectedType(value as 'consultant' | 'client')} 
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="consultant">For Consultants</TabsTrigger>
              <TabsTrigger value="client">For Clients</TabsTrigger>
            </TabsList>

            <TabsContent value="consultant" className="space-y-12">
              <SubscriptionPlans
                type="consultant"
                onPlanSelect={handlePlanSelect}
                currentTier={currentTier}
              />
              <PricingComparison type="consultant" />
            </TabsContent>

            <TabsContent value="client" className="space-y-12">
              <SubscriptionPlans
                type="client"
                onPlanSelect={handlePlanSelect}
                currentTier={currentTier}
              />
              <PricingComparison type="client" />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <PremiumFooter />

      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={selectedType}
        selectedTier={selectedTier}
        onConfirm={handleConfirmSubscription}
        currentTier={currentTier}
      />
    </div>
  );
};

export default LandingPage;
