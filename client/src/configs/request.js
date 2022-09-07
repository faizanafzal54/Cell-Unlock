import axios from 'axios'
import { toastify } from '../store/services/toastify'

axios.interceptors.response.use(null, async (error) => {
  console.log(error)
  if (error.config && error.response && error.response.status !== 401) {
    toastify('error', error.response.data.message)
  }

  return Promise.reject(error)
})
const request = axios
export default request
