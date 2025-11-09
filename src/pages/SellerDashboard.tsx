import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, TrendingUp, DollarSign, Package, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockGigs } from '@/data/gigsData';
import { Gig } from '@/types/marketplace';
import { formatINR } from '@/utils/formatINR';
import { useAuth } from '@/contexts/AuthContext';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [gigs] = useState<Gig[]>(mockGigs.slice(0, 3)); // User's gigs
  const [profile, setProfile] = useState<any | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const stats = {
    totalEarnings: 12500,
    activeOrders: 8,
    totalGigs: gigs.length,
    averageRating: 4.8,
    totalReviews: 456
  };

  useEffect(() => {
    const load = async () => {
      if (!user?.email) return;
      setLoadingProfile(true);
      try {
        const res = await fetch(`/api/consultants/by-email?email=${encodeURIComponent(user.email)}`);
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } finally {
        setLoadingProfile(false);
      }
    };
    load();
  }, [user?.email]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{user?.role === 'company' ? 'Company Dashboard' : 'Seller Dashboard'}</h1>
          <p className="text-gray-600">Manage your gigs, orders, and earnings</p>
        </div>

        {/* Profile Summary (Consultant Only) */}
        {user?.role === 'consultant' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingProfile ? (
                <p className="text-sm text-gray-500">Loading profile...</p>
              ) : profile ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Name</div>
                    <div className="font-medium">{profile.fullName}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Email</div>
                    <div className="font-medium">{profile.email}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Title</div>
                    <div className="font-medium">{profile.title || '—'}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Experience</div>
                    <div className="font-medium">{profile.experienceYears || 0} years</div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No profile found. Complete your application on Become Seller.</p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatINR(stats.totalEarnings)}</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeOrders}</div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Gigs</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalGigs}</div>
              <p className="text-xs text-muted-foreground">Active listings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageRating}</div>
              <p className="text-xs text-muted-foreground">From {stats.totalReviews} reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="gigs" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="gigs">My Gigs</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <Button onClick={() => navigate('/seller/create-gig')}>
              <Plus className="w-4 h-4 mr-2" />
              Create New Gig
            </Button>
          </div>

          <TabsContent value="gigs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Gigs</CardTitle>
              </CardHeader>
              <CardContent>
                {gigs.length > 0 ? (
                  <div className="space-y-4">
                    {gigs.map((gig) => (
                      <div
                        key={gig.id}
                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <img
                          src={gig.images[0]}
                          alt={gig.title}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{gig.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{formatINR(gig.price.basic)} - {formatINR(gig.price.premium)}</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{gig.rating}</span>
                              <span>({gig.totalReviews})</span>
                            </div>
                            <span>{gig.totalOrders} orders</span>
                            <Badge
                              variant={
                                gig.status === 'active'
                                  ? 'default'
                                  : gig.status === 'paused'
                                  ? 'secondary'
                                  : 'outline'
                              }
                            >
                              {gig.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/gig/${gig.id}`)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You haven't created any gigs yet.</p>
                    <Button onClick={() => navigate('/seller/create-gig')}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Gig
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">Orders will be displayed here when you receive them.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gig Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Analytics and insights will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SellerDashboard;

