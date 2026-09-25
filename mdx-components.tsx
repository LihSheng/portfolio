import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => (
      <h2
        className="mt-14 mb-0 font-mono text-xs font-normal uppercase tracking-[0.08em] text-muted first:mt-0"
        {...props}
      />
    ),
    p: (props) => (
      <p className="mt-0 text-[17px] leading-relaxed text-body-secondary" {...props} />
    ),
    ...components,
  };
}
