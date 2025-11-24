import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { HomeButton } from '@/components/home-button';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jordan Hymas Portfolio',
  description:
    'Interactive portfolio with an AI-powered assistant that answers questions about my skills, projects, and experience',
  keywords: [
    'Jordan Hymas',
    'Portfolio',
    'Developer',
    'AI',
    'Interactive',
    'Web Development',
    'Full Stack',
    'Next.js',
    'React',
  ],
  authors: [
    {
      name: 'Jordan Hymas',
    },
  ],
  creator: 'Jordan Hymas',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Jordan Hymas Portfolio',
    description:
      'Interactive portfolio with an AI-powered assistant that answers questions about my skills and experience',
    siteName: 'Jordan Hymas Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jordan Hymas Portfolio',
    description:
      'Interactive portfolio with an AI-powered assistant that answers questions about my skills and experience',
  },
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        sizes: 'any',
      },
    ],
    shortcut: '/favicon.svg?v=2',
    apple: '/apple-touch-icon.svg?v=2',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body
        className={cn('bg-background min-h-screen font-sans antialiased')}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange
        >
          <ThemeToggle />
          <HomeButton />
          <main className="flex min-h-screen flex-col">{children}</main>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
