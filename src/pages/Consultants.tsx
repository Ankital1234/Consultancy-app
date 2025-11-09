import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ConsultantCard from '@/components/ConsultantCard';
import PremiumFooter from '@/components/PremiumFooter';
import { Consultant } from '@/types';

const Consultants = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/consultants');
        if (res.ok) {
          const docs = await res.json();
          const mapped: Consultant[] = (docs || []).map((c: any) => {
            const name = c.fullName || c.name || 'Consultant';
            const avatar = c.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=EEE&color=111&size=256`;
            return {
            id: c._id || c.id,
            name,
            specialization: c.title || 'General',
            hourlyRate: Number(c.hourlyRate || 0),
            bio: c.bio || '',
            profilePicture: avatar,
            yearsOfExperience: Number(c.experienceYears || 0),
            rating: Number(c.rating || 4.8),
            totalReviews: Number(c.totalReviews || 0),
            availability: Array.isArray(c.availability) ? c.availability : [],
            subscriptionTier: c.subscriptionTier,
            verified: Boolean(c.verified || false),
            profileViews: Number(c.profileViews || 0),
            connectionCredits: Number(c.connectionCredits || 0),
          }});
          setConsultants(mapped);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredConsultants = consultants.filter((consultant) => {
    const matchesSearch = consultant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultant.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultant.bio.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterBy === 'all' || consultant.specialization === filterBy;
    
    return matchesSearch && matchesFilter;
  });

  const specializations = Array.from(new Set(consultants.map(c => c.specialization)));

  return (
    <div className="min-h-screen">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-40 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">Find Consultants</h1>
          <p className="text-muted-foreground mb-6">
            Browse our network of expert consultants and find the perfect match for your needs
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name, specialization, or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-full md:w-[240px]">
                <SelectValue placeholder="Filter by specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                {specializations.map((spec) => (
                  <SelectItem key={spec} value={spec}>
                    {spec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {loading ? 'Loading consultants...' : (
              <>Showing {filteredConsultants.length} consultant{filteredConsultants.length !== 1 ? 's' : ''}</>
            )}
          </p>
        </div>

        {!loading && filteredConsultants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConsultants.map((consultant, index) => (
              <ConsultantCard
                key={consultant.id}
                consultant={consultant}
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">{loading ? 'Loading...' : 'No consultants found matching your criteria.'}</p>
          </motion.div>
        )}
      </div>

      {/* Premium Footer */}
      <PremiumFooter />
    </div>
  );
};

export default Consultants;
