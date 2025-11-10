import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, FileText, Home, Search, List } from 'lucide-react';
import { useEffect, useState } from 'react';

const ApplicationSubmitted = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const applicationId = searchParams.get('id');
  const [application, setApplication] = useState<any>(null);

  useEffect(() => {
    if (!applicationId) {
      navigate('/signup/company-search');
      return;
    }

    // Get application from session storage
    const stored = sessionStorage.getItem('pendingApplications');
    if (stored) {
      const applications = JSON.parse(stored);
      const found = applications.find((app: any) => app.applicationId === applicationId);
      if (found) {
        setApplication(found);
      } else {
        navigate('/signup/company-search');
      }
    } else {
      navigate('/signup/company-search');
    }
  }, [applicationId, navigate]);

  if (!application) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFBF7] to-[#F5F0ED] px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg"
            >
              <CheckCircle2 className="w-14 h-14 text-white" />
            </motion.div>
          </div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#2B2520] mb-3">
              Application Submitted!
            </h1>
            <p className="text-xl text-[#8B8680]">
              Your company registration is pending admin approval
            </p>
          </motion.div>

          {/* Application Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border-2 border-[#E8E3DE] shadow-lg mb-8">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-[#2B2520] mb-2">
                      {application.companyName}
                    </h2>
                    <p className="text-[#8B8680]">
                      Submitted on {application.submittedDate}
                    </p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-700 border-2 border-yellow-300 px-4 py-2 text-sm font-medium">
                    <Clock className="w-4 h-4 mr-2" />
                    Waiting for Admin Approval
                  </Badge>
                </div>

                <div className="bg-[#F9F6F3] rounded-lg p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8B8680] font-medium">Application ID:</span>
                    <span className="text-[#2B2520] font-mono font-bold">{application.applicationId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8B8680] font-medium">Industry:</span>
                    <span className="text-[#2B2520]">{application.industry}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8B8680] font-medium">Employee Count:</span>
                    <span className="text-[#2B2520]">{application.employeeCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8B8680] font-medium">Status:</span>
                    <span className="text-yellow-700 font-medium">Pending Review</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* What Happens Next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="border-2 border-[#E8E3DE] shadow-lg mb-8">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-6 h-6 text-[#C9A876]" />
                  <h3 className="text-2xl font-bold text-[#2B2520]">What Happens Next?</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C9A876] text-white flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2B2520] mb-1">Admin Review</h4>
                      <p className="text-[#8B8680]">
                        Our admin team will review your company registration details and verify the information provided.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C9A876] text-white flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2B2520] mb-1">Approval Timeline</h4>
                      <p className="text-[#8B8680]">
                        The review process typically takes <strong>2-3 business days</strong>. You'll receive an email notification once your application is reviewed.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C9A876] text-white flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2B2520] mb-1">Email Notification</h4>
                      <p className="text-[#8B8680]">
                        We'll send a confirmation email to <strong>{application.companyEmail}</strong> once your company is approved.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C9A876] text-white flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2B2520] mb-1">Get Started</h4>
                      <p className="text-[#8B8680]">
                        After approval, you can start listing services, adding consultants, and managing your company profile.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <Button
              onClick={() => navigate('/dashboard')}
              size="lg"
              className="bg-[#C9A876] hover:bg-[#B89B7F] text-white"
            >
              <Home className="mr-2 w-5 h-5" />
              Go to Dashboard
            </Button>

            <Button
              onClick={() => navigate('/signup/company-search')}
              size="lg"
              variant="outline"
              className="border-2 border-[#C9A876] text-[#C9A876] hover:bg-[#F9F6F3]"
            >
              <Search className="mr-2 w-5 h-5" />
              Company Search
            </Button>

            <Button
              onClick={() => navigate('/signup/company-search')}
              size="lg"
              variant="outline"
              className="border-2 border-[#D4C5B9] text-[#D4C5B9] hover:bg-[#F9F6F3]"
            >
              <List className="mr-2 w-5 h-5" />
              My Applications
            </Button>
          </motion.div>

          {/* Help Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center mt-8 p-6 bg-[#F9F6F3] rounded-lg border-2 border-[#E8E3DE]"
          >
            <p className="text-[#8B8680]">
              <strong>Need help?</strong> Contact our support team at{' '}
              <a href="mailto:support@consultancy.co" className="text-[#C9A876] hover:underline font-medium">
                support@consultancy.co
              </a>
              {' '}or reference your Application ID: <span className="font-mono font-bold text-[#2B2520]">{application.applicationId}</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ApplicationSubmitted;
