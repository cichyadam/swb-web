import api from './api'

export default {
  register(credentials, token) {
    return api.post(`/users?token=${token}`, credentials)
  },
  login(credentials) {
    return api.post('/users/login', credentials)
  },
  update(token, id, data) {
    return api.put(`/users/${id}?token=${token}`, data)
  },
  list(token) {
    return api.get(`/users?token=${token}`)
  },
  delete(id, token) {
    return api.delete(`/users/${id}?token=${token}`)
  }
}
