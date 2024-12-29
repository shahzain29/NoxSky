import * as types from './types'

const INITIAL_STATE = {
  
  userLocation: {},
}


export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    
      case types.SET_USER_LOCATION:
      return{
        ...state,
        userLocation:action.payload
      }

    default:
      return state
  }
}
