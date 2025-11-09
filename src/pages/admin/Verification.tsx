import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Eye, FileText, User, Mail, Phone, MapPin, Calendar, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockVerificationRequests } from '@/data/adminMockData';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AdminVerification = () => {
  const [requests] = useState(mockVerificationRequests);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status] || colors.pending;
  };

  const getDocumentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      identity: 'Identity Document',
      certification: 'Professional Certificate',
      business: 'Business License',
      tax: 'Tax Document',
      aadhaar_front: 'Aadhaar Card (Front)',
      aadhaar_back: 'Aadhaar Card (Back)',
      pan_card: 'PAN Card',
      selfie: 'Selfie with Aadhaar',
      address_proof: 'Address Proof',
    };
    return labels[type] || type.replace('_', ' ');
  };

  const handleView = (request: any) => {
    setSelectedRequest(request);
    setViewDialogOpen(true);
  };

  const handleApprove = (request: any) => {
    setSelectedRequest(request);
    setApproveDialogOpen(true);
  };

  const handleReject = (request: any) => {
    setSelectedRequest(request);
    setRejectionReason('');
    setRejectDialogOpen(true);
  };

  const confirmApprove = () => {
    // In real app, this would call an API
    toast({
      title: 'Document Approved',
      description: `${selectedRequest.userName}'s ${getDocumentTypeLabel(selectedRequest.documentType)} has been approved.`,
    });
    setApproveDialogOpen(false);
    setSelectedRequest(null);
  };

  const confirmReject = () => {
    if (!rejectionReason.trim()) {
      toast({
        title: 'Reason Required',
        description: 'Please provide a reason for rejection.',
        variant: 'destructive',
      });
      return;
    }

    // In real app, this would call an API
    toast({
      title: 'Document Rejected',
      description: `${selectedRequest.userName}'s ${getDocumentTypeLabel(selectedRequest.documentType)} has been rejected.`,
      variant: 'destructive',
    });
    setRejectDialogOpen(false);
    setRejectionReason('');
    setSelectedRequest(null);
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const allRequests = requests;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Document Verification</h1>
        <p className="text-gray-600 mt-1">Review and verify seller documents including Aadhaar cards</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{pendingRequests.length}</p>
              </div>
              <Shield className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {allRequests.filter(r => r.status === 'approved').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {allRequests.filter(r => r.status === 'rejected').length}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">{allRequests.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            Pending ({pendingRequests.length})
          </TabsTrigger>
          <TabsTrigger value="all">All Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingRequests.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-gray-500">No pending verification requests</p>
              </CardContent>
            </Card>
          ) : (
            pendingRequests.map((request, index) => (
              <VerificationCard
                key={request.id}
                request={request}
                index={index}
                getStatusColor={getStatusColor}
                getDocumentTypeLabel={getDocumentTypeLabel}
                onView={handleView}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {allRequests.map((request, index) => (
            <VerificationCard
              key={request.id}
              request={request}
              index={index}
              getStatusColor={getStatusColor}
              getDocumentTypeLabel={getDocumentTypeLabel}
              onView={handleView}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </TabsContent>
      </Tabs>

      {/* View Document Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>View Document - {selectedRequest?.userName}</DialogTitle>
            <DialogDescription>
              {selectedRequest && getDocumentTypeLabel(selectedRequest.documentType)}
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Name:</span>
                  <span>{selectedRequest.userName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Email:</span>
                  <span>{selectedRequest.userEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Submitted:</span>
                  <span>{new Date(selectedRequest.submittedDate).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Type:</span>
                  <span>{getDocumentTypeLabel(selectedRequest.documentType)}</span>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-gray-50">
                <img
                  src={selectedRequest.documentUrl || '/placeholder.svg'}
                  alt="Document"
                  className="w-full h-auto rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
              </div>

              {selectedRequest.notes && (
                <Alert>
                  <AlertDescription>
                    <strong>Notes:</strong> {selectedRequest.notes}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Approve Dialog */}
      <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Document</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve {selectedRequest?.userName}'s {selectedRequest && getDocumentTypeLabel(selectedRequest.documentType)}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={confirmApprove}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Document</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting {selectedRequest?.userName}'s {selectedRequest && getDocumentTypeLabel(selectedRequest.documentType)}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="rejectionReason">Rejection Reason *</Label>
              <Textarea
                id="rejectionReason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g., Document is blurry, details not visible, incorrect format..."
                className="mt-2"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmReject}>
              <XCircle className="w-4 h-4 mr-2" />
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface VerificationCardProps {
  request: any;
  index: number;
  getStatusColor: (status: string) => string;
  getDocumentTypeLabel: (type: string) => string;
  onView: (request: any) => void;
  onApprove: (request: any) => void;
  onReject: (request: any) => void;
}

const VerificationCard = ({
  request,
  index,
  getStatusColor,
  getDocumentTypeLabel,
  onView,
  onApprove,
  onReject,
}: VerificationCardProps) => {
  const isAadhaar = request.documentType?.includes('aadhaar');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className={isAadhaar ? 'border-2 border-blue-200' : ''}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{request.userName}</h3>
                <Badge className={getStatusColor(request.status)}>
                  {request.status}
                </Badge>
                {isAadhaar && (
                  <Badge className="bg-blue-100 text-blue-800">
                    <Shield className="w-3 h-3 mr-1" />
                    Aadhaar
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{request.userEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="font-medium">{getDocumentTypeLabel(request.documentType)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Submitted: {new Date(request.submittedDate).toLocaleDateString()}</span>
                </div>
                {request.reviewedDate && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Reviewed: {new Date(request.reviewedDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              {request.notes && (
                <Alert className="mt-3">
                  <AlertDescription className="text-sm">{request.notes}</AlertDescription>
                </Alert>
              )}
            </div>
            <div className="flex gap-2 ml-4">
              <Button variant="outline" size="sm" onClick={() => onView(request)}>
                <Eye className="w-4 h-4 mr-2" />
                View
              </Button>
              {request.status === 'pending' && (
                <>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => onApprove(request)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => onReject(request)}>
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminVerification;
