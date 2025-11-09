import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Briefcase, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

const SignupSelection = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedType = searchParams.get('type');

  // If type is already selected from landing page, skip to credentials
  useEffect(() => {
    if (preselectedType && (preselectedType === 'user' || preselectedType === 'consultant')) {
      navigate(`/signup/credentials?type=${preselectedType}`);
    }
  }, [preselectedType, navigate]);

  const options = [
    {
      type: 'user',
      title: 'User',
      description: 'For individual professionals or regular users',
      icon: User,
      color: 'from-[#D4C5B9] to-[#C4B5A9]',
    },
    {
      type: 'consultant',
      title: 'Consultant',
      description: 'For professionals offering consultancy services',
      icon: Briefcase,
      color: 'from-[#C9A876] to-[#B89B7F]',
    },
  ];

  const handleSelection = (type: string) => {
    navigate(`/signup/credentials?type=${type}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFBF7] to-[#F5F0ED] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#2B2520] mb-4">
            Create Your Account
          </h1>
          <p className="text-lg text-[#8B8680]">
            Choose the option that best describes you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {options.map((option, index) => (
            <motion.div
              key={option.type}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card 
                className="h-full border-2 border-[#E8E3DE] hover:border-[#C9A876] transition-all duration-300 cursor-pointer group"
                onClick={() => handleSelection(option.type)}
              >
                <CardContent className="p-8 text-center">
                  <motion.div
                    className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center`}
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <option.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <h2 className="text-2xl font-bold text-[#2B2520] mb-3">
                    {option.title}
                  </h2>
                  
                  <p className="text-[#8B8680] mb-6 min-h-[48px]">
                    {option.description}
                  </p>
                  
                  <Button
                    className="w-full bg-white hover:bg-[#F9F6F3] text-[#2B2520] border-2 border-[#C9A876] group-hover:bg-[#C9A876] group-hover:text-white transition-all duration-300"
                  >
                    Continue
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-[#8B8680]">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/auth')}
              className="text-[#C9A876] hover:text-[#B89B7F] font-medium underline"
            >
              Sign In
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupSelection;
