import { motion } from 'framer-motion';
import { Building2, Briefcase, ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface RoleSelectionProps {
  onSelectRole: (role: 'company' | 'consultant') => void;
}

const RoleSelection = ({ onSelectRole }: RoleSelectionProps) => {
  const roles = [
    {
      type: 'company' as const,
      icon: Building2,
      title: 'Register as Company',
      description: 'Find and hire expert consultants for your projects',
      benefits: [
        'Browse verified consultant profiles',
        'Post project requirements',
        'Access certifications and portfolios',
        'Manage projects and payments',
        'Direct messaging with consultants',
      ],
      gradient: 'from-blue-500 to-purple-600',
      bgGradient: 'from-blue-500/10 to-purple-600/10',
    },
    {
      type: 'consultant' as const,
      icon: Briefcase,
      title: 'Register as Consultant',
      description: 'Showcase your expertise and connect with companies',
      benefits: [
        'Build professional profile',
        'Upload certifications and badges',
        'Showcase completed projects',
        'Set your rates in ₹ (INR)',
        'Receive project requests',
      ],
      gradient: 'from-teal-500 to-blue-600',
      bgGradient: 'from-teal-500/10 to-blue-600/10',
    },
  ];

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
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="w-full max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your Role
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select how you want to use MentorMe. You can change this later in your account settings.
          </p>
        </motion.div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {roles.map((role, index) => (
            <motion.div
              key={role.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="border-2 hover:border-primary/50 transition-all duration-300 h-full relative overflow-hidden group">
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${role.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <CardHeader className="relative z-10">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${role.gradient} mb-4 w-fit`}>
                    <role.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{role.title}</CardTitle>
                  <CardDescription className="text-base">
                    {role.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 space-y-6">
                  {/* Benefits List */}
                  <div className="space-y-3">
                    {role.benefits.map((benefit, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + idx * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => onSelectRole(role.type)}
                    className={`w-full bg-gradient-to-r ${role.gradient} hover:opacity-90 text-white shadow-lg`}
                    size="lg"
                  >
                    Continue as {role.type === 'company' ? 'Company' : 'Consultant'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Already have an account?{' '}
          <a href="/auth?tab=signin" className="text-primary hover:underline font-medium">
            Sign in here
          </a>
        </motion.p>
      </div>
    </div>
  );
};

export default RoleSelection;
