// src/pages/Auth.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Linkedin, Mail, Shield, CheckCircle, User, Briefcase } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth(); // login remains from context
  const defaultTab = searchParams.get('tab') || 'signin';
  const defaultRole = searchParams.get('role') || '';
  const redirectPath = searchParams.get('redirect') || '/';
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>(defaultRole);

  const API_FALLBACK = 'http://localhost:5000';

  const postJson = async (path: string, payload: any) => {
    const init: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    };
    try {
      const res = await fetch(path, init);
      return res;
    } catch (err) {
      const absolute = path.startsWith('http') ? path : `${API_FALLBACK}${path}`;
      return fetch(absolute, init);
    }
  };

  // Signin handler - using dummy values (no backend)
  const handleSubmit = async (e: React.FormEvent, type: string) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      if (type === 'signin') {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check sessionStorage for signup credentials first (for users who just signed up)
        const signupCreds = sessionStorage.getItem('signupCredentials');
        let userRole: 'user' | 'consultant' = 'user';
        let userName = 'Demo User';
        
        if (signupCreds) {
          const parsed = JSON.parse(signupCreds);
          if (parsed.email === email) {
            userRole = parsed.userType || 'user';
            userName = parsed.email.split('@')[0];
            
            // Store in localStorage for future logins
            localStorage.setItem('userRole_' + email, userRole);
          }
        } else {
          // Check localStorage for existing user role by email
          const storedRole = localStorage.getItem('userRole_' + email);
          if (storedRole && (storedRole === 'user' || storedRole === 'consultant')) {
            userRole = storedRole as 'user' | 'consultant';
          }
          
          // Also check old localStorage format
          const existingUser = localStorage.getItem('user');
          if (existingUser) {
            const parsedUser = JSON.parse(existingUser);
            if (parsedUser.email === email && parsedUser.role) {
              userRole = parsedUser.role;
            }
            userName = parsedUser.name || 'Demo User';
          } else {
            userName = email.split('@')[0];
          }
        }

        // Use dummy user data
        const dummyUser = {
          id: `${Date.now()}`,
          name: userName,
          email: email,
          role: userRole,
        };

        await login(
          email,
          password,
          userRole,
          dummyUser
        );

        toast({
          title: 'Welcome back!',
          description: 'Successfully signed in.',
        });

        // Redirect after successful auth to role-specific landing page
        setTimeout(() => {
          if (redirectPath && redirectPath !== '/') {
            navigate(redirectPath);
          } else {
            // Redirect based on user role
            if (userRole === 'consultant') {
              navigate('/consultant-home');
            } else if (userRole === 'user') {
              navigate('/user-dashboard');
            } else {
              navigate('/dashboard');
            }
          }
        }, 500);
      } else {
        toast({
          title: 'Info',
          description: 'Please use the Sign Up tab to create an account.',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as any)?.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect to new signup flow
  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  const handleLinkedInAuth = () => {
    setIsLoading(true);
    toast({
      title: 'LinkedIn Authentication',
      description: 'LinkedIn OAuth integration coming soon. (Demo)',
    });
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-2 shadow-xl">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto p-3 rounded-full bg-gradient-to-br from-primary to-purple-600 w-fit">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold">Welcome to MentorMe</CardTitle>
            <CardDescription className="text-base">Sign in to your account or create a new one</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={defaultTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={(e) => handleSubmit(e, 'signin')} className="space-y-4" autoComplete="off">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      autoComplete="username"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck={false}
                      data-lpignore="true"
                      data-1p-ignore="true"
                      required
                      className="mt-1"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="current-password"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck={false}
                      data-lpignore="true"
                      data-1p-ignore="true"
                      required
                      className="mt-1"
                    />
                  </motion.div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  {/* Social Login Buttons */}
                  <div className="space-y-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-2 hover:bg-[#0077B5]/5 hover:border-[#0077B5]"
                      onClick={handleLinkedInAuth}
                      disabled={isLoading}
                    >
                      <Linkedin className="w-5 h-5 mr-2 text-[#0077B5]" />
                      Sign in with LinkedIn
                    </Button>
                  </div>

                  {/* Trust Indicators */}
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Secure authentication</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Your data is protected</span>
                    </div>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 py-6 text-center"
                >
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-foreground">
                      Create Your Account
                    </h3>
                    <p className="text-muted-foreground">
                      Start your journey with our enhanced signup experience
                    </p>
                  </div>

                  <Button 
                    onClick={handleSignupRedirect}
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                  >
                    Continue to Sign Up
                  </Button>

                  <div className="pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Choose between User or Consultant account</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Register as Individual or Company</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Personalized onboarding experience</span>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;
