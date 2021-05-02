// import axios from 'axios';
// import { signup } from '../urls/index'

// export const fetchSignup = (data) => {
//   return axios.post(signup,
//     {
//       user: {
//         name:data.name,
//         email:data.email,
//         password:data.password,
//         password_confirmation:data.password_confirmation,
//       }
//     },
//     { withCredentials: true }
//   ).then(response => {
//     if (response.data.status === 'created') {
//       props.handleSuccessfulAuth(response.data);
//     }
//   }).catch(error => {
//     console.log("registration error", error)
//   })
// }
