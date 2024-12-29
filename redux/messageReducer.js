import * as types from './types'

const INITIAL_STATE = {
  
  messageBit:false,
}


export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    
      case types.SET_MESSAGES:
      return{
        ...state,
        messageBit:action.payload
      }

    default:
      return state
  }
}
