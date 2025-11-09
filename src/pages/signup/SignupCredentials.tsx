import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Briefcase, Eye, EyeOff, Building2, UserCircle, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const SignupCredentials = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'user';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    qualification: '',
    industry: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [orgChoice, setOrgChoice] = useState<string>('');
  const [latestApplication, setLatestApplication] = useState<any>(null);
  const [consultantType, setConsultantType] = useState<'organized' | 'individual' | ''>('');
  const [companies, setCompanies] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validateRequired = (val: string) => {
    return !val ? 'This field is required' : '';
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
      if (userType === 'consultant') {
        if (field === 'fullName') error = validateRequired(value);
        if (field === 'phone') error = validateRequired(value);
        if (field === 'qualification') error = validateRequired(value);
        if (field === 'industry') error = validateRequired(value);
      }
      
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
    if (userType === 'consultant') {
      if (field === 'fullName') error = validateRequired(formData.fullName);
      if (field === 'phone') error = validateRequired(formData.phone);
      if (field === 'qualification') error = validateRequired(formData.qualification);
      if (field === 'industry') error = validateRequired(formData.industry);
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  // Check if form is valid
  const isFormValid = () => {
    const baseValid = (
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      !validateEmail(formData.email) &&
      !validatePassword(formData.password) &&
      !validateConfirmPassword(formData.confirmPassword, formData.password)
    );
    if (userType !== 'consultant') return baseValid;
    return (
      baseValid &&
      formData.fullName &&
      formData.phone &&
      formData.qualification &&
      formData.industry &&
      !validateRequired(formData.fullName) &&
      !validateRequired(formData.phone) &&
      !validateRequired(formData.qualification) &&
      !validateRequired(formData.industry)
    );
  };

  // Handle registration type selection
  const handleRegistration = (registrationType: 'individual' | 'company') => {
    if (!isFormValid()) {
      // Validate all fields
      if (userType === 'consultant') {
        setTouched({ email: true, password: true, confirmPassword: true, fullName: true, phone: true, qualification: true, industry: true });
      } else {
        setTouched({ email: true, password: true, confirmPassword: true });
      }
      setErrors({
        email: validateEmail(formData.email),
        password: validatePassword(formData.password),
        confirmPassword: validateConfirmPassword(formData.confirmPassword, formData.password),
        ...(userType === 'consultant' ? {
          fullName: validateRequired(formData.fullName),
          phone: validateRequired(formData.phone),
          qualification: validateRequired(formData.qualification),
          industry: validateRequired(formData.industry),
        } : {}),
      });
      return;
    }

    // Store credentials in session storage
    sessionStorage.setItem('signupCredentials', JSON.stringify({
      email: formData.email,
      password: formData.password,
      userType,
      registrationType,
      ...(userType === 'consultant' ? {
        fullName: formData.fullName,
        phone: formData.phone,
        qualification: formData.qualification,
        industry: formData.industry,
        organization: orgChoice,
      } : {}),
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
      if (userType === 'consultant') {
        if (orgChoice === 'others') {
          window.open('/signup/company-register', '_blank');
        } else if (orgChoice) {
          setLatestApplication({ companyName: orgChoice, status: 'approved' });
        } else {
          // fallback to search if no selection
          navigate('/signup/company-search');
        }
      } else {
        navigate('/signup/company-search');
      }
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

  useEffect(() => {
    const stored = localStorage.getItem('latestCompanyApplication');
    if (stored) {
      try { setLatestApplication(JSON.parse(stored)); } catch {}
    }
    const defaultCompanies = ['CGI','Infosys','Wipro','Bosch','Others'];
    try {
      const savedList = JSON.parse(localStorage.getItem('companyList') || '[]');
      const merged = Array.from(new Set([...(Array.isArray(savedList) ? savedList : []), ...defaultCompanies]))
        .filter((c: string) => !/^(accenture|deloitte)$/i.test(c));
      setCompanies(merged);
    } catch {
      setCompanies(defaultCompanies.filter((c) => !/^(accenture|deloitte)$/i.test(c)));
    }
    try {
      const latest = localStorage.getItem('latestCompanyAdded');
      if (latest) {
        setOrgChoice(latest);
        setConsultantType('organized');
        setCompanies(prev => Array.from(new Set([latest, ...prev])));
      }
    } catch {}
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'latestCompanyApplication' && e.newValue) { try { setLatestApplication(JSON.parse(e.newValue)); } catch {} }
      if (e.key === 'companyList' && e.newValue) {
        try {
          const list = JSON.parse(e.newValue);
          if (Array.isArray(list)) {
            const filtered = list.filter((c: string) => !/^(accenture|deloitte)$/i.test(c));
            setCompanies(prev => Array.from(new Set([...filtered, ...prev])));
          }
        } catch {}
      }
      if (e.key === 'latestCompanyAdded' && e.newValue) {
        const name = e.newValue;
        setOrgChoice(name);
        setConsultantType('organized');
        setCompanies(prev => Array.from(new Set([name, ...prev])));
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleConsultantSubmit = () => {
    if (!isFormValid()) {
      setTouched({ email: true, password: true, confirmPassword: true, fullName: true, phone: true, qualification: true, industry: true });
      setErrors({
        email: validateEmail(formData.email),
        password: validatePassword(formData.password),
        confirmPassword: validateConfirmPassword(formData.confirmPassword, formData.password),
        fullName: validateRequired(formData.fullName),
        phone: validateRequired(formData.phone),
        qualification: validateRequired(formData.qualification),
        industry: validateRequired(formData.industry),
      });
      return;
    }
    const payload = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      qualification: formData.qualification,
      industry: formData.industry,
      consultantType,
      organization: consultantType === 'organized' ? orgChoice : '',
      createdAt: Date.now(),
    };
    try { localStorage.setItem('consultantRegistration', JSON.stringify(payload)); } catch {}
    setSubmitted(true);
  };

  return (
    <div className={`min-h-screen px-4 py-12 ${userType === 'consultant' ? 'bg-gradient-to-b from-[#E6F4FF] to-[#F0F7FF]' : 'bg-gradient-to-b from-[#FDFBF7] to-[#F5F0ED]'}`}>
      <div className="max-w-2xl mx-auto">
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
            Back
          </Button>

          <Card className="border-2 border-[#E8E3DE] shadow-lg">
            <CardHeader className="text-center pb-6 border-b border-[#E8E3DE]">
              <div className="flex justify-center mb-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${userType === 'consultant' ? 'bg-gradient-to-br from-[#8ec5ff] to-[#6fbaff]' : 'bg-gradient-to-br from-[#C9A876] to-[#B89B7F]'}`}>
                  {userType === 'consultant' ? (
                    <Briefcase className="w-8 h-8 text-white" />
                  ) : (
                    <User className="w-8 h-8 text-white" />
                  )}
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-[#2B2520]">
                {userType === 'consultant' ? 'Consultant Registration' : 'Create Your Account'}
              </CardTitle>
              <p className="text-[#8B8680] mt-2">
                {userType === 'consultant' ? 'Enter your email and create a secure password' : 'Enter your email and create a secure password'}
              </p>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="space-y-6">
                {userType === 'consultant' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name <span className="text-red-500">*</span></Label>
                      <Input value={formData.fullName} onChange={(e) => handleChange('fullName', e.target.value)} onBlur={() => handleBlur('fullName')} placeholder="Your name" className={`border-2 ${errors.fullName && touched.fullName ? 'border-red-500' : 'border-[#E8E3DE]'}`} />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number <span className="text-red-500">*</span></Label>
                      <Input value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} onBlur={() => handleBlur('phone')} placeholder="Enter phone" className={`border-2 ${errors.phone && touched.phone ? 'border-red-500' : 'border-[#E8E3DE]'}`} />
                    </div>
                    <div className="space-y-2">
                      <Label>Qualification <span className="text-red-500">*</span></Label>
                      <Input value={formData.qualification} onChange={(e) => handleChange('qualification', e.target.value)} onBlur={() => handleBlur('qualification')} placeholder="e.g., B.Tech, MBA" className={`border-2 ${errors.qualification && touched.qualification ? 'border-red-500' : 'border-[#E8E3DE]'}`} />
                    </div>
                    <div className="space-y-2">
                      <Label>Industry <span className="text-red-500">*</span></Label>
                      <Input value={formData.industry} onChange={(e) => handleChange('industry', e.target.value)} onBlur={() => handleBlur('industry')} placeholder="e.g., IT, Consulting" className={`border-2 ${errors.industry && touched.industry ? 'border-red-500' : 'border-[#E8E3DE]'}`} />
                    </div>
                    <div className="col-span-1 md:col-span-2 space-y-3">
                      <Label>Consultant Type</Label>
                      <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="cType" checked={consultantType==='organized'} onChange={() => setConsultantType('organized')} />
                          <span>Organized</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="cType" checked={consultantType==='individual'} onChange={() => { setConsultantType('individual'); setOrgChoice(''); }} />
                          <span>Individual</span>
                        </label>
                      </div>
                    </div>

                    {consultantType === 'organized' && (
                      <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Organization</Label>
                          <select value={orgChoice} onChange={(e) => {
                            const v = e.target.value; setOrgChoice(v); if (v.toLowerCase() === 'others') { window.open('/register-company','_blank'); }
                          }} className="border-2 rounded-md h-10 px-3 border-[#E8E3DE]">
                            <option value="">Select organization</option>
                            {companies.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                          {orgChoice.toLowerCase() === 'others' && (
                            <div className="text-sm text-[#2B2520] mt-2">
                              Register your company to continue.
                              <Button variant="link" className="px-2" onClick={() => window.open('/register-company','_blank')}>Open form</Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`border-2 ${errors.email && touched.email ? 'border-red-500' : 'border-[#E8E3DE]'}`}
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

                <div className="space-y-2">
                  <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      onBlur={() => handleBlur('password')}
                      className={`border-2 pr-10 ${errors.password && touched.password ? 'border-red-500' : 'border-[#E8E3DE]'}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B8680] hover:text-[#2B2520]"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {formData.password && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#8B8680]">Password Strength:</span>
                        <span
                          className={`font-medium ${
                            passwordStrength.label === 'Weak'
                              ? 'text-red-500'
                              : passwordStrength.label === 'Fair'
                              ? 'text-yellow-500'
                              : passwordStrength.label === 'Good'
                              ? 'text-blue-500'
                              : 'text-green-600'
                          }`}
                        >
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      onBlur={() => handleBlur('confirmPassword')}
                      className={`border-2 pr-10 ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-[#E8E3DE]'}`}
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

                {userType === 'consultant' && (
                  <div className="mt-4 space-y-3">
                    <Button onClick={handleConsultantSubmit} className="w-full bg-[#8ec5ff] hover:bg-[#6fbaff] text-white">Submit</Button>
                    {submitted && (
                      <div className="space-y-2">
                        <div className="text-[#2B2520]">Need a verification from admin.</div>
                        <Button onClick={() => navigate(`/signup/application-submitted${latestApplication?.applicationId ? `?id=${latestApplication.applicationId}` : ''}`)} className="w-full bg-[#8ec5ff] hover:bg-[#6fbaff] text-white">Submit for admin approval</Button>
                      </div>
                    )}
                  </div>
                )}

                

                <div className="text-center text-sm text-[#8B8680]">
                  Already have an account? <Button variant="link" onClick={() => navigate('/auth')} className="p-0 h-auto">Sign In</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupCredentials;
