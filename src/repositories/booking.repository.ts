import { eq, and, count } from 'drizzle-orm';
import { db } from '../database/connection.js';
import { bookings, Booking, NewBooking } from '../models/index.js';

export class BookingRepository {
  async findByEventAndUser(eventId: number, userId: string): Promise<Booking | null> {
    const result = await db
      .select()
      .from(bookings)
      .where(and(eq(bookings.eventId, eventId), eq(bookings.userId, userId)))
      .limit(1);
    return result[0] || null;
  }

  async countByEventId(eventId: number): Promise<number> {
    const result = await db
      .select({ count: count() })
      .from(bookings)
      .where(eq(bookings.eventId, eventId));
    return result[0]!.count;
  }

  async create(bookingData: NewBooking): Promise<Booking> {
    const result = await db.insert(bookings).values(bookingData).returning();
    return result[0]!;
  }
}
