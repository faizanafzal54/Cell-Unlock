const defaultState = {
  isAuthenticated: false,
  user: {
    _id: '',
    name: '',
    email: '',
    role: '',
    isActive: false,
  },
  token: '',
  users: [],
  totalPages: 0,
  stats: {
    availableBalance: 0,
    creditUsed: 0,
    creditsInProgress: 0,
  },
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
        total: action.payload.total,
      }
    case 'UserListClear':
      return {
        ...state,
        users: action.payload.users,
        total: action.payload.total,
      }

    case 'RefreshToken':
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
      }
    case 'SetStats':
      return {
        ...state,
        stats: action.payload.stats,
      }
    default:
      return state
  }
}

export default userReducer
