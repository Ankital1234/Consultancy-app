import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Users, 
  Calendar, 
  Star, 
  MessageSquare, 
  TrendingUp,
  DollarSign,
  FileText,
  Search,
  Clock,
  ArrowRight,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { Consultant } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

type Project = {
  id: string;
  title: string;
  consultant: string;
  consultantId: string;
  consultantAvatar?: string;
  status: 'active' | 'completed' | 'pending';
  budget: number;
  startDate?: string;
  deadline?: string;
  progress?: number;
  description?: string;
};

type Session = {
  id: string;
  consultant: string;
  consultantId: string;
  consultantAvatar?: string;
  date: string;
  time?: string;
  duration: number;
  topic?: string;
  status?: string;
};

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [messages, setMessages] = useState<Array<{id: string; from: string; fromAvatar?: string; message: string; timestamp?: string; unread?: boolean;}>>([]);

  useEffect(() => {
    // Load consultants for counts
    const load = async () => {
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
              rating: Number(c.rating || 0),
              totalReviews: Number(c.totalReviews || 0),
              availability: Array.isArray(c.availability) ? c.availability : [],
            } as Consultant;
          });
          setConsultants(mapped);
        }
      } catch {}
    };
    load();
  }, [user?.id]);

  const confirmConsultant = async (c: Consultant) => {
    try {
      const payload = {
        consultantId: c.id,
        companyId: user?.id,
        date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        duration: 60,
        status: 'confirmed',
        topic: 'Consultation',
      };
      const res = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to confirm session');
      const created = await res.json().catch(() => payload);
      setSessions(prev => [{
        id: created._id || created.id || Math.random().toString(36).slice(2),
        consultant: c.name,
        consultantId: c.id,
        consultantAvatar: c.profilePicture,
        date: created.date || payload.date,
        time: created.time,
        duration: Number(created.duration || payload.duration),
        topic: created.topic || payload.topic,
        status: created.status || payload.status,
      }, ...prev]);
      toast({ title: 'Consultant confirmed', description: `${c.name} has been scheduled.` });
    } catch (e: any) {
      toast({ title: 'Failed to confirm', description: e?.message || 'Please try again', variant: 'destructive' });
    }
  };

  // TODO: When backend endpoints are ready, populate projects/sessions/messages based on company user id
  const stats = {
    activeProjects: projects.filter(p => p.status === 'active').length,
    totalConsultants: consultants.length,
    totalSpent: projects.reduce((sum, p) => sum + (p.budget || 0), 0),
    upcomingSessions: sessions.length,
    unreadMessages: messages.filter(m => m.unread).length,
  };

  const activeProjects = projects.filter(p => p.status === 'active');
  const completedProjects = projects.filter(p => p.status === 'completed');

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Dashboard</h1>
          <p className="text-gray-600">Manage your projects, consultants, and collaborations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Projects</CardTitle>
              <Briefcase className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.activeProjects}</div>
              <p className="text-xs text-gray-500 mt-1">In progress</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Available Consultants</CardTitle>
              <Users className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.totalConsultants}</div>
              <p className="text-xs text-gray-500 mt-1">Ready to help</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Spent</CardTitle>
              <DollarSign className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">₹{stats.totalSpent.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">All projects</p>
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
              <CardTitle className="text-sm font-medium text-gray-600">Messages</CardTitle>
              <MessageSquare className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.unreadMessages}</div>
              <p className="text-xs text-gray-500 mt-1">Unread</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="projects" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList className="bg-gray-50">
              <TabsTrigger value="projects">Active Projects</TabsTrigger>
              <TabsTrigger value="consultants">Find Consultants</TabsTrigger>
              <TabsTrigger value="sessions">Upcoming Sessions</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>
            <Button 
              onClick={() => navigate('/consultants')}
              className="bg-black hover:bg-gray-800 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>

          {/* Active Projects Tab */}
          <TabsContent value="projects" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Active Projects</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate('/consultants')}>
                  <Search className="w-4 h-4 mr-2" />
                  Find Consultant
                </Button>
              </div>
            </div>

            {activeProjects.length > 0 ? (
              <div className="grid gap-6">
                {activeProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-6">
                          <img
                            src={project.consultantAvatar}
                            alt={project.consultant}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                  {project.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    {project.consultant}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <DollarSign className="w-4 h-4" />
                                    ₹{project.budget.toLocaleString()}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    Due: {new Date(project.deadline).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                              <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                                {project.status}
                              </Badge>
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-4">
                              <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-gray-600">Progress</span>
                                <span className="font-medium text-gray-900">{project.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${project.progress}%` }}
                                />
                              </div>
                            </div>

                            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
                              <Button variant="outline" size="sm">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Message Consultant
                              </Button>
                              <Button variant="outline" size="sm">
                                <FileText className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                              <Button variant="outline" size="sm">
                                View Project
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
                  <p className="text-gray-500 text-lg mb-2">No active projects</p>
                  <p className="text-gray-400 text-sm mb-6">Start by finding a consultant for your project</p>
                  <Button onClick={() => navigate('/consultants')} className="bg-black hover:bg-gray-800">
                    Browse Consultants
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Completed Projects */}
            {completedProjects.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Completed Projects</h2>
                <div className="grid gap-4">
                  {completedProjects.map((project) => (
                    <Card key={project.id} className="border-gray-200 bg-gray-50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <img
                              src={project.consultantAvatar}
                              alt={project.consultant}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <h4 className="font-semibold text-gray-900">{project.title}</h4>
                              <p className="text-sm text-gray-600">{project.consultant}</p>
                            </div>
                          </div>
                          <Badge className="bg-green-50 text-green-700 border-green-200">
                            Completed
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Find Consultants Tab */}
          <TabsContent value="consultants" className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search consultants by name, specialization..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {consultants
                .filter(consultant =>
                  searchQuery === '' ||
                  consultant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  (consultant.specialization || '').toLowerCase().includes(searchQuery.toLowerCase())
                )
                .slice(0, 6)
                .map((consultant, index) => (
                  <motion.div
                    key={consultant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className="cursor-pointer hover:shadow-lg transition-all border-gray-200"
                      onClick={() => navigate(`/consultant/${consultant.id}`)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <img
                            src={consultant.profilePicture}
                            alt={consultant.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{consultant.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{consultant.specialization}</p>
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{consultant.rating}</span>
                              <span className="text-xs text-gray-500">({consultant.totalReviews})</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{consultant.bio}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div>
                            <span className="text-xs text-gray-500">Rate</span>
                            <p className="font-semibold text-gray-900">₹{consultant.hourlyRate.toLocaleString()}/hr</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="border-gray-300" onClick={() => navigate(`/consultant/${consultant.id}`)}>
                              View Profile
                            </Button>
                            <Button size="sm" onClick={() => confirmConsultant(consultant)}>
                              Confirm
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>

          {/* Upcoming Sessions Tab */}
          <TabsContent value="sessions" className="space-y-4">
            {sessions.length > 0 ? (
              <div className="grid gap-4">
                {sessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-gray-200 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-6">
                          {session.consultantAvatar && (
                            <img
                              src={session.consultantAvatar}
                              alt={session.consultant}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{session.topic}</h3>
                            <p className="text-sm text-gray-600 mb-3">with {session.consultant}</p>
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
                          {session.status && (
                            <Badge className="bg-green-50 text-green-700 border-green-200">
                              {session.status}
                            </Badge>
                          )}
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
                  <p className="text-gray-500 text-lg mb-2">No upcoming sessions</p>
                  <p className="text-gray-400 text-sm mb-6">Book a session with a consultant to get started</p>
                  <Button onClick={() => navigate('/consultants')} className="bg-black hover:bg-gray-800">
                    Browse Consultants
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-4">
            {messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className={`border-gray-200 ${msg.unread ? 'border-l-4 border-l-blue-500 bg-blue-50/50' : ''} hover:shadow-md transition-shadow cursor-pointer`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          {msg.fromAvatar && (
                            <img
                              src={msg.fromAvatar}
                              alt={msg.from}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-gray-900">{msg.from}</h4>
                              <span className="text-xs text-gray-500">{msg.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{msg.message}</p>
                            <span className="text-xs text-blue-600">View conversation →</span>
                          </div>
                          {msg.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="border-gray-200">
                <CardContent className="py-16 text-center">
                  <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No messages</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CompanyDashboard;

