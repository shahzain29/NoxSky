import {combineReducers} from 'redux'
import setTokenReducer from './reducer'
import setUserIdreducer from './idReducer'
import setNoxModeReducer from './noxModeReducer'
import setUserLocationReducer from './locationReducer'
import setCameraReducer from './camReducer'
import setMessageReducer from './messageReducer'
import setCityReducer from './cityReducer'
import setInstaReducer from './instaReducer'

export default  combineReducers(
    {
    general:setTokenReducer,
    userId:setUserIdreducer,
    noxModeVal:setNoxModeReducer,
    location:setUserLocationReducer,
    cameraDetails:setCameraReducer,
    enableMessage: setMessageReducer,
    tripCity:setCityReducer,
    instagram:setInstaReducer,
    
    }
);