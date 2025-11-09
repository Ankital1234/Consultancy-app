import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Trophy, Users, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const benefits = [
  { icon: Users, title: 'Reach new clients', desc: 'Get discovered by people actively seeking your expertise.' },
  { icon: Wallet, title: 'Flexible earnings', desc: 'Set your own hourly rate and availability.' },
  { icon: Trophy, title: 'Build your brand', desc: 'Showcase reviews, experience, and specialization.' },
];

const steps = [
  'Create your consultant profile',
  'Set availability and pricing',
  'Receive and manage bookings',
  'Host sessions and get paid',
];

const BecomeConsultant = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-3">Become a Consultant</h1>
              <p className="text-muted-foreground mb-6">Join ConsultHub and monetize your expertise with flexible scheduling and a steady flow of clients.</p>
              <div className="flex items-center gap-3">
                <Link to="/register-consultant">
                  <Button size="lg">
                    Get started
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/consultants">
                  <Button variant="ghost" size="lg">Explore consultants</Button>
                </Link>
              </div>
            </div>
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Why join ConsultHub?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {benefits.map((b) => (
                    <div key={b.title} className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <b.icon className="h-6 w-6 text-primary mb-3" />
                      <h3 className="font-semibold mb-1">{b.title}</h3>
                      <p className="text-sm text-muted-foreground">{b.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your path to getting started</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                {steps.map((s, i) => (
                  <div key={s} className="p-5 rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">Step {i + 1}</span>
                    </div>
                    <p className="font-medium text-foreground">{s}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link to="/register-consultant">
                  <Button>Become a consultant</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BecomeConsultant;



