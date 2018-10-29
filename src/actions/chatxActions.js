import {ajaxCallError, beginAjaxCall} from './ajaxStatusActions';
import firebaseApi from '../api/firebase';
import * as types from './actionTypes';

export function roomCreated(roomId) {
  return (dispatch) => {
    firebaseApi.databaseSet('rooms/' + roomId, {
      name: 'General',
      users: [],
      messages: []
    })
      .then(() => {
        dispatch(roomCreatedSuccess(roomId));
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw(error);
      })
    ;
  };
}

export function createRoom(name) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return firebaseApi.createRoom(name)
      .then(roomId => {
        dispatch(roomCreated(roomId));
      }).catch(error => {
        dispatch(ajaxCallError(error));
        throw(error);
      })
      ;
  };
}


export function roomCreatedSuccess(room) {
  return {
    type: types.CHATX_ROOM_CREATION_SUCCESS,
    room
  };
}
