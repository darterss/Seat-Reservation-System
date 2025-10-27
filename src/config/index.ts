export interface AppConfig {
  port: number;
  nodeEnv: string;
  database: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };
}

export const config: AppConfig = {
  port: parseInt(process.env['PORT'] || '3000', 10),
  nodeEnv: process.env['NODE_ENV'] || 'development',
  database: {
    host: process.env['DB_HOST'] || 'localhost',
    port: parseInt(process.env['DB_PORT'] || '5432', 10),
    database: process.env['DB_NAME'] || 'seat_reservation',
    user: process.env['DB_USER'] || 'user',
    password: process.env['DB_PASSWORD'] || 'password',
  },
};