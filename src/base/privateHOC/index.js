import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UserRefreshService from 'services/user-refresh-service';
import setUserInfo from 'utils/set-user-info';

import { updateUser } from './privateHOC-actions';

class PrivateHOC extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    UserRefreshService.refreshUserObject(this.setUserAuth);
    this.setUserRefreshTimeout();
  }

  componentWillUnmount() {
    clearTimeout(this.userTimeOut);
  }

  setUserAuth = user => {
    setUserInfo();
    this.props.updateUser({
      data: user
    });
  };

  setUserRefreshTimeout = () => {
    clearTimeout(this.userTimeOut);
    this.userTimeOut = setTimeout(() => {
      UserRefreshService.refreshUserObject(user => {
        this.setUserAuth(user);
        this.setUserRefreshTimeout();
      });
    }, 30000);
  };

  render() {
    const { children } = this.props;
    return children;
  }
}

PrivateHOC.propTypes = {
  updateUser: PropTypes.func
};

export default connect(
  state => ({}),
  dispatch =>
    bindActionCreators(
      {
        updateUser
      },
      dispatch
    )
)(PrivateHOC);
