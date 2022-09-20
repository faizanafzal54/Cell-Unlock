import { apiUrl } from 'src/configs/config'
import request from 'src/configs/request'
import { store } from '../store'
const { token } = store.getState().user
const setHeader = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}

export const addStripe = (obj) => {
  return request.post(apiUrl + 'users/createPaymentInfo', obj, setHeader)
}
