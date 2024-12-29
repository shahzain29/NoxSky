import * as types from './types'

const INITIAL_STATE = {
  
  city:'',
}


export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    
      case types.SET_CITY:
      return{
        ...state,
        city:action.payload
      }

    default:
      return state
  }
}
