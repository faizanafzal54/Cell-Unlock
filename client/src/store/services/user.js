import { apiUrl } from 'src/configs/config'
import request from 'src/configs/request'

export const login = (obj) => {
  return request.post(apiUrl + 'users/login', obj)
}

export const register = (obj) => {
  return request.post(apiUrl + 'users/register', obj)
}

// admin services

export const userList = (limit, page) => {
  return request.get(apiUrl + `users/admin/user-list?page=${page}&limit=${limit}`)
}

export const userById = (id) => {
  return request.get(apiUrl + `users/admin/user/${id}`)
}
