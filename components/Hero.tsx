import { siteConfig } from '@/lib/site-config';
import { getFeatureFlags } from '@/lib';
import HeroClient from './HeroClient';

export default function Hero() {
  const flags = getFeatureFlags();

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16">
      <div className="max-w-4xl mx-auto text-center">
        <HeroClient flags={flags} />
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
}