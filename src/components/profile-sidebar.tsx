'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin, Dribbble, Instagram } from 'lucide-react';
import Image from 'next/image';
import { SiriBorderCard } from './siri-border-card';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 448 512" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M448 209.6c-31.4 0-61.3-10-86.1-27.1v122.8c0 113.1-122.1 176-216.4 121.1-62.1-36.4-84.7-115.7-48.3-177.8 27-46.1 77.3-73 130.2-67.4v86.5c-16.7-5.4-35.3 2.1-43.2 17.9-12.5 24.6 5.7 53.6 33.2 53.6 19.3 0 35-15.7 35-35V0h84.3c4.4 55.2 45.1 100.4 99 110.7z"
    />
  </svg>
);

export function ProfileSidebar() {
  const profile = {
    name: 'Jordan Hymas',
    title: 'Full Stack Developer',
    avatar: '/profil-raph.png',
    email: 'jordanhymas24@gmail.com',
    location: 'Idaho, USA',
    availableForWork: true,
    socialLinks: [
      { icon: Github, url: 'https://github.com/Jhymas20', label: 'GitHub' },
      { icon: TikTokIcon, url: 'https://www.tiktok.com/@node.io', label: 'TikTok' },
      { icon: Linkedin, url: 'https://www.linkedin.com/in/jordan-hymas/', label: 'LinkedIn' },
      { icon: Instagram, url: 'https://www.instagram.com/jordan.hymas/', label: 'Instagram' },
      { icon: Dribbble, url: '/fun', label: 'Fun' },
    ],
  };

  return (
    <SiriBorderCard className="sticky top-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="h-fit rounded-3xl border border-neutral-200 bg-gradient-to-b from-white to-neutral-50 p-8 shadow-lg dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950 dark:shadow-none"
      >
      {/* Profile Image */}
      <div className="relative mx-auto mb-6 h-40 w-40">
        <div className="relative h-full w-full overflow-hidden rounded-3xl border-4 border-neutral-200 dark:border-neutral-800">
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={160}
            height={160}
            className="h-full w-full object-cover"
          />
        </div>
        {/* Online Status Indicator */}
        {profile.availableForWork && (
          <div className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-4 border-white bg-green-500 dark:border-neutral-900" />
        )}
      </div>

      {/* Name and Title */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">{profile.name}</h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{profile.title}</p>
      </div>

      {/* Contact Info */}
      <div className="mb-8 space-y-4">
        {/* Email */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800">
            <Mail className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
              Email
            </p>
            <p className="truncate text-sm text-neutral-700 dark:text-neutral-300">{profile.email}</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800">
            <MapPin className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
              Location
            </p>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">{profile.location}</p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex flex-wrap justify-center gap-3 border-t border-neutral-200 pt-6 dark:border-neutral-800">
        {profile.socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-neutral-100 p-2 text-neutral-600 transition-all hover:bg-neutral-200 hover:text-neutral-900 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white"
            aria-label={link.label}
          >
            <link.icon className="h-5 w-5" />
          </a>
        ))}
      </div>
      </motion.div>
    </SiriBorderCard>
  );
}
