const defaultState = {
  orders: [],
  services: [],
  orderData: {},
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
    case 'OrderById':
      return {
        ...state,
        orderData: action.payload.order,
      }

    default:
      return state
  }
}

export default orderReducer
