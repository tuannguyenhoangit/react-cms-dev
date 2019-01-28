const SET_MODAL = 'SET_MODAL';

const initialState = {
  title: '',
  body: '',
  leftButton: '',
  rightButton: ''
};


export default function modal(state = initialState, action) {
  switch (action.type) {
    case SET_MODAL:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
}

export function setModalSave(title, body) {
  return dispatch => {
    return dispatch(setModal(title, body, 'Cancel', 'Save'));
  };
}

export function setModalDelete(title, body) {
  return dispatch => {
    return dispatch(setModal(title, body, 'Cancel', 'Delete'));
  };
}

export function setModalError(title, body) {
  return dispatch => {
    return dispatch(setModal(title, body, 'OK'));
  };
}

function setModal(title, body, leftButton, rightButton) {
  return {
    type: SET_MODAL,
    data: {title, body, leftButton, rightButton}
  };
}


