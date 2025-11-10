import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Receipt, 
  Shield, 
  BarChart3, 
  FileText, 
  Settings, 
  HelpCircle, 
  Menu, 
  X,
  ChevronDown,
  LogOut,
  Bell,
  Search
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '../ui/tooltip';

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: any;
  badge?: number;
  children?: NavItem[];
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isCollapsed,
  onToggle,
  activeSection,
  onSectionChange
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      badge: 12,
      children: [
        { id: 'consultants', label: 'Consultants', icon: Users },
        { id: 'clients', label: 'Clients', icon: Users },
        { id: 'admins', label: 'Admin Users', icon: Shield },
      ]
    },
    {
      id: 'subscriptions',
      label: 'Subscriptions',
      icon: CreditCard,
      badge: 3,
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: Receipt,
    },
    {
      id: 'verification',
      label: 'Verification',
      icon: Shield,
      badge: 8,
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      children: [
        { id: 'revenue', label: 'Revenue', icon: BarChart3 },
        { id: 'usage', label: 'Usage Metrics', icon: BarChart3 },
        { id: 'cohort', label: 'Cohort Analysis', icon: BarChart3 },
      ]
    },
    {
      id: 'content',
      label: 'Content Tools',
      icon: FileText,
      children: [
        { id: 'faqs', label: 'FAQs', icon: FileText },
        { id: 'help-articles', label: 'Help Articles', icon: FileText },
        { id: 'templates', label: 'Templates', icon: FileText },
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
    },
    {
      id: 'support',
      label: 'Support',
      icon: HelpCircle,
      badge: 5,
    },
  ];

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleNavClick = (item: NavItem) => {
    if (item.children) {
      toggleExpanded(item.id);
    } else {
      onSectionChange(item.id);
    }
  };

  const sidebarVariants = {
    expanded: {
      width: '280px',
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    collapsed: {
      width: '80px',
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.05,
        duration: 0.3,
      },
    }),
  };

  const renderNavItem = (item: NavItem, index: number, level: number = 0) => {
    const Icon = item.icon;
    const isActive = activeSection === item.id;
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;

    const itemContent = (
      <motion.div
        variants={itemVariants}
        custom={index}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={`w-full justify-start h-12 px-3 mb-1 relative overflow-hidden group ${
            isActive 
              ? 'bg-brand-blue-100 dark:bg-brand-blue-900/30 text-brand-blue-700 dark:text-brand-blue-300 border-l-4 border-brand-blue-600' 
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
          onClick={() => handleNavClick(item)}
          style={{ paddingLeft: `${12 + level * 16}px` }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-brand-blue-500/10 to-brand-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            layoutId="activeBackground"
          />
          
          <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-brand-blue-600 dark:text-brand-blue-400' : ''}`} />
          
          {!isCollapsed && (
            <>
              <span className="ml-3 flex-1 text-left font-medium">
                {item.label}
              </span>
              
              {item.badge && (
                <Badge variant="destructive" className="ml-auto mr-2 h-5 text-xs">
                  {item.badge}
                </Badge>
              )}
              
              {hasChildren && (
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                  }`} 
                />
              )}
            </>
          )}
        </Button>

        {/* Sub-items */}
        {!isCollapsed && hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {item.children?.map((child, childIndex) => (
              <div key={child.id}>
                {renderNavItem(child, index + childIndex + 1, level + 1)}
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    );

    if (isCollapsed) {
      return (
        <TooltipProvider key={item.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              {itemContent}
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{item.label}</p>
              {item.badge && (
                <Badge variant="destructive" className="ml-2 h-4 text-xs">
                  {item.badge}
                </Badge>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return itemContent;
  };

  return (
    <motion.div
      variants={sidebarVariants}
      animate={isCollapsed ? "collapsed" : "expanded"}
      className={`bg-brand-blue-600 dark:bg-brand-blue-900 border-r border-slate-200 dark:border-slate-700 flex flex-col h-screen sticky top-0 left-0 z-40`}
    >
      {/* Header */}
      <div className="p-4 border-b border-brand-blue-700 dark:border-brand-blue-800">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-blue-400 to-brand-purple-500 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Admin</h1>
                <p className="text-xs text-brand-blue-200">Management Panel</p>
              </div>
            </motion.div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-white hover:bg-brand-blue-700 dark:hover:bg-brand-blue-800 h-8 w-8 p-0"
          >
            {isCollapsed ? (
              <Menu className="w-4 h-4" />
            ) : (
              <X className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      {!isCollapsed && (
        <div className="p-4 space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start text-white border-brand-blue-500 hover:bg-brand-blue-700 hover:border-brand-blue-400"
          >
            <Search className="w-4 h-4 mr-2" />
            Quick Search
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start text-white border-brand-blue-500 hover:bg-brand-blue-700 hover:border-brand-blue-400"
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
            <Badge variant="destructive" className="ml-auto h-4 text-xs">3</Badge>
          </Button>
        </div>
      )}

      <Separator className="bg-brand-blue-700 dark:bg-brand-blue-800" />

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item, index) => (
            <div key={item.id}>
              {renderNavItem(item, index)}
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-brand-blue-700 dark:border-brand-blue-800">
        {!isCollapsed ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-white border-brand-blue-500 hover:bg-brand-blue-700 hover:border-brand-blue-400"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-red-400 border-red-500/30 hover:bg-red-500/20 hover:border-red-400"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-white border-brand-blue-500 hover:bg-brand-blue-700 hover:border-brand-blue-400 h-8 w-8 p-0"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-red-400 border-red-500/30 hover:bg-red-500/20 hover:border-red-400 h-8 w-8 p-0"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Logout</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminSidebar;
