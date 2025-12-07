import * as p from '@clack/prompts';
import pc from 'picocolors';
import type { CLIOptions } from '../types';

export async function askQuestions(): Promise<CLIOptions> {


  const language = await p.select({
    message: 'Choose a language',
    options: [
      { value: 'ts', label: 'TypeScript' },
      { value: 'js', label: 'JavaScript' },
    ],
  });
  if (p.isCancel(language)) {
    p.cancel('Operation aborted');
    process.exit(1);
  }

  const orm = await p.select({
    message: 'Choose an ORM',
    options: [
      { value: 'mongoose', label: 'Mongoose' },
      { value: 'prisma', label: 'Prisma' },
    ],
  });
  if (p.isCancel(orm)) {
    p.cancel('Operation aborted');
    process.exit(1);
  }

  const framework = await p.select({
    message: 'Choose a framework',
    options: [
      { value: 'express', label: 'Express' },
      { value: 'fastify', label: 'Fastify' },
    ],
  });
  if (p.isCancel(framework)) {
    p.cancel('Operation aborted');
    process.exit(1);
  }

  const projectName = await p.text({
    message: 'Project name',
    placeholder: 'my-app',
    defaultValue: 'my-app',
    validate(value) {
      if (!String(value).trim()) return 'Name cannot be empty';
      return undefined;
    },
  });
  if (p.isCancel(projectName)) {
    p.cancel('Operation aborted');
    process.exit(1);
  }

  // Additional features
  const features = await p.multiselect({
    message: 'Choose additional features (use SPACEBAR to select/deselect, ARROW keys to navigate, ENTER to confirm)',
    options: [
      { value: 'oauth', label: 'OAuth 2.0 (Google, GitHub)', hint: 'Social login integration' },
      { value: 'clerk-auth', label: 'Clerk Authentication', hint: 'Modern auth service' },
      { value: 'graphql', label: 'GraphQL (Apollo Server)', hint: 'GraphQL API with Apollo' },
      { value: 'microservices', label: 'Microservices Template', hint: 'Service discovery & communication' },
      { value: 'websocket', label: 'WebSocket (Socket.io)', hint: 'Real-time communication' },
      { value: 'message-queue', label: 'Message Queue (RabbitMQ)', hint: 'Async messaging' },
      { value: 's3-upload', label: 'S3 File Upload', hint: 'AWS S3 integration' },
      { value: 'email', label: 'Email Service (SendGrid)', hint: 'Transactional emails' },
      { value: 'payment-stripe', label: 'Payment (Stripe)', hint: 'Global payment processing' },
      { value: 'payment-razorpay', label: 'Payment (Razorpay)', hint: 'Indian payment gateway' },
      { value: 'admin-dashboard', label: 'Admin Dashboard', hint: 'Basic admin interface' },
      { value: 'migrations-ui', label: 'Database Migrations UI', hint: 'Web-based migrations' },
      { value: 'load-testing', label: 'Load Testing (k6)', hint: 'Performance testing scripts' },
    ],
    required: false,
  }) as string[];

  // Show selected features
  if (features && features.length > 0) {
    console.log('\n📋 Selected features:');
    features.forEach((feature: string) => {
      const option = [
        { value: 'oauth', label: 'OAuth 2.0 (Google, GitHub)' },
        { value: 'clerk-auth', label: 'Clerk Authentication' },
        { value: 'graphql', label: 'GraphQL (Apollo Server)' },
        { value: 'microservices', label: 'Microservices Template' },
        { value: 'websocket', label: 'WebSocket (Socket.io)' },
        { value: 'message-queue', label: 'Message Queue (RabbitMQ)' },
        { value: 's3-upload', label: 'S3 File Upload' },
        { value: 'email', label: 'Email Service (SendGrid)' },
        { value: 'payment-stripe', label: 'Payment (Stripe)' },
        { value: 'payment-razorpay', label: 'Payment (Razorpay)' },
        { value: 'admin-dashboard', label: 'Admin Dashboard' },
        { value: 'migrations-ui', label: 'Database Migrations UI' },
        { value: 'load-testing', label: 'Load Testing (k6)' },
      ].find(opt => opt.value === feature);
      console.log(`  ✅ ${option?.label}`);
    });
    console.log('');
  }
  if (p.isCancel(features)) {
    p.cancel('Operation aborted');
    process.exit(1);
  }

  p.log.info(pc.green('Configuration complete'));

  return {
    language: language as CLIOptions['language'],
    orm: orm as CLIOptions['orm'],
    framework: framework as CLIOptions['framework'],
    projectName: String(projectName),
    features: features as string[],
  };
}
