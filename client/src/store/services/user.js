import { apiUrl } from 'src/configs/config'
import request from 'src/configs/request'

export const login = (obj) => {
  return request.post(apiUrl + 'users/login', obj)
}

export const register = (obj) => {
  return request.post(apiUrl + 'users/register', obj)
}
