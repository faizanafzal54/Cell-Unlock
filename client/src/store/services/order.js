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
export const orderList = () => {
  return request.get(apiUrl + 'orders/list', setHeader())
}

export const addOrder = (obj) => {
  return request.post(apiUrl + 'orders/create', obj, setHeader())
}

export const serviceList = (orderType) => {
  return request.get(apiUrl + `services/list?type=${orderType}`, setHeader())
}

export const orderById = (id) => {
  return request.get(apiUrl + `orders/${id}`, setHeader())
}

export const updateOrder = (id, obj) => {
  return request.patch(apiUrl + `orders/${id}`, obj, setHeader())
}

// admin services

export const adminOrderList = (obj) => {
  return request.post(apiUrl + 'orders/admin/list', obj, setHeader())
}

export const adminUpdateOrder = (id, obj) => {
  return request.patch(apiUrl + `orders/admin/${id}`, obj, setHeader())
}

export const adminUsersList = () => {
  return request.get(apiUrl + `users/admin/users`, setHeader())
}
