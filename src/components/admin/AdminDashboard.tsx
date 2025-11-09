import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  CreditCard, 
  Activity, 
  DollarSign, 
  UserCheck,
  ArrowUp,
  ArrowDown,
  Eye,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell
} from 'recharts';

const AdminDashboard: React.FC = () => {
  // Mock data for demonstration
  const kpiData = [
    {
      title: 'Total Users',
      value: '12,847',
      change: '+12.5%',
      changeType: 'increase' as const,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      title: 'Total Revenue',
      value: '$48,574',
      change: '+23.1%',
      changeType: 'increase' as const,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      title: 'Active Subscriptions',
      value: '3,426',
      change: '+8.2%',
      changeType: 'increase' as const,
      icon: CreditCard,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
    {
      title: 'Pending Verifications',
      value: '28',
      change: '-15.3%',
      changeType: 'decrease' as const,
      icon: UserCheck,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
    },
  ];

  const revenueData = [
    { name: 'Jan', revenue: 32000, users: 2400 },
    { name: 'Feb', revenue: 35000, users: 2600 },
    { name: 'Mar', revenue: 38000, users: 2800 },
    { name: 'Apr', revenue: 42000, users: 3100 },
    { name: 'May', revenue: 45000, users: 3400 },
    { name: 'Jun', revenue: 48574, users: 3642 },
  ];

  const subscriptionData = [
    { name: 'Basic', value: 1847, color: '#94a3b8' },
    { name: 'Pro', value: 1279, color: '#3b82f6' },
    { name: 'Premium', value: 300, color: '#8b5cf6' },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'user_signup',
      user: 'John Doe',
      action: 'Signed up as Consultant',
      time: '2 minutes ago',
      status: 'success',
    },
    {
      id: 2,
      type: 'payment',
      user: 'Sarah Wilson',
      action: 'Upgraded to Pro plan',
      time: '15 minutes ago',
      status: 'success',
    },
    {
      id: 3,
      type: 'verification',
      user: 'Mike Johnson',
      action: 'Submitted verification documents',
      time: '1 hour ago',
      status: 'pending',
    },
    {
      id: 4,
      type: 'payment_failed',
      user: 'Emily Brown',
      action: 'Payment failed',
      time: '2 hours ago',
      status: 'error',
    },
    {
      id: 5,
      type: 'user_login',
      user: 'David Lee',
      action: 'Logged in from new device',
      time: '3 hours ago',
      status: 'info',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_signup':
        return <Users className="w-4 h-4" />;
      case 'payment':
        return <CreditCard className="w-4 h-4" />;
      case 'verification':
        return <UserCheck className="w-4 h-4" />;
      case 'payment_failed':
        return <AlertCircle className="w-4 h-4" />;
      case 'user_login':
        return <Activity className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'error':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'pending':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
      case 'info':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      default:
        return 'text-slate-600 bg-slate-100 dark:bg-slate-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Welcome back! Here's what's happening with your platform today.
          </p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={kpi.title}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          {kpi.title}
                        </p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                          {kpi.value}
                        </p>
                        <div className="flex items-center gap-1">
                          {kpi.changeType === 'increase' ? (
                            <ArrowUp className="w-4 h-4 text-green-600" />
                          ) : (
                            <ArrowDown className="w-4 h-4 text-red-600" />
                          )}
                          <span
                            className={`text-sm font-medium ${
                              kpi.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {kpi.change}
                          </span>
                          <span className="text-sm text-slate-500">vs last month</span>
                        </div>
                      </div>
                      <div
                        className={`p-3 rounded-lg ${kpi.bgColor} ${kpi.color}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    
                    {/* Animated background accent */}
                    <motion.div
                      className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <motion.div variants={itemVariants}>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-blue-600" />
                  Revenue & User Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="#8b5cf6"
                      fillOpacity={1}
                      fill="url(#colorUsers)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Subscription Distribution */}
          <motion.div variants={itemVariants}>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-600" />
                  Subscription Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RePieChart>
                    <Pie
                      data={subscriptionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {subscriptionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity & Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-orange-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 dark:text-slate-100">
                          {activity.user}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {activity.action}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock className="w-4 h-4" />
                        {activity.time}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={itemVariants}>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Monthly Growth
                    </span>
                    <span className="text-sm font-bold text-green-600">+23.1%</span>
                  </div>
                  <Progress value={23.1} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Verification Rate
                    </span>
                    <span className="text-sm font-bold text-blue-600">87.3%</span>
                  </div>
                  <Progress value={87.3} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Server Uptime
                    </span>
                    <span className="text-sm font-bold text-green-600">99.9%</span>
                  </div>
                  <Progress value={99.9} className="h-2" />
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      System Status
                    </span>
                    <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Healthy
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
