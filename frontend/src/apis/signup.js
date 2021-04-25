import axios from 'axios';
import { signup } from '../urls/index'

export const fetchSignup = (data) => {
  return axios.post(signup,
    {
      user: {
        name:data.name,
        email:data.email,
        password:data.password,
        password_confirmation:data.password_confirmation,
      }
    },
    { withCredentials: false }
  ).then(response => {
    console.log("registration res", response)
  }).catch(error => {
    console.log("registration error", error)
  })
}
