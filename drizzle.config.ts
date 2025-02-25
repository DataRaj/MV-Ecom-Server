// import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/**/entities/*.entity.ts',
  out: './drizzle',
  dbCredentials: {
    url: process.env.POSTGRESQL_NEON_DB_URL!,
  },
});
