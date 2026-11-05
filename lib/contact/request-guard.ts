export interface ContactRequestHeaders {
  content_type: string | null;
  origin: string | null;
  host: string | null;
}

export interface ContactRequestRejection {
  status: 403 | 415;
  code: 'UNSUPPORTED_MEDIA_TYPE' | 'FORBIDDEN_ORIGIN';
  message: string;
}

/**
 * Blocks cross-site form posts before the body is parsed.
 *
 * Requiring `application/json` forces a CORS preflight for any cross-origin
 * browser request, which this API never answers. The Origin check is a second
 * layer: browsers always send Origin on POST, so a mismatch means another
 * site is trying to submit on a visitor's behalf. A missing Origin is a
 * non-browser client, which cannot ride on a visitor's browser anyway.
 */
export function checkContactRequest(
  headers: ContactRequestHeaders,
  allowed_origins: string[] = []
): ContactRequestRejection | null {
  const media_type = headers.content_type?.split(';')[0].trim().toLowerCase();

  if (media_type !== 'application/json') {
    return {
      status: 415,
      code: 'UNSUPPORTED_MEDIA_TYPE',
      message: 'Content-Type must be application/json',
    };
  }

  if (headers.origin !== null && !isAllowedOrigin(headers.origin, headers.host, allowed_origins)) {
    return {
      status: 403,
      code: 'FORBIDDEN_ORIGIN',
      message: 'Cross-origin requests are not allowed',
    };
  }

  return null;
}

function isAllowedOrigin(origin: string, host: string | null, allowed_origins: string[]): boolean {
  let origin_url: URL;

  try {
    origin_url = new URL(origin);
  } catch {
    return false;
  }

  if (host && origin_url.host.toLowerCase() === host.toLowerCase()) {
    return true;
  }

  return allowed_origins.some((allowed) => {
    try {
      return new URL(allowed).origin === origin_url.origin;
    } catch {
      return false;
    }
  });
}
