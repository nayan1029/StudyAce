import { createSlice } from '@reduxjs/toolkit'

const theme = localStorage.getItem('studyace_theme') || 'light'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme,
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('studyace_theme', state.theme)
    },
    setTheme: (state, action) => {
      state.theme = action.payload
      localStorage.setItem('studyace_theme', state.theme)
    },
  },
})

export const { toggleTheme, setTheme } = uiSlice.actions
export default uiSlice.reducer
