import * as types from './types'
import {red} from '../Screens/Context/Themes'

const INITIAL_STATE = {
  
  noxModeVal: {noxVal:false , theme:red}
}


export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    
      case types.SET_NOX_MODE:
      return{
        ...state,
        noxModeVal:action.payload
      }

    default:
      return state
  }
}
