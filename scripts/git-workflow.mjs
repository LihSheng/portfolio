#!/usr/bin/env node

/**
 * Git workflow helper script
 * Helps manage development workflow with proper branching
 */

import { execSync } from 'child_process';

const commands = {
  'create-feature': (branchName) => {
    if (!branchName) {
      console.log('❌ Please provide a branch name: npm run git:feature <branch-name>');
      return;
    }
    
    console.log(`🌿 Creating feature branch: ${branchName}`);
    execSync(`git checkout -b feature/${branchName}`, { stdio: 'inherit' });
    console.log(`✅ Created and switched to feature/${branchName}`);
  },
  
  'switch-dev': () => {
    console.log('🔄 Switching to development branch');
    execSync('git checkout development', { stdio: 'inherit' });
    console.log('✅ Switched to development branch');
  },
  
  'switch-main': () => {
    console.log('🔄 Switching to main branch');
    execSync('git checkout main', { stdio: 'inherit' });
    console.log('✅ Switched to main branch');
  },
  
  'merge-to-dev': () => {
    const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    
    if (currentBranch === 'development') {
      console.log('❌ Already on development branch');
      return;
    }
    
    console.log(`🔄 Merging ${currentBranch} to development`);
    execSync('git checkout development', { stdio: 'inherit' });
    execSync(`git merge ${currentBranch}`, { stdio: 'inherit' });
    console.log(`✅ Merged ${currentBranch} to development`);
  },
  
  'merge-to-main': () => {
    console.log('🔄 Merging development to main');
    execSync('git checkout main', { stdio: 'inherit' });
    execSync('git merge development', { stdio: 'inherit' });
    console.log('✅ Merged development to main');
  },
  
  'status': () => {
    const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    
    console.log(`📍 Current branch: ${currentBranch}`);
    
    if (status.trim()) {
      console.log('📝 Uncommitted changes:');
      console.log(status);
    } else {
      console.log('✅ Working directory clean');
    }
    
    // Show recent commits
    console.log('\n📚 Recent commits:');
    execSync('git log --oneline -5', { stdio: 'inherit' });
  },
  
  'help': () => {
    console.log(`
🚀 Git Workflow Helper

Available commands:
  npm run git:feature <name>  - Create a new feature branch
  npm run git:dev             - Switch to development branch
  npm run git:main            - Switch to main branch
  npm run git:merge-dev       - Merge current branch to development
  npm run git:merge-main      - Merge development to main
  npm run git:status          - Show current status and recent commits
  npm run git:help            - Show this help

Recommended workflow:
1. npm run git:feature my-feature  # Create feature branch
2. # Make your changes and commit
3. npm run git:merge-dev           # Merge to development
4. # Test in development
5. npm run git:merge-main          # Merge to main for production
`);
  }
};

const command = process.argv[2];
const arg = process.argv[3];

if (!command || !commands[command]) {
  commands.help();
  process.exit(1);
}

try {
  commands[command](arg);
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}