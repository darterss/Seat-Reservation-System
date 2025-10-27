import { FastifyRequest, FastifyReply } from 'fastify';
import { bookingService } from '../services/index.js';
import { ReserveSeatRequest } from '../models/index.js';

export class BookingController {
  async reserveSeat(request: FastifyRequest<{ Body: ReserveSeatRequest }>, reply: FastifyReply) {
    try {
      const bookingData = request.body;
      
      // Валидация
      if (!bookingData.eventId || !bookingData.userId) {
        return reply.status(400).send({ error: 'eventId and userId are required' });
      }

      const booking = await bookingService.reserveSeat(bookingData);
      return reply.status(201).send(booking);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Event not found') {
          return reply.status(404).send({ error: error.message });
        }
        if (error.message === 'User already has a booking for this event' ||
            error.message === 'No available seats') {
          return reply.status(400).send({ error: error.message });
        }
      }
      return reply.status(500).send({ error: 'Internal server error' });
    }
  }
}
