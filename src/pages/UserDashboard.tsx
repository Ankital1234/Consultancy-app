import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Briefcase, 
  MessageSquare, 
  Star, 
  Calendar,
  Clock,
  FileText,
  TrendingUp,
  Users,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = [
    { label: 'Active Projects', value: '3', icon: Briefcase, color: 'bg-[#0088CC]' },
    { label: 'Consultants Hired', value: '5', icon: Users, color: 'bg-[#00A8E8]' },
    { label: 'Completed Sessions', value: '12', icon: CheckCircle2, color: 'bg-green-500' },
    { label: 'Avg Rating Given', value: '4.8', icon: Star, color: 'bg-yellow-500' },
  ];

  const quickActions = [
    {
      title: 'Find Consultants',
      description: 'Browse and hire expert consultants',
      icon: Search,
      color: 'from-[#0088CC] to-[#00A8E8]',
      action: () => navigate('/marketplace'),
    },
    {
      title: 'My Projects',
      description: 'View and manage your projects',
      icon: Briefcase,
      color: 'from-[#E8D4C4] to-[#D4C4B4]',
      action: () => navigate('/my-projects'),
    },
    {
      title: 'Messages',
      description: 'Chat with your consultants',
      icon: MessageSquare,
      color: 'from-[#0088CC] to-[#00A8E8]',
      action: () => navigate('/messages'),
    },
    {
      title: 'Reviews',
      description: 'Rate your experiences',
      icon: Star,
      color: 'from-[#E8D4C4] to-[#D4C4B4]',
      action: () => navigate('/reviews'),
    },
  ];

  const recentActivity = [
    { type: 'booking', title: 'Session with John Doe', time: '2 hours ago', status: 'completed' },
    { type: 'message', title: 'New message from Jane Smith', time: '5 hours ago', status: 'unread' },
    { type: 'review', title: 'Review submitted for Mike Johnson', time: '1 day ago', status: 'completed' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5EFE9] to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C3E50] mb-2">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-lg text-gray-600">Manage your projects and find expert consultants</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-[#2C3E50]">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card 
                  className="cursor-pointer border-none shadow-lg hover:shadow-xl transition-all overflow-hidden"
                  onClick={action.action}
                >
                  <div className={`h-2 bg-gradient-to-r ${action.color}`} />
                  <CardContent className="p-6">
                    <div className={`bg-gradient-to-r ${action.color} p-3 rounded-lg inline-block mb-4`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg text-[#2C3E50] mb-2">{action.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                    <div className="flex items-center text-[#0088CC] text-sm font-semibold">
                      Go <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity & Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-[#2C3E50]">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg bg-[#F5EFE9] hover:bg-[#E8D4C4] transition-colors"
                    >
                      <div className="bg-[#0088CC] p-2 rounded-full">
                        {activity.type === 'booking' && <Calendar className="h-4 w-4 text-white" />}
                        {activity.type === 'message' && <MessageSquare className="h-4 w-4 text-white" />}
                        {activity.type === 'review' && <Star className="h-4 w-4 text-white" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#2C3E50]">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.time}</p>
                      </div>
                      <Badge 
                        variant={activity.status === 'completed' ? 'default' : 'secondary'}
                        className={activity.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#2C3E50]">Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#0088CC] to-[#00A8E8] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-[#2C3E50]">{user?.name || 'User'}</h3>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full border-[#0088CC] text-[#0088CC] hover:bg-[#0088CC] hover:text-white"
                    onClick={() => navigate('/profile')}
                  >
                    Edit Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-[#E8D4C4] text-[#2C3E50] hover:bg-[#E8D4C4]"
                    onClick={() => navigate('/settings')}
                  >
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
