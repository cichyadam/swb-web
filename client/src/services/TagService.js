import api from './api'

export default {
  list() {
    return api.get('/tags')
  },
  create(token, data) {
    return api.post(`/tags?token=${token}`, data)
  }
}
