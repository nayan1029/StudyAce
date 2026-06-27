import api from '../services/http'

export const aiApi = {
  askAssistant: async (payload) => {
    const { data } = await api.post('/ai/assistant', payload)
    return data
  },
  summarize: async (payload) => {
    const { data } = await api.post('/ai/summarize', payload)
    return data
  },
  analyzeResume: async (payload) => {
    const { data } = await api.post('/ai/resume/analyze', payload)
    return data
  },
}
