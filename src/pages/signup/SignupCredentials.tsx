import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Briefcase, Eye, EyeOff, Building2, UserCircle, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const SignupCredentials = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'user';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Password must contain at least one special character';
    return '';
  };

  const validateConfirmPassword = (confirmPassword: string, password: string) => {
    if (!confirmPassword) return 'Please confirm your password';
    if (confirmPassword !== password) return 'Passwords do not match';
    return '';
  };

  // Handle field changes
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation
    if (touched[field]) {
      let error = '';
      if (field === 'email') error = validateEmail(value);
      if (field === 'password') error = validatePassword(value);
      if (field === 'confirmPassword') error = validateConfirmPassword(value, formData.password);
      
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  // Handle field blur
  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    let error = '';
    if (field === 'email') error = validateEmail(formData.email);
    if (field === 'password') error = validatePassword(formData.password);
    if (field === 'confirmPassword') error = validateConfirmPassword(formData.confirmPassword, formData.password);
    
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      !validateEmail(formData.email) &&
      !validatePassword(formData.password) &&
      !validateConfirmPassword(formData.confirmPassword, formData.password)
    );
  };

  // Handle registration type selection
  const handleRegistration = (registrationType: 'individual' | 'company') => {
    if (!isFormValid()) {
      // Validate all fields
      setTouched({ email: true, password: true, confirmPassword: true });
      setErrors({
        email: validateEmail(formData.email),
        password: validatePassword(formData.password),
        confirmPassword: validateConfirmPassword(formData.confirmPassword, formData.password),
      });
      return;
    }

    // Store credentials in session storage
    sessionStorage.setItem('signupCredentials', JSON.stringify({
      email: formData.email,
      password: formData.password,
      userType,
      registrationType,
    }));

    // Route based on BOTH userType AND registrationType
    if (registrationType === 'individual') {
      // Individual registration
      if (userType === 'user') {
        // User + Individual → User profile setup
        navigate('/user-profile-setup');
      } else if (userType === 'consultant') {
        // Consultant + Individual → Consultant profile setup
        navigate('/consultant-profile-setup');
      }
    } else {
      // Company registration - both user types go to company search
      navigate('/signup/company-search');
    }
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    
    if (strength <= 1) return { strength: 25, label: 'Weak', color: 'bg-red-500' };
    if (strength === 2) return { strength: 50, label: 'Fair', color: 'bg-yellow-500' };
    if (strength === 3) return { strength: 75, label: 'Good', color: 'bg-blue-500' };
    return { strength: 100, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFBF7] to-[#F5F0ED] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/signup')}
            className="mb-6 text-[#8B8680] hover:text-[#2B2520] hover:bg-[#F9F6F3]"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Selection
          </Button>

          <Card className="border-2 border-[#E8E3DE] shadow-lg">
            <CardHeader className="text-center pb-6 border-b border-[#E8E3DE]">
              <div className="flex justify-center mb-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                  userType === 'consultant' ? 'from-[#C9A876] to-[#B89B7F]' : 'from-[#D4C5B9] to-[#C4B5A9]'
                } flex items-center justify-center`}>
                  {userType === 'consultant' ? (
                    <Briefcase className="w-8 h-8 text-white" />
                  ) : (
                    <User className="w-8 h-8 text-white" />
                  )}
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-[#2B2520]">
                {userType === 'consultant' ? 'Consultant' : 'User'} Registration
              </CardTitle>
              <p className="text-[#8B8680] mt-2">
                Enter your email and create a secure password
              </p>
            </CardHeader>

            <CardContent className="pt-6">
              <form className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#2B2520] font-medium">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`border-2 ${
                      errors.email && touched.email
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-[#E8E3DE] focus:border-[#C9A876]'
                    }`}
                  />
                  {errors.email && touched.email && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </div>
                  )}
                  {!errors.email && touched.email && formData.email && (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      Valid email address
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#2B2520] font-medium">
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      onBlur={() => handleBlur('password')}
                      className={`border-2 pr-10 ${
                        errors.password && touched.password
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#E8E3DE] focus:border-[#C9A876]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B8680] hover:text-[#2B2520]"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#8B8680]">Password Strength:</span>
                        <span className={`font-medium ${
                          passwordStrength.label === 'Weak' ? 'text-red-500' :
                          passwordStrength.label === 'Fair' ? 'text-yellow-500' :
                          passwordStrength.label === 'Good' ? 'text-blue-500' :
                          'text-green-600'
                        }`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-[#E8E3DE] rounded-full overflow-hidden">
                        <div
                          className={`h-full ${passwordStrength.color} transition-all duration-300`}
                          style={{ width: `${passwordStrength.strength}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {errors.password && touched.password && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.password}
                    </div>
                  )}
                  
                  {/* Password Requirements */}
                  <div className="text-xs text-[#8B8680] space-y-1 mt-2">
                    <p className="font-medium">Password must contain:</p>
                    <ul className="list-disc list-inside space-y-0.5 ml-2">
                      <li className={formData.password.length >= 8 ? 'text-green-600' : ''}>
                        At least 8 characters
                      </li>
                      <li className={/[A-Z]/.test(formData.password) ? 'text-green-600' : ''}>
                        One uppercase letter
                      </li>
                      <li className={/[0-9]/.test(formData.password) ? 'text-green-600' : ''}>
                        One number
                      </li>
                      <li className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-600' : ''}>
                        One special character
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-[#2B2520] font-medium">
                    Confirm Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      onBlur={() => handleBlur('confirmPassword')}
                      className={`border-2 pr-10 ${
                        errors.confirmPassword && touched.confirmPassword
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#E8E3DE] focus:border-[#C9A876]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B8680] hover:text-[#2B2520]"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.confirmPassword}
                    </div>
                  )}
                  {!errors.confirmPassword && touched.confirmPassword && formData.confirmPassword && (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      Passwords match
                    </div>
                  )}
                </div>

                {/* Registration Type Selection */}
                <div className="pt-6 border-t border-[#E8E3DE]">
                  <p className="text-[#2B2520] font-medium mb-4 text-center">
                    Choose your registration type:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Individual Registration */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="button"
                        onClick={() => handleRegistration('individual')}
                        className="w-full h-auto py-6 flex flex-col items-center gap-3 bg-white hover:bg-[#F9F6F3] text-[#2B2520] border-2 border-[#C9A876] hover:border-[#B89B7F] transition-all duration-200"
                      >
                        <UserCircle className="w-8 h-8 text-[#C9A876]" />
                        <div className="text-center">
                          <div className="font-bold text-lg">Register as Individual</div>
                          <div className="text-sm text-[#8B8680] font-normal mt-1">
                            Register as a solo professional or regular user
                          </div>
                        </div>
                      </Button>
                    </motion.div>

                    {/* Company Registration */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="button"
                        onClick={() => handleRegistration('company')}
                        className="w-full h-auto py-6 flex flex-col items-center gap-3 bg-white hover:bg-[#F9F6F3] text-[#2B2520] border-2 border-[#D4C5B9] hover:border-[#C4B5A9] transition-all duration-200"
                      >
                        <Building2 className="w-8 h-8 text-[#D4C5B9]" />
                        <div className="text-center px-2">
                          <div className="font-bold text-lg">Register as Company</div>
                          <div className="text-xs md:text-sm text-[#8B8680] font-normal mt-1 leading-tight">
                            Register your company to list consultants and services
                          </div>
                        </div>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </form>

              <div className="text-center mt-6 pt-6 border-t border-[#E8E3DE]">
                <p className="text-[#8B8680] text-sm">
                  Already have an account?{' '}
                  <button
                    onClick={() => navigate('/auth')}
                    className="text-[#C9A876] hover:text-[#B89B7F] font-medium underline"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupCredentials;
