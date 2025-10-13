import type { Organizer } from '@/types'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getOrganizers() {
    return apiClient.get('/organizers')
  },

  // getOrganizers(perPage: number, page: number) {
  //   return apiClient.get('/organizers?_limit=' + perPage + '&_page=' + page)
  // },

  getOrganizer(id: number) {
    return apiClient.get('/organizers/' + id)
  },

  saveOrganizer(organizer: Organizer) {
    const { id, ...data } = organizer;
    return apiClient.post('/organizers', data);
  }
}
