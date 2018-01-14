import { USER_SIGNIN } from '../actions/user.action'

var INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SIGNIN:
      return action.payload;
    default:
      return state;
  }
};
