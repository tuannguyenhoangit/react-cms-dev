/* eslint consistent-return:0 */

import moment from 'moment';
import { getEventsData } from '../../services/API/events';

const REQUEST_EVENT_DATA = 'REQUEST_EVENT_DATA';
const RECEIVE_EVENT_DATA = 'RECEIVE_EVENT_DATA';
const ERROR_EVENT_DATA = 'ERROR_EVENT_DATA';

const initialState = {
  isFetching: false,
  data: [],
  time: null
};

export default function events(state = initialState, action) {
  switch (action.type) {
    case REQUEST_EVENT_DATA:
      return {
        ...state,
        isFetching: action.isFetching,
        time: action.time
      };
    case RECEIVE_EVENT_DATA:
      return {
        ...state,
        isFetching: action.isFetching,
        data: [...action.data],
        time: action.time
      };
    case ERROR_EVENT_DATA:
      return {
        ...state,
        isFetching: action.isFetching,
        time: action.time
      };
    default:
      return state;
  }
}

export function fetchEventDataIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchEventData(getState())) {
      return dispatch(fetchEventData());
    }
  };
}

function requestEventData(time = moment().format()) {
  return {
    type: REQUEST_EVENT_DATA,
    isFetching: true,
    time
  };
}

function receieveEventData(data, time = moment().format()) {
  return {
    type: RECEIVE_EVENT_DATA,
    isFetching: false,
    data,
    time
  };
}

function errorEventData(time = moment().format()) {
  return {
    type: ERROR_EVENT_DATA,
    isFetching: false,
    time
  };
}

function fetchEventData() {
  return dispatch => {
    dispatch(requestEventData());
    getEventsData()
      .then(
        data => dispatch(receieveEventData(data)))
      .catch(
        error => dispatch(errorEventData(error))
      );
  };
}


function shouldFetchEventData(state) {
  const eventStore = state.events;
  return !eventStore.isFetching;
}