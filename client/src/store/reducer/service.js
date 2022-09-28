const defaultState = {
  services: [],
}

const serviceReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ServiceList':
      return {
        ...state,
        services: action.payload.services,
      }

    default:
      return state
  }
}

export default serviceReducer
