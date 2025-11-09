import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  CheckCircle, 
  XCircle, 
  Eye, 
  ArrowRight, 
  ArrowLeft,
  FileText,
  User,
  CreditCard,
  Shield,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DocumentUpload {
  file: File | null;
  preview: string | null;
  type: 'passport_photo' | 'aadhaar_front' | 'aadhaar_back' | 'pan_card' | 'certificate';
  uploaded: boolean;
  error?: string;
  url?: string; // uploaded URL from backend
}

interface FormData {
  // Step 1: Personal Information
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  
  // Step 2: Address
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  
  // Step 3: Professional Details
  specialization: string;
  yearsOfExperience: string;
  bio: string;
  skills: string[];
  hourlyRate?: string; // per hour charge in INR
  
  // Step 4: Documents
  documents: DocumentUpload[];
}

const BecomeSeller = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [savedApp, setSavedApp] = useState<any | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    specialization: '',
    yearsOfExperience: '',
    bio: '',
    skills: [],
    hourlyRate: '',
    documents: [
      { type: 'passport_photo', file: null, preview: null, uploaded: false },
      { type: 'aadhaar_front', file: null, preview: null, uploaded: false },
      { type: 'aadhaar_back', file: null, preview: null, uploaded: false },
      { type: 'pan_card', file: null, preview: null, uploaded: false },
      { type: 'certificate', file: null, preview: null, uploaded: false },
    ]
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const documentTypes = {
    passport_photo: { name: 'Passport Size Photo', required: true, description: 'Upload a clear passport-size photo (square preferred)' },
    aadhaar_front: { name: 'Aadhaar Card (Front)', required: true, description: 'Upload the front side of your Aadhaar card' },
    aadhaar_back: { name: 'Aadhaar Card (Back)', required: true, description: 'Upload the back side of your Aadhaar card' },
    pan_card: { name: 'PAN Card', required: true, description: 'Upload your PAN card for tax verification' },
    certificate: { name: 'Certificate', required: false, description: 'Upload any relevant professional certificate' },
  } as const;

  // Minimal Indian state/city data for dropdowns
  const indianStates = [
    'Andhra Pradesh','Assam','Bihar','Delhi','Gujarat','Haryana','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Punjab','Rajasthan','Tamil Nadu','Telangana','Uttar Pradesh','West Bengal'
  ];
  const citiesByState: Record<string, string[]> = {
    'Andhra Pradesh': ['Visakhapatnam','Vijayawada','Guntur'],
    Assam: ['Guwahati','Silchar','Dibrugarh'],
    Bihar: ['Patna','Gaya','Bhagalpur'],
    Delhi: ['New Delhi'],
    Gujarat: ['Ahmedabad','Surat','Vadodara','Rajkot'],
    Haryana: ['Gurugram','Faridabad','Panipat'],
    Karnataka: ['Bengaluru','Mysuru','Mangaluru','Belagavi'],
    Kerala: ['Kochi','Thiruvananthapuram','Kozhikode'],
    'Madhya Pradesh': ['Indore','Bhopal','Gwalior','Jabalpur'],
    Maharashtra: ['Mumbai','Pune','Nagpur','Nashik'],
    Punjab: ['Ludhiana','Amritsar','Jalandhar'],
    Rajasthan: ['Jaipur','Jodhpur','Udaipur','Kota'],
    'Tamil Nadu': ['Chennai','Coimbatore','Madurai','Salem'],
    Telangana: ['Hyderabad','Warangal','Karimnagar'],
    'Uttar Pradesh': ['Lucknow','Noida','Ghaziabad','Varanasi','Kanpur'],
    'West Bengal': ['Kolkata','Howrah','Durgapur']
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDocumentUpload = async (type: DocumentUpload['type'], file: File | null) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    const isImage = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type);
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: 'Invalid File Type',
        description: 'Please upload JPG, JPEG, PNG, or PDF files only.',
        variant: 'destructive',
      });
      return;
    }

    // For passport photo, require image
    if (type === 'passport_photo' && !isImage) {
      toast({ title: 'Invalid File', description: 'Passport photo must be an image (JPG/PNG).', variant: 'destructive' });
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast({
        title: 'File Too Large',
        description: 'Please upload files smaller than 5MB.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const fd = new FormData();
      fd.append('file', file);
      // try proxy first; fallback to absolute if needed
      let res = await fetch('/api/uploads', { method: 'POST', body: fd });
      if (!res.ok) {
        res = await fetch('http://localhost:5000/api/uploads', { method: 'POST', body: fd });
      }
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      const url: string = data.url;

      setFormData(prev => ({
        ...prev,
        documents: prev.documents.map(doc =>
          doc.type === type
            ? { ...doc, file, preview: null, uploaded: true, error: undefined, url }
            : doc
        )
      }));
      toast({ title: 'Uploaded', description: `${documentTypes[type].name} uploaded successfully.` });
    } catch (err: any) {
      toast({ title: 'Upload Failed', description: err?.message || 'Please try again.', variant: 'destructive' });
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.fullName || !formData.email || !formData.phoneNumber || !formData.dateOfBirth) {
          toast({
            title: 'Incomplete Information',
            description: 'Please fill in all required fields.',
            variant: 'destructive',
          });
          return false;
        }
        // Validate phone number (Indian format)
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(formData.phoneNumber.replace(/\D/g, ''))) {
          toast({
            title: 'Invalid Phone Number',
            description: 'Please enter a valid 10-digit Indian mobile number.',
            variant: 'destructive',
          });
          return false;
        }
        return true;
      
      case 2:
        if (!formData.addressLine1 || !formData.city || !formData.state || !formData.pincode) {
          toast({
            title: 'Incomplete Address',
            description: 'Please fill in all required address fields.',
            variant: 'destructive',
          });
          return false;
        }
        // Validate pincode (Indian format)
        const pincodeRegex = /^[1-9][0-9]{5}$/;
        if (!pincodeRegex.test(formData.pincode)) {
          toast({
            title: 'Invalid Pincode',
            description: 'Please enter a valid 6-digit Indian pincode.',
            variant: 'destructive',
          });
          return false;
        }
        return true;
      
      case 3:
        if (!formData.specialization || !formData.yearsOfExperience || !formData.bio || !formData.hourlyRate) {
          toast({
            title: 'Incomplete Professional Details',
            description: 'Please fill in specialization, experience, bio and hourly rate.',
            variant: 'destructive',
          });
          return false;
        }
        const rateNum = Number(formData.hourlyRate);
        if (Number.isNaN(rateNum) || rateNum <= 0) {
          toast({ title: 'Invalid Hourly Rate', description: 'Please enter a valid amount greater than 0.', variant: 'destructive' });
          return false;
        }
        return true;
      
      case 4:
        const requiredDocs = formData.documents.filter(doc => documentTypes[doc.type].required);
        const missingDocs = requiredDocs.filter(doc => !doc.uploaded);
        if (missingDocs.length > 0) {
          toast({
            title: 'Missing Documents',
            description: `Please upload all required documents: ${missingDocs.map(d => documentTypes[d.type].name).join(', ')}`,
            variant: 'destructive',
          });
          return false;
        }
        return true;
      
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(4)) return;

    setIsLoading(true);
    try {
      const docMap = Object.fromEntries(
        formData.documents.map(d => [d.type, d.url || null])
      ) as Record<DocumentUpload['type'], string | null>;
      const certificates = formData.documents
        .filter(d => d.type === 'certificate' && d.url)
        .map(d => d.url!)
        .filter(Boolean);

      const payload = {
        ...formData,
        documents: formData.documents.map(d => ({ type: d.type, uploaded: d.uploaded, url: d.url || null })),
        skills: Array.isArray(formData.skills) ? formData.skills : [],
        // key fields for consultant profile
        profilePicture: docMap['passport_photo'] || '',
        aadharFront: docMap['aadhaar_front'] || '',
        aadharBack: docMap['aadhaar_back'] || '',
        panCard: docMap['pan_card'] || '',
        certificates,
      };
      const res = await fetch(`/api/consultant-applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to submit application');
      }
      await res.json();
      setSavedApp(null);
      toast({
        title: 'Application Submitted!',
        description: 'Your application has been submitted for admin review.',
      });
      setTimeout(() => navigate('/seller-dashboard'), 700);
    } catch (error: any) {
      toast({
        title: 'Submission Failed',
        description: error?.message || 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRequiredDocsCount = () => {
    return formData.documents.filter(doc => documentTypes[doc.type].required).length;
  };

  const getUploadedDocsCount = () => {
    return formData.documents.filter(doc => doc.uploaded).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {!savedApp && (
        <>
          {/* Progress Bar */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-gray-900">Become a Consultant</h1>
                <Badge variant="outline">Step {currentStep} of {totalSteps}</Badge>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-gray-600 mt-2">
                {currentStep === 1 && 'Personal Information'}
                {currentStep === 2 && 'Address Details'}
                {currentStep === 3 && 'Professional Details'}
                {currentStep === 4 && 'Document Verification'}
              </p>
            </CardContent>
          </Card>

          {/* Form Steps */}
          <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>Provide your personal details for verification</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="Enter your full name as per Aadhaar"
                        className="mt-1"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your.email@example.com"
                          className="mt-1"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="phoneNumber">Phone Number *</Label>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                          placeholder="10-digit mobile number"
                          className="mt-1"
                          required
                          maxLength={10}
                        />
                        <p className="text-xs text-gray-500 mt-1">Enter without country code</p>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="mt-1"
                        required
                        max={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Address Details
                  </CardTitle>
                  <CardDescription>Your residential address for verification</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="addressLine1">Address Line 1 *</Label>
                      <Input
                        id="addressLine1"
                        value={formData.addressLine1}
                        onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                        placeholder="House/Flat Number, Building Name"
                        className="mt-1"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="addressLine2">Address Line 2</Label>
                      <Input
                        id="addressLine2"
                        value={formData.addressLine2}
                        onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                        placeholder="Street, Area, Locality"
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>City *</Label>
                        <Select
                          value={formData.city}
                          onValueChange={(val) => handleInputChange('city', val)}
                          disabled={!formData.state}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder={formData.state ? 'Select city' : 'Select state first'} />
                          </SelectTrigger>
                          <SelectContent>
                            {(citiesByState[formData.state] || []).map((c) => (
                              <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>State *</Label>
                        <Select
                          value={formData.state}
                          onValueChange={(val) => {
                            // when state changes, reset city if it doesn't belong
                            handleInputChange('state', val);
                            const cities = citiesByState[val] || [];
                            if (!cities.includes(formData.city)) {
                              handleInputChange('city', '');
                            }
                          }}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {indianStates.map((s) => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="pincode">Pincode *</Label>
                        <Input
                          id="pincode"
                          value={formData.pincode}
                          onChange={(e) => handleInputChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                          placeholder="6-digit pincode"
                          className="mt-1"
                          required
                          maxLength={6}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className="mt-1"
                        disabled
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Professional Details
                  </CardTitle>
                  <CardDescription>Tell us about your skills and experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="specialization">Specialization/Service Category *</Label>
                      <Input
                        id="specialization"
                        value={formData.specialization}
                        onChange={(e) => handleInputChange('specialization', e.target.value)}
                        placeholder="e.g., Graphic Design, Web Development, Content Writing"
                        className="mt-1"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="yearsOfExperience">Years of Experience *</Label>
                      <Input
                        id="yearsOfExperience"
                        type="number"
                        value={formData.yearsOfExperience}
                        onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                        placeholder="Number of years"
                        className="mt-1"
                        required
                        min="0"
                      />
                    </div>

                    <div>
                      <Label htmlFor="hourlyRate">Hourly Rate (₹/hr) *</Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        value={formData.hourlyRate}
                        onChange={(e) => handleInputChange('hourlyRate', e.target.value.replace(/[^0-9.]/g, ''))}
                        placeholder="e.g., 1500"
                        className="mt-1"
                        required
                        min="1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bio">Professional Bio *</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        placeholder="Describe your expertise, experience, and what services you offer..."
                        className="mt-1 min-h-[120px]"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">Minimum 100 characters recommended</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Document Verification
                  </CardTitle>
                  <CardDescription>
                    Upload your documents for identity verification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Important:</strong> All documents must be clear, readable, and match the information provided. 
                      Uploaded documents will be verified by our team within 24-48 hours.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    {formData.documents.map((doc, index) => {
                      const docType = documentTypes[doc.type];
                      return (
                        <div key={doc.type} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <Label className="flex items-center gap-2">
                                {docType.name}
                                {docType.required && <span className="text-red-500">*</span>}
                              </Label>
                              <p className="text-xs text-gray-500 mt-1">{docType.description}</p>
                            </div>
                            {doc.uploaded && (
                              <Badge className="bg-amber-100 text-amber-800">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Uploaded
                              </Badge>
                            )}
                          </div>

                          <div className="mt-3 space-y-2">
                            {/* Preview hidden by requirement */}

                            <div className="flex gap-2">
                              <input
                                type="file"
                                id={`file-${doc.type}`}
                                accept="image/jpeg,image/jpg,image/png,application/pdf"
                                onChange={(e) => {
                                  const file = e.target.files?.[0] || null;
                                  handleDocumentUpload(doc.type, file);
                                }}
                                className="hidden"
                              />
                              <label htmlFor={`file-${doc.type}`}>
                                <Button type="button" variant="outline" asChild>
                                  <span>
                                    <Upload className="w-4 h-4 mr-2" />
                                    {doc.uploaded ? 'Replace Document' : 'Upload Document'}
                                  </span>
                                </Button>
                              </label>
                              {doc.uploaded && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setFormData(prev => ({
                                      ...prev,
                                      documents: prev.documents.map(d =>
                                        d.type === doc.type
                                          ? { ...d, file: null, preview: null, uploaded: false }
                                          : d
                                      )
                                    }));
                                  }}
                                >
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Remove
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-sm text-amber-900">
                      <strong>Document Requirements:</strong>
                    </p>
                    <ul className="text-sm text-amber-800 mt-2 space-y-1 list-disc list-inside">
                      <li>Aadhaar cards must be clear and all details visible</li>
                      <li>PAN card should match the name on Aadhaar</li>
                      <li>Professional certificate is optional but recommended</li>
                      <li>All documents should be less than 5MB in size</li>
                      <li>Accepted formats: JPG, JPEG, PNG, PDF</li>
                    </ul>
                  </div>

                  <div className="mt-4 flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">
                      Documents Uploaded: {getUploadedDocsCount()} / {getRequiredDocsCount()} required
                    </span>
                    {getUploadedDocsCount() === getRequiredDocsCount() && (
                      <Badge className="bg-amber-100 text-amber-800">
                        All Required Documents Uploaded
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isLoading} size="lg">
                {isLoading ? 'Submitting...' : 'Submit Application'}
              </Button>
            )}
          </div>
        </>
        )}
      </div>
    </div>
  );
};

export default BecomeSeller;

