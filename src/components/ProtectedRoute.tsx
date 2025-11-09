import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Shield, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('user' | 'consultant' | 'company')[];
  requireAuth?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  allowedRoles,
  requireAuth = true 
}: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // If authentication is required and user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
            <Lock className="w-10 h-10 text-white" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Authentication Required
            </h1>
            <p className="text-muted-foreground text-lg">
              Please register or sign in to access this feature
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to={`/auth?tab=signup&redirect=${encodeURIComponent(location.pathname)}`}>
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-purple-600">
                Register Now
              </Button>
            </Link>
            <Link to={`/auth?tab=signin&redirect=${encodeURIComponent(location.pathname)}`}>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>

          <div className="pt-4">
            <Link to="/" className="text-sm text-primary hover:underline">
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // If specific roles are required, check if user has the right role
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
