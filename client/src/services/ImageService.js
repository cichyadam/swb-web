import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

export default {
  list(token) {
    return api.get(`/images?token=${token}`)
  },
  listOne(token, id) {
    return api.get(`/images/${id}?token=${token}`)
  },
  create(token, data) {
    return api.post(`/images?token=${token}`, data)
  },
  edit(id, token, data) {
    return api.put(`/images/${id}?token=${token}`, data)
  },
  delete(token, data) {
    return api.delete(`/images?token=${token}`, data)
  }
}
