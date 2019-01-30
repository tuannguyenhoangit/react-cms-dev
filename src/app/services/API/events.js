import { appConfig } from '../../config';
import {
  defaultOptions,
  checkStatus,
  parseJSON
} from '../fetchTools';
import auth from '../auth';

const page = 1;
const perpage = 20;

export const getEventsData = async () => {
  const url = `${appConfig.SERVER_API}/${appConfig.events.data.API}?filter[limit]=${perpage}&filter[skip]=${perpage * (page - 1)}`;
  const options = { ...defaultOptions };
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(error => error);
};

export const patchEventData = async (params) => {
  const url = `${appConfig.SERVER_API}/${appConfig.events.update.API}${params.id}`;
  const options = {
    ...defaultOptions,
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${auth.getToken()}`
    },
    body: JSON.stringify(params)
  };
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(error => error);
};

export const postEventData = async (params) => {
  const url = `${appConfig.SERVER_API}/${appConfig.events.insert.API}`;
  const options = {
    ...defaultOptions,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${auth.getToken()}`
    },
    body: JSON.stringify(params)
  };
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(error => error);
};


export const deleteEventData = async (params) => {
  const url = `${appConfig.SERVER_API}/${appConfig.events.delete.API}${params.id}`;
  const options = {
    ...defaultOptions,
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${auth.getToken()}`
    },
    body: JSON.stringify(params)
  };
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(error => error);
};
