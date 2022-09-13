import { orderList } from 'src/store/services/order'
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
