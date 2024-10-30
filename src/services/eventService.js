import http from '@/lib/axios';

class EventService {
  async getEvents({ page = 1, limit = 10, search = '' } = {}) {
    const response = await http.get('/events', {
      params: { page, limit, search }
    });
    return response.data;
  }

  async getEvent(id) {
    const response = await http.get(`/events/${id}`);
    return response.data;
  }

  async createEvent(data) {
    const token = localStorage.getItem('token');
    const response = await http.post('/events', data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }

  async updateEvent(id, data) {
    const token = localStorage.getItem('token');
    const response = await http.put(`/events/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }

  async deleteEvent(id) {
    const token = localStorage.getItem('token');
    await http.delete(`/events/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}

export const eventService = new EventService();