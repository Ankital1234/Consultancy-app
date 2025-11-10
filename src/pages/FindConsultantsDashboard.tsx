import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  Search,
  Star,
  Briefcase,
  DollarSign,
  Filter,
  X,
  User
} from 'lucide-react';

const FindConsultantsDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [maxRate, setMaxRate] = useState([10000]);
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(true);

  const domains = [
    'All Domains',
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
  ];

  const consultants = [
    {
      id: 1,
      name: 'Sarah Johnson',
      domain: 'Business Strategy',
      rating: 4.9,
      reviews: 127,
      experience: '10+ years',
      hourlyRate: 3500,
      summary: 'Strategic business consultant with expertise in digital transformation and growth strategies.',
      initial: 'SJ',
    },
    {
      id: 2,
      name: 'Michael Chen',
      domain: 'Information Technology',
      rating: 4.8,
      reviews: 95,
      experience: '8 years',
      hourlyRate: 4000,
      summary: 'Full-stack developer and IT consultant specializing in cloud solutions and system architecture.',
      initial: 'MC',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      domain: 'Marketing & Sales',
      rating: 5.0,
      reviews: 143,
      experience: '12+ years',
      hourlyRate: 3000,
      summary: 'Marketing strategist with proven track record in brand building and digital marketing campaigns.',
      initial: 'ER',
    },
    {
      id: 4,
      name: 'David Kumar',
      domain: 'Finance & Accounting',
      rating: 4.7,
      reviews: 78,
      experience: '15+ years',
      hourlyRate: 5000,
      summary: 'Certified financial consultant specializing in corporate finance and investment strategies.',
      initial: 'DK',
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      domain: 'Human Resources',
      rating: 4.9,
      reviews: 112,
      experience: '9 years',
      hourlyRate: 2800,
      summary: 'HR consultant focused on talent acquisition, organizational development, and employee engagement.',
      initial: 'LA',
    },
  ];

  const filteredConsultants = consultants.filter(consultant => {
    const matchesSearch = consultant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         consultant.domain.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = selectedDomain === 'all' || consultant.domain === selectedDomain;
    const matchesRate = consultant.hourlyRate <= maxRate[0];
    return matchesSearch && matchesDomain && matchesRate;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'experience':
        return parseInt(b.experience) - parseInt(a.experience);
      case 'price-low':
        return a.hourlyRate - b.hourlyRate;
      case 'price-high':
        return b.hourlyRate - a.hourlyRate;
      default:
        return 0;
    }
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDomain('all');
    setMaxRate([10000]);
    setSortBy('rating');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5EFE9] to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#2C3E50]">Find Consultants</h1>
              <p className="text-gray-600">Discover expert consultants for your projects</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0088CC] to-[#00A8E8] rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#2C3E50]">Welcome, User</p>
                <p className="text-xs text-gray-600">Regular User</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <Card className="border-none shadow-lg sticky top-4">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#2C3E50] flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <Label>Search</Label>
                    <div className="relative mt-2">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search by name or domain..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Domain Filter */}
                  <div>
                    <Label>Domain/Expertise</Label>
                    <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Domains</SelectItem>
                        {domains.slice(1).map((domain) => (
                          <SelectItem key={domain} value={domain}>
                            {domain}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Max Hourly Rate */}
                  <div>
                    <Label>Max Hourly Rate</Label>
                    <div className="mt-4">
                      <Slider
                        value={maxRate}
                        onValueChange={setMaxRate}
                        min={1000}
                        max={10000}
                        step={500}
                        className="mb-2"
                      />
                      <p className="text-sm text-gray-600 text-center">
                        Up to ₹{maxRate[0].toLocaleString()}/hour
                      </p>
                    </div>
                  </div>

                  {/* Sort By */}
                  <div>
                    <Label>Sort By</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rating">Highest Rating</SelectItem>
                        <SelectItem value="experience">Most Experience</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Reset Filters */}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Consultants Grid */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <Button
              className="lg:hidden mb-4"
              onClick={() => setShowFilters(true)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Show Filters
            </Button>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Found <span className="font-bold text-[#0088CC]">{filteredConsultants.length}</span> consultants
              </p>
            </div>

            {/* Consultants List */}
            {filteredConsultants.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredConsultants.map((consultant, index) => (
                  <motion.div
                    key={consultant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Avatar */}
                          <div className="flex-shrink-0">
                            <div className="w-24 h-24 bg-gradient-to-br from-[#0088CC] to-[#00A8E8] rounded-full flex items-center justify-center">
                              <span className="text-3xl font-bold text-white">
                                {consultant.initial}
                              </span>
                            </div>
                          </div>

                          {/* Info */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-2xl font-bold text-[#2C3E50] mb-1">
                                  {consultant.name}
                                </h3>
                                <p className="text-[#0088CC] font-semibold flex items-center gap-2">
                                  <Briefcase className="h-4 w-4" />
                                  {consultant.domain}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center gap-1 mb-1">
                                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                  <span className="font-bold text-[#2C3E50]">{consultant.rating}</span>
                                  <span className="text-sm text-gray-600">({consultant.reviews})</span>
                                </div>
                                <p className="text-sm text-gray-600">{consultant.experience}</p>
                              </div>
                            </div>

                            <p className="text-gray-700 mb-4">{consultant.summary}</p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-[#0088CC] font-bold text-xl">
                                <DollarSign className="h-5 w-5" />
                                ₹{consultant.hourlyRate.toLocaleString()}/hour
                              </div>
                              <div className="flex gap-3">
                                <Button
                                  variant="outline"
                                  className="border-[#0088CC] text-[#0088CC] hover:bg-[#0088CC] hover:text-white"
                                  onClick={() => navigate(`/consultant/${consultant.id}`)}
                                >
                                  View Profile
                                </Button>
                                <Button
                                  className="bg-[#0088CC] hover:bg-[#0077B3] text-white"
                                  onClick={() => navigate(`/booking/${consultant.id}`)}
                                >
                                  Book Now
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="border-none shadow-lg">
                <CardContent className="p-12 text-center">
                  <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#2C3E50] mb-2">
                    No consultants found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button onClick={resetFilters} className="bg-[#0088CC] hover:bg-[#0077B3]">
                    Reset All Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindConsultantsDashboard;
