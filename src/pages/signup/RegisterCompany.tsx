import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const RegisterCompany = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    try {
      const existing = JSON.parse(localStorage.getItem('companyList') || '[]');
      const list = Array.isArray(existing) ? existing : [];
      const merged = Array.from(new Set([...list, trimmed]));
      localStorage.setItem('companyList', JSON.stringify(merged));
    } catch {
      localStorage.setItem('companyList', JSON.stringify([trimmed]));
    }
    try {
      const details = JSON.parse(localStorage.getItem('companyDetails') || '{}');
      details[trimmed] = {
        designation: designation.trim(),
        email: email.trim(),
        phone: phone.trim(),
        createdAt: Date.now(),
      };
      localStorage.setItem('companyDetails', JSON.stringify(details));
    } catch {}
    try { localStorage.setItem('latestCompanyAdded', trimmed); } catch {}
    window.close();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFBF7] to-[#F5F0ED] px-4 py-12">
      <div className="max-w-xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-[#8B8680] hover:text-[#2B2520]">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back
          </Button>
          <Card className="border-2 border-[#E8E3DE] shadow-lg">
            <CardHeader className="text-center pb-6 border-b border-[#E8E3DE]">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8ec5ff] to-[#6fbaff] flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-[#2B2520]">Register Company</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter company name" className="border-2 border-[#E8E3DE]" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Designation</Label>
                    <Input value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="e.g., HR Manager" className="border-2 border-[#E8E3DE]" />
                  </div>
                  <div className="space-y-2">
                    <Label>Work Email</Label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" className="border-2 border-[#E8E3DE]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" className="border-2 border-[#E8E3DE]" />
                </div>
                <Button type="submit" className="w-full bg-[#8ec5ff] hover:bg-[#6fbaff] text-white">Save Company</Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterCompany;
