import { useState, useMemo } from 'react';
import { useLocation, useRoute } from 'wouter';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function CustomizePackage() {
  const [location, setLocation] = useLocation();
  const [match, params] = useRoute('/customize-package/:packageId');
  const packageId = params?.packageId;

  const [guestCount, setGuestCount] = useState(20);
  const [selections, setSelections] = useState<Array<{ category: string; itemName: string }>>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    venue: '',
    specialRequirements: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: pkg, isLoading: pkgLoading } = trpc.packages.getPackage.useQuery(
    { packageId: packageId || '' },
    { enabled: !!packageId }
  );

  const createCheckout = trpc.packages.createCheckoutSession.useMutation();

  // Calculate total price
  const totalPrice = useMemo(() => {
    if (!pkg) return 0;
    if (pkg.priceType === 'perPerson') {
      return (pkg.priceGBP * guestCount).toFixed(2);
    }
    return pkg.priceGBP.toFixed(2);
  }, [pkg, guestCount]);

  const handleAddSelection = (category: string, itemName: string) => {
    const rule = pkg?.selectionRules?.[category as keyof typeof pkg.selectionRules] as any;
    if (!rule) return;

    const categorySelections = selections.filter(s => s.category === category);
    if (categorySelections.length >= rule.maxChoices) {
      toast.error(`You can only choose ${rule.maxChoices} ${category}`);
      return;
    }

    if (selections.some(s => s.category === category && s.itemName === itemName)) {
      toast.error('This item is already selected');
      return;
    }

    setSelections([...selections, { category, itemName }]);
    toast.success(`Added ${itemName}`);
  };

  const handleRemoveSelection = (index: number) => {
    const removed = selections[index];
    setSelections(selections.filter((_, i) => i !== index));
    toast.success(`Removed ${removed.itemName}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerInfo.name || !customerInfo.email) {
      toast.error('Please fill in your name and email');
      return;
    }

    const minGuests = (pkg as any).minimumGuests || 1;
    if (guestCount < minGuests) {
      toast.error(`Minimum ${minGuests} guests required for this package`);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createCheckout.mutateAsync({
        packageId: packageId || '',
        guestCount,
        selections,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        eventDate: customerInfo.eventDate,
        venue: customerInfo.venue,
        specialRequirements: customerInfo.specialRequirements,
      });

      if (result.url) {
        window.open(result.url, '_blank');
        toast.success('Redirecting to checkout...');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to create checkout session');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!match || !packageId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Package not found</div>
      </div>
    );
  }

  if (pkgLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={32} />
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Package not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => setLocation('/packages')}
          className="flex items-center gap-2 text-accent hover:text-yellow-500 transition-colors mb-8"
        >
          <ChevronLeft size={20} />
          Back to Packages
        </button>

        {/* Package Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">{pkg.name}</h1>
          <p className="text-xl text-foreground/80">{pkg.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Guest Count */}
            <Card className="bg-card border-accent/20">
              <CardHeader>
                <CardTitle className="text-foreground">Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">
                    Number of Guests {pkg.priceType === 'perPerson' && '(affects price)'}
                  </label>
                  <input
                    type="number"
                    min={(pkg as any).minimumGuests || 1}
                    value={guestCount}
                    onChange={(e) => setGuestCount(Math.max((pkg as any).minimumGuests || 1, parseInt(e.target.value) || 1))}
                    className="w-full px-4 py-2 bg-background border border-accent/20 rounded-lg text-foreground focus:outline-none focus:border-accent"
                  />
                  {(pkg as any).minimumGuests && (
                    <p className="text-sm text-accent mt-2">Minimum {(pkg as any).minimumGuests} guests required</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Your Name *</label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-accent/20 rounded-lg text-foreground focus:outline-none focus:border-accent"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-accent/20 rounded-lg text-foreground focus:outline-none focus:border-accent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-accent/20 rounded-lg text-foreground focus:outline-none focus:border-accent"
                    placeholder="07700 000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Event Date</label>
                  <input
                    type="date"
                    value={customerInfo.eventDate}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, eventDate: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-accent/20 rounded-lg text-foreground focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Venue</label>
                  <input
                    type="text"
                    value={customerInfo.venue}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, venue: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-accent/20 rounded-lg text-foreground focus:outline-none focus:border-accent"
                    placeholder="The Grand Hotel, London"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Special Requirements</label>
                  <textarea
                    value={customerInfo.specialRequirements}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, specialRequirements: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-accent/20 rounded-lg text-foreground focus:outline-none focus:border-accent"
                    placeholder="Any dietary requirements, allergies, or special requests..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Menu Selections */}
            {Object.keys(pkg.selectionRules || {}).length > 0 && (
              <Card className="bg-card border-accent/20">
                <CardHeader>
                  <CardTitle className="text-foreground">Customize Your Menu</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(pkg.selectionRules || {}).map(([category, rule]: any) => {
                    const menuItems = pkg.menuOptions?.[category as keyof typeof pkg.menuOptions] || [];
                    const categorySelections = selections.filter(s => s.category === category);

                    return (
                      <div key={category}>
                        <h3 className="text-lg font-bold text-foreground mb-2 capitalize">
                          {category.replace(/([A-Z])/g, ' $1')} (Choose up to {rule.maxChoices})
                        </h3>
                        <div className="space-y-2 mb-4">
                          {menuItems.map((item: string) => (
                            <button
                              key={item}
                              onClick={() => handleAddSelection(category, item)}
                              disabled={categorySelections.length >= rule.maxChoices && !categorySelections.some(s => s.itemName === item)}
                              className="w-full text-left px-4 py-2 bg-background border border-accent/20 rounded-lg text-foreground hover:border-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {item}
                            </button>
                          ))}
                        </div>

                        {categorySelections.length > 0 && (
                          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                            <p className="text-sm font-bold text-foreground mb-2">Selected:</p>
                            <div className="space-y-1">
                              {categorySelections.map((sel, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between text-sm text-foreground"
                                >
                                  <span>{sel.itemName}</span>
                                  <button
                                    onClick={() => handleRemoveSelection(selections.indexOf(sel))}
                                    className="text-accent hover:text-yellow-500 text-xs"
                                  >
                                    Remove
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-accent/20 sticky top-8">
              <CardHeader>
                <CardTitle className="text-foreground">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Fixed Inclusions */}
                <div>
                  <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2">Includes</p>
                  <ul className="space-y-1">
                    {pkg.includesFixed.map((item, idx) => (
                      <li key={idx} className="text-sm text-foreground/80">• {item}</li>
                    ))}
                  </ul>
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-accent/20 pt-4">
                  <div className="space-y-2 mb-4">
                    {pkg.priceType === 'perPerson' ? (
                      <>
                        <div className="flex justify-between text-sm text-foreground/80">
                          <span>£{pkg.priceGBP} × {guestCount} guests</span>
                          <span>£{(pkg.priceGBP * guestCount).toFixed(2)}</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between text-sm text-foreground/80">
                        <span>Flat Rate</span>
                        <span>£{pkg.priceGBP.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-accent/20 pt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-accent">£{totalPrice}</span>
                  </div>
                </div>

                {/* Bonus Info */}
                {(pkg as any).bonus && (
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 text-sm text-foreground">
                    <p className="font-bold mb-1">💡 Bonus Offer</p>
                    <p>{(pkg as any).bonus.note}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !customerInfo.name || !customerInfo.email}
                  className="w-full bg-accent text-foreground px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Processing...
                    </>
                  ) : (
                    'Proceed to Payment'
                  )}
                </button>

                <p className="text-xs text-foreground/60 text-center">
                  You'll be redirected to secure checkout
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
