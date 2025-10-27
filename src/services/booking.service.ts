import { EventRepository, BookingRepository } from '../repositories/index.js';
import { 
  NewBooking, 
  ReserveSeatRequest, 
  BookingResponse
} from '../models/index.js';

export class BookingService {
  constructor(
    private eventRepository: EventRepository,
    private bookingRepository: BookingRepository
  ) {}

  async reserveSeat(bookingData: ReserveSeatRequest): Promise<BookingResponse> {
    // Проверяем существование события
    const event = await this.eventRepository.findById(bookingData.eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    // Проверяем, не забронировал ли пользователь уже место на это событие
    const userBooking = await this.bookingRepository.findByEventAndUser(
      bookingData.eventId, 
      bookingData.userId
    );
    if (userBooking) {
      throw new Error('User already has a booking for this event');
    }

    // Проверяем доступность мест
    const bookedSeats = await this.bookingRepository.countByEventId(bookingData.eventId);
    if (bookedSeats >= event.totalSeats) {
      throw new Error('No available seats');
    }

    // Создаем бронирование
    const newBooking: NewBooking = {
      eventId: bookingData.eventId,
      userId: bookingData.userId,
    };

    const booking = await this.bookingRepository.create(newBooking);
    return this.mapToResponse(booking);
  }

  private mapToResponse(booking: any): BookingResponse {
    return {
      id: booking.id,
      eventId: booking.eventId,
      userId: booking.userId,
      createdAt: booking.createdAt,
    };
  }
}
