import Fastify from 'fastify';
import { config } from './config/index.js';
import { closeDb } from './database/connection.js';
import { registerRoutes } from './routes/index.js';
import { errorHandler, notFoundHandler } from './utils/error-handler.js';

export async function buildApp() {
  const app = Fastify({
    logger: {
      level: config.nodeEnv === 'production' ? 'info' : 'debug',
    },
  });

  // Регистрируем обработчики ошибок
  app.setErrorHandler(errorHandler);
  app.setNotFoundHandler(notFoundHandler);

  // Регистрируем маршруты
  await registerRoutes(app);

  return app;
}

export async function start() {
  const app = await buildApp();

  try {
    await app.listen({ port: config.port, host: '0.0.0.0' });
    console.log(`Server is running on port ${config.port}`);
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }

  // Graceful shutdown
  const gracefulShutdown = async (signal: string) => {
    console.log(`Received ${signal}, shutting down gracefully...`);
    
    try {
      await app.close();
      await closeDb();
      console.log('Server closed successfully');
      process.exit(0);
    } catch (error) {
      console.error('Error during shutdown:', error);
      process.exit(1);
    }
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
}

// Запуск приложения, если файл запущен напрямую
if (process.argv[1] && (process.argv[1].endsWith('app.js') || process.argv[1].endsWith('app.ts'))) {
  start().catch(console.error);
}
