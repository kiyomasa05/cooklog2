import axios from 'axios';
import { login } from '../urls/index'

export const fetchLogin = () => {
  return axios.get(login)
    .then(res => {
      return res.data
    })
    .catch((e) => console.error(e))
}
