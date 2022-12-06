const defaultState = {
  categories: [],
}

const categoryReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CategoryList':
      return {
        ...state,
        categories: action.payload.categories,
      }

    default:
      return state
  }
}

export default categoryReducer
