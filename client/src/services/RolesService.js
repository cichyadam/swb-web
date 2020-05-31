import api from './api'

export default {
  list(token) {
    return api.get(`/roles?token=${token}`)
  }
}
