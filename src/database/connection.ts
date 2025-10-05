import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { config } from '../config/index.js';
import * as schema from '../models/index.js';

// Создание пула соединений
const pool = new Pool({
  host: config.database.host,
  port: config.database.port,
  database: config.database.database,
  user: config.database.user,
  password: config.database.password,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  // SSL configuration - в production должно быть включено
  // В Docker контейнерах SSL обычно не нужен для внутренних соединений
  ssl: false,
});

// Создание экземпляра Drizzle
export const db = drizzle(pool, { schema });

// Функция для закрытия соединения
export async function closeDb(): Promise<void> {
  await pool.end();
}

// Функция для проверки здоровья БД
export async function healthCheck(): Promise<boolean> {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}