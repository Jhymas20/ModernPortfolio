'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';
import { SiriBorderCard } from '@/components/siri-border-card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { containerScrollVariants } from '@/lib/animations/scroll-animations';
import { cn } from '@/lib/utils';

// Custom Input component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = ({ className, error, ...props }: InputProps) => (
  <div className="space-y-1">
    <input
      className={cn(
        'w-full rounded-xl border border-neutral-200 bg-white/30 px-4 py-3',
        'backdrop-blur-sm text-neutral-900 placeholder:text-neutral-500',
        'transition-all duration-200 outline-none',
        'focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20',
        'dark:border-neutral-700 dark:bg-neutral-800/30 dark:text-white',
        'dark:placeholder:text-neutral-400',
        error && 'border-red-500 dark:border-red-500',
        className
      )}
      {...props}
    />
    {error && (
      <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
    )}
  </div>
);

interface TextareaWrapperProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const TextareaWrapper = ({ className, error, ...props }: TextareaWrapperProps) => (
  <div className="space-y-1">
    <Textarea
      className={cn(
        'w-full rounded-xl border border-neutral-200 bg-white/30 px-4 py-3',
        'backdrop-blur-sm text-neutral-900 placeholder:text-neutral-500',
        'transition-all duration-200 outline-none resize-none',
        'focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20',
        'dark:border-neutral-700 dark:bg-neutral-800/30 dark:text-white',
        'dark:placeholder:text-neutral-400',
        error && 'border-red-500 dark:border-red-500',
        className
      )}
      {...props}
    />
    {error && (
      <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
    )}
  </div>
);

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setErrors({});
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '');
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Message sent successfully!', {
          description: "I'll get back to you as soon as possible.",
        });
        resetForm();
      } else {
        toast.error('Failed to send message', {
          description: 'Please try emailing me directly.',
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Network error', {
        description: 'Please try again or email me directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <SiriBorderCard>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerScrollVariants}
        className="rounded-3xl border border-neutral-200 bg-gradient-to-b from-white to-neutral-50 p-8 shadow-lg dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950"
      >
        <div className="mb-6 space-y-2">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Send a Message
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Fill out the form below and I'll get back to you soon
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              disabled={isSubmitting}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              disabled={isSubmitting}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
          </div>

          {/* Subject Field */}
          <div>
            <label htmlFor="subject" className="sr-only">
              Subject
            </label>
            <Input
              id="subject"
              name="subject"
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              error={errors.subject}
              disabled={isSubmitting}
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? 'subject-error' : undefined}
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <TextareaWrapper
              id="message"
              name="message"
              placeholder="Your message..."
              rows={6}
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
              disabled={isSubmitting}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-cyan-500 text-white transition-all hover:bg-cyan-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-cyan-400 dark:text-neutral-900 dark:hover:bg-cyan-500"
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </motion.div>
    </SiriBorderCard>
  );
}
