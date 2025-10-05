import { EventRepository, BookingRepository } from '../repositories/index.js';
import { EventService } from './event.service.js';
import { BookingService } from './booking.service.js';

// Создаем экземпляры репозиториев
const eventRepository = new EventRepository();
const bookingRepository = new BookingRepository();

// Создаем экземпляры сервисов
export const eventService = new EventService(eventRepository);
export const bookingService = new BookingService(eventRepository, bookingRepository);