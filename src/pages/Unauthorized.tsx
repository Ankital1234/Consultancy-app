import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { useEffect } from 'react';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Auto-redirect to appropriate dashboard after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      redirectToCorrectDashboard();
    }, 3000);

    return () => clearTimeout(timer);
  }, [user]);

  const redirectToCorrectDashboard = () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    // Redirect based on user role
    switch (user.role) {
      case 'consultant':
        navigate('/consultant-home');
        break;
      case 'company':
        navigate('/company-home');
        break;
      case 'user':
      default:
        navigate('/user-dashboard');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5EFE9] to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <Card className="border-none shadow-2xl">
          <CardContent className="p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="bg-red-100 p-6 rounded-full">
                <ShieldAlert className="h-16 w-16 text-red-600" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-[#2C3E50] mb-4"
            >
              Access Denied
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 mb-2"
            >
              You don't have permission to access this page.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-gray-500 mb-8"
            >
              {user ? (
                <>
                  You're logged in as a <span className="font-semibold capitalize">{user.role}</span>.
                  <br />
                  Redirecting you to your dashboard in 3 seconds...
                </>
              ) : (
                'Please sign in to access this page.'
              )}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                onClick={redirectToCorrectDashboard}
                className="bg-[#0088CC] hover:bg-[#0077B3] text-white"
              >
                <Home className="mr-2 h-5 w-5" />
                Go to My Dashboard
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate(-1)}
                className="border-[#0088CC] text-[#0088CC] hover:bg-[#0088CC] hover:text-white"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 pt-8 border-t border-gray-200"
            >
              <p className="text-sm text-gray-500">
                Need help? <a href="/support" className="text-[#0088CC] hover:underline">Contact Support</a>
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Unauthorized;
