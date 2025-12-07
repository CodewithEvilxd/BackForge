# backforge-cli

[![npm version](https://img.shields.io/npm/v/backforge-cli.svg)](https://www.npmjs.com/package/backforge-cli)
[![CI](https://github.com/Codewithevilxd/backforge/actions/workflows/ci.yml/badge.svg)](https://github.com/Codewithevilxd/backforge/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![Bun Version](https://img.shields.io/badge/bun-%3E%3D1.0.0-orange)

**Global CLI for [BackForge](https://github.com/Codewithevilxd/backforge)** - Production-ready backend scaffolder with enterprise-grade security and logging.

## Installation

```bash
npm install -g backforge-cli
```

## Usage

```bash
# Interactive mode
backforge

# With project name
backforge my-backend

# Skip dependency installation
backforge my-backend --no-install
```

## What is backforge-cli?

`backforge-cli` is a global CLI wrapper around `backforge-core`. It provides a convenient `backforge` command for users who prefer global installation.

### When to use backforge-cli?

**Use backforge-cli if you**:
- Prefer global CLI tools
- Want a short command (`backforge` instead of `npx backforge-core`)
- Create BackForge projects frequently

**Use create-backforge if you**:
- Prefer not installing global packages
- Want to always use the latest version
- Follow npm create/init conventions

```bash
# Using backforge-cli (global)
npm install -g backforge-cli
backforge my-project

# Using create-backforge (recommended)
npm create backforge@latest my-project
```

## Features

Every BackForge project includes production-ready features:

### Security

- **helmet()** - Security HTTP headers (prevents XSS, clickjacking, etc.)
- **cors()** - Configurable cross-origin resource sharing
- **rateLimit()** - DDoS protection (100 requests per 15 minutes per IP)
- **hpp()** - HTTP parameter pollution prevention
- **compression()** - Response compression
- **Body limits** - Prevents memory exhaustion (10MB default)

### Logging & Monitoring

- **Winston** - Enterprise-grade structured logging
- **Daily rotation** - Automatic log archival (30-day retention)
- **Separate logs** - error.log, combined.log, exceptions.log
- **HTTP logging** - Morgan middleware integration
- **JSON format** - Compatible with DataDog, Splunk, ELK, CloudWatch

### Error Handling

- **Async error handling** - express-async-errors (no try/catch needed)
- **Centralized middleware** - Single error handler
- **Graceful shutdown** - Proper cleanup on SIGTERM/SIGINT
- **Unhandled rejections** - No silent crashes

## Stack Options

Choose from 8 production-tested combinations:

- **Runtimes**: Node.js or Bun (auto-detected)
- **Languages**: TypeScript or JavaScript
- **Frameworks**: Express or Fastify
- **ORMs**: Mongoose (MongoDB) or Prisma (SQL)

## Commands

```bash
# Create new project
backforge my-backend

# Skip installation
backforge my-backend --no-install

# Help
backforge --help

# Version
backforge --version
```

## Generated Project Structure

```
my-backend/
├── src/
│   ├── config/
│   │   ├── database.ts      # Database connection with retry
│   │   └── logger.ts        # Winston + daily rotation
│   ├── controllers/         # Route controllers
│   ├── models/              # Database models
│   │   └── User.model.ts    # Example user model
│   ├── routes/              # API routes
│   │   └── health.routes.ts
│   ├── services/            # Business logic
│   ├── middlewares/         # Custom middlewares
│   ├── utils/               # Utility functions
│   ├── app.ts               # App + security setup
│   └── server.ts            # Entry point + graceful shutdown
├── logs/                    # Auto-generated logs
├── .env                     # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json            # (TypeScript projects)
└── README.md
```

## Example Output

```typescript
// app.ts - Security already configured!

import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import compression from 'compression';
import logger from './config/logger';

const app = express();

// Security middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(hpp());

// Rate limiting (DDoS protection)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // 100 requests per IP
});
app.use('/api/', limiter);

// Compression
app.use(compression());

// HTTP request logging
app.use(morgan('combined', {
  stream: { write: (msg) => logger.info(msg.trim()) }
}));
```

## Package Ecosystem

BackForge provides three packages:

### 1. create-backforge (Recommended for most users)

```bash
npm create backforge@latest
```

**Advantages**:
- No installation needed
- Always uses latest version
- Standard npm create pattern

### 2. backforge-core (For direct usage)

```bash
npx backforge-core
```

**Advantages**:
- Direct access to core library
- Can be used programmatically
- No global installation

### 3. backforge-cli (This package - for global CLI)

```bash
npm install -g backforge-cli
backforge
```

**Advantages**:
- Short command (`backforge`)
- Installed once, use anywhere
- Traditional CLI feel

## Environment Variables

Configure your generated project:

```bash
# Server
PORT=3000
NODE_ENV=development

# Database (MongoDB)
MONGODB_URI=mongodb://localhost:27017/myapp

# Database (Prisma - PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# Security
CORS_ORIGIN=https://yourdomain.com

# Logging
LOG_LEVEL=info  # error | warn | info | debug
```

## Development Workflow

After generating a project:

```bash
# Install dependencies (if skipped)
npm install

# Development mode (auto-reload)
npm run dev

# Production mode
npm start

# Build (TypeScript only)
npm run build

# Linting
npm run lint
npm run lint:fix

# Formatting
npm run format
```

## Updating

```bash
# Update to latest version
npm update -g backforge-cli

# Check current version
backforge --version
```

## Uninstalling

```bash
npm uninstall -g backforge-cli
```

## Why Global CLI?

Some developers prefer global CLIs because:

- **Shorter commands**: `backforge` vs `npm create backforge`
- **Faster execution**: No download on each run
- **Familiar pattern**: Like `create-react-app`, `vue create`, etc.
- **Offline usage**: Works without internet (after installation)

## Links

- **Main Project**: https://github.com/Codewithevilxd/backforge
- **npm (backforge-cli)**: https://www.npmjs.com/package/backforge-cli
- **npm (backforge-core)**: https://www.npmjs.com/package/backforge-core
- **npm (create-backforge)**: https://www.npmjs.com/package/create-backforge
- **Website**: https://Codewithevilxd.org
- **Documentation**: https://Codewithevilxd.org/docs
- **Issues**: https://github.com/Codewithevilxd/backforge/issues

## License

MIT © [BackForge](https://github.com/Codewithevilxd/backforge)

---

Part of [BackForge](https://github.com/Codewithevilxd/backforge) - Production-ready backends in seconds.
