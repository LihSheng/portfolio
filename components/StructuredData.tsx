import { siteConfig } from '@/lib/site-config';

export function StructuredData() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author.name,
    email: siteConfig.author.email,
    image: siteConfig.author.avatar,
    url: siteConfig.url,
    jobTitle: 'Full Stack Developer',
    description: siteConfig.author.bio,
    sameAs: [
      siteConfig.author.social.github,
      siteConfig.author.social.linkedin,
      siteConfig.author.social.twitter,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}
