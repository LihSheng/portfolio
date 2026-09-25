import { PageFade } from '@/components/PageFade';

interface PageColumnProps {
  children: React.ReactNode;
}

/**
 * The single-column page shell: 680px max width, left aligned, centred on
 * the page with 20px side padding. Wraps its content in PageFade for the
 * short fade-and-rise on route load.
 */
export function PageColumn({ children }: PageColumnProps) {
  return (
    <div className="mx-auto w-full max-w-[680px] px-5">
      <PageFade>{children}</PageFade>
    </div>
  );
}
