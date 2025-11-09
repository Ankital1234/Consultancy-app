import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Star, 
  MessageSquare, 
  Download,
  Eye,
  Calendar,
  DollarSign,
  Filter,
  Search,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Order } from '@/types/marketplace';
import { motion } from 'framer-motion';
import { formatINR } from '@/utils/formatINR';

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  // Mock orders data
  const [orders] = useState<Order[]>([
    {
      id: 'order1',
      gigId: 'gig1',
      gigTitle: 'I will design a professional logo and brand identity',
      gigImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop',
      sellerId: 'seller1',
      sellerName: 'Sarah Johnson',
      sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
      buyerId: 'buyer1',
      buyerName: 'You',
      package: 'standard',
      price: 75,
      status: 'in_progress',
      deliveryTime: 5,
      deliveryDate: '2024-02-15',
      createdAt: '2024-02-10',
      updatedAt: '2024-02-12'
    },
    {
      id: 'order2',
      gigId: 'gig2',
      gigTitle: 'I will develop a responsive website using React and Node.js',
      gigImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=200&h=200&fit=crop',
      sellerId: 'seller2',
      sellerName: 'Michael Chen',
      sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
      buyerId: 'buyer1',
      buyerName: 'You',
      package: 'premium',
      price: 2500,
      status: 'delivered',
      deliveryTime: 21,
      deliveryDate: '2024-01-28',
      createdAt: '2024-01-07',
      updatedAt: '2024-01-28'
    },
    {
      id: 'order3',
      gigId: 'gig3',
      gigTitle: 'I will write high-quality blog posts and articles',
      gigImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=200&h=200&fit=crop',
      sellerId: 'seller3',
      sellerName: 'Emily Rodriguez',
      sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
      buyerId: 'buyer1',
      buyerName: 'You',
      package: 'basic',
      price: 50,
      status: 'completed',
      deliveryTime: 2,
      deliveryDate: '2024-01-20',
      createdAt: '2024-01-18',
      updatedAt: '2024-01-20'
    },
    {
      id: 'order4',
      gigId: 'gig4',
      gigTitle: 'I will create animated video intros and outros',
      gigImage: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=200&h=200&fit=crop',
      sellerId: 'seller1',
      sellerName: 'Sarah Johnson',
      sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
      buyerId: 'buyer1',
      buyerName: 'You',
      package: 'standard',
      price: 150,
      status: 'pending',
      deliveryTime: 5,
      deliveryDate: '2024-02-20',
      createdAt: '2024-02-15',
      updatedAt: '2024-02-15'
    }
  ]);

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>;
      case 'delivered':
        return <Badge className="bg-purple-50 text-purple-700 border-purple-200">Delivered</Badge>;
      case 'completed':
        return <Badge className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      case 'disputed':
        return <Badge variant="destructive">Disputed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredOrders = (status?: Order['status']) => {
    let filtered = status ? orders.filter((order) => order.status === status) : orders;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(order => 
        order.gigTitle.toLowerCase().includes(query) ||
        order.sellerName.toLowerCase().includes(query)
      );
    }

    // Sort orders
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }

    return filtered;
  };

  const stats = {
    totalOrders: orders.length,
    activeOrders: orders.filter((o) => ['pending', 'in_progress', 'delivered'].includes(o.status)).length,
    completedOrders: orders.filter((o) => o.status === 'completed').length,
    totalSpent: orders.reduce((sum, order) => sum + order.price, 0)
  };

  const getDaysUntilDelivery = (deliveryDate: string) => {
    const today = new Date();
    const delivery = new Date(deliveryDate);
    const diffTime = delivery.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage all your orders in one place</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
              <Package className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.totalOrders}</div>
              <p className="text-xs text-gray-500 mt-1">All time orders</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Orders</CardTitle>
              <Clock className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.activeOrders}</div>
              <p className="text-xs text-gray-500 mt-1">In progress</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.completedOrders}</div>
              <p className="text-xs text-gray-500 mt-1">Successfully delivered</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Spent</CardTitle>
              <DollarSign className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{formatINR(stats.totalSpent)}</div>
              <p className="text-xs text-gray-500 mt-1">All time spending</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6 border-gray-200">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search orders by service or seller..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="bg-gray-50">
            <TabsTrigger value="all">All Orders ({orders.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({orders.filter(o => o.status === 'pending').length})</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress ({orders.filter(o => o.status === 'in_progress').length})</TabsTrigger>
            <TabsTrigger value="delivered">Delivered ({orders.filter(o => o.status === 'delivered').length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({orders.filter(o => o.status === 'completed').length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <OrdersList orders={filteredOrders()} getStatusBadge={getStatusBadge} navigate={navigate} getDaysUntilDelivery={getDaysUntilDelivery} />
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <OrdersList orders={filteredOrders('pending')} getStatusBadge={getStatusBadge} navigate={navigate} getDaysUntilDelivery={getDaysUntilDelivery} />
          </TabsContent>

          <TabsContent value="in_progress" className="space-y-4">
            <OrdersList orders={filteredOrders('in_progress')} getStatusBadge={getStatusBadge} navigate={navigate} getDaysUntilDelivery={getDaysUntilDelivery} />
          </TabsContent>

          <TabsContent value="delivered" className="space-y-4">
            <OrdersList orders={filteredOrders('delivered')} getStatusBadge={getStatusBadge} navigate={navigate} getDaysUntilDelivery={getDaysUntilDelivery} />
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <OrdersList orders={filteredOrders('completed')} getStatusBadge={getStatusBadge} navigate={navigate} getDaysUntilDelivery={getDaysUntilDelivery} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface OrdersListProps {
  orders: Order[];
  getStatusBadge: (status: Order['status']) => JSX.Element;
  navigate: (path: string) => void;
  getDaysUntilDelivery: (date: string) => number;
}

const OrdersList = ({ orders, getStatusBadge, navigate, getDaysUntilDelivery }: OrdersListProps) => {
  if (orders.length === 0) {
    return (
      <Card className="border-gray-200">
        <CardContent className="py-16 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-2">No orders found</p>
          <p className="text-gray-400 text-sm mb-6">Start browsing services to place your first order</p>
          <Button onClick={() => navigate('/marketplace')} className="bg-black hover:bg-gray-800">
            Browse Services
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order, index) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className="border-gray-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Service Image */}
                <div className="flex-shrink-0">
                  <img
                    src={order.gigImage}
                    alt={order.gigTitle}
                    className="w-full md:w-32 h-32 rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => navigate(`/gig/${order.gigId}`)}
                  />
                </div>

                {/* Order Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-semibold text-gray-900 hover:text-gray-700 cursor-pointer text-lg mb-2 line-clamp-2"
                        onClick={() => navigate(`/gig/${order.gigId}`)}
                      >
                        {order.gigTitle}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <img
                          src={order.sellerAvatar}
                          alt={order.sellerName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm text-gray-600 font-medium">{order.sellerName}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      {getStatusBadge(order.status)}
                    </div>
                  </div>

                  {/* Order Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Package</div>
                      <div className="font-medium text-gray-900 capitalize">{order.package}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Price</div>
                      <div className="font-semibold text-gray-900">{formatINR(order.price)}</div>
                    </div>
                    {order.deliveryDate && (
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Delivery Date</div>
                        <div className="font-medium text-gray-900">
                          {new Date(order.deliveryDate).toLocaleDateString()}
                          {order.status === 'in_progress' && (
                            <span className="text-xs text-blue-600 ml-2">
                              ({getDaysUntilDelivery(order.deliveryDate)} days left)
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Ordered</div>
                      <div className="font-medium text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-200">
                    {order.status === 'delivered' && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Accept & Complete
                      </Button>
                    )}
                    {order.status === 'completed' && (
                      <Button variant="outline" size="sm" className="border-gray-300">
                        <Star className="w-4 h-4 mr-2" />
                        Leave Review
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="border-gray-300">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact Seller
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-300">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {order.status === 'completed' && (
                      <Button variant="outline" size="sm" className="border-gray-300">
                        <Download className="w-4 h-4 mr-2" />
                        Download Files
                      </Button>
                    )}
                    {(order.status === 'pending' || order.status === 'in_progress') && (
                      <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                        <XCircle className="w-4 h-4 mr-2" />
                        Cancel Order
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default BuyerDashboard;
