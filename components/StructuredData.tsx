import { siteConfig } from '@/lib/site-config';
import skills from '@/content/data/skills.json';

type SkillEntry = { name: string };
type SkillsData = Record<string, SkillEntry[]>;

const knowsAbout = Object.values(skills as SkillsData).flatMap((group) =>
  group.map((skill) => skill.name)
);

export function StructuredData() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author.name,
    email: siteConfig.author.email,
    image: `${siteConfig.url}/opengraph-image`,
    url: siteConfig.url,
    jobTitle: 'Software Developer (Full Stack)',
    description: siteConfig.author.bio,
    worksFor: {
      '@type': 'Organization',
      name: 'Herd HR',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Singapore',
      addressCountry: 'SG',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Universiti Tun Hussein Onn Malaysia',
    },
    knowsAbout,
    sameAs: [siteConfig.author.social.github, siteConfig.author.social.linkedin].filter(Boolean),
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
