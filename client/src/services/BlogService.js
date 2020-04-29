import api from './api'

export default {
  list() {
    return api.get('/blog')
  },
  listOne(id) {
    return api.get(`/blog/${id}`)
  },
  create(token, data) {
    return api.post(`/blog/create?token=${token}`, data)
  },
  edit(id, token, data) {
    return api.post(`/blog/${id}/edit?token=${token}`, data)
  },
  delete(id, token) {
    return api.post(`/blog/${id}/delete?token=${token}`)
  }

}
