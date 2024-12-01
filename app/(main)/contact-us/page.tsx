'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ButtonWithLoading } from '@/components/ui/button-with-loading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { memo } from 'react';

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

type FormData = z.infer<typeof formSchema>;

// Memoized contact info component for better performance
const ContactInfo = memo(() => (
  <div className="flex flex-col gap-8 lg:gap-12 lg:w-2/5">
    <div className="text-center lg:text-left space-y-4">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Contact Us</h1>
      <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto lg:mx-0">
        We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!
      </p>
    </div>

    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-semibold text-center lg:text-left">Contact Details</h2>
      <ul className="space-y-3 text-sm sm:text-base" role="list">
        <li className="flex items-center gap-2">
          <span className="font-medium">Phone:</span>
          <a
            href="tel:+1234567890"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Call us at (123) 456-7890"
          >
            (123) 456-7890
          </a>
        </li>
        <li className="flex items-center gap-2">
          <span className="font-medium">Email:</span>
          <a
            href="mailto:contact@icecreamland.com"
            className="text-muted-foreground hover:text-primary transition-colors underline"
            aria-label="Email us at contact@icecreamland.com"
          >
            contact@icecreamland.com
          </a>
        </li>
        <li className="flex items-center gap-2">
          <span className="font-medium">Address:</span>
          <address className="text-muted-foreground not-italic">123 Ice Cream Street, Dessert City, DC 12345</address>
        </li>
      </ul>
    </div>
  </div>
));

ContactInfo.displayName = 'ContactInfo';

export default function ContactUs() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call with loading state
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Log form data to console (remove in production)
      console.log('Form data:', data);

      // Show success message
      toast({
        title: 'Message sent successfully!',
        description: "We'll get back to you as soon as possible.",
        variant: 'default',
      });

      // Reset form after successful submission
      reset();
    } catch (err) {
      // Show error message with specific error if available
      toast({
        title: 'Error sending message',
        description: err instanceof Error ? err.message : 'Please try again later.',
        variant: 'destructive',
      });

      // Log error for debugging (remove in production)
      console.error('Form submission error:', err);
    }
  };

  return (
    <main>
      <section className="py-8 sm:py-12 md:py-16 lg:py-20" aria-labelledby="contact-heading">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16">
            <ContactInfo />

            {/* Contact Form Section */}
            <div className="lg:w-3/5">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-card dark:bg-card rounded-lg border shadow-sm p-6 sm:p-8 space-y-6"
                noValidate
                aria-label="Contact form"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className={cn(
                        'text-foreground dark:text-slate-200',
                        errors.firstName && 'text-destructive dark:text-red-400'
                      )}
                    >
                      First Name
                      <span aria-hidden="true" className="text-destructive dark:text-red-400">
                        {' '}
                        *
                      </span>
                    </Label>
                    <Input
                      {...register('firstName')}
                      type="text"
                      id="firstName"
                      placeholder="John"
                      className={cn(
                        'bg-background dark:bg-background',
                        errors.firstName && 'border-destructive focus-visible:ring-destructive'
                      )}
                      aria-invalid={errors.firstName ? 'true' : 'false'}
                      aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                      required
                    />
                    {errors.firstName && (
                      <p id="firstName-error" className="text-sm text-destructive dark:text-red-400" role="alert">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className={cn(
                        'text-foreground dark:text-slate-200',
                        errors.lastName && 'text-destructive dark:text-red-400'
                      )}
                    >
                      Last Name
                      <span aria-hidden="true" className="text-destructive dark:text-red-400">
                        {' '}
                        *
                      </span>
                    </Label>
                    <Input
                      {...register('lastName')}
                      type="text"
                      id="lastName"
                      placeholder="Doe"
                      className={cn(
                        'bg-background dark:bg-background',
                        errors.lastName && 'border-destructive focus-visible:ring-destructive'
                      )}
                      aria-invalid={errors.lastName ? 'true' : 'false'}
                      aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                      required
                    />
                    {errors.lastName && (
                      <p id="lastName-error" className="text-sm text-destructive dark:text-red-400" role="alert">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className={cn(
                      'text-foreground dark:text-slate-200',
                      errors.email && 'text-destructive dark:text-red-400'
                    )}
                  >
                    Email
                    <span aria-hidden="true" className="text-destructive dark:text-red-400">
                      {' '}
                      *
                    </span>
                  </Label>
                  <Input
                    {...register('email')}
                    type="email"
                    id="email"
                    placeholder="john.doe@example.com"
                    className={cn(
                      'bg-background dark:bg-background',
                      errors.email && 'border-destructive focus-visible:ring-destructive'
                    )}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    required
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p id="email-error" className="text-sm text-destructive dark:text-red-400" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="subject"
                    className={cn(
                      'text-foreground dark:text-slate-200',
                      errors.subject && 'text-destructive dark:text-red-400'
                    )}
                  >
                    Subject
                    <span aria-hidden="true" className="text-destructive dark:text-red-400">
                      {' '}
                      *
                    </span>
                  </Label>
                  <Input
                    {...register('subject')}
                    type="text"
                    id="subject"
                    placeholder="How can we help you?"
                    className={cn(
                      'bg-background dark:bg-background',
                      errors.subject && 'border-destructive focus-visible:ring-destructive'
                    )}
                    aria-invalid={errors.subject ? 'true' : 'false'}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    required
                  />
                  {errors.subject && (
                    <p id="subject-error" className="text-sm text-destructive dark:text-red-400" role="alert">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className={cn(
                      'text-foreground dark:text-slate-200',
                      errors.message && 'text-destructive dark:text-red-400'
                    )}
                  >
                    Message
                    <span aria-hidden="true" className="text-destructive dark:text-red-400">
                      {' '}
                      *
                    </span>
                  </Label>
                  <Textarea
                    {...register('message')}
                    id="message"
                    placeholder="Type your message here..."
                    className={cn(
                      'h-32 bg-background dark:bg-background resize-none',
                      errors.message && 'border-destructive focus-visible:ring-destructive'
                    )}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    required
                  />
                  {errors.message && (
                    <p id="message-error" className="text-sm text-destructive dark:text-red-400" role="alert">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <ButtonWithLoading
                  type="submit"
                  size="lg"
                  className="w-full"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </ButtonWithLoading>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
