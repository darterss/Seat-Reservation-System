import { pgTable, serial, varchar, integer, timestamp, index, uniqueIndex } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

// Схема таблицы events
export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  totalSeats: integer('total_seats').notNull(),
});

// Схема таблицы bookings
export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  eventId: integer('event_id').notNull().references(() => events.id),
  userId: varchar('user_id', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  // Уникальный индекс для предотвращения дублирования бронирований
  uniqueEventUser: uniqueIndex('bookings_event_id_user_id_unique').on(table.eventId, table.userId),
  // Индекс для быстрого поиска по event_id (для подсчета бронирований)
  eventIdIdx: index('bookings_event_id_idx').on(table.eventId),
}));

// Типы для TypeScript
export type Event = InferSelectModel<typeof events>;
export type NewEvent = InferInsertModel<typeof events>;
export type Booking = InferSelectModel<typeof bookings>;
export type NewBooking = InferInsertModel<typeof bookings>;

// DTO для API
export interface CreateEventRequest {
  name: string;
  totalSeats: number;
}

export interface ReserveSeatRequest {
  eventId: number;
  userId: string;
}

export interface BookingResponse {
  id: number;
  eventId: number;
  userId: string;
  createdAt: Date;
}

export interface EventResponse {
  id: number;
  name: string;
  totalSeats: number;
}
