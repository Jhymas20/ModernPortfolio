'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CollapsibleSection } from '../CollapsibleSection';
import { X } from 'lucide-react';

// Gallery photos from public/Projects/Gallery with varying sizes
const GALLERY_PHOTOS = [
  {
    src: '/Projects/Gallery/hawaii.webp',
    alt: 'Hawaii',
    size: 'xlarge', // 3x2
  },
  {
    src: '/Projects/Gallery/red.webp',
    alt: 'Red',
    size: 'wide', // 2x1
  },
  {
    src: '/Projects/Gallery/leaf.webp',
    alt: 'Leaf',
    size: 'small', // 1x1
  },
  {
    src: '/Projects/Gallery/wallaBoys.webp',
    alt: 'Walla Boys',
    size: 'small', // 1x1
  },
  {
    src: '/Projects/Gallery/bamJam.webp',
    alt: 'Bam Jam',
    size: 'large', // 2x2
  },
  {
    src: '/Projects/Gallery/notSure.webp',
    alt: 'Adventure',
    size: 'tall', // 1x2
  },
  {
    src: '/Projects/Gallery/treeHouse.webp',
    alt: 'Tree House',
    size: 'wide', // 2x1
  },
  {
    src: '/Projects/Gallery/snow.webp',
    alt: 'Snow',
    size: 'small', // 1x1
  },
  {
    src: '/Projects/Gallery/21.webp',
    alt: '21',
    size: 'large', // 2x2
  },
  {
    src: '/Projects/Gallery/lcsc.webp',
    alt: 'LCSC',
    size: 'wide', // 2x1
  },
  {
    src: '/Projects/Gallery/walla1.webp',
    alt: 'Walla 1',
    size: 'small', // 1x1
  },
  {
    src: '/Projects/Gallery/walla2.webp',
    alt: 'Walla 2',
    size: 'small', // 1x1
  },
  {
    src: '/Projects/Gallery/wallaLast.webp',
    alt: 'Walla Last',
    size: 'tall', // 1x2
  },
  {
    src: '/Projects/Gallery/wallaWalla.webp',
    alt: 'Walla Walla',
    size: 'small', // 1x1
  },
];

export function PhotosContent() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  return (
    <div className="relative h-full w-full overflow-y-auto bg-[#f5f4f0] dark:bg-[#1D1D1F]">
      <div className="p-6 space-y-4">
        {/* Header with thumbnail and title */}
        <div className="flex items-start gap-4 border-b border-neutral-300 pb-4 dark:border-neutral-700">
          {/* Photos Icon */}
          <div className="flex-shrink-0">
            <div className="relative h-16 w-16 overflow-hidden rounded-lg border-2 border-neutral-300 dark:border-neutral-600">
              <Image
                src="/photoPortfolio.avif"
                alt="Photos"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Title and subtitle */}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              Gallery
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Lowkey documentation
            </p>
          </div>
        </div>

        {/* Preview Section */}
        <CollapsibleSection title="Preview:" defaultOpen={true}>
          <div className="grid grid-cols-4 auto-rows-[200px] gap-4">
            {GALLERY_PHOTOS.map((photo, index) => {
              // Determine grid span based on size
              const sizeClasses = {
                xlarge: 'col-span-2 row-span-3', // 2x3 - Extra large
                large: 'col-span-2 row-span-2',  // 2x2 - Large
                wide: 'col-span-2 row-span-1',   // 2x1 - Wide
                tall: 'col-span-1 row-span-2',   // 1x2 - Tall
                small: 'col-span-1 row-span-1',  // 1x1 - Small
              };

              return (
                <div
                  key={index}
                  onClick={() => setSelectedImage({ src: photo.src, alt: photo.alt })}
                  className={`relative overflow-hidden rounded-lg border border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 cursor-pointer ${sizeClasses[photo.size as keyof typeof sizeClasses]}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              );
            })}
          </div>
        </CollapsibleSection>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-8"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/20 p-2 text-white hover:bg-white/30 transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Full Size Image Container */}
          <div
            className="relative flex items-center justify-center w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={800}
              height={800}
              className="object-contain rounded-lg"
              style={{ maxHeight: '70vh', maxWidth: '80%' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
