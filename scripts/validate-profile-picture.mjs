#!/usr/bin/env node

/**
 * Profile Picture Integration Validation Script
 * 
 * This script validates the profile picture integration by checking:
 * - Configuration completeness
 * - Image file existence and optimization
 * - Component integration
 * - Accessibility compliance
 * - Performance considerations
 */

import { readFileSync, existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// ANSI color codes for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function logHeader(message) {
  log(`\n${colors.bold}${message}${colors.reset}`, 'blue');
}

/**
 * Check if site configuration includes profile picture settings
 */
function validateSiteConfiguration() {
  logHeader('Validating Site Configuration');
  
  try {
    const siteConfigPath = join(projectRoot, 'lib', 'site-config.ts');
    const siteConfigContent = readFileSync(siteConfigPath, 'utf-8');
    
    // Check for profile picture configuration
    const hasProfilePicture = siteConfigContent.includes('profilePicture');
    const hasProfilePictureAlt = siteConfigContent.includes('profilePictureAlt');
    const hasAuthorBio = siteConfigContent.includes('bio:');
    
    if (hasProfilePicture) {
      logSuccess('Profile picture configuration found');
    } else {
      logWarning('Profile picture configuration not found - will use fallback');
    }
    
    if (hasProfilePictureAlt) {
      logSuccess('Profile picture alt text configured');
    } else {
      logWarning('Profile picture alt text not configured - accessibility impact');
    }
    
    if (hasAuthorBio) {
      logSuccess('Author bio configured for screen readers');
    } else {
      logWarning('Author bio not configured - limited screen reader context');
    }
    
    // Check for environment variable support
    const hasEnvSupport = siteConfigContent.includes('NEXT_PUBLIC_PROFILE_PICTURE_URL');
    if (hasEnvSupport) {
      logSuccess('Environment variable support configured');
    } else {
      logInfo('Environment variable support not configured (optional)');
    }
    
    return { hasProfilePicture, hasProfilePictureAlt, hasAuthorBio };
    
  } catch (error) {
    logError(`Failed to read site configuration: ${error.message}`);
    return { hasProfilePicture: false, hasProfilePictureAlt: false, hasAuthorBio: false };
  }
}

/**
 * Check if profile picture files exist and are optimized
 */
function validateProfilePictureFiles() {
  logHeader('Validating Profile Picture Files');
  
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
  const imagePaths = [
    'public/images/profile.jpg',
    'public/images/profile.jpeg',
    'public/images/profile.png',
    'public/images/profile.webp'
  ];
  
  let foundImages = [];
  
  for (const imagePath of imagePaths) {
    const fullPath = join(projectRoot, imagePath);
    if (existsSync(fullPath)) {
      const stats = statSync(fullPath);
      const sizeKB = Math.round(stats.size / 1024);
      
      foundImages.push({ path: imagePath, size: sizeKB });
      
      if (sizeKB < 500) {
        logSuccess(`Found optimized profile picture: ${imagePath} (${sizeKB}KB)`);
      } else {
        logWarning(`Profile picture may be too large: ${imagePath} (${sizeKB}KB) - consider optimizing`);
      }
    }
  }
  
  if (foundImages.length === 0) {
    logWarning('No profile picture files found - component will use fallback initials');
  } else {
    logSuccess(`Found ${foundImages.length} profile picture file(s)`);
  }
  
  return foundImages;
}

/**
 * Check ProfilePicture component implementation
 */
function validateProfilePictureComponent() {
  logHeader('Validating ProfilePicture Component');
  
  try {
    const componentPath = join(projectRoot, 'components', 'ProfilePicture.tsx');
    const componentContent = readFileSync(componentPath, 'utf-8');
    
    // Check for key features
    const features = {
      'Size variants': componentContent.includes('sizeVariants'),
      'Accessibility props': componentContent.includes('ariaLabel'),
      'Error handling': componentContent.includes('handleImageError'),
      'Animation support': componentContent.includes('framer-motion'),
      'Screen reader support': componentContent.includes('sr-only'),
      'Keyboard navigation': componentContent.includes('onKeyDown'),
      'Performance optimization': componentContent.includes('priority'),
      'Error boundary': componentContent.includes('ProfilePictureErrorBoundary')
    };
    
    for (const [feature, hasFeature] of Object.entries(features)) {
      if (hasFeature) {
        logSuccess(`${feature} implemented`);
      } else {
        logError(`${feature} missing`);
      }
    }
    
    return features;
    
  } catch (error) {
    logError(`Failed to read ProfilePicture component: ${error.message}`);
    return {};
  }
}

/**
 * Check component integration in Hero and About sections
 */
