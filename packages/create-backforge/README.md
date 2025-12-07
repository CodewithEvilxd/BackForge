# create-backforge

[![npm version](https://img.shields.io/npm/v/create-backforge.svg)](https://www.npmjs.com/package/create-backforge)
[![CI](https://github.com/Codewithevilxd/backforge/actions/workflows/ci.yml/badge.svg)](https://github.com/Codewithevilxd/backforge/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![Bun Version](https://img.shields.io/badge/bun-%3E%3D1.0.0-orange)

**Official initializer for [BackForge](https://github.com/Codewithevilxd/backforge)** - Create production-ready backend projects with enterprise security and logging in seconds.

## Quick Start

### Using npm (Recommended)

```bash
npm create backforge@latest
```

### With Project Name

```bash
npm create backforge@latest my-backend
```

### Other Package Managers

```bash
# pnpm
pnpm create backforge

# yarn
yarn create backforge

# bun
bunx create-backforge
```

## What You Get

Every project includes:

### Security (Production-Ready)

- ✅ **helmet()** - Security HTTP headers
- ✅ **cors()** - Cross-origin resource sharing
- ✅ **rateLimit()** - DDoS protection (100 req/15min)
- ✅ **hpp()** - HTTP parameter pollution prevention
- ✅ **compression()** - Response compression
- ✅ **Body limits** - Memory exhaustion prevention

### Logging & Monitoring

- ✅ **Winston** - Enterprise-grade logging
- ✅ **Daily rotation** - 30-day retention, 20MB max size
- ✅ **Structured logs** - JSON format (error, combined, exceptions)
- ✅ **HTTP logging** - Morgan middleware integration
- ✅ **Production-ready** - Compatible with DataDog, Splunk, ELK

### Error Handling

- ✅ **Async error handling** - No try/catch needed
- ✅ **Centralized errors** - Single error middleware
- ✅ **Graceful shutdown** - Proper cleanup on exit
- ✅ **Unhandled rejections** - No silent crashes

## Stack Options

### Choose Your Stack

- **Runtimes**: Node.js or Bun (auto-detected)
- **Languages**: TypeScript or JavaScript
- **Frameworks**: Express or Fastify
- **ORMs**: Mongoose (MongoDB) or Prisma (SQL)

**Total: 8 template combinations** - All fully tested and production-ready.

## How It Works

`create-backforge` is a lightweight initializer that:

1. Detects your runtime (Node.js or Bun)
2. Detects your package manager (npm, pnpm, yarn, or bun)
3. Downloads `backforge-core`
4. Runs the interactive setup
5. Generates your project

**No installation required** - Everything works via `npm create`.

## Interactive Setup

Running `npm create backforge` starts an interactive CLI:

```
? Project name: my-backend
? Select a language: TypeScript
? Select a framework: Express
? Select an ORM: Mongoose
? Install dependencies? Yes

✓ Project created at ./my-backend
✓ Dependencies installed
✓ Ready to start!

cd my-backend
npm run dev
```

## Generated Project

```
my-backend/
├── src/
│   ├── config/
│   │   ├── database.ts      # DB connection
│   │   └── logger.ts        # Winston config
│   ├── controllers/         # Route controllers
│   ├── models/              # Database models
│   │   └── User.model.ts    # Example model
│   ├── routes/              # API routes
│   │   └── health.routes.ts
│   ├── services/            # Business logic
│   ├── middlewares/         # Custom middlewares
│   ├── utils/               # Utilities
│   ├── app.ts               # App + security
│   └── server.ts            # Entry point
├── logs/                    # Auto-generated
├── .env                     # Environment vars
├── .gitignore
├── package.json
├── tsconfig.json            # (if TypeScript)
└── README.md
```

## Example: What Your API Includes

```typescript
// app.ts - Already configured for you!

import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';

const app = express();

// Security
app.use(helmet());
app.use(cors());
app.use(hpp());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use('/api/', limiter);

// ... and more!
```

## Environment Variables

Configure via `.env`:

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
LOG_LEVEL=info
```

## Commands

Run these in your generated project:

```bash
# Development
npm run dev        # Start with auto-reload
npm start          # Production mode

# Build (TypeScript)
npm run build      # Compile to dist/

# Linting
npm run lint       # Check code quality
npm run lint:fix   # Auto-fix issues

# Formatting
npm run format     # Format code
```

## Package Comparison

BackForge offers three packages for different use cases:

### create-backforge (This Package)

**Best for**: End users creating new projects

```bash
npm create backforge@latest
```

**What it does**: Lightweight initializer that downloads and runs `backforge-core`

### backforge-core

**Best for**: Direct usage or programmatic access

```bash
npx backforge-core
```

**What it does**: Core library with all templates and scaffolding logic

### backforge-cli

**Best for**: Users who prefer global installation

```bash
npm install -g backforge-cli
backforge
```

**What it does**: Global CLI wrapper around `backforge-core`

## Why create-backforge?

- **Zero installation**: Works via `npm create`
- **Always latest**: Downloads current version of `backforge-core`
- **Standard pattern**: Follows npm init/create conventions
- **Package manager friendly**: Works with npm, pnpm, yarn, bun

## FAQ

### Do I need to install create-backforge?

No! Use `npm create backforge` to run it directly without installation.

### What's the difference between create-backforge and backforge-core?

`create-backforge` is a thin wrapper that downloads and runs `backforge-core`. Use `create-backforge` via `npm create backforge`.

### Can I use with Bun?

Yes! BackForge fully supports Bun runtime. Use `bunx create-backforge`.

### Can I customize the templates?

Yes, after generation. All code is yours to modify. No vendor lock-in.

### Is this production-ready?

Absolutely! All templates include:
- Security middlewares (helmet, cors, rate-limit, hpp)
- Enterprise logging (Winston with daily rotation)
- Error handling (async errors, centralized middleware)
- Best practices (TypeScript strict mode, ESLint, Prettier)

## Links

- **Main Project**: https://github.com/Codewithevilxd/backforge
- **npm (create-backforge)**: https://www.npmjs.com/package/create-backforge
- **npm (backforge-core)**: https://www.npmjs.com/package/backforge-core
- **npm (backforge-cli)**: https://www.npmjs.com/package/backforge-cli
- **Website**: https://Codewithevilxd.org
- **Documentation**: https://Codewithevilxd.org/docs
- **Issues**: https://github.com/Codewithevilxd/backforge/issues

## License

MIT © [BackForge](https://github.com/Codewithevilxd/backforge)

---

Part of [BackForge](https://github.com/Codewithevilxd/backforge) - Production-ready backends in seconds.
