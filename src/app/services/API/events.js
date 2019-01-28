import { appConfig } from '../../config';
import {
  defaultOptions,
  checkStatus,
  parseJSON
} from '../fetchTools';
import auth from '../auth';


export const getEventsData = () => {
  const url = `${appConfig.SERVER_API}/${appConfig.events.data.API}`;
  const options = { ...defaultOptions };
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(error => error);
};

export const patchEventData = (params) => {
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

export const postEventData = (params) => {
  const url = `${appConfig.SERVER_API}/${appConfig.events.insert.API}`;
  console.log(params);
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

