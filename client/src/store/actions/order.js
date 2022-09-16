import { orderList, serviceList, addOrder, orderById, updateOrder } from 'src/store/services/order'
import { toastify } from '../services/toastify'

export const orderListAction = () => async (dispatch) => {
  try {
    const res = await orderList()
    if (res.status === 200) {
      dispatch({
        type: 'OrdersList',
        payload: {
          orders: res.data.data.orders,
        },
      })
    }
  } catch (err) {
    toastify('error', err?.response?.data?.err.message)
  }
}

export const orderByIdAction = (id) => async (dispatch) => {
  try {
    const res = await orderById(id)
    return res.data.data.order
    if (res.status === 200) {
      dispatch({
        type: 'OrderById',
        payload: {
          order: res.data.data.order,
        },
      })
    }
  } catch (err) {
    toastify('error', err?.response?.data?.err.message)
  }
}

export const addOrderAction = (obj, callback) => async (dispatch) => {
  try {
    const res = await addOrder(obj)
    if (res.status === 201) {
      callback()
      toastify('success', res?.data?.data.message)
    }
  } catch (err) {
    toastify('error', err?.response?.data?.err.message)
  }
}

export const updateOrderAction = (id, obj, callback) => async (dispatch) => {
  try {
    const res = await updateOrder(id, obj)
    if (res.status === 200) {
      toastify('success', res?.data?.data.message)
      callback()
    }
  } catch (err) {
    toastify('error', err?.response?.data?.err.message)
  }
}

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
