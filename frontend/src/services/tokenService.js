export const tokenService = {
  getToken: () => localStorage.getItem('studyace_token'),
  clear: () => {
    localStorage.removeItem('studyace_token')
    localStorage.removeItem('studyace_user')
  },
}
