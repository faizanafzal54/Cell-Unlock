import {
  orderList,
  serviceList,
  addOrder,
  orderById,
  updateOrder,
  adminOrderList,
  adminUpdateOrder,
  adminUsersList,
} from 'src/store/services/order'
import { toastify } from '../services/toastify'

export const orderListAction = (callback) => async (dispatch) => {
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
  } finally {
    if (callback) {
      callback()
    }
  }
}

export const orderListClearAction = (callback) => async (dispatch) => {
  try {
    dispatch({
      type: 'OrdersListClear',
      payload: {
        orders: [],
      },
    })
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

export const serviceListAction = (orderType) => async (dispatch) => {
  try {
    const res = await serviceList(orderType)
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

// admin actions

export const adminOrderListAction = (obj, callback) => async (dispatch) => {
  try {
    const res = await adminOrderList(obj)
    if (res.status === 201) {
      dispatch({
        type: 'AdminOrdersList',
        payload: {
          orders: res.data.data.orders,
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

export const adminUpdateOrderAction = (id, obj, callback) => async (dispatch) => {
  try {
    const res = await adminUpdateOrder(id, obj)
    if (res.status === 200) {
      toastify('success', res?.data?.data.message)
      callback()
    }
  } catch (err) {
    toastify('error', err?.response?.data?.err.message)
  }
}

export const adminUsersListAction = () => async (dispatch) => {
  try {
    const res = await adminUsersList()
    if (res.status === 200) {
      dispatch({
        type: 'AdminUsers',
        payload: {
          users: res.data.data.users,
        },
      })
    }
  } catch (err) {
    toastify('error', err?.response?.data?.err.message)
  }
}

export const adminOrderListClearAction = () => async (dispatch) => {
  try {
    // const res = await adminOrderList(obj)

    dispatch({
      type: 'AdminOrdersListClear',
      payload: {
        orders: [],
        total: 0,
      },
    })
  } catch (err) {
    toastify('error', err?.response?.data?.err.message)
  }
}
