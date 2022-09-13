const defaultState = {
  orders: [],
}

const orderReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'OrdersList':
      return {
        ...state,
        orders: action.payload.orders,
      }

    default:
      return state
  }
}

export default orderReducer
