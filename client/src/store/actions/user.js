import { login, register } from 'src/store/services/user'
import { toastify } from '../services/toastify'

export const loginAction = (obj, callback) => async (dispatch) => {
  try {
    const res = await login(obj)
    if (res.status === 201) {
      dispatch({
        type: 'Login',
        payload: {
          user: {
            name: res.data.data.user.name,
            email: res.data.data.user.email,
            _id: res.data.data.user._id,
          },
          token: res.data.data.token,
        },
      })
      if (callback) {
        callback()
      }
    }
  } catch (err) {
    toastify('error', err?.response?.data?.err.message)
  }
}

export const registerAction = (obj, callback) => async (dispatch) => {
  try {
    const res = await register(obj)

    if (res.status === 201) {
      toastify('success', res.data.data.message)
      if (callback) {
        callback()
      }
    }
  } catch (err) {
    toastify('error', err?.response?.data?.err.message)
  }
}

export const logoutAction = (callback) => async (dispatch) => {
  dispatch({
    type: 'Logout',
  })
  if (callback) {
    callback()
  }
}
