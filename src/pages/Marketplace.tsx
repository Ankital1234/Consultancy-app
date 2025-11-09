import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Filter, Star, Clock, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { mockGigs, categories } from '@/data/gigsData';
import { Gig } from '@/types/marketplace';
import { motion } from 'framer-motion';
import PremiumFooter from '@/components/PremiumFooter';
import { formatINR } from '@/utils/formatINR';
import ConsultantCard from '@/components/ConsultantCard';
import { Consultant } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

const Marketplace = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState('all');
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [loadingConsultants, setLoadingConsultants] = useState(false);
  const consultantSpecializations = useMemo(
    () => Array.from(new Set(consultants.map(c => (c.specialization || 'General')))),
    [consultants]
  );

  // Load consultants for enrichment and company view
  useEffect(() => {
    const load = async () => {
      setLoadingConsultants(true);
      try {
        const res = await fetch('/api/consultants');
        if (res.ok) {
          const docs = await res.json();
          const mapped: Consultant[] = (docs || []).map((c: any) => {
            const name = c.fullName || c.name || 'Consultant';
            const avatar = c.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=EEE&color=111&size=256`;
            const hr = Number(c.hourlyRate);
            const hourlyRate = !Number.isFinite(hr) || hr <= 0 ? 1500 : hr; // fallback default ₹1500/hr
            return {
              id: c._id || c.id,
              name,
              specialization: c.title || 'General',
              hourlyRate,
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
            };
          });
          setConsultants(mapped);
        }
      } finally {
        setLoadingConsultants(false);
      }
    };
    load();
  }, [user?.role]);

  const filteredGigs = useMemo(() => {
    let filtered = [...mockGigs];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (gig) =>
          gig.title.toLowerCase().includes(query) ||
          gig.description.toLowerCase().includes(query) ||
          gig.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((gig) => gig.category === selectedCategory);
    }

    // Filter by price range
    if (priceRange !== 'all') {
      filtered = filtered.filter((gig) => {
        const minPrice = gig.price.basic;
        switch (priceRange) {
          case 'under-50':
            return minPrice < 50000;
          case '50-100':
            return minPrice >= 50000 && minPrice <= 100000;
          case '100-500':
            return minPrice > 100000 && minPrice <= 500000;
          case 'over-500':
            return minPrice > 500000;
          default:
            return true;
        }
      });
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price.basic - b.price.basic);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price.basic - a.price.basic);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        // Relevance - default order
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL without navigation
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    navigate(`/marketplace?${params.toString()}`);
  };

  // Company view uses consultants instead of gigs
  const filteredConsultants = useMemo(() => {
    if (user?.role !== 'company') return [] as Consultant[];
    let filtered = [...consultants];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(q) ||
        (c.specialization || '').toLowerCase().includes(q) ||
        (c.bio || '').toLowerCase().includes(q)
      );
    }
    // Category => specialization
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((c) => (c.specialization || '').toLowerCase() === selectedCategory.toLowerCase());
    }
    // Price range on hourlyRate (in INR)
    if (priceRange !== 'all') {
      filtered = filtered.filter((c) => {
        const price = Number(c.hourlyRate || 0);
        switch (priceRange) {
          case 'under-50':
            return price < 50000;
          case '50-100':
            return price >= 50000 && price <= 100000;
          case '100-500':
            return price > 100000 && price <= 500000;
          case 'over-500':
            return price > 500000;
          default:
            return true;
        }
      });
    }
    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.hourlyRate || 0) - (b.hourlyRate || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.hourlyRate || 0) - (a.hourlyRate || 0));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }
    return filtered;
  }, [consultants, searchQuery, selectedCategory, priceRange, sortBy, user?.role]);

  // Enrich gigs with real consultant names/avatars if available (non-company view)
  const enrichedGigs = useMemo(() => {
    if (!consultants.length) return filteredGigs;
    return filteredGigs.map((gig, idx) => {
      const c = consultants[idx % consultants.length];
      return { ...gig, sellerName: c.name, sellerAvatar: c.profilePicture } as typeof gig;
    });
  }, [filteredGigs, consultants]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white/90 supports-[backdrop-filter]:bg-white/60 backdrop-blur rounded-lg shadow-sm p-6 mb-8 sticky top-16 z-20 border">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit">Search</Button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {user?.role === 'company'
                    ? consultantSpecializations.map((spec) => (
                        <SelectItem key={spec} value={spec}>
                          {spec}
                        </SelectItem>
                      ))
                    : categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Price Range</label>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-50">Under ₹50K</SelectItem>
                  <SelectItem value="50-100">₹50K - ₹1L</SelectItem>
                  <SelectItem value="100-500">₹1L - ₹5L</SelectItem>
                  <SelectItem value="over-500">Over ₹5L</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          {user?.role === 'company' ? (
            <p className="text-gray-600">
              {loadingConsultants ? 'Loading consultants...' : `${filteredConsultants.length} consultant${filteredConsultants.length === 1 ? '' : 's'} found`}
            </p>
          ) : (
            <p className="text-gray-600">
              {filteredGigs.length} {filteredGigs.length === 1 ? 'consultancy service' : 'consultancy services'} found
            </p>
          )}
        </div>

        {user?.role === 'company' ? (
          loadingConsultants ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ConsultantSkeleton key={i} />
              ))}
            </div>
          ) : filteredConsultants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredConsultants.map((c, index) => (
                <ConsultantCard key={c.id} consultant={c} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No consultants found.</p>
            </div>
          )
        ) : (
          // Default: show gigs marketplace
          enrichedGigs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {enrichedGigs.map((gig, index) => (
                <GigCard key={gig.id} gig={gig} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No services found. Try adjusting your filters.</p>
            </div>
          )
        )}
      </div>

      {/* Footer */}
      <PremiumFooter />
    </div>
  );
};

interface GigCardProps {
  gig: Gig;
  index: number;
}

const GigCard = ({ gig, index }: GigCardProps) => {
  const navigate = useNavigate();

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'top':
        return <Badge className="bg-purple-100 text-purple-800">Top Rated</Badge>;
      case 'level2':
        return <Badge className="bg-blue-100 text-blue-800">Level 2</Badge>;
      case 'level1':
        return <Badge className="bg-green-100 text-green-800">Level 1</Badge>;
      default:
        return <Badge variant="secondary">New</Badge>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card
        className="cursor-pointer hover:shadow-lg transition-all duration-300 group overflow-hidden"
        onClick={() => navigate(`/gig/${gig.id}`)}
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={gig.images[0]}
            alt={gig.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {gig.packages.standard.popular && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-amber-600 text-white">Popular</Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <img
                src={gig.sellerAvatar}
                alt={gig.sellerName}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">{gig.sellerName}</p>
                <div className="flex items-center gap-1">
                  {getLevelBadge(gig.sellerLevel)}
                </div>
              </div>
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors">
            {gig.title}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-900">{gig.rating}</span>
            </div>
            <span className="text-gray-400">({gig.totalReviews})</span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t">
            <div>
              <span className="text-xs text-gray-500">Starting at</span>
              <p className="text-lg font-bold text-gray-900">{formatINR(gig.price.basic)}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{gig.packages.basic.deliveryTime}d</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Marketplace;

// Minimal skeleton for consultant card (keeps content/behavior unchanged)
const ConsultantSkeleton = () => (
  <div className="animate-pulse">
    <Card className="overflow-hidden h-full border-border">
      <div className="h-48 bg-gray-200" />
      <CardContent className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="h-4 bg-gray-200 rounded w-16" />
          <div className="h-4 bg-gray-200 rounded w-20" />
        </div>
      </CardContent>
    </Card>
  </div>
);

