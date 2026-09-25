import { Metadata } from 'next';
import Link from 'next/link';
import { getFeaturedProjects } from '@/lib/content';
import { getFeatureFlags } from '@/lib';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Home',
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

const atAGlance: Array<{ label: string; value: string }> = [
  {
    label: 'Now',
    value: 'Software Developer (Full Stack) at Herd HR, Singapore, since July 2025',
  },
  {
    label: 'Experience',
    value: 'Professional since 2021: XeerSoft, AYP Group, Herd HR',
  },
  {
    label: 'Core stack',
    value: 'React, TypeScript, Angular, Laravel, PostgreSQL, Python',
  },
  {
    label: 'Also',
    value: 'Next.js, AWS, Jest, Cypress, CI/CD, n8n, LLM tooling and agents',
  },
  {
    label: 'Education',
    value: 'BSc Software Engineering, first class honours, Universiti Tun Hussein Onn Malaysia',
  },
];

export default async function Home() {
  const flags = getFeatureFlags();
  const featuredProjects = flags.projects ? await getFeaturedProjects() : [];
  const shownProjects = featuredProjects.slice(0, 4);

  return (
    <div className="flex flex-col">
      <section className="flex flex-col gap-7 py-24 sm:py-16">
        <h1 className="max-w-[640px] font-serif text-4xl leading-[1.1] tracking-[-0.01em] sm:text-[52px]">
          {siteConfig.name}, full-stack software developer in Singapore.
        </h1>
        <p className="max-w-[600px] text-lg leading-relaxed text-body-secondary">
          I build enterprise web, analytics and agentic AI systems with React, TypeScript, Angular,
          Laravel, PostgreSQL and Python. Lately also LLMs, agents and low-friction automation for
          real teams.
        </p>
        <div className="flex flex-wrap gap-6 pt-1 text-[15px]">
          <Link href="/Ng-Lih-Sheng-Resume.pdf">CV (PDF)</Link>
          <a href="https://github.com/LihSheng">GitHub</a>
          <a href="https://www.linkedin.com/in/lihshengng/">LinkedIn</a>
          <Link href="/contact">Email</Link>
        </div>
      </section>

      <section className="flex flex-col">
        <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.08em] text-muted">
          At a glance
        </h2>
        {atAGlance.map((row, index) => (
          <div
            key={row.label}
            className={`grid grid-cols-1 gap-1.5 border-t border-hairline py-3.5 text-[15px] leading-relaxed sm:grid-cols-[128px_minmax(0,1fr)] sm:gap-x-6 sm:gap-y-0 ${
              index === atAGlance.length - 1 ? 'border-b' : ''
            }`}
          >
            <span className="text-muted">{row.label}</span>
            <span>{row.value}</span>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 pt-20 sm:grid-cols-[128px_minmax(0,1fr)] sm:gap-6">
        <h2 className="font-mono text-xs uppercase tracking-[0.08em] text-muted sm:pt-1">
          How I work
        </h2>
        <div className="flex flex-col gap-4 text-[17px] leading-relaxed text-ink">
          <p className="m-0">
            I like picking up a new technology early and asking one practical question: where does
            this remove friction in how a team already works? Most of what I have built outside my
            day job started there.
          </p>
          <p className="m-0">
            Over the past year that has meant teaching myself how AI agents actually work, then
            building my own harness for them. Ops Room routes tasks to coding agents and puts a
            tollgate in front of every pull request they open, with an automated review and repair
            loop before a person looks at it. Alongside that I have been learning AI-native
            development: treating the model as a component with clear boundaries, not something
            bolted on at the end.
          </p>
        </div>
      </section>

      {flags.projects && featuredProjects.length > 0 && (
        <section className="flex flex-col pt-20">
          <div className="flex items-baseline justify-between pb-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
              Selected work
            </h2>
            <Link href="/projects" className="text-sm text-muted no-underline">
              All projects
            </Link>
          </div>
          {shownProjects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={`grid grid-cols-1 gap-2 border-t border-hairline py-5 text-[15px] no-underline sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-6 ${
                index === shownProjects.length - 1 ? 'border-b' : ''
              }`}
            >
              <span className="font-mono text-[13px] text-muted sm:pt-0.5">
                {new Date(project.date).getFullYear()}
              </span>
              <span className="flex flex-col gap-1.5">
                <span className="text-[17px] font-medium">{project.title}</span>
                <span className="text-[15px] leading-relaxed text-muted">{project.description}</span>
              </span>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
