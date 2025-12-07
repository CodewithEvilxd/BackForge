// @ts-ignore - Dependencies will be available in generated projects
import { MongoMemoryServer } from 'mongodb-memory-server';
// @ts-ignore - Dependencies will be available in generated projects
import mongoose from 'mongoose';

// Jest global types (available in generated projects)
declare const beforeAll: (fn: () => void | Promise<void>) => void;
declare const afterAll: (fn: () => void | Promise<void>) => void;
declare const afterEach: (fn: () => void | Promise<void>) => void;

let mongoServer: MongoMemoryServer;

// Setup test database
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

// Cleanup after all tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Clear database between tests
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});