import api from './api'

export default {
  register(credentials) {
    return api.post('/users', credentials)
  },
  login(credentials) {
    return api.post('/users/login', credentials)
  },
  update(token, id, data) {
    return api.put(`/users/${id}?token=${token}`, data)
  },
  list(token) {
    return api.get(`/users?token=${token}`)
  }
}
