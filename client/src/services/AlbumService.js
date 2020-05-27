import api from './api'

export default {
  list(token) {
    return api.get(`/albums?token=${token}`)
  },
  listOne(token, id) {
    return api.get(`/albums/${id}?token=${token}`)
  },
  create(token, data) {
    return api.post(`/albums?token=${token}`, data)
  },
  edit(id, token, data) {
    return api.put(`/albums/${id}?token=${token}`, data)
  },
  delete(token, albumIds, isDeepDelete = false) {
    return api.delete(`/albums?albumIds=${albumIds}${isDeepDelete ? '&isDeepDelete=true' : ''}&token=${token}`)
  }
}
