import { apiUrl } from 'src/configs/config'
import request from 'src/configs/request'
import { store } from '../store'
const { token } = store.getState().user
const setHeader = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}
export const orderList = () => {
  return request.get(apiUrl + 'orders/list', setHeader)
}

export const addOrder = (obj) => {
  return request.post(apiUrl + 'orders/create', obj, setHeader)
}

export const serviceList = () => {
  return request.get(apiUrl + 'services', setHeader)
}

export const orderById = (id) => {
  return request.get(apiUrl + `orders/${id}`, setHeader)
}

export const updateOrder = (id, obj) => {
  return request.patch(apiUrl + `orders/${id}`, obj, setHeader)
}

// admin services

export const adminOrderList = (limit, page) => {
  return request.get(apiUrl + `orders/admin/list?page=${page}&limit=${limit}`, setHeader)
}

export const adminUpdateOrder = (id, obj) => {
  return request.patch(apiUrl + `orders/admin/${id}`, obj, setHeader)
}
