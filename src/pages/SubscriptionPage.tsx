import { useState } from 'react';
import SubscriptionPlans from '../components/subscription/SubscriptionPlans';
import PricingComparison from '../components/subscription/PricingComparison';
import SubscriptionModal from '../components/subscription/SubscriptionModal';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ConsultantTier, ClientTier } from '../types';

const SubscriptionPage: React.FC = () => {
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
    // Here you would typically make an API call to process the subscription
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-blue-600 via-brand-purple-600 to-brand-pink-600 bg-clip-text text-transparent mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Select the perfect subscription tier for your needs. Upgrade or downgrade at any time.
          </p>
        </div>

        <Tabs value={selectedType} onValueChange={(value) => setSelectedType(value as 'consultant' | 'client')} className="w-full">
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

        <SubscriptionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type={selectedType}
          selectedTier={selectedTier}
          onConfirm={handleConfirmSubscription}
          currentTier={currentTier}
        />
      </div>
    </div>
  );
};

export default SubscriptionPage;
