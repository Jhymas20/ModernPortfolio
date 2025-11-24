'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CollapsibleSection } from '../CollapsibleSection';

// You can add your photos here
const GALLERY_PHOTOS = [
  {
    src: '/gallery1.jpg',
    alt: 'Gallery photo 1',
  },
  {
    src: '/gallery2.jpg',
    alt: 'Gallery photo 2',
  },
  {
    src: '/gallery3.jpg',
    alt: 'Gallery photo 3',
  },
  // Add more photos as needed
];

export function PhotosContent() {
  return (
    <div className="h-full w-full overflow-y-auto bg-[#f5f4f0] dark:bg-[#1D1D1F]">
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
          <div className="grid grid-cols-2 gap-4">
            {GALLERY_PHOTOS.map((photo, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg border border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}
