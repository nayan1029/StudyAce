import axios from 'axios'
import { tokenService } from './tokenService'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 15000,
})

api.interceptors.request.use((config) => {
  const token = tokenService.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      tokenService.clear()
    }
    return Promise.reject(error)
  }
)

export default api
