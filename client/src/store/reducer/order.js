const defaultState = {
  orders: [],
  services: [],
  orderData: {},
  totalPages: 0,
  adminOrders: [],
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
    case 'AdminOrdersList':
      return {
        ...state,
        adminOrders: action.payload.orders,
        totalPages: action.payload?.totalPages,
      }

      AdminOrdersList
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
