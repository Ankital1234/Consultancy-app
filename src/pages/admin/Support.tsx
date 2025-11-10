import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockSupportTickets } from '@/data/adminMockData';
import { MessageSquare } from 'lucide-react';

const AdminSupport = () => {
  const tickets = mockSupportTickets;

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      open: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || colors.open;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800',
    };
    return colors[priority] || colors.medium;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Support Tickets</h1>
        <p className="text-gray-600 mt-1">Manage customer support requests</p>
      </div>

      <div className="grid gap-4">
        {tickets.map((ticket, index) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{ticket.subject}</h3>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status.replace('_', ' ')}
                      </Badge>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{ticket.message}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span><strong>From:</strong> {ticket.userName}</span>
                      <span><strong>Category:</strong> {ticket.category.replace('_', ' ')}</span>
                      <span><strong>Created:</strong> {new Date(ticket.createdDate).toLocaleDateString()}</span>
                      {ticket.assignedTo && <span><strong>Assigned:</strong> {ticket.assignedTo}</span>}
                    </div>
                  </div>
                  <Button size="sm" className="ml-4">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Reply
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminSupport;
