// @flow weak

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../redux/modules/actions';
import * as eventActions from '../../../redux/modules/events';
import * as modalActions from '../../../redux/modules/modal';

import Editor from './Editor';

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
        enterEventEditorView: actions.enterEventEditorView,
        leaveEventEditorView: actions.leaveEventEditorView,
        ...eventActions,
        ...modalActions
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
