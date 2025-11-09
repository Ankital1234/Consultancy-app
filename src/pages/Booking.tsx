import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { formatINR } from '@/utils/formatINR';
import { useToast } from '@/hooks/use-toast';
import { Consultant } from '@/types';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [consultant, setConsultant] = useState<Consultant | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('60');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [customRate, setCustomRate] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/consultants/${id}`);
        if (res.ok) {
          const c = await res.json();
          const name = c.fullName || c.name || 'Consultant';
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
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const availableTimeOptions = useMemo(() => {
    if (!consultant) return [] as string[];

    const weekdayOf = (d: string) => {
      try {
        const dt = new Date(d + 'T00:00:00');
        return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][dt.getDay()];
      } catch { return undefined; }
    };

    // Optional richer availability coming from backend
    const anyConsultant: any = consultant as any;
    const byDate: Record<string, string[]> = anyConsultant.availabilityDates || {};
    const byDay: Record<string, string[]> = anyConsultant.availabilityDaywise || anyConsultant.availability_map || {};

    // 1) Exact date slots take priority
    if (date && byDate[date] && Array.isArray(byDate[date]) && byDate[date].length) {
      return byDate[date].filter((t) => /\d{2}:\d{2}/.test(String(t)));
    }

    // 2) Day-of-week slots next
    const dow = date ? weekdayOf(date) : undefined;
    if (dow && byDay[dow] && Array.isArray(byDay[dow]) && byDay[dow].length) {
      return byDay[dow].filter((t) => /\d{2}:\d{2}/.test(String(t)));
    }

    // 3) Generic list of times
    if (Array.isArray(consultant.availability) && consultant.availability.length > 0) {
      const timeLike = consultant.availability.filter((a) => /\d{2}:\d{2}/.test(String(a)));
      if (timeLike.length > 0) return timeLike as string[];
    }

    // 4) Fallback defaults
    return ['09:00','10:00','11:00','14:00','15:00','16:00'];
  }, [consultant, date]);

  // Reset selected time if it's no longer valid when date changes
  useEffect(() => {
    if (time && !availableTimeOptions.includes(time)) {
      setTime('');
    }
  }, [availableTimeOptions]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-600">Loading booking...</div>
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const params = new URLSearchParams({
        type: 'session',
        consultantId: consultant.id,
        consultantName: consultant.name,
        date,
        time,
        duration,
        price: String(totalCost.toFixed(2)),
      });
      navigate(`/pay/checkout?${params.toString()}`);
    }, 500);
  };

  const ratePerHour = (consultant.hourlyRate && consultant.hourlyRate > 0)
    ? consultant.hourlyRate
    : Number(customRate || 0);
  const totalCost = (ratePerHour * parseInt(duration || '0')) / 60;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to={`/consultant/${id}`} className="inline-flex items-center text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to profile
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule Your Consultation</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Label htmlFor="date">Preferred Date</Label>
                      <div className="relative mt-1">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <input
                          id="date"
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </motion.div>

                    {/* Optional rate input if consultant has no rate */}
                    {(!consultant.hourlyRate || consultant.hourlyRate <= 0) && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 }}
                      >
                        <Label htmlFor="rate">Your Offered Rate (per hour, INR)</Label>
                        <Input
                          id="rate"
                          inputMode="numeric"
                          value={customRate}
                          onChange={(e) => setCustomRate(e.target.value.replace(/[^0-9]/g, ''))}
                          placeholder="e.g. 2000"
                          className="mt-1"
                          required
                        />
                      </motion.div>
                    )}

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Label htmlFor="time">Preferred Time</Label>
                      <Select value={time} onValueChange={setTime} required>
                        <SelectTrigger className="mt-1">
                          <Clock className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTimeOptions.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Label htmlFor="duration">Session Duration</Label>
                      <Select value={duration} onValueChange={setDuration}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                          <SelectItem value="90">90 minutes</SelectItem>
                          <SelectItem value="120">120 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Label htmlFor="notes">Additional Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Tell the consultant what you'd like to discuss..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="mt-1 min-h-[100px]"
                      />
                    </motion.div>

                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                      {isLoading ? 'Processing...' : 'Confirm Booking'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-4 pb-4 border-b border-border">
                    <img
                      src={consultant.profilePicture}
                      alt={consultant.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{consultant.name}</h3>
                      <p className="text-sm text-muted-foreground">{consultant.specialization}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">{duration} minutes</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Rate</span>
                      <span className="font-medium">{formatINR(ratePerHour)}/hour</span>
                    </div>
                    
                    <div className="pt-3 border-t border-border">
                      <div className="flex justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-primary text-lg">{formatINR(isFinite(totalCost) ? totalCost : 0)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Booking;
