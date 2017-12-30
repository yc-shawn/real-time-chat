import { USER_LOGIN } from '../actions/user.action'

var INITIAL_STATE = {
  name: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { name: action.payload }
    default:
      return state;
  }
};
