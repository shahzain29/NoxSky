import * as types from './types'

const INITIAL_STATE = {
  userToken: '',
  
}


export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SET_USER_TOKEN:
      return {
        ...state,
        userToken: action.payload,
      }

     

    default:
      return state
  }
}
