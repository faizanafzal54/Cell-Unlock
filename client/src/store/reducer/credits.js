const defaultState = {
  credits: 0,
}

const creditsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'UserCredits':
      return {
        ...state,
        credits: action.payload.credits,
      }

    default:
      return state
  }
}

export default creditsReducer
