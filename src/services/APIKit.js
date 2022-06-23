import axios from 'axios'
import { API_URL } from '../constants'

// Create axios client, pre-configured with baseURL
let APIKit = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'content-type': 'application/json',
  },
})

APIKit.interceptors.request.use(
  async function (config) {
    // config.headers.common['x-access-token'] = token;
    const token = localStorage.getItem('idToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

// APIKit.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     console.log(response)
//     return Promise.resolve(response.data)
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     // console.log(error.response.status);
//     // RootNavigation.navigate('Login');
//     return Promise.reject(error)
//   },
// )
export default APIKit
