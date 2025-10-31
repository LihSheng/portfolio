#!/usr/bin/env node

/**
 * Pre-deployment checklist script
 * Run this before deploying to production
 */

import fs from 'fs';
import { execSync } from 'child_process';

console.log('🚀 Pre-deployment checklist\n');

const checks = [
  {
    name: 'Environment variables file exists',
    check: () => fs.existsSync('.env.local') || fs.existsSync('.env.production'),
    required: false,
    message: 'Consider creating .env.local for local development'
  },
  {
    name: 'Site URL is configured',
    check: () => {
      try {
        const siteConfig = fs.readFileSync('lib/site-config.ts', 'utf8');
        return siteConfig.includes('lihsheng.space');
      } catch {
        return false;
      }
    },
    required: true,
    message: 'Update NEXT_PUBLIC_SITE_URL in site-config.ts'
  },
  {
    name: 'Content files exist',
    check: () => {
      const projectsExist = fs.existsSync('content/projects') && 
        fs.readdirSync('content/projects').length > 0;
      const blogExists = fs.existsSync('content/blog') && 
        fs.readdirSync('content/blog').length > 0;
      return projectsExist && blogExists;
    },
    required: true,
    message: 'Add content files in content/projects and content/blog'
  },
  {
    name: 'Vercel configuration exists',
    check: () => fs.existsSync('vercel.json'),
    required: false,
    message: 'vercel.json provides additional deployment configuration'
  }
];

async function runChecks() {
  let passed = 0;
  let failed = 0;
  let warnings = 0;

  for (const check of checks) {
    try {
      const result = await check.check();
      
      if (result) {
        console.log(`✅ ${check.name}`);
        passed++;
      } else {
        if (check.required) {
          console.log(`❌ ${check.name}`);
          console.log(`   ${check.message}\n`);
          failed++;
        } else {
          console.log(`⚠️  ${check.name}`);
          console.log(`   ${check.message}\n`);
          warnings++;
        }
      }
    } catch (error) {
      if (check.required) {
        console.log(`❌ ${check.name} (Error: ${error.message})`);
        failed++;
      } else {
        console.log(`⚠️  ${check.name} (Error: ${error.message})`);
        warnings++;
      }
    }
  }

  console.log('\n📊 Summary:');
  console.log(`✅ Passed: ${passed}`);
  if (warnings > 0) console.log(`⚠️  Warnings: ${warnings}`);
  if (failed > 0) console.log(`❌ Failed: ${failed}`);

  if (failed > 0) {
    console.log('\n❌ Deployment not recommended. Please fix the failed checks above.');
    process.exit(1);
  } else if (warnings > 0) {
    console.log('\n⚠️  Deployment possible but consider addressing warnings.');
  } else {
    console.log('\n🎉 All checks passed! Ready for deployment.');
  }
}

runChecks().catch(console.error);