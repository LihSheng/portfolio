import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="animate-fade-in">
          {/* 404 Number */}
          <h1 className="text-8xl md:text-9xl font-bold text-primary/20 mb-4 animate-scale-in">
            404
          </h1>

          {/* Error Message */}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Page Not Found
          </h2>

          <p className="text-muted-foreground mb-8 text-lg">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Go Home
            </Link>
            
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-foreground bg-secondary rounded-md hover:bg-secondary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            >
              View Projects
            </Link>
            
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-foreground bg-secondary rounded-md hover:bg-secondary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            >
              Contact Me
            </Link>
          </div>

          {/* Additional Help */}
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              Looking for something specific?
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href="/about"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                About Me
              </Link>
              <Link
                href="/writing"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Blog Posts
              </Link>
              <Link
                href="/projects"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                All Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}