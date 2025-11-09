import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { User, LogIn, Briefcase, LogOut, Building2 } from 'lucide-react';
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

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border shadow-sm"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <div className="p-2 rounded-lg bg-black">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-black">
                consultancy.co
              </span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-foreground'
              }`}
            >
              Marketplace
            </Link>
            {(user?.role !== 'consultant') && (
              <Link
                to="/marketplace"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/marketplace') || location.pathname.startsWith('/gig/') ? 'text-primary' : 'text-foreground'
                }`}
              >
                Browse Services
              </Link>
            )}
            {isAuthenticated && (
              <>
                {user?.role !== 'company' && (
                  <Link
                    to="/become-seller"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive('/become-seller') ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    Become Consultant
                  </Link>
                )}
                <Link
                  to="/seller-dashboard"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive('/seller-dashboard') ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {user?.role === 'company' ? 'Company Dashboard' : 'Consultant Dashboard'}
                </Link>
                <Link
                  to="/buyer-dashboard"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive('/buyer-dashboard') ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  My Orders
                </Link>
              </>
            )}
            <Link
              to="/pricing"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/pricing') ? 'text-primary' : 'text-foreground'
              }`}
            >
              Pricing
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.profilePicture} alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                      <div className="flex items-center gap-1 pt-1">
                        {user.role === 'company' ? (
                          <Building2 className="h-3 w-3 text-primary" />
                        ) : (
                          <Briefcase className="h-3 w-3 text-teal-500" />
                        )}
                        <span className="text-xs font-medium capitalize text-primary">
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/buyer-dashboard" className="cursor-pointer">
                      <Briefcase className="mr-2 h-4 w-4" />
                      <span>My Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/seller-dashboard" className="cursor-pointer">
                      <Building2 className="mr-2 h-4 w-4" />
                      <span>{user?.role === 'company' ? 'Company Dashboard' : 'Consultant Dashboard'}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth?tab=signup">
                  <Button size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
