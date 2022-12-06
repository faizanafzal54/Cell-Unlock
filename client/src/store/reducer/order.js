const defaultState = {
  orders: [],
  services: [],
  orderData: {},
  total: 0,
  adminOrders: [],
  adminUsers: [],
}

const orderReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'OrdersList':
      return {
        ...state,
        orders: action.payload.orders,
      }

    case 'OrdersListClear':
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
        total: action.payload?.total,
      }
    case 'AdminOrdersListClear':
      return {
        ...state,
        adminOrders: action.payload.orders,
        total: action.payload?.total,
      }
    case 'AdminUsers':
      return {
        ...state,
        adminUsers: action.payload.users,
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
