import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

/**
 * Services Page
 * Rustic Carnival Energy Design: Detailed service cards with benefits and use cases
 */
export default function Services() {
  const services = [
    {
      id: 'hog-roast',
      title: 'Hog Roast Catering',
      image: 'https://i.ibb.co/qMSRSRkN/IMG-20240930-WA0005.jpg',
      description: 'Our hog roasts are the centrepiece your guests won\'t forget. Slow-roasted pork with golden crackling, carved fresh on site and served with all the trimmings. Ideal for any celebration.',
      benefits: [
        'Slow-roasted to perfection',
        'Carved fresh on site',
        'Impressive visual centrepiece',
        'Scalable for any group size',
        'Rustic, authentic flavour',
      ],
      idealFor: [
        'Weddings',
        'Private parties',
        'Outdoor events',
        'Corporate celebrations',
        'Festivals',
        'Community gatherings',
      ],
    },
    {
      id: 'pizza',
      title: 'Wood-Fired Pizza Van',
      image: 'https://i.ibb.co/SwpMn1w5/FB-IMG-1735962615953.jpg',
      description: 'Hand-stretched dough, fresh toppings, wood-fired flavour — our mobile pizza van brings a slice of Italy straight to your event. Fast, fun and crowd-pleasing.',
      benefits: [
        'Hand-stretched dough',
        'Fresh, quality toppings',
        'Authentic wood-fired taste',
        'Mobile and flexible',
        'High-volume capacity',
        'Interactive and engaging',
      ],
      idealFor: [
        'Wedding evening food',
        'Staff parties',
        'Birthdays & garden parties',
        'Festivals',
        'Corporate events',
        'Casual celebrations',
      ],
    },
    {
      id: 'bar',
      title: 'Mobile Bar Hire',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/117900797/CXkmBIocJqdbUFOm.jpg',
      description: 'A fully stocked mobile bar wherever you need it. From cocktails and craft beers to fizz and spirits, our bar team keep the drinks flowing and the atmosphere perfect.',
      benefits: [
        'Fully stocked selection',
        'Professional bar team',
        'Custom cocktails available',
        'Flexible setup options',
        'Keeps atmosphere lively',
        'Stress-free service',
      ],
      idealFor: [
        'Weddings',
        'Corporate functions',
        'Launch events',
        'Christmas parties',
        'Summer celebrations',
        'Awards nights',
      ],
    },
    {
      id: 'catering',
      title: 'Canapés, Buffets & Grazing Boards',
      image: 'https://i.ibb.co/Z1VSKyL4/Screenshot-20250104-030214-Gallery.jpg',
      description: 'From elegant canapés to generous buffets and show-stopping grazing tables, we create displays that look incredible and taste even better.',
      benefits: [
        'Visually stunning displays',
        'Encourages mingling',
        'Wide variety of options',
        'Customisable menus',
        'Professional presentation',
        'Dietary accommodations',
      ],
      idealFor: [
        'Grazing tables with cheeses, meats, dips & fruits',
        'Cold buffets for corporate & private events',
        'Funeral reception buffets',
        'Wedding canapés & sharing boards',
        'Networking events',
        'Intimate gatherings',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="bg-card text-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-accent">Catering Services</span>
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            We tailor every menu and setup to your event, venue and guests. No templates. No stress. Just great food delivered with pride.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {services.map((service, index) => (
            <div key={service.id} id={service.id} className="mb-24 last:mb-0">
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Image */}
                <div className={`order-2 md:order-${index % 2 === 1 ? '1' : '2'}`}>
                  <div className="relative overflow-hidden rounded-xl shadow-lg h-80 md:h-96">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`order-1 md:order-${index % 2 === 1 ? '2' : '1'}`}>
                  <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Benefits */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-foreground mb-4">Key Benefits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {service.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle size={20} className="text-accent flex-shrink-0 mt-1" />
                          <span className="text-foreground/80">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ideal For */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-foreground mb-4">Perfect For</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.idealFor.map((item, i) => (
                        <span 
                          key={i}
                          className="px-4 py-2 bg-accent/10 text-foreground rounded-full text-sm font-medium border border-accent/30"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Order Now Button */}
                  <Link href="/packages">
                    <a className="inline-flex items-center gap-2 bg-accent text-foreground px-8 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors">
                      Order Now <ArrowRight size={20} />
                    </a>
                  </Link>
                </div>
              </div>

              {/* Divider */}
              {index < services.length - 1 && (
                <div className="my-16 border-t-2 border-accent/20"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Personal Chef Services */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Personal Chef Services
            </h2>
            <p className="text-xl text-foreground/80 leading-relaxed mb-6 max-w-2xl">
              Restaurant-quality food delivered to your home. Whether you need weekly prep meals, a family feast or an intimate private dining experience, we bring the flavour without the fuss.
            </p>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl">
              Great for busy families, birthdays, anniversaries and at-home celebrations.
            </p>
            <Link href="/packages">
              <a className="inline-flex items-center gap-2 bg-accent text-foreground px-8 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors">
                Order Now <ArrowRight size={20} />
              </a>
            </Link>
          </div>

          {/* Yorkshire Pudding Wrap Image */}
          <div className="relative overflow-hidden rounded-xl shadow-lg h-96 md:h-[500px]">
            <img 
              src="https://i.ibb.co/4ggXdFfr/yorkshire-pudding-wraps-little-jonnys-emsworth-catering.jpg" 
              alt="Yorkshire Pudding Wraps - Little Jonnys Catering"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <p className="text-white font-semibold text-lg">Signature Yorkshire Pudding Wraps</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Book?
          </h2>
          <p className="text-xl text-foreground/80 mb-8">
            Contact us to discuss your event and get a tailored quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:07723959178"
              className="inline-flex items-center justify-center gap-2 bg-accent text-foreground px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors"
            >
              Call: 07723 959178
            </a>
            <a 
              href="mailto:info@littlejonnys.co.uk"
              className="inline-flex items-center justify-center gap-2 bg-card text-accent px-8 py-4 rounded-lg font-bold text-lg hover:bg-card/90 transition-colors"
            >
              Email: info@littlejonnys.co.uk
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
