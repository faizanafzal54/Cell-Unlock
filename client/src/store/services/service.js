import { apiUrl } from 'src/configs/config'
import request from 'src/configs/request'
import { store } from '../store'

const setHeader = () => {
  const { token } = store.getState().user
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

export const serviceList = (obj) => {
  return request.post(apiUrl + 'services/list', obj, setHeader())
}

export const addService = (obj) => {
  return request.post(apiUrl + 'services', obj, setHeader())
}

export const serviceById = (id) => {
  return request.get(apiUrl + `services/${id}`, setHeader())
}

export const updateService = (id, obj) => {
  return request.patch(apiUrl + `services/${id}`, obj, setHeader())
}
