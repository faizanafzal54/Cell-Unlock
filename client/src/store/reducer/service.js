const defaultState = {
  services: [],
  total: 0,
}

const serviceReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ServiceList':
      return {
        ...state,
        services: action.payload.services,
        total: action.payload.total,
      }
    case 'ServiceListClear':
      return {
        ...state,
        services: action.payload.services,
        total: action.payload.total,
      }

    default:
      return state
  }
}

export default serviceReducer
