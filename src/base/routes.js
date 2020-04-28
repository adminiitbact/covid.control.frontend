import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import UserService from 'services/user-service';
import Login from 'modules/login';
import DashboardBase from 'modules/dashboard-base';

import PrivateHOC from './privateHOC';

const Routes = function () {
  return (
    <Switch>
      <Route name='login' exact path='/login' component={Login} />
      <PrivateRoute name='dashboard' path='/' component={DashboardBase} />
    </Switch>
  );
};

function PrivateRoute({ component: Component, ...rest }) {
  const isUserAvailable = UserService.isUserAvailable();
  // const isUserAvailable = true;

  return (
    <Route
      {...rest}
      render={props =>
        isUserAvailable ? (
          <PrivateHOC>
            <Component {...props} />
          </PrivateHOC>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default Routes;
