import { eq } from 'drizzle-orm';
import { db } from '../database/connection.js';
import { events, Event, NewEvent } from '../models/index.js';

export class EventRepository {
  async findById(id: number): Promise<Event | null> {
    const result = await db.select().from(events).where(eq(events.id, id)).limit(1);
    return result[0] || null;
  }

  async create(eventData: NewEvent): Promise<Event> {
    const result = await db.insert(events).values(eventData).returning();
    return result[0]!;
  }
}
