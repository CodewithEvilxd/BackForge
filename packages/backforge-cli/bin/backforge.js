#!/usr/bin/env node

// Import the CLI entry point from backforge-core
// We use a try-catch to handle cases where backforge-core is not built yet or path is wrong
try {
  const core = require('backforge-core/dist/cli/index.js');
  if (core.main) {
    core.main();
  } else {
    console.error('Error: backforge-core/dist/cli/index.js does not export main()');
    process.exit(1);
  }
} catch (err) {
  console.error('Error: Could not load backforge-core. Make sure it is built.');
  console.error(err);
  process.exit(1);
}
