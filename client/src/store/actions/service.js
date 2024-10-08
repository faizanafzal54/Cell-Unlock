import { addService, serviceList, serviceById, updateService } from 'src/store/services/service'
import { toastify } from '../services/toastify'

export const serviceListAction = (obj, callback) => async (dispatch) => {
  try {
    const res = await serviceList(obj)
    if (res.status === 201) {
      dispatch({
        type: 'ServiceList',
        payload: {
          services: res.data.data.services,
          total: res.data.data.total,
        },
      })
    }
  } catch (err) {
    toastify('error', err?.response?.data?.err.message)
  } finally {
    if (callback) {
      callback()
    }
  }
}

export const serviceListClearAction = (obj, callback) => async (dispatch) => {
  try {
    dispatch({
      type: 'ServiceListClear',
      payload: {
        services: [],
        total: 0,
      },
    })
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

export const serviceByIdAction = (id) => async (dispatch) => {
  try {
    const res = await serviceById(id)
    return res.data.data.service
    if (res.status === 201) {
      callback()
      toastify('success', res?.data?.data.message)
    }
  } catch (err) {
    toastify('error', err?.response?.data?.err.message)
  }
}

export const updateServiceAction = (id, obj, callback) => async (dispatch) => {
  try {
    const res = await updateService(id, obj)
    if (res.status === 200) {
      toastify('success', res?.data?.data.message)
      callback()
    }
  } catch (err) {
    toastify('error', err?.response?.data?.err.message)
  }
}
