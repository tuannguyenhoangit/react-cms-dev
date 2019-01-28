/* eslint consistent-return:0 */

import moment from 'moment';
import { getEventsData, patchEventData, postEventData } from '../../services/API/events';

const REQUEST_EVENT_DATA = 'REQUEST_EVENT_DATA';
const RECEIVE_EVENT_DATA = 'RECEIVE_EVENT_DATA';
const ERROR_EVENT_DATA = 'ERROR_EVENT_DATA';
const INSERTED_EVENT = 'INSERTED_EVENT';
const INSERT_EVENT_ERROR = 'INSERT_EVENT_ERROR';
const UPDATED_EVENT = 'UPDATED_EVENT';
const UPDATE_EVENT_ERROR = 'UPDATE_EVENT_ERROR';

const initialState = {
  isFetching: false,
  data: [],
  time: null,
  updated: false,
  inserted: false,
  error: null,
  function: ''
};

export default function events(state = initialState, action) {
  switch (action.type) {
    case REQUEST_EVENT_DATA:
      return {
        ...state,
        updated: false,
        inserted: false,
        error: null,
        isFetching: action.isFetching,
        time: action.time
      };
    case RECEIVE_EVENT_DATA:
      return {
        ...state,
        updated: false,
        inserted: false,
        error: null,
        isFetching: action.isFetching,
        data: [...action.data],
        time: action.time
      };
    case ERROR_EVENT_DATA:
      return {
        ...state,
        updated: false,
        inserted: false,
        error: null,
        isFetching: action.isFetching,
        time: action.time
      };
    case INSERTED_EVENT:
      return {
        ...state,
        updated: false,
        inserted: true,
        error: null,
        time: action.time,
        function: 'insert'
      }
    case INSERT_EVENT_ERROR:
      return {
        ...state,
        updated: false,
        inserted: false,
        time: action.time,
        error: action.error,
        function: 'insert'
      }
    case UPDATED_EVENT:
      return {
        ...state,
        updated: true,
        inserted: false,
        error: null,
        time: action.time,
        function: 'update'
      }
    case UPDATE_EVENT_ERROR:
      return {
        ...state,
        updated: false,
        inserted: false,
        time: action.time,
        error: action.error,
        function: 'update'
      }
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

export function updateEventData(event) {
  return (dispatch, getState) => {
    if (shouldFetchEventData(getState())) {
      return dispatch(updateEvent(event));
    }
  };
}

export function insertEventData(event) {
  return (dispatch, getState) => {
    if (shouldFetchEventData(getState())) {
      return dispatch(insertEvent(event));
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


function insertedEvent(event, time = moment().format()) {
  return {
    event,
    type: INSERTED_EVENT,
    isFetching: false,
    time
  };
}

function insertEventError(error, time = moment().format()) {
  return {
    error,
    type: INSERT_EVENT_ERROR,
    isFetching: false,
    time
  };
}

function updatedEvent(event, time = moment().format()) {
  return {
    event,
    type: UPDATED_EVENT,
    isFetching: false,
    time
  };
}

function updateEventError(error, time = moment().format()) {
  return {
    error,
    type: UPDATE_EVENT_ERROR,
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

function updateEvent(event) {
  return dispatch => {
    patchEventData(event)
      .then(
        data => dispatch(updatedEvent(data)))
      .catch(
        error => dispatch(updateEventError(error))
      );
  };
}

function insertEvent(event) {
  return dispatch => {
    postEventData(event)
      .then(
        data => dispatch(insertedEvent(data)))
      .catch(
        error => dispatch(insertEventError(error))
      );
  };
}


function shouldFetchEventData(state) {
  const eventStore = state.events;
  return !eventStore.isFetching;
}