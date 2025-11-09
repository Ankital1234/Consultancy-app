import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  DollarSign,
  ShieldCheck,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  Menu,
  X,
  LogOut,
  Bell,
  ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: CreditCard, label: 'Subscriptions', path: '/admin/subscriptions' },
    { icon: DollarSign, label: 'Transactions', path: '/admin/transactions' },
    { icon: ShieldCheck, label: 'Verification', path: '/admin/verification', badge: 5 },
    { icon: FileText, label: 'Content', path: '/admin/content' },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
    { icon: HelpCircle, label: 'Support', path: '/admin/support', badge: 12 },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white z-50 shadow-lg">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:bg-white/10"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <Link to="/admin" className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-white/10">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold">MentorMe Admin</h1>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 relative"
            >
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-pink-500 border-0">
                3
              </Badge>
            </Button>

            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 border-2 border-white/20">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" />
                <AvatarFallback className="bg-blue-600">AD</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <div className="text-sm font-semibold">Admin User</div>
                <div className="text-xs text-blue-200">Super Admin</div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed left-0 top-16 bottom-0 bg-white border-r border-gray-200 overflow-hidden z-40 shadow-lg"
      >
        <div className="w-64 h-full flex flex-col">
          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto py-6">
            <nav className="space-y-1 px-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative ${
                        active
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-500/30'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium flex-1">{item.label}</span>
                      {item.badge && (
                        <Badge
                          className={`${
                            active
                              ? 'bg-white/20 text-white border-0'
                              : 'bg-pink-500 text-white border-0'
                          }`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-gray-700 hover:bg-gray-100"
              onClick={() => navigate('/')}
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Site
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        <div className="p-6 max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}
    </div>
  );
};

export default AdminLayout;
