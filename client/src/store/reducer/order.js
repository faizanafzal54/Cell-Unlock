const defaultState = {
  orders: [],
  services: [],
}

const orderReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'OrdersList':
      return {
        ...state,
        orders: action.payload.orders,
      }
    case 'ServiceList':
      return {
        ...state,
        services: action.payload.services,
      }

    default:
      return state
  }
}

export default orderReducer
