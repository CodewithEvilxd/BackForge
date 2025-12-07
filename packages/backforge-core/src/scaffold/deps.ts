export type Runtime = 'nodejs' | 'bun';
export type Language = 'ts' | 'js';
export type ORM = 'mongoose' | 'prisma';
export type Framework = 'express' | 'fastify';

export interface StackInput {
  runtime: Runtime;
  language: Language;
  orm: ORM;
  framework: Framework;
}

export interface StackDeps {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  peerDependencies?: Record<string, string>;
  scripts?: Record<string, string>;
}

const versions = {
  express: '^5.1.0',
  fastify: '^5.6.2',
  fastify_plugin: '^5.1.0',
  fastify_helmet: '^13.0.2',
  fastify_compress: '^8.3.0',
  fastify_rate_limit: '^10.3.0',
  fastify_cors: '^11.1.0',
  compression: '^1.8.1',
  cors: '^2.8.5',
  express_async_errors: '^3.1.1',
  express_rate_limit: '^8.2.1',
  helmet: '^8.1.0',
  hpp: '^0.2.3',
  joi: '^18.0.1',
  mongoose: '^8.19.4',
  prisma_cli: '^6.19.0',
  prisma_client: '^6.19.0',
  dotenv: '^16.4.5',
  prom_client: '^15.1.3',
  uuid: '^13.0.0',
  winston: '^3.18.3',
  winston_daily_rotate_file: '^5.0.0',
  morgan: '^1.10.1',
  nodemon: '^3.1.11',
  eslint: '^9.39.1',
  typescript: '^5.9.3',
  ts_node: '^10.9.0',
  tslib: '^2.6.0',
  types_node: '^20.11.0',
  types_express: '^4.17.21',
  types_mongoose: '^5.11.97',
  types_joi: '^17.2.3',
  esbuild: '^0.25.12',
  pino: '^9.2.0',
  pino_pretty: '^10.3.0',
  tsx: '^4.19.0',
  rimraf: '^6.0.1',
  prettier: '^3.3.3',
  eslint_config_prettier: '^9.1.0',
  typescript_eslint: '^8.0.0',
  globals: '^15.14.0',
  eslint_js: '^9.0.0',
  bcrypt: '^5.1.0',
  jsonwebtoken: '^9.0.0',
  swagger_jsdoc: '^6.2.0',
  swagger_ui_express: '^5.0.0',
  jest: '^29.0.0',
  ts_jest: '^29.0.0',
  mongodb_memory_server: '^10.0.0',
  supertest: '^7.0.0',
  types_bcrypt: '^5.0.0',
  types_jsonwebtoken: '^9.0.0',
  types_supertest: '^6.0.0',
};

