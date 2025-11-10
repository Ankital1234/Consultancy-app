import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { formatINR } from '@/utils/formatINR';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  TrendingUp, 
  TrendingDown,
  CreditCard,
  Calendar,
  DollarSign,
  Users,
  ChevronDown,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Zap,
  Crown
} from 'lucide-react';
import { User, ConsultantTier, ClientTier } from '../../types';

interface Subscription {
  id: string;
  user: User;
  tier: ConsultantTier | ClientTier;
  status: 'active' | 'trial' | 'expired' | 'cancelled';
  price: number;
  billingInterval: 'monthly' | 'yearly';
  startDate: string;
  nextBillingDate: string;
  renewalCount: number;
  lifetimeValue: number;
}

const SubscriptionManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);

  // Mock data - in real app, this would come from API
  const mockSubscriptions: Subscription[] = [
    {
      id: '1',
      user: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'consultant',
        subscriptionTier: 'pro' as ConsultantTier,
        subscriptionStatus: 'active',
        credits: 150,
        verified: true,
        createdAt: '2024-01-15',
        lastActiveAt: '2024-11-01',
      },
      tier: 'pro' as ConsultantTier,
      status: 'active',
      price: 29.99,
      billingInterval: 'monthly',
      startDate: '2024-01-15',
      nextBillingDate: '2024-12-15',
      renewalCount: 10,
      lifetimeValue: 299.90,
    },
    {
      id: '2',
      user: {
        id: '2',
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        role: 'consultant',
        subscriptionTier: 'basic' as ConsultantTier,
        subscriptionStatus: 'trial',
        credits: 5,
        verified: false,
        createdAt: '2024-10-20',
        lastActiveAt: '2024-10-31',
      },
      tier: 'basic' as ConsultantTier,
      status: 'trial',
      price: 0,
      billingInterval: 'monthly',
      startDate: '2024-10-20',
      nextBillingDate: '2024-10-27',
      renewalCount: 0,
      lifetimeValue: 0,
    },
    {
      id: '3',
      user: {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike@company.com',
        role: 'user',
        subscriptionTier: 'pro' as ClientTier,
        subscriptionStatus: 'active',
        credits: 0,
        verified: true,
        createdAt: '2024-02-10',
        lastActiveAt: '2024-11-01',
      },
      tier: 'pro' as ClientTier,
      status: 'active',
      price: 49.99,
      billingInterval: 'monthly',
      startDate: '2024-02-10',
      nextBillingDate: '2024-12-10',
      renewalCount: 9,
      lifetimeValue: 449.91,
    },
    {
      id: '4',
      user: {
        id: '4',
        name: 'Emily Brown',
        email: 'emily@startup.com',
        role: 'user',
        subscriptionTier: 'premium' as ClientTier,
        subscriptionStatus: 'expired',
        credits: 0,
        verified: true,
        createdAt: '2024-03-05',
        lastActiveAt: '2024-09-15',
      },
      tier: 'premium' as ClientTier,
      status: 'expired',
      price: 99.99,
      billingInterval: 'monthly',
      startDate: '2024-03-05',
      nextBillingDate: '2024-10-05',
      renewalCount: 7,
      lifetimeValue: 699.93,
    },
  ];

  const filteredSubscriptions = mockSubscriptions.filter(sub => {
    const matchesSearch = sub.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    const matchesTier = tierFilter === 'all' || sub.tier === tierFilter;
    
    return matchesSearch && matchesStatus && matchesTier;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'trial':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'expired':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'cancelled':
        return 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-300';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'basic':
        return <Zap className="w-4 h-4" />;
      case 'pro':
        return <TrendingUp className="w-4 h-4" />;
      case 'premium':
      case 'enterprise':
        return <Crown className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'basic':
        return 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-300';
      case 'pro':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'premium':
      case 'enterprise':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-300';
    }
  };

  // Calculate metrics
  const totalRevenue = mockSubscriptions.reduce((sum, sub) => sum + sub.lifetimeValue, 0);
  const monthlyRecurringRevenue = mockSubscriptions
    .filter(sub => sub.status === 'active' && sub.billingInterval === 'monthly')
    .reduce((sum, sub) => sum + sub.price, 0);
  const activeSubscriptions = mockSubscriptions.filter(sub => sub.status === 'active').length;
  const trialSubscriptions = mockSubscriptions.filter(sub => sub.status === 'trial').length;

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const handleSubscriptionAction = (action: string, subscription: Subscription) => {
    console.log(`Action: ${action}, Subscription: ${subscription.id}`);
    // Implement subscription actions
  };

  const exportSubscriptions = () => {
    console.log('Exporting subscriptions...');
    // Implement export functionality
  };

  const refreshData = () => {
    console.log('Refreshing subscription data...');
    // Implement data refresh
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Subscription Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Monitor and manage all user subscriptions
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={refreshData}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          <Button
            variant="outline"
            onClick={exportSubscriptions}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Metrics Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {[
          {
            title: 'Total Revenue',
            value: `$${totalRevenue.toFixed(2)}`,
            icon: DollarSign,
            color: 'text-green-600',
            bgColor: 'bg-green-100 dark:bg-green-900/20',
            change: '+12.5%',
            changeType: 'increase' as const,
          },
          {
            title: 'MRR',
            value: `$${monthlyRecurringRevenue.toFixed(2)}`,
            icon: TrendingUp,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100 dark:bg-blue-900/20',
            change: '+8.2%',
            changeType: 'increase' as const,
          },
          {
            title: 'Active Subscriptions',
            value: activeSubscriptions.toString(),
            icon: CreditCard,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100 dark:bg-purple-900/20',
            change: '+5.3%',
            changeType: 'increase' as const,
          },
          {
            title: 'Trial Users',
            value: trialSubscriptions.toString(),
            icon: Activity,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100 dark:bg-orange-900/20',
            change: '-2.1%',
            changeType: 'decrease' as const,
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.title} variants={itemVariants}>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {stat.value}
                      </p>
                      <div className="flex items-center gap-1">
                        {stat.changeType === 'increase' ? (
                          <ArrowUpRight className="w-4 h-4 text-green-600" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-600" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor} ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search subscriptions by user name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="trial">Trial</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={tierFilter} onValueChange={setTierFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tiers</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Subscriptions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-brand-blue-600" />
              Active Subscriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 dark:bg-slate-800">
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Billing</TableHead>
                    <TableHead>Next Billing</TableHead>
                    <TableHead>Lifetime Value</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscriptions.map((subscription, index) => (
                    <motion.tr
                      key={subscription.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className="border-b hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue-400 to-brand-purple-500 flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900 dark:text-slate-100">
                              {subscription.user.name}
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                              {subscription.user.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="p-1 rounded bg-slate-100 dark:bg-slate-800">
                            {getTierIcon(subscription.tier)}
                          </div>
                          <Badge className={getTierColor(subscription.tier)}>
                            {subscription.tier.toUpperCase()}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(subscription.status)}>
                          {subscription.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {subscription.price === 0 ? 'Free' : formatINR(subscription.price)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {subscription.billingInterval}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          {new Date(subscription.nextBillingDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-green-600">
                          {formatINR(subscription.lifetimeValue)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => handleSubscriptionAction('view', subscription)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleSubscriptionAction('edit', subscription)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Modify Plan
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleSubscriptionAction('cancel', subscription)}
                              className="text-red-600"
                            >
                              <TrendingDown className="w-4 h-4 mr-2" />
                              Cancel Subscription
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SubscriptionManagement;
