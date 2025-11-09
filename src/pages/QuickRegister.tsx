import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  User,
  Mail,
  Phone,
  Building2,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

const QuickRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    userId: '',
    email: '',
    contact: '',
    company: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return value.trim() === '' ? 'Name is required' : '';
      case 'userId':
        if (value.trim() === '') return 'User ID is required';
        if (value.length < 3) return 'User ID must be at least 3 characters';
        return '';
      case 'email':
        if (value.trim() === '') return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        return '';
      case 'contact':
        if (value.trim() === '') return 'Contact number is required';
        if (!/^\d{10}$/.test(value)) return 'Please enter a valid 10-digit contact number';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'company') {
        const error = validateField(key, formData[key as keyof typeof formData]);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast({
        title: 'Validation Error',
        description: 'Please fill all required fields correctly',
        variant: 'destructive',
      });
      return;
    }

    // Store user data
    const userData = {
      id: `${Date.now()}`,
      name: formData.name,
      email: formData.email,
      role: 'company' as const,
      contact: formData.contact,
      userId: formData.userId,
      company: formData.company,
    };

    // Store in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userRole_' + formData.email, 'company');

    // Auto login
    await login(formData.email, 'temp123', 'company', userData);

    toast({
      title: 'Registration Successful!',
      description: 'Welcome to consultancy.co',
    });

    // Redirect to company landing page (browse consultants)
    navigate('/company-home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5EFE9] to-white py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold text-[#2C3E50] mb-2">
            Register to Find Consultants
          </h1>
          <p className="text-lg text-gray-600">
            Quick registration to browse and hire expert consultants
          </p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-none shadow-xl">
              <CardHeader className="bg-gradient-to-r from-[#0088CC] to-[#00A8E8] text-white">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-6 w-6" />
                  Registration Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <div className="relative mt-2">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`pl-10 ${errors.name ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* User ID */}
                  <div>
                    <Label htmlFor="userId">Unique User ID *</Label>
                    <div className="relative mt-2">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="userId"
                        placeholder="Choose a unique user ID"
                        value={formData.userId}
                        onChange={(e) => handleInputChange('userId', e.target.value)}
                        className={`pl-10 ${errors.userId ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.userId && (
                      <p className="text-red-500 text-sm mt-1">{errors.userId}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Contact */}
                  <div>
                    <Label htmlFor="contact">Contact Number *</Label>
                    <div className="relative mt-2">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="contact"
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={formData.contact}
                        onChange={(e) => handleInputChange('contact', e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className={`pl-10 ${errors.contact ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.contact && (
                      <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
                    )}
                  </div>

                  {/* Company (Optional) */}
                  <div>
                    <Label htmlFor="company">Company/Organization (Optional)</Label>
                    <div className="relative mt-2">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="company"
                        placeholder="Your company name"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#0088CC] hover:bg-[#0077B3] text-white text-lg"
                  >
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Register & Browse Consultants
                  </Button>
                  <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{' '}
                    <a href="/auth" className="text-[#0088CC] hover:underline font-semibold">
                      Sign In
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default QuickRegister;
