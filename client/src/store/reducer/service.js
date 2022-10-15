const defaultState = {
  services: [],
  totalPages: 0,
}

const serviceReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ServiceList':
      return {
        ...state,
        services: action.payload.services,
        totalPages: action.payload.totalPages,
      }

    default:
      return state
  }
}

export default serviceReducer
