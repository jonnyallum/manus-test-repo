import { useEffect, useState } from 'react';
import { useLocation, useRoute } from 'wouter';
import { CheckCircle, Loader2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { Link } from 'wouter';

export default function OrderSuccess() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute('/order-success?order_id=:orderId');
  const orderId = params?.orderId ? parseInt(params.orderId) : null;

  // Get orderId from URL query params
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const queryOrderId = searchParams.get('order_id') ? parseInt(searchParams.get('order_id')!) : null;

  const { data: order, isLoading } = trpc.packages.getOrder.useQuery(
    { orderId: queryOrderId || 0 },
    { enabled: !!queryOrderId }
  );

  if (!match || !queryOrderId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Order not found</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={32} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Order not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <CheckCircle size={64} className="text-accent" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-foreground/80 mb-2">
            Thank you for your order, {order.customerName}!
          </p>
          <p className="text-foreground/60">
            A confirmation email has been sent to {order.customerEmail}
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-card border border-accent/20 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Order Details</h2>

          <div className="space-y-4 mb-6 pb-6 border-b border-accent/20">
            <div className="flex justify-between">
              <span className="text-foreground/80">Order ID:</span>
              <span className="text-foreground font-bold">#{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/80">Package:</span>
              <span className="text-foreground font-bold">{order.packageName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/80">Guests:</span>
              <span className="text-foreground font-bold">{order.guestCount}</span>
            </div>
            {order.eventDate && (
              <div className="flex justify-between">
                <span className="text-foreground/80">Event Date:</span>
                <span className="text-foreground font-bold">{order.eventDate}</span>
              </div>
            )}
            {order.venue && (
              <div className="flex justify-between">
                <span className="text-foreground/80">Venue:</span>
                <span className="text-foreground font-bold">{order.venue}</span>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-foreground">Total Paid:</span>
            <span className="text-3xl font-bold text-accent">
              £{(order.totalAmountPence / 100).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Menu Selections */}
        {order.items && order.items.length > 0 && (
          <div className="bg-card border border-accent/20 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Your Selections</h2>

            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <div>
                    <p className="text-foreground font-medium">{item.itemName}</p>
                    <p className="text-sm text-foreground/60 capitalize">
                      {item.category.replace(/([A-Z])/g, ' $1')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Special Requirements */}
        {order.specialRequirements && (
          <div className="bg-card border border-accent/20 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Special Requirements</h2>
            <p className="text-foreground/80">{order.specialRequirements}</p>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">What's Next?</h2>
          <ul className="space-y-3 text-foreground/80">
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold mt-1">1.</span>
              <span>We'll review your order and confirm all details within 24 hours</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold mt-1">2.</span>
              <span>You'll receive a confirmation email with final arrangements</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold mt-1">3.</span>
              <span>We'll be in touch to discuss any final details closer to your event</span>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="bg-card border border-accent/20 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Questions?</h2>
          <p className="text-foreground/80 mb-4">
            If you have any questions about your order, please don't hesitate to get in touch:
          </p>
          <div className="space-y-2">
            <p className="text-foreground">
              <strong>Phone:</strong> 07723 959178
            </p>
            <p className="text-foreground">
              <strong>Email:</strong> jonny@littlejonnys.co.uk
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <a className="inline-flex items-center justify-center px-8 py-4 bg-accent text-foreground rounded-lg font-bold hover:bg-yellow-500 transition-colors">
              Back to Home
            </a>
          </Link>
          <Link href="/packages">
            <a className="inline-flex items-center justify-center px-8 py-4 bg-card border border-accent/30 text-foreground rounded-lg font-bold hover:border-accent transition-colors">
              Browse More Packages
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
