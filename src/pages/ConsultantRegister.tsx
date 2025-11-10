import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Upload, Image as ImageIcon } from 'lucide-react';

const ConsultantRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState<number | ''>('');
  const [rate, setRate] = useState<number | ''>('');
  const [bio, setBio] = useState('');

  // uploads state
  const [uploading, setUploading] = useState<string | null>(null); // which field is uploading
  const [passportUrl, setPassportUrl] = useState<string>('');
  const [passportPreview, setPassportPreview] = useState<string>('');
  const [aadharFrontUrl, setAadharFrontUrl] = useState<string>('');
  const [aadharBackUrl, setAadharBackUrl] = useState<string>('');
  const [panUrl, setPanUrl] = useState<string>('');
  const [certUrls, setCertUrls] = useState<string[]>([]);

  const MAX_MB = 2;
  const acceptTypes = ['image/jpeg', 'image/png', 'image/webp'];

  const uploadFile = async (file: File): Promise<string> => {
    if (!acceptTypes.includes(file.type)) throw new Error('Only JPG/PNG/WEBP allowed');
    if (file.size > MAX_MB * 1024 * 1024) throw new Error(`Max ${MAX_MB}MB`);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/uploads', { method: 'POST', body: fd });
    if (!res.ok) throw new Error('Upload failed');
    const data = await res.json();
    return data.url as string;
  };

  const handlePick = (field: string) => {
    const input = document.getElementById(field) as HTMLInputElement | null;
    input?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: string, multiple = false) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      setUploading(field);
      if (multiple) {
        const urls: string[] = [];
        for (const f of Array.from(files)) {
          const url = await uploadFile(f);
          urls.push(url);
        }
        setCertUrls((prev) => [...prev, ...urls]);
      } else {
        const f = files[0];
        const url = await uploadFile(f);
        if (field === 'passport') {
          setPassportUrl(url);
          setPassportPreview(URL.createObjectURL(f));
        } else if (field === 'aadharFront') setAadharFrontUrl(url);
        else if (field === 'aadharBack') setAadharBackUrl(url);
        else if (field === 'pan') setPanUrl(url);
      }
      toast({ title: 'Uploaded', description: `${multiple ? 'Files' : 'File'} uploaded successfully` });
    } catch (err: any) {
      toast({ title: 'Upload error', description: err?.message || 'Failed to upload', variant: 'destructive' });
    } finally {
      setUploading(null);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        fullName,
        email,
        title: specialization,
        bio,
        experienceYears: Number(experience || 0),
        hourlyRate: Number(rate || 0),
        profilePicture: passportUrl,
        aadharFront: aadharFrontUrl,
        aadharBack: aadharBackUrl,
        panCard: panUrl,
        certificates: certUrls,
      } as any;
      const res = await fetch('/api/consultants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to create consultant');
      toast({ title: 'Registration Successful!', description: 'Your consultant profile has been created.' });
      navigate('/consultants');
    } catch (err: any) {
      toast({ title: 'Error', description: err?.message || 'Failed to register', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Become a Consultant</CardTitle>
            <CardDescription>Fill in your details to start consulting</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" type="text" placeholder="John Doe" required className="mt-1" value={fullName} onChange={(e)=>setFullName(e.target.value)} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="name@example.com" required className="mt-1" value={email} onChange={(e)=>setEmail(e.target.value)} />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input id="specialization" type="text" placeholder="e.g., Business Strategy" required className="mt-1" value={specialization} onChange={(e)=>setSpecialization(e.target.value)} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input id="experience" type="number" placeholder="5" required min="0" className="mt-1" value={experience} onChange={(e)=>setExperience(e.target.value? Number(e.target.value): '')} />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Label htmlFor="rate">Hourly Rate ($)</Label>
                <Input id="rate" type="number" placeholder="150" required min="0" className="mt-1" value={rate} onChange={(e)=>setRate(e.target.value? Number(e.target.value): '')} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Label htmlFor="bio">Short Bio</Label>
                <Textarea id="bio" placeholder="Tell us about your expertise and experience..." required className="mt-1 min-h-[120px]" value={bio} onChange={(e)=>setBio(e.target.value)} />
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
                <Label>Passport Size Photo</Label>
                <div className="mt-2 flex items-center gap-4">
                  <div className={`${!passportPreview ? 'flex items-center justify-center text-muted-foreground ' : ''}w-16 h-16 rounded-full bg-muted overflow-hidden border`}>
                    {passportPreview ? (
                      <img src={passportPreview} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="h-6 w-6" />
                    )}
                  </div>
                  <Button type="button" variant="outline" onClick={()=>handlePick('passport')} disabled={uploading==='passport'}>
                    <Upload className="mr-2 h-4 w-4" />
                    {uploading==='passport' ? 'Uploading...' : (passportUrl? 'Replace Photo' : 'Upload Photo')}
                  </Button>
                  <input id="passport" type="file" accept="image/*" className="hidden" onChange={(e)=>handleFileChange(e,'passport')} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">JPG/PNG/WEBP up to {MAX_MB}MB. Square recommended.</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
                  <Label>Aadhaar Front</Label>
                  <div className="mt-1 flex items-center gap-3">
                    <Button type="button" variant="outline" onClick={()=>handlePick('aadharFront')} disabled={uploading==='aadharFront'} className="w-full">
                      <Upload className="mr-2 h-4 w-4" /> {uploading==='aadharFront' ? 'Uploading...' : (aadharFrontUrl? 'Replace' : 'Upload')}
                    </Button>
                    {aadharFrontUrl && <a href={aadharFrontUrl} target="_blank" rel="noreferrer" className="text-xs underline">View</a>}
                    <input id="aadharFront" type="file" accept="image/*" className="hidden" onChange={(e)=>handleFileChange(e,'aadharFront')} />
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.85 }}>
                  <Label>Aadhaar Back</Label>
                  <div className="mt-1 flex items-center gap-3">
                    <Button type="button" variant="outline" onClick={()=>handlePick('aadharBack')} disabled={uploading==='aadharBack'} className="w-full">
                      <Upload className="mr-2 h-4 w-4" /> {uploading==='aadharBack' ? 'Uploading...' : (aadharBackUrl? 'Replace' : 'Upload')}
                    </Button>
                    {aadharBackUrl && <a href={aadharBackUrl} target="_blank" rel="noreferrer" className="text-xs underline">View</a>}
                    <input id="aadharBack" type="file" accept="image/*" className="hidden" onChange={(e)=>handleFileChange(e,'aadharBack')} />
                  </div>
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
                <Label>PAN Card</Label>
                <div className="mt-1 flex items-center gap-3">
                  <Button type="button" variant="outline" onClick={()=>handlePick('pan')} disabled={uploading==='pan'} className="w-full">
                    <Upload className="mr-2 h-4 w-4" /> {uploading==='pan' ? 'Uploading...' : (panUrl? 'Replace' : 'Upload')}
                  </Button>
                  {panUrl && <a href={panUrl} target="_blank" rel="noreferrer" className="text-xs underline">View</a>}
                  <input id="pan" type="file" accept="image/*" className="hidden" onChange={(e)=>handleFileChange(e,'pan')} />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.95 }}>
                <Label>Certificates (multiple)</Label>
                <div className="mt-1 flex items-center gap-3">
                  <Button type="button" variant="outline" onClick={()=>handlePick('certs')} disabled={uploading==='certs'} className="w-full">
                    <Upload className="mr-2 h-4 w-4" /> {uploading==='certs' ? 'Uploading...' : 'Upload Certificates'}
                  </Button>
                  <input id="certs" type="file" accept="image/*" multiple className="hidden" onChange={(e)=>handleFileChange(e,'certs', true)} />
                </div>
                {certUrls.length > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">Uploaded: {certUrls.length} file(s)</p>
                )}
              </motion.div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? 'Creating Profile...' : 'Complete Registration'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ConsultantRegister;
