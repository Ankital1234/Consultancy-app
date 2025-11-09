import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, IndianRupee, Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Consultant } from '@/types';
import { formatINR } from '@/utils/formatINR';

const ConsultantProfile = () => {
  const { id } = useParams();
  const [consultant, setConsultant] = useState<Consultant | null>(null);
  const [sessions, setSessions] = useState<Array<{id: string; date: string; companyName?: string; duration?: number; status?: string;}>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/consultants/${id}`);
        if (res.ok) {
          const c = await res.json();
          const name = c._id || c.id ? (c.fullName || c.name || 'Consultant') : 'Consultant';
          const avatar = c.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=EEE&color=111&size=256`;
          const mapped: Consultant = {
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
          };
          setConsultant(mapped);
        } else {
          setConsultant(null);
        }
        // Load confirmed sessions for this consultant (if backend provides)
        try {
          const sres = await fetch(`/api/sessions?consultantId=${id}&status=confirmed`);
          if (sres.ok) {
            const ss = await sres.json();
            const mappedS = (Array.isArray(ss) ? ss : []).map((s: any) => ({
              id: s._id || s.id,
              date: s.date,
              companyName: s.companyName,
              duration: Number(s.duration || 0),
              status: s.status,
            }));
            setSessions(mappedS);
          } else {
            setSessions([]);
          }
        } catch {
          setSessions([]);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-600">Loading consultant...</div>
      </div>
    );
  }

  if (!consultant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Consultant not found</h2>
          <Link to="/consultants">
            <Button>Browse Consultants</Button>
          </Link>
        </div>
      </div>
    );
  }

  const displayAvailability = (consultant.availability && consultant.availability.length > 0)
    ? consultant.availability
    : ['Mon 10:00 - 12:00', 'Wed 14:00 - 16:00', 'Fri 10:00 - 12:00'];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to="/consultants" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to consultants
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <motion.img
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      src={consultant.profilePicture}
                      alt={consultant.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-border"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h1 className="text-3xl font-bold text-foreground mb-2">
                            {consultant.name}
                          </h1>
                          <Badge variant="secondary" className="mb-3">
                            {consultant.specialization}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center text-sm">
                          <Star className="h-4 w-4 fill-accent text-accent mr-1" />
                          <span className="font-semibold">{consultant.rating}</span>
                          <span className="text-muted-foreground ml-1">
                            ({consultant.totalReviews} reviews)
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {consultant.yearsOfExperience} years experience
                        </div>
                        
                        <div className="flex items-center text-sm font-semibold text-primary">
                          <IndianRupee className="h-4 w-4" />
                          {formatINR(consultant.hourlyRate)}/hour
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">About</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {consultant.bio}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Availability</h2>
                  <div className="flex flex-wrap gap-2">
                    {displayAvailability.map((day) => (
                      <Badge key={day} variant="outline">
                        {day}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {sessions.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Recent Sessions</h2>
                    <div className="space-y-3">
                      {sessions.slice(0, 3).map((s) => (
                        <div key={s.id} className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{new Date(s.date).toLocaleDateString()}</span>
                          <span>{s.companyName || 'Company'}</span>
                          {s.duration ? <span>{s.duration} min</span> : <span />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Book a Session</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="text-sm text-muted-foreground">Hourly Rate</span>
                      <span className="font-semibold text-lg text-primary">
                        {formatINR(consultant.hourlyRate)}
                      </span>
                    </div>
                  </div>

                  <Link to={`/booking/${consultant.id}`}>
                    <Button className="w-full mb-3" size="lg">
                      <Calendar className="mr-2 h-5 w-5" />
                      Schedule Consultation
                    </Button>
                  </Link>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    No payment required for booking
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConsultantProfile;
