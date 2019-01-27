import { appConfig } from '../../config';
import {
  defaultOptions,
  checkStatus,
  parseJSON
} from '../fetchTools';

export const getEventsData = () => {
  const url = `${appConfig.SERVER_API}/${appConfig.events.data.API}`;
  const options = { ...defaultOptions };
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(error => error);
};
