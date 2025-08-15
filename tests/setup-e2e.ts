import 'dotenv/config';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { afterAll } from 'vitest';
import { PrismaClient } from '../src/generated/prisma';

const schemaId = randomUUID();

function generateDatabaseURL(_schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.');
  }
  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set('schema', _schemaId);
  return url.toString();
}

const databaseURL = generateDatabaseURL(schemaId);

process.env.DATABASE_URL = databaseURL;

execSync('pnpm prisma db push --skip-generate');

console.log(`E2E test environment ready with schema: ${schemaId}`);

afterAll(async () => {
  console.log(`Tearing down E2E test environment with schema: ${schemaId}`);
  const prisma = new PrismaClient();
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`);
  await prisma.$disconnect();
});