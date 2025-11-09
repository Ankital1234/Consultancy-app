import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Building2,
  Upload,
  X,
  AlertCircle,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';
import { useState } from 'react';

interface FormData {
  companyName: string;
  registrationNumber: string;
  companyEmail: string;
  industry: string;
  customIndustry: string;
  website: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  description: string;
  employeeCount: string;
  termsAccepted: boolean;
}

const CompanyRegister = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [documents, setDocuments] = useState<File[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});

  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    registrationNumber: '',
    companyEmail: '',
    industry: '',
    customIndustry: '',
    website: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    description: '',
    employeeCount: '',
    termsAccepted: false,
  });

  const industries = ['IT', 'Consulting', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Retail', 'Services', 'Other'];
  const employeeCounts = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];
  const states = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

  const validateField = (field: keyof FormData, value: any): string => {
    switch (field) {
      case 'companyName':
        if (!value) return 'Company name is required';
        if (value.length < 2) return 'Min 2 characters';
        if (value.length > 100) return 'Max 100 characters';
        return '';
      case 'registrationNumber':
        return !value ? 'Registration number required' : '';
      case 'companyEmail':
        if (!value) return 'Email required';
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email' : '';
      case 'industry':
        return !value ? 'Industry required' : '';
      case 'customIndustry':
        return formData.industry === 'Other' && !value ? 'Specify industry' : '';
      case 'phone':
        if (!value) return 'Phone required';
        return !/^\+?[\d\s-()]+$/.test(value) ? 'Invalid phone' : '';
      case 'streetAddress':
        return !value ? 'Address required' : '';
      case 'city':
        return !value ? 'City required' : '';
      case 'state':
        return !value ? 'State required' : '';
      case 'zipCode':
        return !value ? 'ZIP required' : '';
      case 'description':
        if (!value) return 'Description required';
        if (value.length < 20) return 'Min 20 characters';
        if (value.length > 500) return 'Max 500 characters';
        return '';
      case 'employeeCount':
        return !value ? 'Employee count required' : '';
      case 'website':
        return value && !/^https?:\/\/.+\..+/.test(value) ? 'Invalid URL' : '';
      case 'termsAccepted':
        return !value ? 'Accept terms' : '';
      default:
        return '';
    }
  };

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => ({ ...prev, [field]: validateField(field, formData[field]) }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { alert('Logo max 5MB'); return; }
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) { alert('JPG/PNG/GIF only'); return; }
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      if (file.size > 10 * 1024 * 1024) { alert(`${file.name} exceeds 10MB`); return false; }
      if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) { alert(`${file.name} must be PDF/JPG/PNG`); return false; }
      return true;
    });
    setDocuments(prev => [...prev, ...validFiles]);
  };

  const removeDocument = (index: number) => setDocuments(prev => prev.filter((_, i) => i !== index));
  const removeLogo = () => { setLogo(null); setLogoPreview(''); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    let hasErrors = false;
    const errorFields: string[] = [];
    
    (Object.keys(formData) as Array<keyof FormData>).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) { 
        newErrors[field] = error; 
        hasErrors = true;
        errorFields.push(field);
      }
    });
    
    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    
    if (hasErrors) { 
      const fieldNames = errorFields.map(f => {
        switch(f) {
          case 'companyName': return 'Company Name';
          case 'registrationNumber': return 'Registration Number';
          case 'companyEmail': return 'Company Email';
          case 'industry': return 'Industry';
          case 'customIndustry': return 'Custom Industry';
          case 'phone': return 'Phone';
          case 'streetAddress': return 'Street Address';
          case 'city': return 'City';
          case 'state': return 'State';
          case 'zipCode': return 'ZIP Code';
          case 'description': return 'Description';
          case 'employeeCount': return 'Employee Count';
          case 'termsAccepted': return 'Terms & Conditions';
          default: return f;
        }
      }).join(', ');
      alert(`Please fix the following fields: ${fieldNames}`);
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      const applicationId = `APP-${Date.now()}`;
      const application = { 
        id: applicationId, 
        ...formData, 
        logo: logoPreview, 
        documents: documents.map(d => d.name), 
        status: 'pending_approval', 
        submittedDate: new Date().toLocaleDateString(),
        submittedTime: new Date().toLocaleTimeString(),
        applicationId 
      };
      const existing = JSON.parse(sessionStorage.getItem('pendingApplications') || '[]');
      sessionStorage.setItem('pendingApplications', JSON.stringify([...existing, application]));
      try {
        const summary = {
          companyName: formData.companyName,
          applicationId,
          industry: formData.industry === 'Other' ? formData.customIndustry || 'Other' : formData.industry,
          employeeCount: formData.employeeCount,
          submittedDate: application.submittedDate,
        };
        localStorage.setItem('latestCompanyApplication', JSON.stringify(summary));
      } catch {}
      setIsSubmitting(false);
      navigate(`/signup/application-submitted?id=${applicationId}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFBF7] to-[#F5F0ED] px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Button variant="ghost" onClick={() => navigate('/signup/company-search')} className="mb-6 text-[#8B8680] hover:text-[#2B2520]">
            <ArrowLeft className="mr-2 w-4 h-4" />Back to Company Search
          </Button>
          <Card className="border-2 border-[#E8E3DE] shadow-lg">
            <CardHeader className="text-center pb-6 border-b border-[#E8E3DE]">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4C5B9] to-[#C4B5A9] flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-[#2B2520]">Register Your Company</CardTitle>
              <p className="text-[#8B8680] mt-2">Fill in the details below to submit for admin approval</p>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#2B2520] pb-2 border-b border-[#E8E3DE]">Basic Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name <span className="text-red-500">*</span></Label>
                    <Input id="companyName" value={formData.companyName} onChange={(e) => handleChange('companyName', e.target.value)} onBlur={() => handleBlur('companyName')} placeholder="Enter company name" className={`border-2 ${errors.companyName && touched.companyName ? 'border-red-500' : 'border-[#E8E3DE]'}`} />
                    {errors.companyName && touched.companyName && <div className="flex items-center gap-2 text-red-500 text-sm"><AlertCircle className="w-4 h-4" />{errors.companyName}</div>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber">Registration Number/CIN <span className="text-red-500">*</span></Label>
                    <Input id="registrationNumber" value={formData.registrationNumber} onChange={(e) => handleChange('registrationNumber', e.target.value)} onBlur={() => handleBlur('registrationNumber')} placeholder="e.g., U12345AB2020PTC123456" className={`border-2 ${errors.registrationNumber && touched.registrationNumber ? 'border-red-500' : 'border-[#E8E3DE]'}`} />
                    {errors.registrationNumber && touched.registrationNumber && <div className="flex items-center gap-2 text-red-500 text-sm"><AlertCircle className="w-4 h-4" />{errors.registrationNumber}</div>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyEmail">Company Email <span className="text-red-500">*</span></Label>
                    <Input id="companyEmail" type="email" value={formData.companyEmail} onChange={(e) => handleChange('companyEmail', e.target.value)} onBlur={() => handleBlur('companyEmail')} placeholder="company@example.com" className={`border-2 ${errors.companyEmail && touched.companyEmail ? 'border-red-500' : 'border-[#E8E3DE]'}`} />
                    {errors.companyEmail && touched.companyEmail && <div className="flex items-center gap-2 text-red-500 text-sm"><AlertCircle className="w-4 h-4" />{errors.companyEmail}</div>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Industry <span className="text-red-500">*</span></Label>
                      <Select value={formData.industry} onValueChange={(value) => handleChange('industry', value)}>
                        <SelectTrigger className={`border-2 ${errors.industry && touched.industry ? 'border-red-500' : 'border-[#E8E3DE]'}`}><SelectValue placeholder="Select industry" /></SelectTrigger>
                        <SelectContent>{industries.map((ind) => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}</SelectContent>
                      </Select>
                      {errors.industry && touched.industry && <div className="flex items-center gap-2 text-red-500 text-sm"><AlertCircle className="w-4 h-4" />{errors.industry}</div>}
                    </div>
                    {formData.industry === 'Other' && (
                      <div className="space-y-2">
                        <Label>Specify Industry <span className="text-red-500">*</span></Label>
                        <Input value={formData.customIndustry} onChange={(e) => handleChange('customIndustry', e.target.value)} onBlur={() => handleBlur('customIndustry')} placeholder="Enter industry" className={`border-2 ${errors.customIndustry && touched.customIndustry ? 'border-red-500' : 'border-[#E8E3DE]'}`} />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Website</Label>
                      <Input type="url" value={formData.website} onChange={(e) => handleChange('website', e.target.value)} onBlur={() => handleBlur('website')} placeholder="https://www.example.com" className={`border-2 ${errors.website && touched.website ? 'border-red-500' : 'border-[#E8E3DE]'}`} />
                      {errors.website && touched.website && <div className="flex items-center gap-2 text-red-500 text-sm"><AlertCircle className="w-4 h-4" />{errors.website}</div>}
                    </div>
                    <div className="space-y-2">
                      <Label>Phone <span className="text-red-500">*</span></Label>
                      <Input type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} onBlur={() => handleBlur('phone')} placeholder="+91 1234567890" className={`border-2 ${errors.phone && touched.phone ? 'border-red-500' : 'border-[#E8E3DE]'}`} />
                      {errors.phone && touched.phone && <div className="flex items-center gap-2 text-red-500 text-sm"><AlertCircle className="w-4 h-4" />{errors.phone}</div>}
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-4 pt-4 border-t border-[#E8E3DE]">
                  <h3 className="text-lg font-bold text-[#2B2520]">Company Address</h3>
                  <div className="space-y-2">
                    <Label>Street Address <span className="text-red-500">*</span></Label>
                    <Input value={formData.streetAddress} onChange={(e) => handleChange('streetAddress', e.target.value)} onBlur={() => handleBlur('streetAddress')} placeholder="Enter street address" className={`border-2 ${errors.streetAddress && touched.streetAddress ? 'border-red-500' : 'border-[#E8E3DE]'}`} />
                    {errors.streetAddress && touched.streetAddress && <div className="flex items-center gap-2 text-red-500 text-sm"><AlertCircle className="w-4 h-4" />{errors.streetAddress}</div>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>City <span className="text-red-500">*</span></Label>
                      <Input value={formData.city} onChange={(e) => handleChange('city', e.target.value)} onBlur={() => handleBlur('city')} placeholder="Enter city" className={`border-2 ${errors.city && touched.city ? 'border-red-500' : 'border-[#E8E3DE]'}`} />
                      {errors.city && touched.city && <div className="flex items-center gap-2 text-red-500 text-sm"><AlertCircle className="w-4 h-4" />{errors.city}</div>}
                    </div>
                    <div className="space-y-2">
                      <Label>State <span className="text-red-500">*</span></Label>
                      <Select value={formData.state} onValueChange={(value) => handleChange('state', value)}>
                        <SelectTrigger className={`border-2 ${errors.state && touched.state ? 'border-red-500' : 'border-[#E8E3DE]'}`}><SelectValue placeholder="Select state" /></SelectTrigger>
                        <SelectContent>{states.map((st) => <SelectItem key={st} value={st}>{st}</SelectItem>)}</SelectContent>
                      </Select>
                      {errors.state && touched.state && <div className="flex items-center gap-2 text-red-500 text-sm"><AlertCircle className="w-4 h-4" />{errors.state}</div>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>ZIP Code <span className="text-red-500">*</span></Label>
                      <Input value={formData.zipCode} onChange={(e) => handleChange('zipCode', e.target.value)} onBlur={() => handleBlur('zipCode')} placeholder="Enter ZIP" className={`border-2 ${errors.zipCode && touched.zipCode ? 'border-red-500' : 'border-[#E8E3DE]'}`} />
                      {errors.zipCode && touched.zipCode && <div className="flex items-center gap-2 text-red-500 text-sm"><AlertCircle className="w-4 h-4" />{errors.zipCode}</div>}
                    </div>
                    <div className="space-y-2">
                      <Label>Country <span className="text-red-500">*</span></Label>
                      <Input value={formData.country} readOnly className="border-2 border-[#E8E3DE] bg-gray-50" />
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4 pt-4 border-t border-[#E8E3DE]">
                  <h3 className="text-lg font-bold text-[#2B2520]">Company Details</h3>
                  <div className="space-y-2">
                    <Label>Description <span className="text-red-500">*</span></Label>
                    <Textarea value={formData.description} onChange={(e) => handleChange('description', e.target.value)} onBlur={() => handleBlur('description')} placeholder="Brief description..." rows={4} className={`border-2 ${errors.description && touched.description ? 'border-red-500' : 'border-[#E8E3DE]'}`} />
                    <div className="flex justify-between text-sm">
                      {errors.description && touched.description && <div className="flex items-center gap-2 text-red-500"><AlertCircle className="w-4 h-4" />{errors.description}</div>}
                      <span className={`ml-auto ${formData.description.length < 20 || formData.description.length > 500 ? 'text-red-500' : 'text-[#8B8680]'}`}>{formData.description.length}/500</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Employee Count <span className="text-red-500">*</span></Label>
                    <Select value={formData.employeeCount} onValueChange={(value) => handleChange('employeeCount', value)}>
                      <SelectTrigger className={`border-2 ${errors.employeeCount && touched.employeeCount ? 'border-red-500' : 'border-[#E8E3DE]'}`}><SelectValue placeholder="Select count" /></SelectTrigger>
                      <SelectContent>{employeeCounts.map((cnt) => <SelectItem key={cnt} value={cnt}>{cnt}</SelectItem>)}</SelectContent>
                    </Select>
                    {errors.employeeCount && touched.employeeCount && <div className="flex items-center gap-2 text-red-500 text-sm"><AlertCircle className="w-4 h-4" />{errors.employeeCount}</div>}
                  </div>
                </div>

                {/* Files */}
                <div className="space-y-4 pt-4 border-t border-[#E8E3DE]">
                  <h3 className="text-lg font-bold text-[#2B2520]">Company Assets</h3>
                  <div className="space-y-2">
                    <Label>Logo (Optional)</Label>
                    <div className="border-2 border-dashed border-[#D4C5B9] rounded-lg p-6 text-center">
                      {logoPreview ? (
                        <div className="relative inline-block">
                          <img src={logoPreview} alt="Logo" className="w-32 h-32 object-cover rounded-lg" />
                          <button type="button" onClick={removeLogo} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"><X className="w-4 h-4" /></button>
                        </div>
                      ) : (
                        <div>
                          <ImageIcon className="w-12 h-12 mx-auto mb-3 text-[#8B8680]" />
                          <p className="text-[#8B8680] mb-2">JPG, PNG, GIF • Max 5MB</p>
                          <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" id="logo" />
                          <Button type="button" variant="outline" onClick={() => document.getElementById('logo')?.click()}><Upload className="mr-2 w-4 h-4" />Choose File</Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Documents (Optional)</Label>
                    <div className="border-2 border-dashed border-[#D4C5B9] rounded-lg p-6">
                      <input type="file" accept=".pdf,image/*" multiple onChange={handleDocumentUpload} className="hidden" id="docs" />
                      <Button type="button" variant="outline" onClick={() => document.getElementById('docs')?.click()} className="w-full"><Upload className="mr-2 w-4 h-4" />Upload Documents</Button>
                      {documents.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {documents.map((doc, i) => (
                            <div key={i} className="flex items-center justify-between p-2 bg-[#F9F6F3] rounded">
                              <div className="flex items-center gap-2"><FileText className="w-4 h-4" /><span className="text-sm">{doc.name}</span></div>
                              <button type="button" onClick={() => removeDocument(i)} className="text-red-500"><X className="w-4 h-4" /></button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-center gap-2 pt-4 border-t border-[#E8E3DE]">
                  <Checkbox id="terms" checked={formData.termsAccepted} onCheckedChange={(checked) => handleChange('termsAccepted', checked)} />
                  <Label htmlFor="terms" className="text-sm">I agree to the terms and conditions <span className="text-red-500">*</span></Label>
                </div>
                {errors.termsAccepted && touched.termsAccepted && <div className="flex items-center gap-2 text-red-500 text-sm"><AlertCircle className="w-4 h-4" />{errors.termsAccepted}</div>}

                <Button type="submit" disabled={isSubmitting} size="lg" className="w-full bg-[#D4C5B9] hover:bg-[#C4B5A9] text-white">
                  {isSubmitting ? 'Submitting...' : 'Submit for Admin Approval'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CompanyRegister;
