import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';
import { getFeatureFlags } from '@/lib';

interface FooterProps {
  className?: string;
}

export function Footer({ className = '' }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { easterEggs } = getFeatureFlags();

  return (
    <footer className={`mx-auto flex w-full max-w-[680px] flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-5 py-10 text-[13px] text-muted ${className}`}>
      <span>
        © {currentYear} {siteConfig.name}
        {easterEggs && (
          <span
            className="ml-2 inline-block cursor-help opacity-30 transition-opacity hover:opacity-100"
            title="There are a few of these hidden around. Try the arrow keys."
            aria-label="Hint: there are hidden easter eggs on this site. Try the arrow keys."
            role="img"
          >
            🥚
          </span>
        )}
      </span>
      <div className="flex gap-5">
        <a href="https://github.com/LihSheng" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/lihshengng/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <Link href="/Ng-Lih-Sheng-Resume.pdf">CV</Link>
      </div>
    </footer>
  );
}
