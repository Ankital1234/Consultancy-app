import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const UserProfileSetup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState<any>(null);

  useEffect(() => {
    // Get stored credentials
    const stored = sessionStorage.getItem('signupCredentials');
    if (!stored) {
      navigate('/signup');
      return;
    }

    const parsed = JSON.parse(stored);
    
    // Verify this is the correct flow
    if (parsed.userType !== 'user' || parsed.registrationType !== 'individual') {
      navigate('/signup');
      return;
    }

    setCredentials(parsed);
  }, [navigate]);

  const handleComplete = async () => {
    if (!credentials) return;

    // Create user account with dummy data
    const dummyUser = {
      id: `${Date.now()}`,
      name: 'Demo User',
      email: credentials.email,
      role: 'user' as 'user' | 'consultant',
    };

    await login(
      credentials.email,
      credentials.password,
      'user',
      dummyUser
    );

    // Clear session storage
    sessionStorage.removeItem('signupCredentials');

    // Redirect to user landing page
    navigate('/company-home');
  };

  if (!credentials) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFBF7] to-[#F5F0ED] px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-2 border-[#E8E3DE] shadow-lg">
            <CardHeader className="text-center pb-6 border-b border-[#E8E3DE]">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C9A876] to-[#B89B7F] flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-[#2B2520]">
                Welcome, User!
              </CardTitle>
              <p className="text-[#8B8680] mt-2">
                Complete your profile setup to start browsing consultants
              </p>
            </CardHeader>

            <CardContent className="pt-8">
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold text-[#2B2520]">
                    Your Account is Ready!
                  </h3>
                  <p className="text-[#8B8680]">
                    You're all set to explore our platform and connect with top consultants.
                  </p>
                </div>

                <div className="bg-[#F9F6F3] rounded-lg p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-[#2B2520]">Browse verified consultants</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-[#2B2520]">Post project requirements</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-[#2B2520]">Secure messaging and booking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-[#2B2520]">Access to exclusive services</span>
                  </div>
                </div>

                <Button
                  onClick={handleComplete}
                  size="lg"
                  className="w-full bg-[#C9A876] hover:bg-[#B89B7F] text-white shadow-lg"
                >
                  Continue to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfileSetup;
