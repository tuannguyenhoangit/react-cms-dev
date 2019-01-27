// @flow weak

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../redux/modules/actions';
import * as eventActions from '../../../redux/modules/events';
import EventView from './Events';

const mapStateToProps = (state) => {
  return {
    currentView: state.views.currentView,
    events: state.events
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        enterEventView: actions.enterEventView,
        leaveEventView: actions.leaveEventView,
        ...eventActions
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventView);
