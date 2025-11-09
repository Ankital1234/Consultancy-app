import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminDashboard from './AdminDashboard';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const renderContent = () => {
    if (children) {
      return children;
    }

    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'users':
        return <div className="p-6"><h2 className="text-2xl font-bold">Users Management</h2></div>;
      case 'subscriptions':
        return <div className="p-6"><h2 className="text-2xl font-bold">Subscriptions</h2></div>;
      case 'transactions':
        return <div className="p-6"><h2 className="text-2xl font-bold">Transactions</h2></div>;
      case 'verification':
        return <div className="p-6"><h2 className="text-2xl font-bold">Verification Queue</h2></div>;
      case 'analytics':
        return <div className="p-6"><h2 className="text-2xl font-bold">Analytics</h2></div>;
      case 'content':
        return <div className="p-6"><h2 className="text-2xl font-bold">Content Management</h2></div>;
      case 'settings':
        return <div className="p-6"><h2 className="text-2xl font-bold">Settings</h2></div>;
      case 'support':
        return <div className="p-6"><h2 className="text-2xl font-bold">Support</h2></div>;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <AdminSidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminLayout;
