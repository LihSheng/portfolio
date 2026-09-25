import { ProfilePicture } from '@/components/ProfilePicture';
import { siteConfig } from '@/lib/site-config';
import type { ExperienceData, SkillCategory } from '@/types';

import skillsData from '@/content/data/skills.json';
import experienceData from '@/content/data/experience.json';

function yearOf(date: string): string {
  return date.split('-')[0];
}

function formatDateRange(startDate: string, endDate: string | null): string {
  const start = yearOf(startDate);
  const end = endDate ? yearOf(endDate) : 'now';
  return `${start} to ${end}`;
}

// AI-and-automation tools live under `tools` in skills.json alongside testing
// tools; split that group between the two sections shown on the page.
const AI_AUTOMATION_TOOLS = new Set([
  'n8n',
  'Codex',
  'OpenClaw',
  'LoRA Fine-Tuning',
  'Kiro',
  'Figma',
]);

function names(items: { name: string }[]): string {
  return items.map((item) => item.name).join(', ');
}

export default function AboutContent() {
  const skills = skillsData as SkillCategory;
  const experience = experienceData as ExperienceData;

  const testingTools = (skills.tools || []).filter((tool) => !AI_AUTOMATION_TOOLS.has(tool.name));
  const aiTools = (skills.tools || []).filter((tool) => AI_AUTOMATION_TOOLS.has(tool.name));

  const toolGroups: Array<{ label: string; value: string }> = [
    { label: 'Frontend', value: names(skills.frontend || []) },
    {
      label: 'Backend',
      value: names([...(skills.backend || []), ...(skills.database || [])]),
    },
    { label: 'Cloud', value: names(skills.cloud || []) },
    { label: 'Testing', value: names(testingTools) },
    { label: 'AI and automation', value: names(aiTools) },
  ];

  return (
    <div className="flex flex-col">
      <section className="grid grid-cols-1 gap-6 py-20 sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-8">
        <ProfilePicture size={96} priority />
        <div className="flex flex-col gap-5">
          <h1 className="font-serif text-4xl leading-[1.1]">About</h1>
          <p className="m-0 text-lg leading-relaxed text-ink">
            I am a software developer focused on enterprise web applications, workflow automation
            and practical AI-driven tools. I build with TypeScript, PHP, React, Next.js, Laravel and
            AWS.
          </p>
          <p className="m-0 text-lg leading-relaxed text-body-secondary">
            I enjoy turning business processes into reliable software, whether that means shipping
            product features, improving developer workflows, or removing repetitive operational
            work. Lately I have been exploring LLMs, agents and workflow platforms to connect new AI
            capability with real production systems.
          </p>
        </div>
      </section>

      <section className="flex flex-col">
        <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.08em] text-muted">
          Experience
        </h2>
        {experience.work.map((work, index) => (
          <div
            key={work.id}
            className={`grid grid-cols-1 gap-2 border-t border-hairline py-5 sm:grid-cols-[128px_minmax(0,1fr)] sm:gap-6 ${
              index === experience.work.length - 1 ? 'border-b' : ''
            }`}
          >
            <span className="font-mono text-[13px] text-muted sm:pt-0.5">
              {formatDateRange(work.startDate, work.endDate)}
            </span>
            <div className="flex flex-col gap-1.5">
              <span className="text-[17px] font-medium">
                {work.title}, {work.company}
              </span>
              <span className="text-sm text-muted">
                {work.location} · {work.type.replace('-', ' ')}
              </span>
              <span className="pt-1 text-[15px] leading-relaxed text-body-secondary">
                {work.description}
              </span>
            </div>
          </div>
        ))}
      </section>

      <section className="flex flex-col pt-[72px]">
        <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.08em] text-muted">
          Education
        </h2>
        {experience.education.map((edu, index) => (
          <div
            key={edu.id}
            className={`grid grid-cols-1 gap-2 border-t border-hairline py-[18px] sm:grid-cols-[128px_minmax(0,1fr)] sm:gap-6 ${
              index === experience.education.length - 1 ? 'border-b' : ''
            }`}
          >
            <span className="font-mono text-[13px] text-muted sm:pt-0.5">
              {formatDateRange(edu.startDate, edu.endDate)}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-base font-medium">
                {edu.degree}, {edu.institution}
              </span>
              {edu.gpa && (
                <span className="text-sm text-muted">
                  {edu.achievements[0] ?? `CGPA ${edu.gpa}`}
                </span>
              )}
            </div>
          </div>
        ))}
      </section>

      <section className="flex flex-col pt-[72px]">
        <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.08em] text-muted">
          Tools I use
        </h2>
        {toolGroups.map((group, index) => (
          <div
            key={group.label}
            className={`grid grid-cols-1 gap-1.5 border-t border-hairline py-3.5 text-[15px] leading-relaxed sm:grid-cols-[128px_minmax(0,1fr)] sm:gap-6 ${
              index === toolGroups.length - 1 ? 'border-b' : ''
            }`}
          >
            <span className="text-muted">{group.label}</span>
            <span>{group.value}</span>
          </div>
        ))}
      </section>

      <section className="pt-[72px]">
        <p className="m-0 text-lg leading-relaxed text-body-secondary">
          If any of this is useful to you,{' '}
          <a href="/contact">write to me</a>, <a href="/cv.pdf">download my CV</a>, or find me on{' '}
          <a href={siteConfig.author.social.github}>GitHub</a> and{' '}
          <a href={siteConfig.author.social.linkedin}>LinkedIn</a>.
        </p>
      </section>
    </div>
  );
}
