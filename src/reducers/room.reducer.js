import { CHOOSE_ROOM } from '../actions/room.action'

var INITIAL_STATE = {
  roomId: 'lobby'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHOOSE_ROOM:
      return { roomId: action.payload }
    default:
      return state;
  }
};
