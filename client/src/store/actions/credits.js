import { addStripe, addCredits, getCredits } from 'src/store/services/credit'
import { toastify } from '../services/toastify'

export const addStripeAction = (obj, callback) => async (dispatch) => {
  try {
    const res = await addStripe(obj)
    if (res.status === 201) {
      toastify('success', res?.data?.data.message)
      callback()
    }
  } catch (err) {
    toastify('error', err?.response?.data?.err.message)
  }
}

export const buyCreditsAction = (obj, callback) => async (dispatch) => {
  try {
    const res = await addCredits(obj)
    if (res.status === 201) {
      toastify('success', res?.data?.data.message)
      callback()
    }
  } catch (err) {
    toastify('error', err?.response?.data?.err.message)
  }
}

export const getUserCreditsAction = (id) => async (dispatch) => {
  try {
    const res = await getCredits(id)
    if (res.status === 200) {
      dispatch({
        type: 'UserCredits',
        payload: {
          credits: res.data.data.credits,
        },
      })
      // toastify('success', res?.data?.data.message)
    }
  } catch (err) {
    toastify('error', err?.response?.data?.err.message)
  }
}
