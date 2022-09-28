import { apiUrl } from 'src/configs/config'
import request from 'src/configs/request'
import { store } from '../store'
const { token } = store.getState().user
const setHeader = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}

export const serviceList = () => {
  return request.get(apiUrl + 'services', setHeader)
}

export const addService = (obj) => {
  return request.post(apiUrl + 'services', obj, setHeader)
}
