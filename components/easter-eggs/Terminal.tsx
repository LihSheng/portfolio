'use client';

import { useEffect, useRef, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { siteConfig, socialLinks } from '@/lib/site-config';
import { FeatureFlags } from '@/types';

interface Line {
  kind: 'input' | 'output';
  text: string;
}

interface TerminalProps {
  flags: FeatureFlags;
}

const PROMPT = 'visitor@lihsheng:~$';

export function Terminal({ flags }: TerminalProps) {
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>([
    { kind: 'output', text: `Welcome to ${siteConfig.name}'s terminal. Type "help" to get started.` },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'nearest' });
  }, [lines]);

  const run = (raw: string): string[] => {
    const [cmd, ...args] = raw.trim().toLowerCase().split(/\s+/);
    switch (cmd) {
      case '':
        return [];
      case 'help':
        return [
          'Available commands:',
          '  help        this list',
          '  whoami      who runs this site',
          '  skills      what I work with',
          '  about       open the about page',
          '  projects    open the projects page',
          '  contact     open the contact page',
          '  social      links to find me elsewhere',
          '  hire        the fast path',
          '  date        current date',
          '  clear       clear the screen',
          '  exit        back to the home page',
        ];
      case 'whoami':
        return [siteConfig.author.name, siteConfig.author.bio];
      case 'skills':
        return [
          'React, TypeScript, Angular, Laravel, PostgreSQL, Python.',
          'Also: Next.js, AWS, CI/CD, n8n, LLM tooling and AI agents for real teams.',
        ];
      case 'about':
        if (!flags.about) return ['about: not available right now.'];
        router.push('/about');
        return ['Opening /about ...'];
      case 'projects':
        if (!flags.projects) return ['projects: not available right now.'];
        router.push('/projects');
        return ['Opening /projects ...'];
      case 'contact':
      case 'hire':
        if (!flags.contact) return [`Email me: ${siteConfig.author.email}`];
        router.push('/contact');
        return [cmd === 'hire' ? 'Good choice. Opening /contact ...' : 'Opening /contact ...'];
      case 'social':
        return socialLinks
          .filter((l) => l.name !== 'Email')
          .map((l) => `  ${l.name.padEnd(10)} ${l.url}`);
      case 'date':
        return [new Date().toString()];
      case 'exit':
      case 'quit':
        router.push('/');
        return ['Bye.'];
      case 'sudo':
        return ['Nice try. This incident will be reported.'];
      case 'ls':
        return ['about  projects  contact  secrets.txt'];
      case 'cat':
        if (args[0] === 'secrets.txt') {
          return ['Try the Konami code anywhere. Then click my portrait on /about a few times.'];
        }
        return [`cat: ${args[0] || ''}: No such file or directory`];
      case 'rm':
        return ['rm: permission denied. This is a portfolio, not a playground.'];
      case 'vim':
      case 'vi':
      case 'nano':
        return ['No editors here. You are already in the wrong window.'];
      default:
        return [`${cmd}: command not found. Type "help".`];
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const raw = input;
    setInput('');
    setHistoryIndex(-1);
    if (raw.trim()) setHistory((h) => [raw, ...h].slice(0, 50));
    if (raw.trim().toLowerCase() === 'clear') {
      setLines([]);
      return;
    }
    const out = run(raw).map((text) => ({ kind: 'output' as const, text }));
    setLines((prev) => [...prev, { kind: 'input', text: raw }, ...out]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, history.length - 1);
      if (history[next] !== undefined) {
        setHistoryIndex(next);
        setInput(history[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = historyIndex - 1;
      setHistoryIndex(next);
      setInput(next >= 0 ? history[next] : '');
    }
  };

  return (
    <div
      className="cursor-text border border-hairline bg-screenshot-fill p-4 font-mono text-[13px] leading-relaxed sm:p-5"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="mb-3 border-b border-hairline pb-3 text-xs text-muted">
        {PROMPT.replace(':~$', '')}
      </div>

      <div className="max-h-[60vh] min-h-[16rem] overflow-y-auto" role="log" aria-live="polite">
        {lines.map((line, i) =>
          line.kind === 'input' ? (
            <div key={i} className="whitespace-pre-wrap break-words">
              <span className="text-moss">{PROMPT}</span> {line.text}
            </div>
          ) : (
            <div key={i} className="whitespace-pre-wrap break-words text-body-secondary">
              {line.text}
            </div>
          )
        )}
        <form onSubmit={onSubmit} className="flex items-center gap-2">
          <label htmlFor="terminal-input" className="shrink-0 text-moss">
            {PROMPT}
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="min-w-0 flex-1 bg-transparent text-ink caret-current outline-none"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            autoFocus
            aria-label="Terminal command"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
