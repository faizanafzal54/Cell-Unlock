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

export const addCategory = (obj) => {
  return request.post(apiUrl + 'categories/create', obj, setHeader())
}

export const categoryList = (obj) => {
  return request.get(apiUrl + 'categories/list', setHeader())
}

export const categoryById = (id) => {
  return request.get(apiUrl + `categories/${id}`, setHeader())
}

export const updateCategory = (id, obj) => {
  return request.patch(apiUrl + `categories/${id}`, obj, setHeader())
}
