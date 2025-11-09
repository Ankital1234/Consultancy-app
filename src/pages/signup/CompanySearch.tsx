import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Building2, 
  ArrowLeft, 
  CheckCircle2, 
  Filter,
  Building,
  Clock,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface Company {
  id: string;
  name: string;
  logo?: string;
  description: string;
  industry: string;
  employeeCount: string;
  status: 'approved' | 'pending' | 'pending_approval';
  submittedBy?: string;
  submittedDate?: string;
  applicationId?: string;
}

const CompanySearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data - replace with API call
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: '1',
      name: 'Tech Solutions India',
      logo: 'https://ui-avatars.com/api/?name=Tech+Solutions&background=C9A876&color=fff',
      description: 'Leading IT consulting and software development company',
      industry: 'IT',
      employeeCount: '201-500',
      status: 'approved',
    },
    {
      id: '2',
      name: 'Global Consulting Group',
      logo: 'https://ui-avatars.com/api/?name=Global+Consulting&background=D4C5B9&color=fff',
      description: 'Strategic business consulting and management services',
      industry: 'Consulting',
      employeeCount: '501-1000',
      status: 'approved',
    },
    {
      id: '3',
      name: 'FinTech Innovations',
      logo: 'https://ui-avatars.com/api/?name=FinTech+Innovations&background=B89B8E&color=fff',
      description: 'Financial technology and digital banking solutions',
      industry: 'Finance',
      employeeCount: '51-200',
      status: 'approved',
    },
    {
      id: '4',
      name: 'Healthcare Plus',
      logo: 'https://ui-avatars.com/api/?name=Healthcare+Plus&background=C9A876&color=fff',
      description: 'Healthcare consulting and medical technology services',
      industry: 'Healthcare',
      employeeCount: '201-500',
      status: 'approved',
    },
    {
      id: '5',
      name: 'EduTech Solutions',
      logo: 'https://ui-avatars.com/api/?name=EduTech+Solutions&background=D4C5B9&color=fff',
      description: 'Educational technology and e-learning platforms',
      industry: 'Education',
      employeeCount: '11-50',
      status: 'approved',
    },
  ]);

  // Get user's pending applications from session storage
  const [userApplications, setUserApplications] = useState<Company[]>([]);

  useEffect(() => {
    const storedApplications = sessionStorage.getItem('pendingApplications');
    if (storedApplications) {
      setUserApplications(JSON.parse(storedApplications));
    }
  }, []);

  const industries = ['All', 'IT', 'Consulting', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Retail', 'Services'];

  // Combine approved companies with pending applications for search
  const allCompanies = [
    ...companies,
    ...userApplications.map((app: any) => ({
      id: app.applicationId || app.id,
      name: app.companyName || app.name,
      logo: app.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(app.companyName || app.name)}&background=D4C5B9&color=fff`,
      description: app.description,
      industry: app.industry,
      employeeCount: app.employeeCount,
      status: 'pending_approval' as const,
      applicationId: app.applicationId,
      submittedDate: app.submittedDate,
    }))
  ];

  // Filter companies (including pending)
  const filteredCompanies = allCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = filterIndustry === 'all' || company.industry === filterIndustry;
    return matchesSearch && matchesIndustry;
  });

  // Separate approved and pending for display
  const approvedCompanies = filteredCompanies.filter(c => c.status === 'approved');
  const pendingInSearch = filteredCompanies.filter(c => c.status === 'pending_approval');

  // Pagination (only for approved companies)
  const totalPages = Math.ceil(approvedCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCompanies = approvedCompanies.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectCompany = (companyId: string) => {
    setSelectedCompany(companyId);
  };

  const handleContinue = () => {
    if (selectedCompany) {
      const company = companies.find(c => c.id === selectedCompany);
      sessionStorage.setItem('selectedCompany', JSON.stringify(company));
      navigate('/signup/individual?type=company');
    }
  };

  const handleRegisterNewCompany = () => {
    navigate('/signup/company-register');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFBF7] to-[#F5F0ED] px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/signup/credentials')}
            className="mb-6 text-[#8B8680] hover:text-[#2B2520] hover:bg-[#F9F6F3]"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back
          </Button>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2B2520] mb-4">
              Find Your Company
            </h1>
            <p className="text-lg text-[#8B8680]">
              Search for your company or register a new one
            </p>
          </div>

          {/* My Applications Section */}
          {userApplications.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Card className="border-2 border-[#C9A876] bg-[#FAF3E6]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-6 h-6 text-[#C9A876]" />
                    <h2 className="text-xl font-bold text-[#2B2520]">My Applications</h2>
                  </div>
                  <div className="space-y-3">
                    {userApplications.map((app) => (
                      <div
                        key={app.id}
                        className="bg-white rounded-lg p-4 border-2 border-[#E8E3DE]"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Building className="w-8 h-8 text-[#8B8680]" />
                            <div>
                              <h3 className="font-bold text-[#2B2520]">{app.name}</h3>
                              <p className="text-sm text-[#8B8680]">
                                Submitted: {app.submittedDate}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
                              <Clock className="w-3 h-3 mr-1" />
                              Pending Approval
                            </Badge>
                            <span className="text-sm text-[#8B8680]">
                              ID: {app.applicationId}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-[#8B8680] mt-2">
                          Your application is being reviewed by our admin team. You will be notified once approved.
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B8680]" />
              <Input
                type="text"
                placeholder="Search for your company by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg border-2 border-[#E8E3DE] focus:border-[#C9A876]"
              />
            </div>
          </motion.div>

          {/* Filter Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 flex-wrap">
              <Filter className="w-5 h-5 text-[#8B8680]" />
              <span className="text-[#2B2520] font-medium">Industry:</span>
              {industries.map((industry) => (
                <Button
                  key={industry}
                  variant={filterIndustry === industry.toLowerCase() ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterIndustry(industry.toLowerCase())}
                  className={
                    filterIndustry === industry.toLowerCase()
                      ? 'bg-[#C9A876] hover:bg-[#B89B7F] text-white'
                      : 'border-[#E8E3DE] text-[#8B8680] hover:bg-[#F9F6F3]'
                  }
                >
                  {industry}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Pending Companies in Search Results */}
          {pendingInSearch.length > 0 && searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mb-8"
            >
              <h3 className="text-lg font-bold text-[#2B2520] mb-4">Your Pending Applications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pendingInSearch.map((company) => (
                  <Card key={company.id} className="border-2 border-yellow-300 bg-yellow-50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img src={company.logo} alt={company.name} className="w-16 h-16 rounded-lg border-2 border-yellow-200" />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold text-lg text-[#2B2520]">{company.name}</h3>
                            <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
                          </div>
                          <p className="text-sm text-[#8B8680] mb-3">{company.description}</p>
                          <div className="flex items-center gap-2 flex-wrap mb-3">
                            <Badge variant="secondary" className="bg-yellow-100 text-[#8B8680]">{company.industry}</Badge>
                            <Badge variant="secondary" className="bg-yellow-100 text-[#8B8680]">{company.employeeCount} employees</Badge>
                          </div>
                          <p className="text-xs text-yellow-700 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            This company is pending admin approval. You will be notified once approved.
                          </p>
                          {company.submittedDate && (
                            <p className="text-xs text-[#8B8680] mt-2">Submitted: {company.submittedDate}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Companies List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedCompanies.map((company, index) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedCompany === company.id
                        ? 'border-2 border-[#C9A876] bg-[#FAF3E6]'
                        : 'border-2 border-[#E8E3DE] hover:border-[#D4C5B9]'
                    }`}
                    onClick={() => handleSelectCompany(company.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="w-16 h-16 rounded-lg border-2 border-[#E8E3DE]"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold text-lg text-[#2B2520]">
                              {company.name}
                            </h3>
                            {selectedCompany === company.id && (
                              <CheckCircle2 className="w-6 h-6 text-[#C9A876]" />
                            )}
                          </div>
                          <p className="text-sm text-[#8B8680] mb-3">
                            {company.description}
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="secondary" className="bg-[#F5E6D3] text-[#8B8680]">
                              {company.industry}
                            </Badge>
                            <Badge variant="secondary" className="bg-[#F5E6D3] text-[#8B8680]">
                              {company.employeeCount} employees
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="border-[#E8E3DE]"
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? 'bg-[#C9A876] hover:bg-[#B89B7F]'
                        : 'border-[#E8E3DE]'
                    }
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="border-[#E8E3DE]"
                >
                  Next
                </Button>
              </div>
            )}
          </motion.div>

          {/* Continue Button */}
          {selectedCompany && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Button
                size="lg"
                onClick={handleContinue}
                className="w-full bg-[#C9A876] hover:bg-[#B89B7F] text-white shadow-lg"
              >
                Continue with Selected Company
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          )}

          {/* Company Not Found Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-2 border-[#D4C5B9] bg-gradient-to-br from-white to-[#F9F6F3]">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#F5E6D3] flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-[#D4C5B9]" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#2B2520] mb-3">
                  Can't find your company?
                </h3>
                <p className="text-[#8B8680] mb-6 max-w-2xl mx-auto">
                  Register your company and get admin approval to start listing services and consultants
                </p>
                <Button
                  size="lg"
                  onClick={handleRegisterNewCompany}
                  className="bg-[#D4C5B9] hover:bg-[#C4B5A9] text-white shadow-lg"
                >
                  <Building2 className="mr-2 w-5 h-5" />
                  Click Here to Register Your Company
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CompanySearch;
