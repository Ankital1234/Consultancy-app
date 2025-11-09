import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Upload, 
  FileText, 
  User, 
  Briefcase, 
  DollarSign,
  Shield,
  ArrowLeft,
  CheckCircle2,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BecomeConsultantForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: '',
    domain: '',
    yearsOfExperience: '',
    hourlyCharge: '',
    professionalSummary: '',
    termsAccepted: false,
  });

  const [files, setFiles] = useState({
    aadharCard: null as File | null,
    panCard: null as File | null,
    certificates: [] as File[],
    resume: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const domains = [
    'Business Strategy',
    'Marketing & Sales',
    'Finance & Accounting',
    'Human Resources',
    'Information Technology',
    'Legal & Compliance',
    'Operations Management',
    'Product Management',
    'Data Analytics',
    'Digital Transformation',
    'Supply Chain',
    'Customer Experience',
  ];

  const experienceLevels = [
    '0-1 years',
    '1-3 years',
    '3-5 years',
    '5-10 years',
    '10-15 years',
    '15+ years',
  ];

  const validateField = (name: string, value: any) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.trim() === '' ? 'This field is required' : '';
      case 'phone':
        return !/^\d{10}$/.test(value) ? 'Please enter a valid 10-digit phone number' : '';
      case 'domain':
      case 'yearsOfExperience':
        return value === '' ? 'Please select an option' : '';
      case 'hourlyCharge':
        const charge = parseInt(value);
        if (isNaN(charge)) return 'Please enter a valid amount';
        if (charge < 100) return 'Minimum hourly charge is ₹100';
        return '';
      case 'professionalSummary':
        if (value.trim() === '') return 'Professional summary is required';
        if (value.length < 50) return 'Minimum 50 characters required';
        if (value.length > 500) return 'Maximum 500 characters allowed';
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

  const handleFileChange = (type: keyof typeof files, event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    if (type === 'certificates') {
      const newFiles = Array.from(selectedFiles);
      const validFiles = newFiles.filter(file => {
        const isValidType = ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type);
        const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
        return isValidType && isValidSize;
      });
      setFiles(prev => ({ ...prev, certificates: [...prev.certificates, ...validFiles] }));
    } else {
      const file = selectedFiles[0];
      const maxSize = type === 'resume' ? 5 * 1024 * 1024 : 5 * 1024 * 1024; // 5MB
      const validTypes = type === 'resume' 
        ? ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        : ['image/jpeg', 'image/png', 'application/pdf'];

      if (file && validTypes.includes(file.type) && file.size <= maxSize) {
        setFiles(prev => ({ ...prev, [type]: file }));
      } else {
        toast({
          title: 'Invalid file',
          description: 'Please check file type and size requirements',
          variant: 'destructive',
        });
      }
    }
  };

  const removeFile = (type: keyof typeof files, index?: number) => {
    if (type === 'certificates' && index !== undefined) {
      setFiles(prev => ({
        ...prev,
        certificates: prev.certificates.filter((_, i) => i !== index),
      }));
    } else {
      setFiles(prev => ({ ...prev, [type]: null }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    Object.keys(formData).forEach(key => {
      if (key !== 'termsAccepted') {
        const error = validateField(key, formData[key as keyof typeof formData]);
        if (error) newErrors[key] = error;
      }
    });

    if (!files.aadharCard) newErrors.aadharCard = 'Aadhar card is required';
    if (!files.panCard) newErrors.panCard = 'PAN card is required';
    if (files.certificates.length === 0) newErrors.certificates = 'At least one certificate is required';
    if (!files.resume) newErrors.resume = 'Resume is required';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';

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

    // Generate application ID
    const applicationId = `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Store application in sessionStorage (in real app, send to backend)
    const application = {
      applicationId,
      ...formData,
      files: {
        aadharCard: files.aadharCard?.name,
        panCard: files.panCard?.name,
        certificates: files.certificates.map(f => f.name),
        resume: files.resume?.name,
      },
      status: 'pending_approval',
      submittedDate: new Date().toISOString(),
    };

    sessionStorage.setItem('consultantApplication', JSON.stringify(application));

    toast({
      title: 'Application submitted!',
      description: 'Your application has been submitted successfully',
    });

    navigate(`/consultant-application-submitted?id=${applicationId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5EFE9] to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/user-dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-4xl font-bold text-[#2C3E50] mb-2">
            Become a Consultant
          </h1>
          <p className="text-lg text-gray-600">
            Fill out the application form to join our network of professional consultants
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
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      disabled
                      className="bg-gray-100 cursor-not-allowed"
                    />
                    <p className="text-gray-500 text-xs mt-1">Email is linked to your account</p>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                      onBlur={() => handleBlur('phone')}
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Professional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="mb-6 border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#E8D4C4] to-[#D4C4B4]">
                <CardTitle className="flex items-center gap-2 text-[#2C3E50]">
                  <Briefcase className="h-5 w-5" />
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="domain">Domain/Area of Expertise *</Label>
                      <Select
                        value={formData.domain}
                        onValueChange={(value) => handleInputChange('domain', value)}
                      >
                        <SelectTrigger className={errors.domain ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select your domain" />
                        </SelectTrigger>
                        <SelectContent>
                          {domains.map((domain) => (
                            <SelectItem key={domain} value={domain}>
                              {domain}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.domain && (
                        <p className="text-red-500 text-sm mt-1">{errors.domain}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="yearsOfExperience">Years of Experience *</Label>
                      <Select
                        value={formData.yearsOfExperience}
                        onValueChange={(value) => handleInputChange('yearsOfExperience', value)}
                      >
                        <SelectTrigger className={errors.yearsOfExperience ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          {experienceLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.yearsOfExperience && (
                        <p className="text-red-500 text-sm mt-1">{errors.yearsOfExperience}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="hourlyCharge">Hourly Charge (₹) *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="hourlyCharge"
                        type="number"
                        min="100"
                        placeholder="Minimum ₹100"
                        value={formData.hourlyCharge}
                        onChange={(e) => handleInputChange('hourlyCharge', e.target.value)}
                        onBlur={() => handleBlur('hourlyCharge')}
                        className={`pl-10 ${errors.hourlyCharge ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.hourlyCharge && (
                      <p className="text-red-500 text-sm mt-1">{errors.hourlyCharge}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="professionalSummary">Professional Summary *</Label>
                    <Textarea
                      id="professionalSummary"
                      placeholder="Describe your expertise, experience, and what makes you a great consultant (50-500 characters)"
                      value={formData.professionalSummary}
                      onChange={(e) => handleInputChange('professionalSummary', e.target.value)}
                      onBlur={() => handleBlur('professionalSummary')}
                      className={`min-h-[120px] ${errors.professionalSummary ? 'border-red-500' : ''}`}
                      maxLength={500}
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.professionalSummary ? (
                        <p className="text-red-500 text-sm">{errors.professionalSummary}</p>
                      ) : (
                        <p className="text-gray-500 text-sm">
                          {formData.professionalSummary.length}/500 characters
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Document Verification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="mb-6 border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#0088CC] to-[#00A8E8] text-white">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Document Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Aadhar Card */}
                  <div>
                    <Label>Aadhar Card * (JPG, PNG, PDF - Max 5 MB)</Label>
                    <div className="mt-2">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-gray-500" />
                          <p className="text-sm text-gray-500">
                            {files.aadharCard ? files.aadharCard.name : 'Click to upload Aadhar Card'}
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/jpeg,image/png,application/pdf"
                          onChange={(e) => handleFileChange('aadharCard', e)}
                        />
                      </label>
                      {files.aadharCard && (
                        <div className="mt-2 flex items-center justify-between bg-gray-100 p-2 rounded">
                          <span className="text-sm truncate">{files.aadharCard.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile('aadharCard')}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      {errors.aadharCard && (
                        <p className="text-red-500 text-sm mt-1">{errors.aadharCard}</p>
                      )}
                    </div>
                  </div>

                  {/* PAN Card */}
                  <div>
                    <Label>PAN Card * (JPG, PNG, PDF - Max 5 MB)</Label>
                    <div className="mt-2">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-gray-500" />
                          <p className="text-sm text-gray-500">
                            {files.panCard ? files.panCard.name : 'Click to upload PAN Card'}
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/jpeg,image/png,application/pdf"
                          onChange={(e) => handleFileChange('panCard', e)}
                        />
                      </label>
                      {files.panCard && (
                        <div className="mt-2 flex items-center justify-between bg-gray-100 p-2 rounded">
                          <span className="text-sm truncate">{files.panCard.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile('panCard')}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      {errors.panCard && (
                        <p className="text-red-500 text-sm mt-1">{errors.panCard}</p>
                      )}
                    </div>
                  </div>

                  {/* Professional Certificates */}
                  <div>
                    <Label>Professional Certificates * (JPG, PNG, PDF - Max 10 MB each)</Label>
                    <div className="mt-2">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-gray-500" />
                          <p className="text-sm text-gray-500">
                            Click to upload certificates (multiple files allowed)
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/jpeg,image/png,application/pdf"
                          multiple
                          onChange={(e) => handleFileChange('certificates', e)}
                        />
                      </label>
                      {files.certificates.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {files.certificates.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                              <span className="text-sm truncate">{file.name}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile('certificates', index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                      {errors.certificates && (
                        <p className="text-red-500 text-sm mt-1">{errors.certificates}</p>
                      )}
                    </div>
                  </div>

                  {/* Resume */}
                  <div>
                    <Label>Resume/CV * (PDF, DOC, DOCX - Max 5 MB)</Label>
                    <div className="mt-2">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FileText className="w-8 h-8 mb-2 text-gray-500" />
                          <p className="text-sm text-gray-500">
                            {files.resume ? files.resume.name : 'Click to upload Resume/CV'}
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          onChange={(e) => handleFileChange('resume', e)}
                        />
                      </label>
                      {files.resume && (
                        <div className="mt-2 flex items-center justify-between bg-gray-100 p-2 rounded">
                          <span className="text-sm truncate">{files.resume.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile('resume')}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      {errors.resume && (
                        <p className="text-red-500 text-sm mt-1">{errors.resume}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Terms and Conditions */}
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
                      . I understand that my application will be reviewed and I will be notified of the decision.
                    </label>
                    {errors.termsAccepted && (
                      <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-end"
          >
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => navigate('/user-dashboard')}
              className="border-gray-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              className="bg-[#0088CC] hover:bg-[#0077B3] text-white"
            >
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Submit Application
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default BecomeConsultantForm;
