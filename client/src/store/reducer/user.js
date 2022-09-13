const defaultState = {
  isAuthenticated: true,
  user: {
    _id: '',
    name: '',
    email: '',
  },
  token: '',
}

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'Login':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      }

    case 'Register':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      }
    case 'Logout':
      return {
        ...state,
        isAuthenticated: false,
        user: { id: '', displayName: '', email: '', role: '' },
        token: '',
        refreshToken: '',
      }
    case 'RefreshToken':
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
      }
    default:
      return state
  }
}

export default userReducer
