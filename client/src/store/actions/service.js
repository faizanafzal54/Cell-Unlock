import { addService, serviceList } from 'src/store/services/service'
import { toastify } from '../services/toastify'

export const serviceListAction = () => async (dispatch) => {
  try {
    const res = await serviceList()
    if (res.status === 200) {
      dispatch({
        type: 'ServiceList',
        payload: {
          services: res.data.data.services,
        },
      })
    }
  } catch (err) {
    toastify('error', err?.response?.data?.err.message)
  }
}

export const addServiceAction = (obj, callback) => async (dispatch) => {
  try {
    const res = await addService(obj)
    if (res.status === 201) {
      callback()
      toastify('success', res?.data?.data.message)
    }
  } catch (err) {
    toastify('error', err?.response?.data?.err.message)
  }
}
