import { FastifyRequest, FastifyReply } from 'fastify';
import { eventService } from '../services/index.js';
import { CreateEventRequest } from '../models/index.js';

export class EventController {
  async createEvent(request: FastifyRequest<{ Body: CreateEventRequest }>, reply: FastifyReply) {
    try {
      const eventData = request.body;
      
      // Валидация
      if (!eventData.name || !eventData.totalSeats) {
        return reply.status(400).send({ error: 'Name and totalSeats are required' });
      }

      if (eventData.totalSeats <= 0) {
        return reply.status(400).send({ error: 'Total seats must be greater than 0' });
      }

      const event = await eventService.createEvent(eventData);
      return reply.status(201).send(event);
    } catch (error) {
      return reply.status(500).send({ error: 'Internal server error' });
    }
  }
}
