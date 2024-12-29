import * as types from './types'

const INITIAL_STATE = {
  
  camera:'',
}


export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    
      case types.SET_CAMERA:
      return{
        ...state,
        camera:action.payload
      }

    default:
      return state
  }
}
