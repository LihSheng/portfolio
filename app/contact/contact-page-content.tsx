'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import { siteConfig, socialLinks } from '@/lib/site-config';

export function ContactPageContent() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for dark mode
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    // Watch for changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: isDarkMode ? 'rgb(3, 7, 18)' : 'rgb(249, 250, 251)' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
          >
            Get In Touch
          </h1>
          <p 
            className="text-xl max-w-2xl mx-auto"
            style={{ color: isDarkMode ? 'rgb(209, 213, 219)' : 'rgb(75, 85, 99)' }}
          >
            I'm always interested in new opportunities, collaborations, and interesting projects. 
            Let's discuss how we can work together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl shadow-lg p-8"
            style={{
              backgroundColor: isDarkMode ? 'rgb(17, 24, 39)' : 'white',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)'
            }}
          >
            <h2 
              className="text-2xl font-semibold mb-6"
              style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
            >
              Send me a message
            </h2>
            <ContactForm />
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Direct Contact Methods */}
            <div 
              className="rounded-2xl shadow-lg p-8"
              style={{
                backgroundColor: isDarkMode ? 'rgb(17, 24, 39)' : 'white',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)'
              }}
            >
              <h2 
                className="text-2xl font-semibold mb-6"
                style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
              >
                Other ways to reach me
              </h2>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgb(219, 234, 254)' }}
                    >
                      <svg 
                        className="w-6 h-6" 
                        style={{ color: isDarkMode ? 'rgb(96, 165, 250)' : 'rgb(37, 99, 235)' }}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 
                      className="text-lg font-medium"
                      style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
                    >
                      Email
                    </h3>
                    <a 
                      href={`mailto:${siteConfig.author.email}`}
                      className="hover:underline"
                      style={{ color: isDarkMode ? 'rgb(96, 165, 250)' : 'rgb(37, 99, 235)' }}
                    >
                      {siteConfig.author.email}
                    </a>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgb(219, 234, 254)' }}
                    >
                      <svg 
                        className="w-6 h-6" 
                        style={{ color: isDarkMode ? 'rgb(96, 165, 250)' : 'rgb(37, 99, 235)' }}
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 
                      className="text-lg font-medium"
                      style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
                    >
                      LinkedIn
                    </h3>
                    <a 
                      href={siteConfig.author.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      style={{ color: isDarkMode ? 'rgb(96, 165, 250)' : 'rgb(37, 99, 235)' }}
                    >
                      Connect with me
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div 
              className="rounded-2xl shadow-lg p-8"
              style={{
                backgroundColor: isDarkMode ? 'rgb(17, 24, 39)' : 'white',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)'
              }}
            >
              <h2 
                className="text-2xl font-semibold mb-6"
                style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
              >
                Follow me
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target={social.name !== 'Email' ? '_blank' : undefined}
                    rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                    className="flex items-center space-x-3 p-4 rounded-lg transition-all duration-200 group"
                    style={{
                      backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgb(249, 250, 251)',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgb(239, 246, 255)';
                      e.currentTarget.style.borderColor = isDarkMode ? 'rgb(59, 130, 246)' : 'rgb(147, 197, 253)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgb(249, 250, 251)';
                      e.currentTarget.style.borderColor = isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)';
                    }}
                  >
                    <div className="flex-shrink-0">
                      {social.icon === 'github' && (
                        <svg 
                          className="w-5 h-5 group-hover:text-blue-600 dark:group-hover:text-blue-400" 
                          style={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(75, 85, 99)' }}
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      )}
                      {social.icon === 'linkedin' && (
                        <svg 
                          className="w-5 h-5 group-hover:text-blue-600 dark:group-hover:text-blue-400" 
                          style={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(75, 85, 99)' }}
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      )}
                      {social.icon === 'twitter' && (
                        <svg 
                          className="w-5 h-5 group-hover:text-blue-600 dark:group-hover:text-blue-400" 
                          style={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(75, 85, 99)' }}
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      )}
                      {social.icon === 'mail' && (
                        <svg 
                          className="w-5 h-5 group-hover:text-blue-600 dark:group-hover:text-blue-400" 
                          style={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(75, 85, 99)' }}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                          />
                        </svg>
                      )}
                    </div>
                    <span 
                      className="text-sm font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400"
                      style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
                    >
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Response Time Info */}
            <div 
              className="rounded-2xl p-6"
              style={{
                backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgb(239, 246, 255)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: isDarkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgb(147, 197, 253)'
              }}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg 
                    className="w-6 h-6 mt-0.5" 
                    style={{ color: isDarkMode ? 'rgb(96, 165, 250)' : 'rgb(37, 99, 235)' }}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                </div>
                <div>
                  <h3 
                    className="text-lg font-medium mb-2"
                    style={{ color: isDarkMode ? 'rgb(191, 219, 254)' : 'rgb(30, 58, 138)' }}
                  >
                    Quick Response
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: isDarkMode ? 'rgb(147, 197, 253)' : 'rgb(29, 78, 216)' }}
                  >
                    I typically respond to messages within 24 hours. For urgent matters, 
                    feel free to reach out via LinkedIn for a faster response.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}