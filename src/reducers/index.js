
import { combineReducers } from 'redux';

// reducers
import user from './user.reducer';
import room from './room.reducer';

const rootReducer = combineReducers({
  user: user,
  room: room
});

export default rootReducer;
