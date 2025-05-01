import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('production'),
  DATABASE_URL: z
    .string()
    .default('postgresql://docker:docker@localhost:5432/dailyDiet'),
  PORT: z.number().default(3333),
  JWT_SECRET: z.string().default('my_super_secret'),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('👀 invalid enviroment variable ', _env.error.format());
  throw new Error('invalid enviroment variable');
}

export const env = _env.data;
