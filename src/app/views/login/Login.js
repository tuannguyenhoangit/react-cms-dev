// @flow

// #region imports
import React, {
  PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Button
} from 'react-bootstrap';
import auth from '../../services/auth';
// #endregion

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  state = {
    email: '',
    password: ''
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.currentView === 'Login' && nextProps.userAuth.isAuthenticated) {
      this.processDashboard(nextProps.userAuth);
    }
  }


  // #region lifecycle methods
  componentDidMount() {
    const {
      enterLogin,
      disconnectUser
    } = this.props;

    disconnectUser(); // diconnect user: remove token and user info
    enterLogin();
  }

  componentWillUnmount() {
    const { leaveLogin } = this.props;
    leaveLogin();
  }

  render() {
    const {
      email,
      password
    } = this.state;

    const {
      userAuth
    } = this.props;

    return (
      <div className="content">
        <Row>
          <Col
            md={4}
            mdOffset={4}
            xs={10}
            xsOffset={1}
          >
            <form
              className="form-horizontal"
              noValidate>
              <fieldset>
                <legend
                  className="text-center"
                >
                  <h1>
                    <i className="fa fa-3x fa-user-circle" aria-hidden="true" />
                  </h1>
                  <h2>
                    Login
                  </h2>
                </legend>

                <div className="form-group">
                  <label
                    htmlFor="inputEmail"
                    className="col-lg-2 control-label">
                    Email
                  </label>
                  <div className="col-lg-10">
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail"
                      placeholder="Email"
                      value={email}
                      onChange={this.handlesOnEmailChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="inputPassword"
                    className="col-lg-2 control-label">
                    Password
                  </label>
                  <div className="col-lg-10">
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword"
                      placeholder="Password"
                      value={password}
                      onChange={this.handlesOnPasswordChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <Col
                    lg={10}
                    lgOffset={2}
                  >
                    <Button
                      className="login-button btn-block"
                      bsStyle="primary"
                      disabled={userAuth.isLogging}
                      onClick={this.handlesOnLogin}>
                      {
                        userAuth.isLogging
                          ?
                          <span>
                            login in...
                            &nbsp;
                            <i
                              className="fa fa-spinner fa-pulse fa-fw"
                            />
                          </span>
                          :
                          <span>
                            Login
                          </span>
                      }
                    </Button>
                  </Col>
                </div>
              </fieldset>
            </form>
          </Col>
        </Row>
        <Row>
          <Col
            md={4}
            mdOffset={4}
            xs={10}
            xsOffset={1}
          >
            <div
              className="pull-right"
            >
              <Button
                bsStyle="default"
                onClick={this.goHome}
              >
                back to home
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
  // #endregion

  // #region form inputs change callbacks
  handlesOnEmailChange = (event) => {
    if (event) {
      event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ email: event.target.value.trim() });
    }
  }

  handlesOnPasswordChange = (event) => {
    if (event) {
      event.preventDefault();
      // should add some validator before setState in real use cases
      this.setState({ password: event.target.value.trim() });
    }
  }
  // #endregion


  // #region on login button click callback
  handlesOnLogin = async (event) => {
    if (event) {
      event.preventDefault();
    }
    const { logUserIfNeeded } = this.props;
    const {
      email,
      password
    } = this.state;
    logUserIfNeeded(email, password);
  }
  // #endregion

  /**
   * set data for user after login successfully
   */

  processDashboard = (userAuth) => {
    localStorage.setItem('cms@user', JSON.stringify(userAuth));
    const { history } = this.props;
    const { token } = userAuth;
    auth.setToken(token);
    history.push({ pathname: '/' });
  }

  // #region on go back home button click callback
  goHome = (event) => {
    if (event) {
      event.preventDefault();
    }
    const { history } = this.props;
    history.push({ pathname: '/' });
  }
  // #endregion
}

Login.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  // views props:
  currentView: PropTypes.string.isRequired,
  enterLogin: PropTypes.func.isRequired,
  leaveLogin: PropTypes.func.isRequired,

  // userAuth:
  userAuth: PropTypes.object,
  disconnectUser: PropTypes.func.isRequired,
  logUserIfNeeded: PropTypes.func.isRequired
};


export default Login;
