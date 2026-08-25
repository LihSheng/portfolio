import Link from 'next/link';
import experienceData from '@/content/data/experience.json';

const highlightMetrics = [
  {
    label: 'Experience',
    value: '5+ years',
    detail: 'shipping production software',
  },
  {
    label: 'Current Focus',
    value: 'BI + Agentic AI',
    detail: 'multi-tenant analytics, LLM workflows, agents',
  },
  {
    label: 'Quality',
    value: '85%+',
    detail: 'test coverage in prior role',
  },
];

export function ProfessionalHighlightsSection() {
  const workHighlights = experienceData.work.slice(0, 3);

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
            Professional Highlights
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {highlightMetrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-slate-900"
            >
              <p className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {metric.label}
              </p>
              <p className="mb-1 text-2xl font-bold text-gray-900 dark:text-gray-100">
                {metric.value}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{metric.detail}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-slate-900">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
                  Experience Snapshot
                </p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Recent roles and outcomes
                </h3>
              </div>
              <Link
                href="/about"
                className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                View full background
              </Link>
            </div>

            <div className="space-y-6">
              {workHighlights.map((role) => (
                <div
                  key={role.id}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-800 dark:bg-slate-950"
                >
                  <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {role.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {role.company} · {role.location}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {role.current ? `${role.startDate} - Present` : `${role.startDate} - ${role.endDate}`}
                    </p>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {role.description}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                    {role.achievements.slice(0, 2).map((achievement) => (
                      <li key={achievement} className="flex gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8 shadow-sm dark:border-blue-800/60 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">
              Best First Clicks
            </p>
            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
              Start with my strongest recent work
            </h3>
            <ul className="mb-8 space-y-3 text-sm text-gray-700 dark:text-gray-200">
              <li>GeminiAgent for bounded agentic workflows, operational tooling, and Google ADK architecture.</li>
              <li>LinkUp for AI-assisted schema intelligence, deterministic validation, and LLM observability.</li>
              <li>Ops Room for durable multi-agent orchestration, GitHub automation, and operational reliability.</li>
            </ul>

            <div className="space-y-3">
              <a
                href="/Ng-Lih-Sheng-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                Open Resume
              </a>
              <Link
                href="/projects"
                className="flex items-center justify-center rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-slate-800"
              >
                View Selected Projects
              </Link>
              <a
                href="https://github.com/LihSheng"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-xl border border-blue-300 px-4 py-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-950/40"
              >
                Review GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
