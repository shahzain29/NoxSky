import * as types from './types'

const INITIAL_STATE = {
  
  userId: 0,
}


export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    
      case types.SET_USER_ID:
      return{
        ...state,
        userId:action.payload
      }

    default:
      return state
  }
}
