import { apiUrl } from 'src/configs/config'
import request from 'src/configs/request'

export const login = (obj) => {
  return request.post(apiUrl + 'users/login', obj)
}

export const register = (obj) => {
  return request.post(apiUrl + 'users/register', obj)
}

// admin services

export const userList = (obj) => {
  return request.post(apiUrl + `users/admin/user-list`, obj)
}

export const userById = (id) => {
  return request.get(apiUrl + `users/admin/user/${id}`)
}

export const updateUser = (id, obj) => {
  return request.patch(apiUrl + `users/admin/user/${id}`, obj)
}

export const getStats = (id) => {
  return request.get(apiUrl + `users/general/stats/${id}`)
}
