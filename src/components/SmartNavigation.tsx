import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  User, 
  LogIn, 
  Briefcase, 
  LogOut, 
  Building2,
  Search,
  FolderKanban,
  MessageSquare,
  Settings,
  UserCircle,
  Package,
  Users,
  TrendingUp,
  DollarSign,
  BarChart,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';

// Define navigation items for each user type
const getNavigationItems = (userRole: string | undefined) => {
  // Regular User Navigation
  if (!userRole || userRole === 'user') {
    return [
      { path: '/user-dashboard', label: 'Dashboard', icon: User },
      { path: '/marketplace', label: 'Find Consultants', icon: Search },
      { path: '/my-projects', label: 'My Projects', icon: FolderKanban },
      { path: '/messages', label: 'Messages', icon: MessageSquare },
      { path: '/settings', label: 'Settings', icon: Settings },
    ];
  }
  
  // Consultant Navigation
  if (userRole === 'consultant') {
    return [
      { path: '/consultant-home', label: 'Dashboard', icon: Briefcase },
      { path: '/become-consultant', label: 'Become Consultant', icon: UserCircle },
    ];
  }
  
  // Company Navigation
  if (userRole === 'company') {
    return [
      { path: '/company-home', label: 'Dashboard', icon: Building2 },
      { path: '/company-services', label: 'Services', icon: Package },
      { path: '/company-consultants', label: 'Consultants', icon: Users },
      { path: '/company-analytics', label: 'Analytics', icon: BarChart },
      { path: '/settings', label: 'Settings', icon: Settings },
    ];
  }
  
  return [];
};

const SmartNavigation = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  // Get role-specific navigation items
  const navigationItems = getNavigationItems(user?.role);
  
  // Get user type badge
  const getUserTypeBadge = () => {
    if (!user?.role) return null;
    
    const badgeConfig = {
      user: { label: 'User', color: 'bg-blue-500' },
      consultant: { label: 'Consultant', color: 'bg-green-500' },
      company: { label: 'Company', color: 'bg-purple-500' },
    };
    
    const config = badgeConfig[user.role as keyof typeof badgeConfig];
    if (!config) return null;
    
    return (
      <Badge className={`${config.color} text-white border-none`}>
        {config.label}
      </Badge>
    );
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <div className="p-2 rounded-lg bg-[#0088CC]">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-[#2C3E50]">
                consultancy.co
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated && navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-[#0088CC] flex items-center gap-2 ${
                  isActive(item.path) ? 'text-[#0088CC]' : 'text-[#2C3E50]'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
            
            {!isAuthenticated && (
              <>
                <Link
                  to="/"
                  className={`text-sm font-medium transition-colors hover:text-[#0088CC] ${
                    isActive('/') ? 'text-[#0088CC]' : 'text-[#2C3E50]'
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/marketplace"
                  className={`text-sm font-medium transition-colors hover:text-[#0088CC] ${
                    isActive('/marketplace') ? 'text-[#0088CC]' : 'text-[#2C3E50]'
                  }`}
                >
                  Browse Services
                </Link>
                <Link
                  to="/pricing"
                  className={`text-sm font-medium transition-colors hover:text-[#0088CC] ${
                    isActive('/pricing') ? 'text-[#0088CC]' : 'text-[#2C3E50]'
                  }`}
                >
                  Pricing
                </Link>
              </>
            )}
          </div>

          {/* Right Side - User Menu or Auth Buttons */}
          <div className="flex items-center space-x-2">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                {getUserTypeBadge()}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.profilePicture} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-br from-[#0088CC] to-[#00A8E8] text-white">
                          {user.name?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-gray-600">
                          {user.email}
                        </p>
                        <div className="flex items-center gap-1 pt-1">
                          {user.role === 'company' && <Building2 className="h-3 w-3 text-purple-500" />}
                          {user.role === 'consultant' && <Briefcase className="h-3 w-3 text-green-500" />}
                          {user.role === 'user' && <User className="h-3 w-3 text-blue-500" />}
                          <span className="text-xs font-medium capitalize text-[#0088CC]">
                            {user.role}
                          </span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    {/* Role-specific dropdown items */}
                    {navigationItems.slice(0, 3).map((item) => (
                      <DropdownMenuItem key={item.path} asChild>
                        <Link to={item.path} className="cursor-pointer">
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/auth">
                  <Button variant="ghost" size="sm" className="text-[#2C3E50] hover:text-[#0088CC]">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-[#0088CC] hover:bg-[#0077B3] text-white">
                    <User className="h-4 w-4 mr-2" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4"
          >
            <div className="flex flex-col space-y-3">
              {isAuthenticated ? (
                <>
                  {navigationItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                        isActive(item.path)
                          ? 'bg-[#0088CC] text-white'
                          : 'text-[#2C3E50] hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                  <Button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    variant="ghost"
                    className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Home
                    </Button>
                  </Link>
                  <Link to="/marketplace" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Browse Services
                    </Button>
                  </Link>
                  <Link to="/pricing" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Pricing
                    </Button>
                  </Link>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full mb-2">
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-[#0088CC] hover:bg-[#0077B3]">
                        <User className="h-4 w-4 mr-2" />
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default SmartNavigation;
