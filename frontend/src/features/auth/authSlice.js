import { createSlice } from '@reduxjs/toolkit'

const getStoredUser = () => {
  try {
    const rawUser = localStorage.getItem('studyace_user')
    const rawToken = localStorage.getItem('studyace_token')
    return {
      user: rawUser ? JSON.parse(rawUser) : null,
      token: rawToken || null,
    }
  } catch {
    return { user: null, token: null }
  }
}

const initial = getStoredUser()

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initial.user,
    token: initial.token,
    isAuthenticated: Boolean(initial.token),
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload
      state.user = user
      state.token = token
      state.isAuthenticated = Boolean(token)
      localStorage.setItem('studyace_user', JSON.stringify(user))
      localStorage.setItem('studyace_token', token)
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('studyace_user')
      localStorage.removeItem('studyace_token')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
