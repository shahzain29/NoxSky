import axios from 'axios'
import {store} from '../redux/store'

// const ROOT_URL = 'https://appcrates.net'
const ROOT_URL = 'https://badralsayed.site'

const BASE_URL = `${ROOT_URL}/Nox_Sky/public/api/`

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
})

client.interceptors.request.use(
  async config => {
    const requestConfig = config

    const {userToken} = store.getState().general
    requestConfig.headers = {
      Authorization: 'Bearer ' + userToken,
    }
    // console.log('config', requestConfig)
    return requestConfig
  },
  err => {
    return Promise.reject(err)
  },
)

export {client}
