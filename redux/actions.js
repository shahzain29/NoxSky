import {SET_USER_TOKEN} from './types'
import {SET_USER_ID} from './types'
import {SET_NOX_MODE} from './types'
import {SET_USER_LOCATION} from './types'
import {SET_CAMERA} from './types'
import {SET_MESSAGES} from './types'
import {SET_CITY} from './types'
import {SET_INSTA} from './types'



export const setUserToken=(userToken)=> ({
        type:SET_USER_TOKEN,
        payload:userToken
})
export const setUserId =(userId)=>({
        type:SET_USER_ID,
        payload:userId
})

export const setNoxMode =(noxModeVal) => ({
        type:SET_NOX_MODE,
        payload:noxModeVal
})

export const setUserLocation = (userLocation) =>({
        type:SET_USER_LOCATION,
        payload:userLocation
})

export const setCamera = (camera) =>({
        type:SET_CAMERA,
        payload:camera
})

export const setMessage = (messageBit) => ({
        type: SET_MESSAGES,
        payload:messageBit
})

export const setCity = (city)=> ({
        type: SET_CITY,
        payload:city
})
export const setInsta = (insta) => ({
        type:SET_INSTA,
        payload:insta,
})

