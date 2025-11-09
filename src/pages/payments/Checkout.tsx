import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatINR } from '@/utils/formatINR';

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

const PaymentCheckout = () => {
  const navigate = useNavigate();
  const q = useQuery();

  const type = q.get('type') || 'plan';
  const planId = q.get('planId') || '';
  const name = q.get('name') || '';
  const tier = q.get('tier') || '';
  const role = q.get('role') || '';
  const price = Number(q.get('price') || 0);
  const consultantId = q.get('consultantId') || '';
  const consultantName = q.get('consultantName') || '';
  const date = q.get('date') || '';
  const time = q.get('time') || '';
  const duration = q.get('duration') || '';

  useEffect(() => {
    if (!planId) return;
    // Prefetch Razorpay script here if needed later
  }, [planId]);

  const proceedToPayment = async () => {
    // Placeholder: Here we would call backend to create an order and open Razorpay
    // For now, just show a simple flow and keep navigation controlled
    // navigate to an external Razorpay page would require an order id.
    // We'll keep this page as the single entry for payment.
    alert('Payment flow initialization placeholder. Hook Razorpay here.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Checkout</CardTitle>
              {type === 'plan' && tier && <Badge variant="outline" className="capitalize">{tier}</Badge>}
              {type === 'session' && <Badge variant="outline">Session</Badge>}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {type === 'plan' ? (
              <>
                <div className="text-sm text-gray-600">Plan</div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold">{name || planId}</div>
                    <div className="text-sm text-gray-500 capitalize">For {role || 'consultant'}</div>
                  </div>
                  <div className="text-2xl font-bold">{price > 0 ? formatINR(price) : 'Free'}</div>
                </div>
              </>
            ) : (
              <>
                <div className="text-sm text-gray-600">Consultation</div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold">{consultantName || 'Consultant'}</div>
                    <div className="text-sm text-gray-500">{date} at {time} • {duration} mins</div>
                  </div>
                  <div className="text-2xl font-bold">{formatINR(price)}</div>
                </div>
              </>
            )}

            <div className="pt-6 flex items-center justify-end gap-3">
              <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
              <Button onClick={proceedToPayment} className="bg-black hover:bg-gray-900">Proceed to Payment • {formatINR(price)}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentCheckout;
