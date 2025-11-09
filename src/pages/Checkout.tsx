import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Check, ArrowLeft, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { mockGigs } from '@/data/gigsData';
import { useToast } from '@/hooks/use-toast';
import { formatINR } from '@/utils/formatINR';

const Checkout = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const packageType = (searchParams.get('package') || 'standard') as 'basic' | 'standard' | 'premium';
  
  const gig = mockGigs.find((g) => g.id === id);

  if (!gig) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 text-lg">Gig not found</p>
        <Button onClick={() => navigate('/marketplace')} className="mt-4">
          Browse Services
        </Button>
      </div>
    );
  }

  const selectedPackage = gig.packages[packageType];
  const serviceFee = selectedPackage.price * 0.2; // 20% service fee
  const total = selectedPackage.price + serviceFee;

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Order Placed Successfully!',
      description: `Your order for ${gig.title} has been placed. The seller will start working on it soon.`,
    });
    navigate('/buyer-dashboard');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(`/gig/${id}`)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Gig
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <img
                    src={gig.images[0]}
                    alt={gig.title}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{gig.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={gig.sellerAvatar}
                        alt={gig.sellerName}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-gray-600">{gig.sellerName}</span>
                    </div>
                    <Badge>{packageType.charAt(0).toUpperCase() + packageType.slice(1)} Package</Badge>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Time:</span>
                    <span className="font-medium">{selectedPackage.deliveryTime} days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Revisions:</span>
                    <span className="font-medium">{selectedPackage.revisions}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleOrder} className="space-y-4">
                  <div>
                    <Label htmlFor="requirements">Project Requirements</Label>
                    <Textarea
                      id="requirements"
                      placeholder="Describe your project requirements in detail..."
                      rows={6}
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Provide clear and detailed requirements to help the seller deliver exactly what you need.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="deadline">Preferred Deadline (Optional)</Label>
                    <Input
                      id="deadline"
                      type="date"
                      className="mt-2"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="flex items-start gap-2 pt-4">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-600">
                      I agree to the terms of service and understand that this order will be processed once payment is confirmed.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Package Price:</span>
                    <span className="font-medium">{formatINR(selectedPackage.price)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service Fee:</span>
                    <span className="font-medium">{formatINR(serviceFee)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>{formatINR(total)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleOrder}
                  className="w-full bg-black hover:bg-gray-900 text-white"
                  size="lg"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Place Order - {formatINR(total)}
                </Button>

                <div className="pt-4 border-t space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-700" />
                    <span>Secure payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-700" />
                    <span>Money-back guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-700" />
                    <span>24/7 customer support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

