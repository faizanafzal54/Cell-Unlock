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

export const addStripe = (obj) => {
  return request.post(apiUrl + 'users/createPaymentInfo', obj, setHeader())
}

export const addCredits = (obj) => {
  return request.post(apiUrl + 'users/purchaseCredits', obj, setHeader())
}

export const getCredits = (id) => {
  return request.get(apiUrl + `users/credits/${id}`, setHeader())
}
