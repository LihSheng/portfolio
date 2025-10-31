# Development Workflow Guide

This guide explains the development workflow for the portfolio website using Git branches and proper deployment practices.

## Branch Structure

### Main Branches

- **`main`** - Production branch (deployed to lihsheng.space)
- **`development`** - Development branch (for testing and integration)
- **`feature/*`** - Feature branches (for individual features/fixes)

## Development Workflow

### 1. Starting New Work

```bash
# Create a new feature branch
npm run git:feature my-new-feature

# Or manually:
git checkout -b feature/my-new-feature
```

### 2. Making Changes

```bash
# Make your changes
# Add and commit as usual
git add .
git commit -m "feat: add new feature"
```

### 3. Merging to Development

```bash
# Merge your feature to development branch
npm run git:merge-dev

# Or manually:
git checkout development
git merge feature/my-new-feature
```

### 4. Testing in Development

```bash
# Switch to development branch
npm run git:dev

# Run tests and checks
npm run pre-deploy
npm run build

# Test locally
npm run dev
```

### 5. Deploying to Production

```bash
# Merge development to main
npm run git:merge-main

# Or manually:
git checkout main
git merge development

# Deploy to production
npm run deploy
```

## Git Helper Commands

The project includes helpful Git workflow commands:

```bash
npm run git:feature <name>  # Create a new feature branch
npm run git:dev             # Switch to development branch
npm run git:main            # Switch to main branch
npm run git:merge-dev       # Merge current branch to development
npm run git:merge-main      # Merge development to main
npm run git:status          # Show current status and recent commits
npm run git:help            # Show help for Git commands
```

## Branch Protection Rules

### Main Branch
- ✅ Direct pushes are discouraged
- ✅ Should only receive merges from development
- ✅ Represents production-ready code
- ✅ Automatically deployed to lihsheng.space

### Development Branch
- ✅ Integration branch for testing
- ✅ Receives merges from feature branches
- ✅ Should be tested before merging to main
- ✅ Can be deployed to staging/preview environments

### Feature Branches
- ✅ Short-lived branches for specific features
- ✅ Should be merged to development when complete
- ✅ Can be deleted after successful merge

## Deployment Strategy

### Development Deployment
```bash
# Deploy development branch to preview
git checkout development
npm run deploy:preview
```

### Production Deployment
```bash
# Deploy main branch to production
git checkout main
npm run deploy
```

## Best Practices

### Commit Messages
Use conventional commit format:
```
feat: add new feature
fix: resolve bug in component
docs: update documentation
style: format code
refactor: restructure component
test: add unit tests
chore: update dependencies
```

### Branch Naming
```
feature/user-authentication
feature/rss-feed
fix/contact-form-validation
docs/deployment-guide
```

### Code Quality
```bash
# Before committing
npm run lint          # Check code style
npm run type-check    # Check TypeScript
npm run build         # Ensure build works
npm run pre-deploy    # Run all checks
```

### Pull Request Workflow (if using GitHub)

1. **Create Feature Branch**
   ```bash
   npm run git:feature my-feature
   ```

2. **Make Changes and Commit**
   ```bash
   git add .
   git commit -m "feat: implement my feature"
   ```

3. **Push to Remote**
   ```bash
   git push origin feature/my-feature
   ```

4. **Create Pull Request**
   - Target: `development` branch
   - Include description of changes
   - Request review if working with team

5. **Merge and Clean Up**
   ```bash
   # After PR is merged
   git checkout development
   git pull origin development
   git branch -d feature/my-feature
   ```

## Environment-Specific Configuration

### Local Development
- Uses `.env.local`
- Hot reloading enabled
- Debug mode active

### Development Branch
- Can use preview deployments
- Test with production-like environment
- Validate all features work together

### Production (Main Branch)
- Uses Vercel environment variables
- Optimized builds
- Analytics enabled
- Full caching enabled

## Troubleshooting

### Merge Conflicts
```bash
# If conflicts occur during merge
git status                    # See conflicted files
# Edit files to resolve conflicts
git add .                     # Stage resolved files
git commit                    # Complete the merge
```

### Reset to Clean State
```bash
# Discard local changes
git checkout -- .

# Reset to last commit
git reset --hard HEAD

# Switch to clean development branch
npm run git:dev
git pull origin development
```

### Check Current Status
```bash
npm run git:status           # Show branch and recent commits
git log --oneline -10        # Show recent commit history
git branch -a                # Show all branches
```

This workflow ensures code quality, proper testing, and safe deployments to production! 🚀