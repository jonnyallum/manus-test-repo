import { useState } from 'react';
import { X } from 'lucide-react';

/**
 * Gallery Page
 * Rustic Carnival Energy Design: Showcase event photos in a masonry grid
 * Features lightbox modal for full-size image viewing
 */
export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    { src: '/images/gallery-1.jpg', alt: 'Pizza van setup' },
    { src: '/images/gallery-2.jpg', alt: 'Catering event display' },
    { src: '/images/gallery-3.jpg', alt: 'Food presentation' },
    { src: '/images/gallery-4.jpg', alt: 'Event catering' },
    { src: '/images/gallery-5.jpg', alt: 'Outdoor catering setup' },
    { src: '/images/gallery-6.jpg', alt: 'Yorkshire pudding wraps' },
    { src: '/images/gallery-7.jpg', alt: 'Event celebration' },
    { src: '/images/gallery-8.jpg', alt: 'Food service' },
    { src: '/images/gallery-9.jpg', alt: 'Catering presentation' },
    { src: '/images/gallery-10.jpg', alt: 'Event setup' },
    { src: '/images/gallery-11.jpg', alt: 'Food display' },
    { src: '/images/gallery-12.jpg', alt: 'Catering service' },
    { src: '/images/gallery-13.jpg', alt: 'Event catering' },
    { src: '/images/gallery-14.jpg', alt: 'Beef bourguignon wedding catering' },
    { src: '/images/gallery-15.jpg', alt: 'Street food pizza' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-card to-background py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-accent mb-4">
            Our Events
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            A showcase of the celebrations, weddings, corporate events, and wakes we've catered. 
            From intimate gatherings to large-scale events, see the quality and passion we bring to every occasion.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden bg-muted">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Full size gallery image"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-accent hover:bg-accent/80 text-background p-2 rounded-full transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="bg-card py-16 md:py-20 border-t border-accent/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
            Ready to Create Your Event?
          </h2>
          <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's bring your celebration to life with the same quality and passion you see in these events.
          </p>
          <a
            href="/book"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-background font-bold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Book Your Event
          </a>
        </div>
      </section>
    </div>
  );
}