export function resolveDeps(input: StackInput): StackDeps {
  const deps: Record<string, string> = {};
  const dev: Record<string, string> = {};
  const peer: Record<string, string> = {};
  const scripts: Record<string, string> = {};

  deps.dotenv = versions.dotenv;
  deps['prom-client'] = versions.prom_client;
  deps.uuid = versions.uuid;
  deps.winston = versions.winston;
  deps['winston-daily-rotate-file'] = versions.winston_daily_rotate_file;
  deps.bcrypt = versions.bcrypt;
  deps.jsonwebtoken = versions.jsonwebtoken;
  deps['swagger-jsdoc'] = versions.swagger_jsdoc;
  deps['swagger-ui-express'] = versions.swagger_ui_express;

  if (input.framework === 'express') {
    deps.express = versions.express;
    deps.compression = versions.compression;
    deps.cors = versions.cors;
    deps['express-rate-limit'] = versions.express_rate_limit;
    deps.helmet = versions.helmet;
    deps.hpp = versions.hpp;
    deps.joi = versions.joi;
    deps.morgan = versions.morgan;
    scripts.start =
      input.runtime === 'bun' ? 'bun run src/server.js' : 'node src/server.js';
    scripts.dev =
      input.runtime === 'bun'
        ? 'bun run src/server.js'
        : 'nodemon --watch src --exec "node src/server.js"';
  }

  if (input.framework === 'fastify') {
    deps.fastify = versions.fastify;
    deps['@fastify/helmet'] = versions.fastify_helmet;
    deps['@fastify/compress'] = versions.fastify_compress;
    deps['@fastify/rate-limit'] = versions.fastify_rate_limit;
    deps['@fastify/cors'] = versions.fastify_cors;
    deps['fastify-plugin'] = versions.fastify_plugin;
    deps.joi = versions.joi;
    deps.pino = versions.pino;
    deps['pino-pretty'] = versions.pino_pretty;
    scripts.start =
      input.runtime === 'bun' ? 'bun run src/server.js' : 'node src/server.js';
    scripts.dev =
      input.runtime === 'bun'
        ? 'bun run src/server.js'
        : 'nodemon --watch src --exec "node src/server.js"';
  }

  if (input.orm === 'mongoose') {
    deps.mongoose = versions.mongoose;
  }

  if (input.orm === 'prisma') {
    deps['@prisma/client'] = versions.prisma_client;
    dev.prisma = versions.prisma_cli;
    scripts.postinstall = 'prisma generate';
  }

  if (input.language === 'ts') {
    dev.typescript = versions.typescript;
    dev.tsx = versions.tsx;
    dev.rimraf = versions.rimraf;
    dev.prettier = versions.prettier;
    dev['eslint-config-prettier'] = versions.eslint_config_prettier;
    dev['typescript-eslint'] = versions.typescript_eslint;
    dev.globals = versions.globals;
    dev['@eslint/js'] = versions.eslint_js;
    dev.tslib = versions.tslib;
    dev['@types/node'] = versions.types_node;
    dev.eslint = versions.eslint;
    
    if (input.framework === 'express') {
      dev['@types/express'] = versions.types_express;
      dev['@types/cors'] = '^2.8.17';
      dev['@types/hpp'] = '^0.2.5';
      dev['@types/compression'] = '^1.7.5';
      dev['@types/morgan'] = '^1.9.9';
      dev.jest = versions.jest;
      dev['ts-jest'] = versions.ts_jest;
      dev['mongodb-memory-server'] = versions.mongodb_memory_server;
      dev.supertest = versions.supertest;
      dev['@types/bcrypt'] = versions.types_bcrypt;
      dev['@types/jsonwebtoken'] = versions.types_jsonwebtoken;
      dev['@types/supertest'] = versions.types_supertest;
    }
      
    scripts.build = 'rimraf dist && tsc';
    scripts.format = 'prettier --write "src/**/*.ts"';
    scripts.lint = 'eslint "src/**/*.ts" --fix';
    scripts.test = 'jest';
    scripts['test:watch'] = 'jest --watch';
    scripts['test:coverage'] = 'jest --coverage';
    
    if (input.runtime === 'bun') {
      scripts.dev = 'bun run --watch src/server.ts';
      scripts.start = 'bun run src/server.ts';
    } else {
      scripts.dev = 'tsx watch src/server.ts';
      scripts.start = 'node dist/server.js';
    }
  } else {
    dev.nodemon = versions.nodemon;
    dev.eslint = dev.eslint || versions.eslint;
    dev.prettier = versions.prettier;
    dev['eslint-config-prettier'] = versions.eslint_config_prettier;
    dev.globals = versions.globals;
    dev['@eslint/js'] = versions.eslint_js;
    
    scripts.format = 'prettier --write "src/**/*.js"';
    scripts.lint = 'eslint "src/**/*.js" --fix';

    if (input.runtime === 'bun') {
      scripts.dev = 'bun run --watch src/server.js';
      scripts.start = 'bun run src/server.js';
    } else {
      // Default JS scripts
      scripts.dev = 'nodemon src/server.js';
      scripts.start = 'node src/server.js';
    }
  }

  if (input.runtime === 'nodejs') {
    dev.esbuild = versions.esbuild;
  }

  return {
    dependencies: deps,
    devDependencies: dev,
    peerDependencies: peer,
    scripts,
  };
}

export function getFeatureDependencies(features: string[], _language: 'ts' | 'js') {
  const deps: Record<string, string> = {};
  const dev: Record<string, string> = {};
  const scripts: Record<string, string> = {};

  if (features.includes('oauth')) {
    deps['passport'] = '^0.7.0';
    deps['passport-google-oauth20'] = '^2.0.0';
    deps['passport-github2'] = '^0.1.12';
  }

  if (features.includes('clerk-auth')) {
    deps['@clerk/clerk-sdk-node'] = '^4.13.14';
    deps['@clerk/express'] = '^0.1.7';
  }

  if (features.includes('graphql')) {
    deps['apollo-server-express'] = '^3.13.0';
    deps['graphql'] = '^16.8.1';
    deps['class-validator'] = '^0.14.1';
    deps['type-graphql'] = '^2.0.0-beta.6';
  }

  if (features.includes('microservices')) {
    deps['kafkajs'] = '^2.2.4';
    deps['amqplib'] = '^0.10.4';
    deps['redis'] = '^4.6.13';
    deps['axios'] = '^1.6.7';
  }

  if (features.includes('websocket')) {
    deps['socket.io'] = '^4.7.5';
    deps['socket.io-client'] = '^4.7.5';
  }

  if (features.includes('message-queue')) {
    deps['amqplib'] = '^0.10.4';
  }

  if (features.includes('s3-upload')) {
    deps['aws-sdk'] = '^2.1606.0';
    deps['multer'] = '^1.4.5-lts.1';
    deps['multer-s3'] = '^3.0.1';
    deps['uuid'] = '^9.0.1';
  }

  if (features.includes('email')) {
    deps['@sendgrid/mail'] = '^8.1.3';
    deps['nodemailer'] = '^6.9.13';
  }

  if (features.includes('payment-stripe')) {
    deps['stripe'] = '^15.7.0';
  }

  if (features.includes('payment-razorpay')) {
    deps['razorpay'] = '^2.9.2';
  }

  if (features.includes('admin-dashboard')) {
    deps['adminjs'] = '^7.1.0';
    deps['@adminjs/express'] = '^6.1.0';
    deps['@adminjs/mongoose'] = '^4.0.0';
  }

  if (features.includes('migrations-ui')) {
    deps['migrate-mongo'] = '^11.0.0';
  }

  if (features.includes('load-testing')) {
    dev['k6'] = '^0.52.0';
  }

  return {
    dependencies: deps,
    devDependencies: dev,
    scripts,
  };
}
