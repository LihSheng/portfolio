'use client';

import ContactForm from '@/components/ContactForm';
import { siteConfig } from '@/lib/site-config';

export function ContactPageContent() {
  const email = siteConfig.author.email;

  return (
    <div>
      <section className="flex flex-col gap-5 py-16 sm:py-20">
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl">Contact</h1>
        <p className="max-w-[560px] text-[17px] leading-relaxed text-body-secondary">
          Email is best. I usually reply within a day or two. You can also find me on{' '}
          <a href={siteConfig.author.social.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>{' '}
          and{' '}
          <a href={siteConfig.author.social.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          .
        </p>
        <a
          href={`mailto:${email}`}
          className="self-start font-serif text-[30px] decoration-1 underline-offset-[6px]"
        >
          {email}
        </a>
      </section>

      <ContactForm />
    </div>
  );
}
