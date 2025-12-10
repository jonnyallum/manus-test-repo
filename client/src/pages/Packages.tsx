import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowRight, Flame, Pizza, Wine, Utensils, Check } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';

export default function Packages() {
  const [, setLocation] = useLocation();
  const { data: packages, isLoading } = trpc.packages.list.useQuery();

  const getIcon = (type: string) => {
    switch (type) {
      case 'hogRoast':
        return <Flame className="w-8 h-8 text-accent" />;
      case 'pizza':
        return <Pizza className="w-8 h-8 text-accent" />;
      case 'buffet':
        return <Utensils className="w-8 h-8 text-accent" />;
      case 'bar':
        return <Wine className="w-8 h-8 text-accent" />;
      default:
        return null;
    }
  };

  const groupedPackages = packages?.reduce((acc, pkg) => {
    if (!acc[pkg.type]) {
      acc[pkg.type] = [];
    }
    acc[pkg.type].push(pkg);
    return acc;
  }, {} as Record<string, typeof packages>) || {};

  const typeLabels: Record<string, string> = {
    hogRoast: 'Hog Roast',
    pizza: 'Wood-Fired Pizza',
    buffet: 'Buffets & Catering',
    bar: 'Mobile Bar',
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading packages...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our <span className="text-accent">Packages</span>
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Choose from our carefully curated packages, each designed to delight your guests. Customize your selections and pay securely online.
          </p>
        </div>
      </section>

      {/* Packages by Type */}
      {Object.entries(groupedPackages).map(([type, typedPackages]) => (
        <section key={type} className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            {/* Type Header */}
            <div className="flex items-center gap-4 mb-12">
              {getIcon(type)}
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {typeLabels[type]}
              </h2>
            </div>

            {/* Package Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {typedPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-card border border-accent/20 rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 flex flex-col"
                >
                  {/* Card Header */}
                  <div className="p-6 border-b border-accent/20">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {pkg.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-accent">
                        £{pkg.priceGBP}
                      </span>
                      <span className="text-foreground/60">
                        {pkg.priceType === 'perPerson' ? 'per person' : 'flat rate'}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-grow flex flex-col">
                    <p className="text-foreground/80 mb-6">
                      {pkg.description}
                    </p>

                    {/* Fixed Inclusions */}
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-accent uppercase tracking-widest mb-3">
                        Includes
                      </h4>
                      <ul className="space-y-2">
                        {pkg.includesFixed.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-foreground/80 text-sm">
                            <Check size={16} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Selection Rules */}
                    {Object.keys(pkg.selectionRules || {}).length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-bold text-accent uppercase tracking-widest mb-3">
                          Customize
                        </h4>
                        <ul className="space-y-1 text-foreground/80 text-sm">
                          {Object.entries(pkg.selectionRules || {}).map(([category, rule]: any) => (
                            <li key={category}>
                              Choose {rule.maxChoices} {category.replace(/([A-Z])/g, ' $1').toLowerCase()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Bonus Info */}
                    {(pkg as any).bonus && (
                      <div className="mb-6 p-3 bg-accent/10 rounded-lg border border-accent/20">
                        <p className="text-sm text-foreground">
                          <strong>Bonus:</strong> {(pkg as any).bonus.note}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <div className="p-6 border-t border-accent/20">
                    <button
                      onClick={() => setLocation(`/customize-package/${pkg.id}`)}
                      className="w-full bg-accent text-foreground px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
                    >
                      Customize & Order <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Need Something Custom?
          </h2>
          <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            If you don't see exactly what you're looking for, get in touch with us to discuss bespoke packages tailored to your event.
          </p>
          <Link href="/book">
            <a className="inline-flex items-center gap-2 bg-accent text-foreground px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors">
              Request Custom Package <ArrowRight size={24} />
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
