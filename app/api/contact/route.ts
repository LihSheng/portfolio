import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema, type ContactFormData } from '@/lib/validation';
import { createEmailService } from '@/lib/email';

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requests per window

function getRateLimitKey(request: NextRequest): string {
  // Use IP address for rate limiting
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded ? forwarded.split(',')[0].trim() : realIp || 'unknown';
  return `contact_${ip}`;
}

function checkRateLimit(key: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    // Create new record or reset expired one
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, resetTime: record.resetTime };
  }

  // Increment count
  record.count += 1;
  rateLimitStore.set(key, record);
  return { allowed: true };
}

async function sendEmail(data: ContactFormData): Promise<void> {
  const emailService = createEmailService();
  await emailService.sendContactEmail(data);
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limiting
    const rateLimitKey = getRateLimitKey(request);
    const rateLimitResult = checkRateLimit(rateLimitKey);

    if (!rateLimitResult.allowed) {
      const resetTime = rateLimitResult.resetTime!;
      const waitTime = Math.ceil((resetTime - Date.now()) / 1000 / 60); // minutes

      return NextResponse.json(
        {
          success: false,
          message: `Too many requests. Please try again in ${waitTime} minutes.`,
          code: 'RATE_LIMIT_EXCEEDED',
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // Parse and validate request body
    let body: unknown;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid JSON in request body',
          code: 'INVALID_JSON',
        },
        { status: 400 }
      );
    }

    // Validate form data using Zod schema
    const validation = contactFormSchema.safeParse(body);

    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.issues.forEach(issue => {
        if (issue.path[0]) {
          errors[issue.path[0] as string] = issue.message;
        }
      });

      return NextResponse.json(
        {
          success: false,
          message: 'Please check your input and try again',
          errors,
          code: 'VALIDATION_ERROR',
        },
        { status: 400 }
      );
    }

    const formData = validation.data;

    // Send email
    try {
      await sendEmail(formData);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to send message. Please try again later or contact me directly.',
          code: 'EMAIL_SEND_FAILED',
        },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message! I\'ll get back to you soon.',
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred. Please try again later.',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message: 'Method not allowed',
      code: 'METHOD_NOT_ALLOWED',
    },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    {
      success: false,
      message: 'Method not allowed',
      code: 'METHOD_NOT_ALLOWED',
    },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    {
      success: false,
      message: 'Method not allowed',
      code: 'METHOD_NOT_ALLOWED',
    },
    { status: 405 }
  );
}