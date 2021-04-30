const DEFAULT_API_LOCALHOST = 'http://localhost:3000/api/v1'

export const login = `${DEFAULT_API_LOCALHOST}/login`
// export const foodsIndex = (restaurantId) =>
//   `${DEFAULT_API_LOCALHOST}/restaurants/${restaurantId}/foods`
export const root = `${DEFAULT_API_LOCALHOST}/`
export const signup = `${DEFAULT_API_LOCALHOST}/signup`
export const mypage = (userId) =>
  `${DEFAULT_API_LOCALHOST}/${userId}`
