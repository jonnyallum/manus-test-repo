import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChefHat, Pizza, UtensilsCrossed, Wine, CheckCircle } from 'lucide-react'

const Packages = () => {
  const hogRoastPackages = [
    {
      id: 'standard-hog-roast',
      name: 'Standard Hog Roast',
      price: 15,
      unit: 'per person',
      description: 'Minimum 8 hour cooked hog roast with soft or crusty bread rolls, stuffing and apple sauce. Minimum 100 guests.',
      includes: [
        'Minimum 8-hour cooked hog roast',
        'Soft or crusty bread rolls',
        'Stuffing',
        'Apple sauce'
      ],
      customize: [
        'Choose 1 salads',
        'Choose 1 pasta'
      ]
    },
    {
      id: 'full-hog',
      name: 'The Full Hog',
      price: 20,
      unit: 'per person',
      description: 'Hog roast with bread rolls, roasted potatoes, stuffing and apple sauce. Extra sides included. Minimum 100 guests.',
      includes: [
        'Minimum 8-hour cooked hog roast',
        'Soft or crusty bread rolls',
        'Roasted potatoes',
        'Stuffing',
        'Apple sauce'
      ],
      customize: [
        'Choose 2 salads',
        'Choose 2 pasta'
      ]
    },
    {
      id: 'henry-viii',
      name: 'Henry VIII',
      price: 25,
      unit: 'per person',
      description: 'Premium hog roast with new potatoes, roasted potatoes, gravy, multiple salads, pasta and canapés or desserts. Minimum 100 guests.',
      includes: [
        'Minimum 8-hour cooked hog roast',
        'Soft or crusty bread rolls',
        'New potatoes tossed in butter and mustard',
        'Roasted potatoes',
        'Gravy',
        'Stuffing',
        'Apple sauce'
      ],
      customize: [
        'Choose 3 salads',
        'Choose 2 pasta',
        'Choose 2 canapes or desserts'
      ]
    }
  ]

  const pizzaPackages = [
    {
      id: 'pizza-party',
      name: 'Pizza Party',
      price: 10,
      unit: 'per person',
      description: 'Choose 2 pizzas plus garlic pizza bread. Minimum 50 guests.',
      includes: [
        'Garlic pizza bread'
      ],
      customize: [
        'Choose 2 pizzas'
      ]
    },
    {
      id: 'bill-clinton',
      name: 'The Bill Clinton',
      price: 15,
      unit: 'per person',
      description: 'Choose 3 pizzas, 1 pasta and 1 salad plus garlic pizza bread. Minimum 50 guests.',
      includes: [
        'Garlic pizza bread'
      ],
      customize: [
        'Choose 3 pizzas',
        'Choose 1 pasta',
        'Choose 1 salads'
      ]
    },
    {
      id: 'epstein-island',
      name: 'Epstein Island',
      price: 20,
      unit: 'per person',
      description: 'Choose 5 pizzas, 2 pasta dishes and 2 salads plus garlic pizza bread. Minimum 50 guests.',
      includes: [
        'Garlic pizza bread'
      ],
      customize: [
        'Choose 5 pizzas',
        'Choose 2 pasta',
        'Choose 2 salads'
      ]
    }
  ]

  const buffetPackages = [
    {
      id: 'basic-buffet',
      name: 'Basic Buffet',
      price: 10,
      unit: 'per person',
      description: 'Choose 3 sandwiches plus handmade sausage roll, crisps and 1 cake choice. Minimum 20 guests.',
      includes: [
        'Handmade sausage roll',
        'Crisps'
      ],
      customize: [
        'Choose 3 sandwiches',
        'Choose 1 cakes'
      ]
    },
    {
      id: 'party-buffet',
      name: 'Party Buffet',
      price: 12,
      unit: 'per person',
      description: 'Choose 4 sandwiches and/or rolls plus handmade sausage roll, crisps, cakes, pizza slices, spring rolls and bhajis. Minimum 20 guests.',
      includes: [
        'Handmade sausage roll',
        'Crisps',
        'Cakes (chef\'s selection)',
        'Pizza slices',
        'Spring rolls',
        'Bhajis'
      ],
      customize: [
        'Choose 4 sandwiches'
      ]
    },
    {
      id: 'banquet-buffet',
      name: 'Banquet Buffet',
      price: 15,
      unit: 'per person',
      description: 'Choose 4 from sandwiches, wraps & rolls, plus 2 cakes, 1 salad, sausage roll, crisps and fruit platter. Minimum 20 guests.',
      includes: [
        'Handmade sausage roll',
        'Crisps',
        'Fruit platter'
      ],
      customize: [
        'Choose 4 sandwiches',
        'Choose 2 cakes',
        'Choose 1 salads'
      ]
    },
    {
      id: 'corporate-buffet',
      name: 'Corporate Buffet',
      price: 20,
      unit: 'per person',
      description: 'Choose 6 from sandwiches, wraps & rolls, plus 2 cakes, 1 salad, 2 canapés, sausage roll, crisps and fruit platter. Minimum 20 guests.',
      includes: [
        'Handmade sausage roll',
        'Crisps',
        'Fruit platter'
      ],
      customize: [
        'Choose 6 sandwiches',
        'Choose 2 cakes',
        'Choose 1 salads',
        'Choose 2 canapes'
      ]
    },
    {
      id: 'elite-buffet',
      name: 'Elite Buffet',
      price: 25,
      unit: 'per person',
      description: 'Choose 8 sandwiches/wraps/rolls, 2 salads, 3 canapés and 3 cakes, plus handmade sausage roll, crisps, fruit platter and real pizza. Minimum 20 guests.',
      includes: [
        'Handmade sausage roll',
        'Crisps',
        'Fruit platter',
        'Real pizza'
      ],
      customize: [
        'Choose 8 sandwiches',
        'Choose 2 salads',
        'Choose 3 canapes',
        'Choose 3 cakes'
      ]
    }
  ]

  const mobileBar = {
    id: 'mobile-bar',
    name: 'Fully Stocked Bar',
    price: 250,
    unit: 'flat rate',
    description: 'Selection of alcoholic and non-alcoholic drinks. Choose 1 lager barrel and 1 cider barrel, plus bottles, gins, whiskies etc.',
    includes: [
      'Selection of alcoholic and non-alcoholic beverages',
      'Bottled beers',
      'Gins, whiskies, spirits & mixers'
    ],
    customize: [
      'Choose 1 lager barrel',
      'Choose 1 cider barrel'
    ],
    bonus: 'If the bar takes over £1000, £250 is refunded after the event.'
  }

  const PackageCard = ({ pkg, icon: Icon }) => (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl font-bold">{pkg.name}</span>
          {Icon && <Icon className="h-6 w-6" />}
        </CardTitle>
        <div className="text-3xl font-bold text-orange-400">
          £{pkg.price}
          <span className="text-sm text-gray-300 ml-2">{pkg.unit}</span>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-gray-600 mb-4">{pkg.description}</p>
        
        <div className="mb-4">
          <h4 className="font-semibold text-orange-600 mb-2">INCLUDES</h4>
          <ul className="space-y-1">
            {pkg.includes.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-orange-600 mb-2">CUSTOMIZE</h4>
          <ul className="space-y-1">
            {pkg.customize.map((item, idx) => (
              <li key={idx} className="text-sm text-gray-700">{item}</li>
            ))}
          </ul>
        </div>

        {pkg.bonus && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Bonus:</strong> {pkg.bonus}
            </p>
          </div>
        )}

        <Button asChild className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
          <Link to="/booking">Customize & Order</Link>
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-orange-400">Packages</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300">
            Choose from our carefully curated packages, each designed to delight your guests. 
            Customize your selections and pay securely online.
          </p>
        </div>
      </section>

      {/* Hog Roast Packages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <ChefHat className="h-8 w-8 text-orange-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Hog Roast</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hogRoastPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} icon={ChefHat} />
            ))}
          </div>
        </div>
      </section>

      {/* Pizza Packages */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <Pizza className="h-8 w-8 text-orange-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Wood-Fired Pizza</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pizzaPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} icon={Pizza} />
            ))}
          </div>
        </div>
      </section>

      {/* Buffet Packages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <UtensilsCrossed className="h-8 w-8 text-orange-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Buffets & Catering</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {buffetPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} icon={UtensilsCrossed} />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Bar Package */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <Wine className="h-8 w-8 text-orange-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Mobile Bar</h2>
          </div>
          <div className="max-w-md mx-auto">
            <PackageCard pkg={mobileBar} icon={Wine} />
          </div>
        </div>
      </section>

      {/* Custom Package CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Something Custom?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            If you don't see exactly what you're looking for, get in touch with us to discuss 
            bespoke packages tailored to your event.
          </p>
          <Button asChild size="lg" variant="outline" className="text-orange-600 bg-white hover:bg-gray-100">
            <Link to="/contact">Request Custom Package</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Packages
