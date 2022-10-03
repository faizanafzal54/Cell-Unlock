const defaultState = {
  isAuthenticated: true,
  user: {
    _id: '',
    name: '',
    email: '',
  },
  token: '',
  users: [],
  totalPages: 0,
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

    case 'UserList':
      return {
        ...state,
        users: action.payload.users,
        totalPages: action.payload.totalPages,
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
