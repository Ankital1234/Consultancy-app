import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  FileText, 
  Shield, 
  UserCheck,
  ArrowLeft,
  Home,
  Clock
} from 'lucide-react';
import { useEffect, useState } from 'react';

const ConsultantApplicationSubmitted = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [application, setApplication] = useState<any>(null);

  useEffect(() => {
    const applicationId = searchParams.get('id');
    if (applicationId) {
      // In real app, fetch from backend
      const storedApp = sessionStorage.getItem('consultantApplication');
      if (storedApp) {
        setApplication(JSON.parse(storedApp));
      }
    }
  }, [searchParams]);

  const timeline = [
    {
      icon: FileText,
      title: 'Application Received',
      description: 'We have received your application',
      status: 'completed',
    },
    {
      icon: Shield,
      title: 'Document Verification',
      description: 'Our team is verifying your documents',
      status: 'in_progress',
    },
    {
      icon: UserCheck,
      title: 'Profile Approval',
      description: 'Final review and approval',
      status: 'pending',
    },
  ];

  if (!application) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5EFE9] to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-green-100 p-6 rounded-full">
            <CheckCircle2 className="h-24 w-24 text-green-600" />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C3E50] mb-4">
            Application Submitted Successfully!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for applying to become a consultant on our platform
          </p>
          
          {/* Application Details */}
          <Card className="border-none shadow-lg mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Application ID</p>
                  <p className="font-mono font-bold text-[#0088CC] text-lg">
                    {application.applicationId}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Submission Date</p>
                  <p className="font-semibold text-[#2C3E50]">
                    {new Date(application.submittedDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Applicant Name</p>
                  <p className="font-semibold text-[#2C3E50]">
                    {application.firstName} {application.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Domain</p>
                  <p className="font-semibold text-[#2C3E50]">
                    {application.domain}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-6 text-center">
            Application Process Timeline
          </h2>
          <div className="max-w-2xl mx-auto">
            {timeline.map((step, index) => (
              <div key={index} className="relative">
                <Card className={`mb-6 border-none shadow-lg ${
                  step.status === 'completed' ? 'bg-green-50' :
                  step.status === 'in_progress' ? 'bg-blue-50' :
                  'bg-gray-50'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full ${
                        step.status === 'completed' ? 'bg-green-500' :
                        step.status === 'in_progress' ? 'bg-blue-500' :
                        'bg-gray-400'
                      }`}>
                        <step.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-[#2C3E50]">
                            {step.title}
                          </h3>
                          <Badge className={
                            step.status === 'completed' ? 'bg-green-500' :
                            step.status === 'in_progress' ? 'bg-blue-500' :
                            'bg-gray-400'
                          }>
                            {step.status === 'completed' ? 'Completed' :
                             step.status === 'in_progress' ? 'In Progress' :
                             'Pending'}
                          </Badge>
                        </div>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {index < timeline.length - 1 && (
                  <div className="h-8 w-0.5 bg-gray-300 ml-9 mb-2" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <Card className="border-none shadow-lg bg-gradient-to-r from-[#E8D4C4] to-[#F5EFE9]">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <Clock className="h-6 w-6 text-[#0088CC] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-[#2C3E50] mb-3">
                    What Happens Next?
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>
                        Our team will review your application and verify all submitted documents
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>
                        You will receive an email notification about the status of your application within 3-5 business days
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>
                        Once approved, you'll get access to your consultant dashboard and can start accepting projects
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>
                        Keep your email and phone handy - we may contact you for additional information if needed
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            onClick={() => navigate('/user-dashboard')}
            className="bg-[#0088CC] hover:bg-[#0077B3] text-white"
          >
            <Home className="mr-2 h-5 w-5" />
            Go to Dashboard
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/my-applications')}
            className="border-[#0088CC] text-[#0088CC] hover:bg-[#0088CC] hover:text-white"
          >
            <FileText className="mr-2 h-5 w-5" />
            View My Applications
          </Button>
        </motion.div>

        {/* Support Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-gray-600">
            Have questions?{' '}
            <a href="/support" className="text-[#0088CC] hover:underline font-semibold">
              Contact Support
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ConsultantApplicationSubmitted;
