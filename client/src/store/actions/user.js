import { login } from 'src/store/services/user'

export const loginAction = (obj, callback) => async (dispatch) => {
  try {
    const res = await login(obj)
    if (res.status === 200) {
      dispatch({
        type: 'Login',
        payload: {
          user: {
            name: res.data.data.name,
            email: res.data.data.email,
            _id: res.data.data._id,
          },
          token: res.data.data.token,
        },
      })
      if (callback) {
        callback()
      }
    }
  } catch (err) {
    console.log(err)
  }
}

export const logoutAction = (callback) => async (dispatch) => {
  dispatch({
    type: 'Logout'
  })
  if (callback) {
    callback()
  }
}