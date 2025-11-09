import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AdminSubscriptions = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Subscription Management</h1>
        <p className="text-gray-600 mt-1">Monitor and manage all subscriptions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Basic', count: 3750, color: 'bg-gray-100 text-gray-800' },
          { label: 'Pro', count: 5625, color: 'bg-blue-100 text-blue-800' },
          { label: 'Premium', count: 3125, color: 'bg-purple-100 text-purple-800' },
          { label: 'Enterprise', count: 958, color: 'bg-yellow-100 text-yellow-800' },
        ].map((tier) => (
          <Card key={tier.label}>
            <CardHeader>
              <CardTitle className="text-lg">{tier.label} Tier</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{tier.count.toLocaleString()}</div>
              <Badge className={`mt-2 ${tier.color}`}>{tier.label}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subscription Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Subscription analytics and charts</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSubscriptions;
