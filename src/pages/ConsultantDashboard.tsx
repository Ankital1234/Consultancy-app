import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Calendar, 
  Users, 
  Clock,
  TrendingUp,
  MessageSquare,
  FileText,
  Star,
  CheckCircle,
  XCircle,
  Eye,
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

type Session = {
  id: string;
  companyName?: string;
  date: string;
  time?: string;
  duration: number;
  topic?: string;
  status?: string;
  earnings?: number;
  rating?: number;
  review?: string;
};

const ConsultantDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [bookingRequests, setBookingRequests] = useState<Session[]>([]);
  const [upcomingSessions, setUpcomingSessions] = useState<Session[]>([]);
  const [completedSessions, setCompletedSessions] = useState<Session[]>([]);
  const [monthlyEarnings, setMonthlyEarnings] = useState<Array<{month: string; earnings: number}>>([]);

  useEffect(() => {
    const load = async () => {
      if (!user?.email) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/consultants/by-email?email=${encodeURIComponent(user.email)}`);
        if (res.ok) {
          const p = await res.json();
          setProfile(p);
        }
        // If/when bookings/sessions APIs exist, populate below. For now keep empty to avoid dummy data.
        setBookingRequests([]);
        setUpcomingSessions([]);
        setCompletedSessions([]);
        setMonthlyEarnings([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user?.email]);

  const totalEarnings = completedSessions.reduce((sum, s) => sum + (s.earnings || 0), 0);
  const thisMonthEarnings = monthlyEarnings[monthlyEarnings.length - 1]?.earnings || 0;
  const averageRating = completedSessions.length
    ? (completedSessions.reduce((sum, s) => sum + (s.rating || 0), 0) / completedSessions.length).toFixed(1)
    : '0.0';

  const stats = {
    totalEarnings,
    thisMonthEarnings,
    pendingRequests: bookingRequests.length,
    upcomingSessions: upcomingSessions.length,
    completedSessions: completedSessions.length,
    averageRating,
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Consultant Dashboard</h1>
          <p className="text-gray-600">Manage your bookings, earnings, and client relationships</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Earnings</CardTitle>
              <DollarSign className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">₹{stats.totalEarnings.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">This Month</CardTitle>
              <TrendingUp className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">₹{stats.thisMonthEarnings.toLocaleString()}</div>
              <p className="text-xs text-green-600 mt-1">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Requests</CardTitle>
              <Users className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.pendingRequests}</div>
              <p className="text-xs text-gray-500 mt-1">Awaiting response</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Upcoming Sessions</CardTitle>
              <Calendar className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.upcomingSessions}</div>
              <p className="text-xs text-gray-500 mt-1">Scheduled</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Average Rating</CardTitle>
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.averageRating}</div>
              <p className="text-xs text-gray-500 mt-1">From {stats.completedSessions} sessions</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="requests" className="space-y-4">
          <TabsList className="bg-gray-50">
            <TabsTrigger value="requests">
              Booking Requests ({bookingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="sessions">
              Upcoming Sessions ({upcomingSessions.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedSessions.length})
            </TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Booking Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            {bookingRequests.length > 0 ? (
              <div className="space-y-4">
                {bookingRequests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-6">
                          {/* Avatar omitted until real data includes images */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                  {request.topic || 'Consultation Request'}
                                </h3>
                                {request.companyName && (
                                  <p className="text-sm text-gray-600 mb-2">from {request.companyName}</p>
                                )}
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(request.date).toLocaleDateString()} {request.time ? `at ${request.time}` : ''}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {request.duration} minutes
                                  </span>
                                </div>
                              </div>
                              {request.status && (
                                <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                  {request.status}
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Accept Request
                              </Button>
                              <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                                <XCircle className="w-4 h-4 mr-2" />
                                Decline
                              </Button>
                              <Button size="sm" variant="outline" className="border-gray-300">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Message Client
                              </Button>
                              <Button size="sm" variant="outline" className="border-gray-300">
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="border-gray-200">
                <CardContent className="py-16 text-center">
                  <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">No pending requests</p>
                  <p className="text-gray-400 text-sm">New booking requests will appear here</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Upcoming Sessions Tab */}
          <TabsContent value="sessions" className="space-y-4">
            {upcomingSessions.length > 0 ? (
              <div className="space-y-4">
                {upcomingSessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-gray-200 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-6">
                          {/* Avatar omitted until real data includes images */}
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{session.topic || 'Consultation Session'}</h3>
                            <p className="text-sm text-gray-600 mb-3">{session.companyName ? `with ${session.companyName}` : ''}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(session.date).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {session.time} ({session.duration} min)
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {session.status && (
                              <Badge className="bg-green-50 text-green-700 border-green-200">
                                {session.status}
                              </Badge>
                            )}
                            <Button size="sm" variant="outline" className="border-gray-300">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Contact
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="border-gray-200">
                <CardContent className="py-16 text-center">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No upcoming sessions</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Completed Sessions Tab */}
          <TabsContent value="completed" className="space-y-4">
            {completedSessions.length > 0 ? (
              <div className="space-y-4">
                {completedSessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-gray-200 bg-gray-50">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">{session.companyName}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(session.date).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {session.duration} minutes
                              </span>
                              {session.earnings !== undefined && (
                                <span className="flex items-center gap-1">
                                  <DollarSign className="w-4 h-4" />
                                  ₹{Number(session.earnings).toLocaleString()}
                                </span>
                              )}
                            </div>
                            {session.review && (
                              <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="flex items-center gap-1">
                                    {[...Array(session.rating || 0)].map((_, i) => (
                                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                  </div>
                                  <span className="text-sm font-medium text-gray-900">{session.rating}.0</span>
                                </div>
                                <p className="text-sm text-gray-600">{session.review}</p>
                              </div>
                            )}
                          </div>
                          <Badge className="bg-green-50 text-green-700 border-green-200">
                            Completed
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="border-gray-200">
                <CardContent className="py-16 text-center">
                  <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No completed sessions yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle>Earnings Trend (Last 6 Months)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyEarnings.length > 0 ? monthlyEarnings.map((month, index) => (
                      <div key={`${month.month}-${index}`} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{month.month}</span>
                          <span className="font-semibold text-gray-900">₹{month.earnings.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${Math.min((month.earnings / 100000) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    )) : (
                      <div className="text-sm text-gray-500">No earnings yet</div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Total Sessions</span>
                    <span className="text-2xl font-bold text-gray-900">{stats.completedSessions}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Average Rating</span>
                    <span className="text-2xl font-bold text-gray-900">{stats.averageRating}★</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Response Rate</span>
                    <span className="text-2xl font-bold text-gray-900">98%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ConsultantDashboard;
