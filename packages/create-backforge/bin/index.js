#!/usr/bin/env node

// create-backforge initializer
// Delegates directly to backforge-core CLI

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

try {
  // Load the CJS version of backforge-core CLI
  const { run } = require('backforge-core/cli');
  
  // Execute the CLI
  run().catch((err) => {
    console.error('Error executing CLI:', err);
    process.exit(1);
  });
} catch (err) {
  console.error('Failed to load backforge-core/cli:', err);
  console.error(err);
  process.exit(1);
}
