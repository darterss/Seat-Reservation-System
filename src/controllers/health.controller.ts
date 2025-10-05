import { FastifyRequest, FastifyReply } from 'fastify';
import { healthCheck } from '../database/connection.js';

export class HealthController {
  async check(_request: FastifyRequest, reply: FastifyReply) {
    try {
      const isHealthy = await healthCheck();
      if (isHealthy) {
        return reply.send({ status: 'healthy', timestamp: new Date().toISOString() });
      } else {
        return reply.status(503).send({ status: 'unhealthy', timestamp: new Date().toISOString() });
      }
    } catch (error) {
      return reply.status(503).send({ 
        status: 'unhealthy', 
        error: 'Health check failed',
        timestamp: new Date().toISOString() 
      });
    }
  }
}


