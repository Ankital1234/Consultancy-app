import { motion } from 'framer-motion';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube,
  Send,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';

const PremiumFooter = () => {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const companyLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Our Team', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press Kit', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  const productLinks = [
    { name: 'Features', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Case Studies', href: '#' },
    { name: 'Reviews', href: '#' },
    { name: 'Updates', href: '#' },
  ];

  const resourceLinks = [
    { name: 'Documentation', href: '#' },
    { name: 'API Reference', href: '#' },
    { name: 'Community', href: '#' },
    { name: 'Support', href: '#' },
    { name: 'Blog', href: '#' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' },
  ];

  return (
    <footer className="relative bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info Column */}
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-black">
                consultancy.co
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Find the perfect freelance services for your business. Connect with talented professionals and get work done.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-gray-700" />
                <span>hello@consultancy.co</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-gray-700" />
                <span>+1 (555) 123-4567</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-gray-700" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Product Links Column */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-gray-900">
              Product
            </h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                    onMouseEnter={() => setIsHovered(link.name)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <span>{link.name}</span>
                    {isHovered === link.name && (
                      <ArrowRight className="w-3 h-3 text-gray-700" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-gray-900">
              Resources
            </h4>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                    onMouseEnter={() => setIsHovered(link.name)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <span>{link.name}</span>
                    {isHovered === link.name && (
                      <ArrowRight className="w-3 h-3 text-gray-700" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-gray-900">
              Newsletter
            </h4>
            <p className="text-gray-600 text-sm">
              Subscribe to get tips and exclusive offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors duration-200"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span>© 2024 consultancy.co. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PremiumFooter;
