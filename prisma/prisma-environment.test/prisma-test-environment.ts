import 'dotenv/config';
import { randomUUID } from 'node:crypto';
import type { Environment } from 'vitest';
import { execSync } from 'node:child_process';

function generateDatabaseURL(schemaName: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please, provide a DATABASE_URL env variable');
  }
  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set('schema', schemaName);

  return url.toString();
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'web',
  async setup() {
    const schema = randomUUID();
    const databaseURL = generateDatabaseURL(schema);
    process.env.DATABASE_URL = databaseURL;
    console.log(databaseURL);

    execSync('pnpm prisma migrate deploy');

    return {
      async teardown() {
        console.log('teardown');
      },
    };
  },
};
