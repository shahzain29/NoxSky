import * as types from './types'

const INITIAL_STATE = {
  
  insta:'', 
}


export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    
      case types.SET_INSTA:
      return{
        ...state,
        insta:action.payload
      }

    default:
      return state
  }
}