function validateComponentIntegration() {
  logHeader('Validating Component Integration');
  
  const integrationPoints = [
    { file: 'components/HeroClient.tsx', section: 'Hero' },
    { file: 'app/about/about-content.tsx', section: 'About' }
  ];
  
  for (const { file, section } of integrationPoints) {
    try {
      const filePath = join(projectRoot, file);
      const fileContent = readFileSync(filePath, 'utf-8');
      
      if (fileContent.includes('ProfilePicture')) {
        logSuccess(`ProfilePicture integrated in ${section} section`);
        
        // Check for proper props usage
        const hasSize = fileContent.includes('size=');
        const hasPriority = fileContent.includes('priority');
        const hasAnimate = fileContent.includes('animate');
        
        if (hasSize) logSuccess(`  - Size prop configured in ${section}`);
        if (hasPriority) logSuccess(`  - Priority loading configured in ${section}`);
        if (hasAnimate) logSuccess(`  - Animations configured in ${section}`);
        
      } else {
        logWarning(`ProfilePicture not found in ${section} section`);
      }
      
    } catch (error) {
      logError(`Failed to check ${section} integration: ${error.message}`);
    }
  }
}

/**
 * Check image utilities and helper functions
 */
function validateImageUtilities() {
  logHeader('Validating Image Utilities');
  
  try {
    const utilsPath = join(projectRoot, 'lib', 'image-utils.ts');
    const utilsContent = readFileSync(utilsPath, 'utf-8');
    
    const utilities = {
      'Shimmer placeholder': utilsContent.includes('shimmerPlaceholderDataUrl'),
      'Performance logging': utilsContent.includes('logProfilePictureMetrics'),
      'Quality optimization': utilsContent.includes('getOptimalImageQuality'),
      'Preloading support': utilsContent.includes('preloadProfilePicture'),
      'Caching utilities': utilsContent.includes('cacheProfilePicture'),
      'Profile config helper': utilsContent.includes('getProfilePictureConfig')
    };
    
    for (const [utility, hasUtility] of Object.entries(utilities)) {
      if (hasUtility) {
        logSuccess(`${utility} available`);
      } else {
        logWarning(`${utility} not found`);
      }
    }
    
  } catch (error) {
    logError(`Failed to read image utilities: ${error.message}`);
  }
}

/**
 * Check documentation completeness
 */
function validateDocumentation() {
  logHeader('Validating Documentation');
  
  const docFiles = [
    'docs/profile-picture-setup.md',
    'docs/profile-picture-component.md',
    'docs/profile-picture-accessibility.md'
  ];
  
  for (const docFile of docFiles) {
    const docPath = join(projectRoot, docFile);
    if (existsSync(docPath)) {
      logSuccess(`Documentation found: ${docFile}`);
      
      try {
        const docContent = readFileSync(docPath, 'utf-8');
        const wordCount = docContent.split(/\s+/).length;
        logInfo(`  - ${wordCount} words`);
        
        // Check for key sections
        if (docContent.includes('## Usage Examples')) {
          logSuccess('  - Usage examples included');
        }
        if (docContent.includes('## Accessibility')) {
          logSuccess('  - Accessibility documentation included');
        }
        if (docContent.includes('## Performance')) {
          logSuccess('  - Performance documentation included');
        }
        
      } catch (error) {
        logWarning(`  - Could not analyze content: ${error.message}`);
      }
    } else {
      logError(`Documentation missing: ${docFile}`);
    }
  }
}

/**
 * Generate validation summary and recommendations
 */
function generateSummary(results) {
  logHeader('Validation Summary');
  
  const { config, images, component, integration } = results;
  
  let score = 0;
  let maxScore = 0;
  
  // Calculate score based on validation results
  if (config.hasProfilePicture) score += 2;
  if (config.hasProfilePictureAlt) score += 2;
  if (config.hasAuthorBio) score += 1;
  maxScore += 5;
  
  if (images.length > 0) score += 3;
  maxScore += 3;
  
  const componentFeatures = Object.values(component).filter(Boolean).length;
  score += componentFeatures;
  maxScore += Object.keys(component).length;
  
  const percentage = Math.round((score / maxScore) * 100);
  
  log(`\nOverall Integration Score: ${score}/${maxScore} (${percentage}%)`, 
      percentage >= 80 ? 'green' : percentage >= 60 ? 'yellow' : 'red');
  
  // Provide recommendations
  logHeader('Recommendations');
  
  if (!config.hasProfilePicture) {
    logInfo('• Add a profile picture to public/images/ and configure in site-config.ts');
  }
  
  if (!config.hasProfilePictureAlt) {
    logInfo('• Add descriptive alt text for better accessibility');
  }
  
  if (images.length === 0) {
    logInfo('• Add at least one profile picture file for better user experience');
  }
  
  if (images.some(img => img.size > 500)) {
    logInfo('• Optimize large profile pictures to improve loading performance');
  }
  
  if (percentage >= 90) {
    logSuccess('🎉 Excellent! Profile picture integration is complete and optimized.');
  } else if (percentage >= 70) {
    logInfo('👍 Good integration! Consider implementing the recommendations above.');
  } else {
    logWarning('⚠️  Profile picture integration needs improvement. Please address the issues above.');
  }
}

/**
 * Main validation function
 */
function main() {
  log(`${colors.bold}Profile Picture Integration Validator${colors.reset}`, 'blue');
  log('Checking profile picture setup and integration...\n');
  
  const config = validateSiteConfiguration();
  const images = validateProfilePictureFiles();
  const component = validateProfilePictureComponent();
  
  validateComponentIntegration();
  validateImageUtilities();
  validateDocumentation();
  
  generateSummary({ config, images, component });
  
  log('\nValidation complete! 🚀');
}

// Run the validation
main();