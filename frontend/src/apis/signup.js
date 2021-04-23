import axios from 'axios';
import { signup } from '../urls/index'

export const fetchSignup = () => {
  return axios.post(signup,
    // {
    //   user: {
    //     name: name,
    //     email: email,
    //     password: password,
    //     password_confirm: password_confirm
    //   }
    // },
    { withCredentials: true }
  ).then(response => {
    console.log("registration res", response)
  }).catch(error => {
    console.log("registration error", error)
  })
}
