import { useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from '../components/admin/AdminDashboard';
import UserManagement from '../components/admin/UserManagement';
import SubscriptionManagement from '../components/admin/SubscriptionManagement';

const AdminPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'consultants':
        return <UserManagement userType="consultants" />;
      case 'clients':
        return <UserManagement userType="clients" />;
      case 'admins':
        return <UserManagement userType="admins" />;
      case 'subscriptions':
        return <SubscriptionManagement />;
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
    <AdminLayout>
      {renderContent()}
    </AdminLayout>
  );
};

export default AdminPage;
