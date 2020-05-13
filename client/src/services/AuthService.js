import api from './api'

export default {
  register(credentials) {
    return api.post('/users/create', credentials)
  },
  login(credentials) {
    return api.post('/users/login', credentials)
  }
}
