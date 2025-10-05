import { FastifyInstance } from 'fastify';
import { EventController, BookingController, HealthController } from '../controllers/index.js';

export async function registerRoutes(app: FastifyInstance) {
  const eventController = new EventController();
  const bookingController = new BookingController();
  const healthController = new HealthController();

  // Health check
  app.get('/health', healthController.check.bind(healthController));

  // Root endpoint
  app.get('/', async (_request, reply) => {
    return reply.send({ message: 'Seat Reservation API' });
  });

  // Event routes
  app.post('/api/events', eventController.createEvent.bind(eventController));

  // Booking routes
  app.post('/api/bookings/reserve', bookingController.reserveSeat.bind(bookingController));
}
