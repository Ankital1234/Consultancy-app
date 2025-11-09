import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Check, MessageSquare, Heart, Share2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { mockGigs } from '@/data/gigsData';
import { Gig } from '@/types/marketplace';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { formatINR } from '@/utils/formatINR';

const GigDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const gig = mockGigs.find((g) => g.id === id);
  const [selectedPackage, setSelectedPackage] = useState<'basic' | 'standard' | 'premium'>('standard');
  const [isFavorite, setIsFavorite] = useState(false);

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

  const selectedPackageData = gig.packages[selectedPackage];

  const handleOrder = () => {
    toast({
      title: 'Order Placed',
      description: `You have selected the ${selectedPackageData.name} package for ${formatINR(selectedPackageData.price)}`,
    });
    // Navigate to order page or checkout
    navigate(`/checkout/${gig.id}?package=${selectedPackage}`);
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'top':
        return <Badge className="bg-purple-100 text-purple-800">Top Rated Seller</Badge>;
      case 'level2':
        return <Badge className="bg-blue-100 text-blue-800">Level 2 Seller</Badge>;
      case 'level1':
        return <Badge className="bg-green-100 text-green-800">Level 1 Seller</Badge>;
      default:
        return <Badge variant="secondary">New Seller</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Seller Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{gig.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <img
                    src={gig.sellerAvatar}
                    alt={gig.sellerName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{gig.sellerName}</p>
                    <div className="flex items-center gap-2">
                      {getLevelBadge(gig.sellerLevel)}
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{gig.rating}</span>
                        <span className="text-sm text-gray-500">({gig.totalReviews})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-1 gap-4">
              {gig.images.map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`${gig.title} - Image ${index + 1}`}
                  className="w-full rounded-lg object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                />
              ))}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="about" className="bg-white rounded-lg p-6">
              <TabsList>
                <TabsTrigger value="about">About This Gig</TabsTrigger>
                <TabsTrigger value="packages">Packages</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({gig.totalReviews})</TabsTrigger>
                {gig.faqs && <TabsTrigger value="faq">FAQ</TabsTrigger>}
              </TabsList>

              <TabsContent value="about" className="mt-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">{gig.description}</p>
                </div>
              </TabsContent>

              <TabsContent value="packages" className="mt-6">
                <div className="space-y-4">
                  {(['basic', 'standard', 'premium'] as const).map((pkg) => {
                    const pkgData = gig.packages[pkg];
                    const isSelected = selectedPackage === pkg;
                    return (
                      <Card
                        key={pkg}
                        className={`cursor-pointer transition-all ${
                          isSelected ? 'border-amber-700 border-2' : 'hover:border-gray-300'
                        } ${pkgData.popular ? 'ring-2 ring-amber-500' : ''}`}
                        onClick={() => setSelectedPackage(pkg)}
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{pkgData.name}</CardTitle>
                            <div>
                              {pkgData.popular && (
                                <Badge className="bg-amber-600 text-white mr-2">Most Popular</Badge>
                              )}
                              <span className="text-2xl font-bold">{formatINR(pkgData.price)}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{pkgData.description}</p>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span className="text-sm">{pkgData.deliveryTime} Day Delivery</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MessageSquare className="w-4 h-4 text-gray-500" />
                              <span className="text-sm">{pkgData.revisions} Revisions</span>
                            </div>
                            <Separator className="my-3" />
                            <ul className="space-y-2">
                              {pkgData.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-gray-700">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Reviews section would display buyer reviews here. Currently showing {gig.totalReviews} reviews with an average rating of {gig.rating}.
                  </p>
                </div>
              </TabsContent>

              {gig.faqs && (
                <TabsContent value="faq" className="mt-6">
                  <div className="space-y-4">
                    {gig.faqs.map((faq, idx) => (
                      <div key={idx} className="border-b pb-4 last:border-0">
                        <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>

          {/* Sidebar - Package Selection */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-xl">Select a Package</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Package Options */}
                <div className="space-y-2">
                  {(['basic', 'standard', 'premium'] as const).map((pkg) => {
                    const pkgData = gig.packages[pkg];
                    const isSelected = selectedPackage === pkg;
                    return (
                      <button
                        key={pkg}
                        onClick={() => setSelectedPackage(pkg)}
                        className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'border-amber-700 bg-amber-50'
                            : 'border-gray-200 hover:border-gray-300'
                        } ${pkgData.popular ? 'ring-2 ring-amber-500' : ''}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold">{pkgData.name}</span>
                          {pkgData.popular && (
                            <Badge className="bg-amber-600 text-white text-xs">Popular</Badge>
                          )}
                        </div>
                        <div className="text-2xl font-bold">{formatINR(pkgData.price)}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          {pkgData.deliveryTime} day delivery
                        </div>
                      </button>
                    );
                  })}
                </div>

                <Separator />

                {/* Order Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Package:</span>
                    <span className="font-semibold">{selectedPackageData.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery:</span>
                    <span>{selectedPackageData.deliveryTime} days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Revisions:</span>
                    <span>{selectedPackageData.revisions}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>{formatINR(selectedPackageData.price)}</span>
                </div>

                <Button
                  onClick={handleOrder}
                  className="w-full bg-black hover:bg-gray-900 text-white"
                  size="lg"
                >
                  Continue ({formatINR(selectedPackageData.price)})
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    Save
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>

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
                    <span>24/7 support</span>
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

export default GigDetail;

