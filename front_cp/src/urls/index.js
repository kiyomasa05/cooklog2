const DEFAULT_API_LOCALHOST = 'http://localhost:3000/api/v1'

export const loginURL = `${DEFAULT_API_LOCALHOST}/login`
export const logged_inURL = `${DEFAULT_API_LOCALHOST}/logged_in`
export const logoutURL = `${DEFAULT_API_LOCALHOST}/logout`


export const root = `${DEFAULT_API_LOCALHOST}/`
export const signupURL = `${DEFAULT_API_LOCALHOST}/signup`
// 編集へ
export const userEditURL = (userId) => `${DEFAULT_API_LOCALHOST}/users/${userId}`
// お気に入りへ//削除も一緒
export const favoURL = (recipeId) => `${DEFAULT_API_LOCALHOST}/recipes/${recipeId}/favorites`
export const getFavoURL = (userId) => `${DEFAULT_API_LOCALHOST}/users/${userId}`
export const setFavoURL = (recipeId) => `${DEFAULT_API_LOCALHOST}/recipes/${recipeId}/setFavo`

export const mypage = (userId) =>
  `${DEFAULT_API_LOCALHOST}/${userId}`
export const post = `${DEFAULT_API_LOCALHOST}/recipes`
export const index = `${DEFAULT_API_LOCALHOST}/recipes`
export const recipeEditURL = (recipeId) => `${DEFAULT_API_LOCALHOST}/recipes/${recipeId}`
