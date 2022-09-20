import { addStripe } from 'src/store/services/credit'
import { toastify } from '../services/toastify'

export const addStripeAction = (obj) => async (dispatch) => {
  try {
    const res = await addStripe(obj)
    if (res.status === 201) {
      toastify('success', res?.data?.data.message)
    }
  } catch (err) {
    toastify('error', err?.response?.data?.err.message)
  }
}
