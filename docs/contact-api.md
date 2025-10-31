# Contact Form API Documentation

## Overview

The contact form API endpoint handles form submissions from the portfolio website's contact page. It includes validation, rate limiting, and email sending capabilities.

## Endpoint

```
POST /api/contact
```

## Request Format

### Headers
```
Content-Type: application/json
```

### Body
```json
{
  "name": "string (2-100 characters, letters/spaces/hyphens/apostrophes only)",
  "email": "string (valid email format, max 255 characters)",
  "subject": "string (5-200 characters)",
  "message": "string (10-2000 characters)"
}
```

## Response Format

### Success Response (200)
```json
{
  "success": true,
  "message": "Thank you for your message! I'll get back to you soon."
}
```

### Validation Error (400)
```json
{
  "success": false,
  "message": "Please check your input and try again",
  "errors": {
    "name": "Name must be at least 2 characters",
    "email": "Please enter a valid email address"
  },
  "code": "VALIDATION_ERROR"
}
```

### Rate Limit Error (429)
```json
{
  "success": false,
  "message": "Too many requests. Please try again in 15 minutes.",
  "code": "RATE_LIMIT_EXCEEDED"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "An unexpected error occurred. Please try again later.",
  "code": "INTERNAL_ERROR"
}
```

## Features

### 1. Input Validation
- **Name**: 2-100 characters, only letters, spaces, hyphens, and apostrophes
- **Email**: Valid email format, max 255 characters
- **Subject**: 5-200 characters
- **Message**: 10-2000 characters

### 2. Rate Limiting
- **Limit**: 5 requests per 15-minute window per IP address
- **Storage**: In-memory (for development), should use Redis in production
- **Headers**: Returns `Retry-After` header when rate limited

### 3. Email Integration
The API supports multiple email providers:

#### Console Logging (Development)
```env
EMAIL_PROVIDER=console
```

#### Nodemailer (SMTP)
```env
EMAIL_PROVIDER=nodemailer
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=your-email@gmail.com
CONTACT_EMAIL=your-email@gmail.com
```

#### Formspree
```env
EMAIL_PROVIDER=formspree
FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

## Security Features

### Rate Limiting
- Prevents spam and abuse
- IP-based tracking
- Configurable limits and windows

### Input Sanitization
- Zod schema validation
- HTML escaping for email content
- Prevents injection attacks

### Error Handling
- Graceful error responses
- No sensitive information leaked
- Proper HTTP status codes

## Usage Examples

### Valid Request
```javascript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Project Inquiry',
    message: 'I would like to discuss a potential project with you.'
  }),
});

const result = await response.json();
if (result.success) {
  console.log('Message sent successfully!');
} else {
  console.error('Error:', result.message);
}
```

### Handling Validation Errors
```javascript
if (!response.ok) {
  const error = await response.json();
  
  if (error.code === 'VALIDATION_ERROR' && error.errors) {
    // Display field-specific errors
    Object.entries(error.errors).forEach(([field, message]) => {
      console.error(`${field}: ${message}`);
    });
  } else if (error.code === 'RATE_LIMIT_EXCEEDED') {
    // Handle rate limiting
    console.error('Too many requests, please try again later');
  }
}
```

## Testing

### Manual Testing
1. Start the development server: `npm run dev`
2. Use the test script: `node test-contact-api.js`
3. Or test via the contact form at `/contact`

### Test Cases
- ✅ Valid form submission
- ✅ Invalid data validation
- ✅ Rate limiting (6+ requests)
- ✅ Unsupported HTTP methods
- ✅ Malformed JSON

## Production Considerations

### Email Service Setup
1. **Nodemailer**: Configure SMTP credentials
2. **Formspree**: Create account and get endpoint
3. **SendGrid/Mailgun**: Alternative services (requires custom integration)

### Rate Limiting
- Use Redis for distributed rate limiting
- Consider IP whitelisting for trusted sources
- Monitor and adjust limits based on usage

### Monitoring
- Log all submissions for debugging
- Monitor error rates and response times
- Set up alerts for high error rates

### Security
- Use HTTPS in production
- Implement CSRF protection if needed
- Consider adding CAPTCHA for additional spam protection
- Validate and sanitize all inputs

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Email provider configuration
EMAIL_PROVIDER=console  # or 'nodemailer' or 'formspree'

# Nodemailer configuration (if using EMAIL_PROVIDER=nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=your-email@gmail.com
CONTACT_EMAIL=your-email@gmail.com

# Formspree configuration (if using EMAIL_PROVIDER=formspree)
FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

## Error Codes Reference

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `VALIDATION_ERROR` | Invalid input data | 400 |
| `INVALID_JSON` | Malformed JSON body | 400 |
| `RATE_LIMIT_EXCEEDED` | Too many requests | 429 |
| `EMAIL_SEND_FAILED` | Email service error | 500 |
| `INTERNAL_ERROR` | Unexpected server error | 500 |
| `METHOD_NOT_ALLOWED` | Unsupported HTTP method | 405 |