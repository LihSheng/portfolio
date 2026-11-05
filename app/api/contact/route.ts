import { NextRequest, NextResponse } from 'next/server';
import { getFeatureFlags } from '@/lib';
import { siteConfig } from '@/lib/site-config';
import { checkContactRequest } from '@/lib/contact/request-guard';
import { submitContactMessage } from '@/lib/contact/submit-contact-message';

function getRequestIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const real_ip = request.headers.get('x-real-ip');

  return forwarded ? forwarded.split(',')[0].trim() : real_ip || 'unknown';
}

export async function POST(request: NextRequest) {
  // The proxy only gates the /contact page, so the API checks the flag itself.
  if (!getFeatureFlags().contact) {
    return NextResponse.json(
      { success: false, message: 'Not found', code: 'NOT_FOUND' },
      { status: 404 }
    );
  }

  const rejection = checkContactRequest(
    {
      content_type: request.headers.get('content-type'),
      origin: request.headers.get('origin'),
      host: request.headers.get('x-forwarded-host') || request.headers.get('host'),
    },
    [siteConfig.url]
  );

  if (rejection) {
    return NextResponse.json(
      { success: false, message: rejection.message, code: rejection.code },
      { status: rejection.status }
    );
  }

  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid JSON in request body',
          code: 'INVALID_JSON',
        },
        { status: 400 }
      );
    }

    const result = await submitContactMessage(body, {
      ip: getRequestIp(request),
      user_agent: request.headers.get('user-agent'),
      origin: request.headers.get('origin'),
    });

    switch (result.status) {
      case 'accepted':
      case 'spam':
        return NextResponse.json(
          {
            success: true,
            message: result.message,
          },
          { status: 200 }
        );
      case 'invalid':
        return NextResponse.json(
          {
            success: false,
            message: result.message,
            errors: result.errors,
            code: 'VALIDATION_ERROR',
          },
          { status: 400 }
        );
      case 'rate_limited':
        return NextResponse.json(
          {
            success: false,
            message: result.message,
            code: 'RATE_LIMIT_EXCEEDED',
          },
          {
            status: 429,
            headers: {
              'Retry-After': result.retry_after_seconds.toString(),
            },
          }
        );
      case 'delivery_failed':
        return NextResponse.json(
          {
            success: false,
            message: result.message,
            code: 'EMAIL_SEND_FAILED',
          },
          { status: 500 }
        );
      default:
        return NextResponse.json(
          {
            success: false,
            message: 'An unexpected error occurred. Please try again later.',
            code: 'INTERNAL_ERROR',
          },
          { status: 500 }
        );
    }
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
