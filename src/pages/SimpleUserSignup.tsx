import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Eye,
  EyeOff
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SimpleUserSignup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    city: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'unavailable'>('idle');
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong'>('weak');

  // Check username availability (simulated)
  useEffect(() => {
    if (formData.username.length >= 3) {
      setUsernameStatus('checking');
      const timer = setTimeout(() => {
        // Simulate API call
        const unavailableUsernames = ['admin', 'test', 'user123'];
        if (unavailableUsernames.includes(formData.username.toLowerCase())) {
          setUsernameStatus('unavailable');
        } else {
          setUsernameStatus('available');
        }
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setUsernameStatus('idle');
    }
  }, [formData.username]);

  // Check password strength
  useEffect(() => {
    const password = formData.password;
    if (password.length === 0) {
      setPasswordStrength('weak');
      return;
    }

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) setPasswordStrength('weak');
    else if (strength === 3) setPasswordStrength('medium');
    else setPasswordStrength('strong');
  }, [formData.password]);

  const validateField = (name: string, value: any) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.trim() === '' ? 'This field is required' : '';
      case 'username':
        if (value.trim() === '') return 'Username is required';
        if (value.length < 3) return 'Username must be at least 3 characters';
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
        if (usernameStatus === 'unavailable') return 'Username is already taken';
        return '';
      case 'email':
        if (value.trim() === '') return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        return '';
      case 'password':
        if (value === '') return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
        if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
        if (!/[^A-Za-z0-9]/.test(value)) return 'Password must contain at least one special character';
        return '';
      case 'confirmPassword':
        if (value === '') return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      case 'mobile':
        if (value.trim() === '') return 'Mobile number is required';
        if (!/^\d{10}$/.test(value)) return 'Please enter a valid 10-digit mobile number';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, formData[name as keyof typeof formData]) }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    Object.keys(formData).forEach(key => {
      if (key !== 'city' && key !== 'termsAccepted') {
        const error = validateField(key, formData[key as keyof typeof formData]);
        if (error) newErrors[key] = error;
      }
    });

    if (usernameStatus !== 'available') {
      newErrors.username = 'Please choose an available username';
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Form validation failed',
        description: 'Please fill all required fields correctly',
        variant: 'destructive',
      });
      return;
    }

    // Store user data
    const userData = {
      ...formData,
      userType: 'user',
      registeredAt: new Date().toISOString(),
    };

    sessionStorage.setItem('signupCredentials', JSON.stringify({
      email: formData.email,
      password: formData.password,
      userType: 'user',
    }));

    localStorage.setItem('userRole_' + formData.email, 'user');

    toast({
      title: 'Account created successfully!',
      description: 'Welcome to consultancy.co',
    });

    navigate('/find-consultants');
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'strong': return 'bg-green-500';
    }
  };

  const getPasswordStrengthWidth = () => {
    switch (passwordStrength) {
      case 'weak': return 'w-1/3';
      case 'medium': return 'w-2/3';
      case 'strong': return 'w-full';
    }
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
            Create Your Account
          </h1>
          <p className="text-lg text-gray-600">
            Start finding expert consultants for your projects
          </p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="mb-6 border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#0088CC] to-[#00A8E8] text-white">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      onBlur={() => handleBlur('firstName')}
                      className={errors.firstName ? 'border-red-500' : ''}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      onBlur={() => handleBlur('lastName')}
                      className={errors.lastName ? 'border-red-500' : ''}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Account Credentials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="mb-6 border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#E8D4C4] to-[#D4C4B4]">
                <CardTitle className="flex items-center gap-2 text-[#2C3E50]">
                  <Lock className="h-5 w-5" />
                  Account Credentials
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Username */}
                  <div>
                    <Label htmlFor="username">Username (Unique User ID) *</Label>
                    <div className="relative">
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        onBlur={() => handleBlur('username')}
                        className={errors.username ? 'border-red-500' : ''}
                      />
                      {usernameStatus !== 'idle' && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          {usernameStatus === 'checking' && (
                            <div className="animate-spin h-5 w-5 border-2 border-[#0088CC] border-t-transparent rounded-full" />
                          )}
                          {usernameStatus === 'available' && (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          )}
                          {usernameStatus === 'unavailable' && (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                    {usernameStatus === 'available' && !errors.username && (
                      <p className="text-green-500 text-sm mt-1">✓ Username is available</p>
                    )}
                    {errors.username && (
                      <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        onBlur={() => handleBlur('password')}
                        className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex gap-1 h-1 mb-1">
                          <div className={`flex-1 rounded ${getPasswordStrengthColor()} ${getPasswordStrengthWidth()} transition-all`} />
                        </div>
                        <p className={`text-sm ${
                          passwordStrength === 'weak' ? 'text-red-500' :
                          passwordStrength === 'medium' ? 'text-yellow-500' :
                          'text-green-500'
                        }`}>
                          Password strength: {passwordStrength}
                        </p>
                      </div>
                    )}
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                    <p className="text-gray-500 text-xs mt-1">
                      Must be 8+ characters with uppercase, number, and special character
                    </p>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        onBlur={() => handleBlur('confirmPassword')}
                        className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="mb-6 border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#0088CC] to-[#00A8E8] text-white">
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="mobile">Mobile Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="mobile"
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={formData.mobile}
                        onChange={(e) => handleInputChange('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                        onBlur={() => handleBlur('mobile')}
                        className={`pl-10 ${errors.mobile ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.mobile && (
                      <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="city">City (Optional)</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Terms & Conditions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => handleInputChange('termsAccepted', checked)}
                  />
                  <div className="flex-1">
                    <label htmlFor="terms" className="text-sm cursor-pointer">
                      I accept the{' '}
                      <a href="/terms" className="text-[#0088CC] hover:underline">
                        Terms and Conditions
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" className="text-[#0088CC] hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                    {errors.termsAccepted && (
                      <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              type="submit"
              size="lg"
              className="w-full bg-[#0088CC] hover:bg-[#0077B3] text-white text-lg"
            >
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Create Account & Find Consultants
            </Button>
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{' '}
              <a href="/auth" className="text-[#0088CC] hover:underline font-semibold">
                Sign In
              </a>
            </p>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default SimpleUserSignup;
