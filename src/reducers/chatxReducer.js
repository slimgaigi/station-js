import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function chatxReducer(state = initialState.chatx, action) {
  switch (action.type) {
    case types.CHATX_ROOM_CREATION_SUCCESS:
      console.log(state, action);

      return {rooms: [...state.rooms, {name: action.room}]};
    default:
      return state;
  }
}
