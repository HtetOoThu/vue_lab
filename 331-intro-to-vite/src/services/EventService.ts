import type { Event } from '@/types';
import axios, { type AxiosResponse } from 'axios';
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    // baseURL: 'http://localhost:8080',
    withCredentials: false, 
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
export default {
    getEvents(perPage: Number, page: Number) {
        return apiClient.get('/events?_limit=' + perPage + '&_page=' + page);
    },
    getEvent(id: number) {
        return apiClient.get('/events/' + id);
    },
    saveEvent(event: Event) {
        const { id, ...data } = event;
        return apiClient.post('/events', data);
    },
    getEventsByKeyword(keyword: string, perPage: number, page: number): Promise<AxiosResponse<Event[]>> {
        return apiClient.get<Event[]>('/events?title=' + keyword + '&_limit=' + perPage + '&_page=' + page);
    }
}

