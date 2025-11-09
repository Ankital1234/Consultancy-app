import { useAuth } from '@/contexts/AuthContext';
import ConsultantDashboard from '@/pages/ConsultantDashboard';
import CompanyDashboard from '@/pages/CompanyDashboard';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SmartDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth?redirect=/dashboard');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  // Route based on user role
  if (user.role === 'consultant') {
    return <ConsultantDashboard />;
  }

  // Default to company dashboard for company users
  return <CompanyDashboard />;
};

export default SmartDashboard;

