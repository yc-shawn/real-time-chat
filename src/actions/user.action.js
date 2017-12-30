export const USER_LOGIN = "USER_LOGIN"
export function userLogin(name){
  return {
    type: USER_LOGIN,
    payload: name
  }
}
