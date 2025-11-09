import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const AdminContent = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600 mt-1">Manage FAQs, help docs, and guides</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Article
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Content management system</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminContent;
