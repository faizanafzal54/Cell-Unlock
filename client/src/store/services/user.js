import { apiUrl } from 'src/configs/config'
import request from 'src/configs/request'

export const login = (obj) => {
  return request.post(apiUrl + 'users/login', obj)
}
