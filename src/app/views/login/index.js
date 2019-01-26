// @flow weak

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as viewsActions from '../../redux/modules/views';
import * as userAuthActions from '../../redux/modules/userAuth';
import Login from './Login';

const mapStateToProps = (state) => {
  return {
    // views:
    currentView: state.views.currentView,
    // useAuth
    userAuth: state.userAuth

  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // views:
      ...viewsActions,
      // userAuth:
      ...userAuthActions
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
