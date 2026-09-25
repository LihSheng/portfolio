import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

interface FooterProps {
  className?: string;
}

export function Footer({ className = '' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`mx-auto flex w-full max-w-[680px] flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-5 py-10 text-[13px] text-muted ${className}`}>
      <span>
        © {currentYear} {siteConfig.name}
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
