import { login, register, userList, userById } from 'src/store/services/user'
import { toastify } from '../services/toastify'

export const loginAction = (obj, callback) => async (dispatch) => {
  try {
    const res = await login(obj)
    if (res.status === 201) {
      dispatch({
        type: 'Login',
        payload: {
          user: {
            ...res.data.data.user,
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

// admin actions
export const userListAction = (limit, page) => async (dispatch) => {
  try {
    const res = await userList(limit, page)
    if (res.status === 200) {
      dispatch({
        type: 'UserList',
        payload: {
          users: res.data.data.users,
          totalPages: res.data.data.totalPages,
        },
      })
    }
  } catch (err) {
    toastify('error', err?.response?.data?.err.message)
  }
}

export const userByIdAction = (id) => async (dispatch) => {
  try {
    const res = await userById(id)
    return res.data.data.user
  } catch (err) {
    toastify('error', err?.response?.data?.err.message)
  }
}
