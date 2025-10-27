import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './dist/src/models/index.js',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env['DB_HOST'] || 'localhost',
    port: parseInt(process.env['DB_PORT'] || '5432', 10),
    user: process.env['DB_USER'] || 'user',
    password: process.env['DB_PASSWORD'] || 'password',
    database: process.env['DB_NAME'] || 'seat_reservation',
    ssl: false,
  },
});