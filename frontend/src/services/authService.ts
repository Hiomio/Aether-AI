import api from '@/lib/axios'

export const authService = {
  async login(email: string, password: string) {
    const formData = new FormData()
    formData.append('username', email)
    formData.append('password', password)
    const res = await api.post('/auth/login', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data
  },

  async signup(name: string, email: string, password: string) {
    const res = await api.post('/auth/signup', { name, email, password })
    return res.data
  },

  async refreshToken() {
    const res = await api.post('/auth/refresh')
    return res.data
  },

  async getMe() {
    const res = await api.get('/auth/me')
    return res.data
  },

  async updateProfile(updates: { name?: string; email?: string }) {
    const res = await api.patch('/auth/me', updates)
    return res.data
  },

  async changePassword(currentPassword: string, newPassword: string) {
    const res = await api.post('/auth/change-password', { currentPassword, newPassword })
    return res.data
  },
}
