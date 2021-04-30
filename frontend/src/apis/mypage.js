import axios from 'axios';
import { mypage } from '../urls/index'

export const fetchMypage = (userId) => {
  return axios.get(mypage(userId))
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}
