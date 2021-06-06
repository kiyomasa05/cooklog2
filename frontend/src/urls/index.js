const DEFAULT_API_LOCALHOST = 'http://localhost:3000/api/v1'

export const loginURL = `${DEFAULT_API_LOCALHOST}/login`
// export const foodsIndex = (restaurantId) =>
//   `${DEFAULT_API_LOCALHOST}/restaurants/${restaurantId}/foods`
export const root = `${DEFAULT_API_LOCALHOST}/`
export const signupURL = `${DEFAULT_API_LOCALHOST}/signup`
export const mypage = (userId) =>
  `${DEFAULT_API_LOCALHOST}/${userId}`
export const post = `${DEFAULT_API_LOCALHOST}/recipes`
export const index = `${DEFAULT_API_LOCALHOST}/recipes`
