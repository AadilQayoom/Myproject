// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { COMMON_OPEN_CLOSE_CANCELLATION_MODAL } from './constants';

export function openCloseCancellationModal(data) {
  return {
    type: COMMON_OPEN_CLOSE_CANCELLATION_MODAL,
    data: data,
  };
}

export function reducer(state, action) {
  // console.log('testing props in top----', action);
  switch (action.type) {
    case COMMON_OPEN_CLOSE_CANCELLATION_MODAL:
      return {
        ...state,
        showCancellationModal: action.data,
      };

    default:
      return state;
  }
}
