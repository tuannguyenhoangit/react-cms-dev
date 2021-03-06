// @flow weak

import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import earningGraph from './earningGraph';
import sideMenu from './sideMenu';
import userInfos from './userInfos';
import teamMates from './teamMates';
import views from './views';
import userAuth from './userAuth';
import events from './events';
import modal from './modal';

export const reducers = {
  earningGraph,
  sideMenu,
  userInfos,
  teamMates,
  views,
  userAuth,
  events,
  modal
};

export default combineReducers({
  ...reducers,
  routing: routerReducer
});
