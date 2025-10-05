import { EventRepository } from '../repositories/index.js';
import { Event, NewEvent, CreateEventRequest, EventResponse } from '../models/index.js';

export class EventService {
  constructor(private eventRepository: EventRepository) {}

  async getEvent(id: number): Promise<EventResponse> {
    const event = await this.eventRepository.findById(id);
    if (!event) {
      throw new Error('Event not found');
    }
    return this.mapToResponse(event);
  }

  async createEvent(eventData: CreateEventRequest): Promise<EventResponse> {
    const newEvent: NewEvent = {
      name: eventData.name,
      totalSeats: eventData.totalSeats,
    };

    const event = await this.eventRepository.create(newEvent);
    return this.mapToResponse(event);
  }

  private mapToResponse(event: Event): EventResponse {
    return {
      id: event.id,
      name: event.name,
      totalSeats: event.totalSeats,
    };
  }
}
