// app/components/WebMCPProvider.tsx
'use client';

import { useEffect } from 'react';

interface ToolParameter {
  type: 'string' | 'number' | 'boolean' | 'object';
  description?: string;
  format?: string;
  enum?: string[];
  minLength?: number;
  maxLength?: number;
}

interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, ToolParameter>;
    required?: string[];
  };
}

const TOOLS: ToolDefinition[] = [
  {
    name: 'contact',
    description: 'Submit a contact message via the portfolio contact form',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Your full name', minLength: 2, maxLength: 100 },
        email: { type: 'string', description: 'Your email address', format: 'email', maxLength: 255 },
        subject: { type: 'string', description: 'What the message is about', minLength: 5, maxLength: 200 },
        message: { type: 'string', description: 'Your message', minLength: 10, maxLength: 2000 },
      },
      required: ['name', 'email', 'subject', 'message'],
    },
  },
];

export function WebMCPProvider() {
  useEffect(() => {
    if (
      typeof navigator === 'undefined' ||
      !('modelContext' in navigator) ||
      typeof navigator.modelContext !== 'object'
    ) {
      return;
    }

    const context = navigator.modelContext as {
      provideContext(context: { tools: ToolDefinition[] }): Promise<void>;
    };

    context.provideContext({ tools: TOOLS }).catch((err: unknown) => {
      console.warn('[WebMCP] Failed to provide context:', err);
    });
  }, []);

  return null;
}