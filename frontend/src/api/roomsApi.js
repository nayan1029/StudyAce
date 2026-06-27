import api from '../services/http'

export const roomsApi = {
  getAll: async () => {
    const { data } = await api.get('/rooms')
    return data
  },
}
