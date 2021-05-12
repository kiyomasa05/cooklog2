import axios from 'axios';
import { index } from '../urls/index'

export const fetchIndex =() => {
  return axios.get(index)
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}
