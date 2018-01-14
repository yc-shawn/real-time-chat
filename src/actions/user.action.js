import db from '../utilities/db';

export const USER_SIGNIN = "USER_SIGNIN"
export function userSignin(username, password, success){

  function payload(){
    return new Promise((resolve, reject) => {
      db.user.orderByChild('username').equalTo(username).limitToFirst(1).once('value', (res) => {
        var users = _.values(res.val());
        if (users.length > 0){
          if (users[0].password === password){
            success();
            resolve(users[0]);
          } else {
            alert('your passowrd is wrong!');
            reject({});
          }
        } else {
          alert('wrong username!');
          reject({});
        }
      });
    });
  }

  return {
    type: USER_SIGNIN,
    payload: Promise.resolve(payload())
  }


}
