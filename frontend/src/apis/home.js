import axios from 'axios';
import { root } from '../urls/index'

export const home =() => {
  return axios.get(root)
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}
