# Developer Portfolio Website

A modern, responsive developer portfolio website built with Next.js 16, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **Font**: Inter (Google Fonts)
- **Animations**: Framer Motion
- **Theme**: next-themes (dark/light mode)
- **Testing**: Playwright (via MCP)
- **Linting**: ESLint
- **Formatting**: Prettier

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## Features Implemented

✅ **Core Setup**
- Next.js 16 with TypeScript and App Router
- Tailwind CSS 4 with custom theme and dark mode
- Inter font integration for modern typography
- Site configuration and type definitions

✅ **Components**
- Navigation with mobile hamburger menu and active route highlighting
- Theme toggle (light/dark/system)
- Footer with social links, quick navigation, and RSS feed link
- Responsive layouts for all screen sizes

✅ **SEO & Metadata**
- Structured data (JSON-LD) for Person schema
- OpenGraph and Twitter card metadata
- Comprehensive metadata configuration

## Project Structure

```
.
├── .kiro/
│   ├── settings/        # Kiro IDE settings (MCP config)
│   ├── specs/           # Feature specifications and tasks
│   └── steering/        # AI assistant guidance documents
├── app/
│   ├── layout.tsx       # Root layout with theme provider
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles and CSS variables
├── components/
│   ├── Analytics.tsx    # Analytics integration component
│   ├── Footer.tsx       # Footer with social links and navigation
│   ├── Navigation.tsx   # Main navigation with mobile support
│   ├── StructuredData.tsx # JSON-LD structured data
│   ├── ThemeProvider.tsx  # Theme context provider
│   └── ThemeToggle.tsx    # Dark/light mode toggle
├── lib/
│   └── site-config.ts   # Site metadata and configuration
├── types/
│   └── index.ts         # TypeScript type definitions
└── public/              # Static assets (to be added)
```

## Configuration Files

- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration (strict mode enabled)
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.mjs` - PostCSS configuration
- `.eslintrc.json` - ESLint configuration
- `.prettierrc` - Prettier configuration

## Playwright MCP Setup (for Kiro IDE)

This project uses Playwright MCP (Model Context Protocol) for automated browser testing and UI verification.

### Configuration

The Playwright MCP server is configured in `.kiro/settings/mcp.json`:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server@latest"],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

### Installation

1. **Install Playwright** (if not already installed):
   ```bash
   npm install -D @playwright/test
   ```

2. **Install Browser Binaries**:
   
   The MCP server uses a specific version of Playwright. You need to install the matching Chromium version:
   
   ```bash
   # Install the specific version that matches the MCP server
   npx playwright@1.53.1 install chromium
   ```

### Troubleshooting

#### Problem: "Executable doesn't exist" Error

**Symptom**: When using Playwright MCP, you get an error like:
```
Failed to initialize browser: browserType.launch: Executable doesn't exist at 
C:\Users\[User]\AppData\Local\ms-playwright\chromium-1179\chrome-win\chrome.exe
```

**Cause**: Version mismatch between your local Playwright installation and the MCP server's Playwright version.

**Solution**:

1. Check what Chromium version the MCP server needs (from the error message, e.g., `chromium-1179`)

2. Find the matching Playwright version:
   - chromium-1179 = Playwright 1.53.1
   - chromium-1194 = Playwright 1.56.1
   - Check [Playwright releases](https://github.com/microsoft/playwright/releases) for version mapping

3. Install the specific version:
   ```bash
   npx playwright@1.53.1 install chromium
   ```

4. Restart the MCP server in Kiro:
   - Open Command Palette (Ctrl+Shift+P)
   - Search for "MCP: Reconnect Servers"
   - Select it to restart

#### Verifying Installation

Check installed browser versions:
```bash
dir "%LOCALAPPDATA%\ms-playwright"
```

You should see folders like `chromium-1179`, `chromium-1194`, etc.

### Usage

Once configured, you can use Playwright through Kiro to:
- Navigate to your site and take screenshots
- Verify UI elements are displaying correctly
- Test responsive layouts
- Check font loading and styling
- Validate component functionality

## Recent Changes

### Font Fix (2025-10-31)
- Fixed typography issue where Times New Roman was displaying instead of Inter
- Updated `tailwind.config.ts` to properly reference the Inter font variable
- Site now uses modern Inter font for improved readability and professional appearance

### Footer Component (2025-10-31)
- Implemented responsive footer with social links (GitHub, LinkedIn, Twitter, Email)
- Added quick navigation links and RSS feed link
- Included copyright information with dynamic year
- Supports dark mode with proper color theming

## Next Steps

Follow the implementation plan in `.kiro/specs/developer-portfolio-website/tasks.md` to continue building the portfolio.

**Next tasks to implement:**
- Task 8: Set up MDX configuration
- Task 9: Create content management utilities
- Task 10: Build Hero section for homepage
