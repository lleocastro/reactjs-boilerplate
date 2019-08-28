import React, { useState } from 'react';
import {
  Route, Redirect, BrowserRouter, Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import routes from './routes';

const AuthenticatedBaseLayout = ({ children }) => (
  <div className="authenticated-area">
    {children}
  </div>
);

AuthenticatedBaseLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

const AuthenticatedRoutes = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => (
      isAuthenticated ? (
        <AuthenticatedBaseLayout><Component {...props} /></AuthenticatedBaseLayout>
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
    )}
  />
);

AuthenticatedRoutes.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
};

const UnauthenticatedBaseLayout = ({ children }) => (
  <div className="unauthenticated-area">
    {children}
  </div>
);

UnauthenticatedBaseLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

const UnauthenticatedRoutes = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => (
      !isAuthenticated ? (
        <UnauthenticatedBaseLayout><Component {...props} /></UnauthenticatedBaseLayout>
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    )}
  />
);

UnauthenticatedRoutes.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
};

export const Router = ({ isAuthenticated }) => (
  <BrowserRouter>
    <Switch>
      {routes && routes.map((route) => {
        if (route.private) {
          return (
            <AuthenticatedRoutes
              exact
              path={route.path}
              component={route.component}
              isAuthenticated={isAuthenticated}
            />
          );
        }
        return (
          <UnauthenticatedRoutes
            exact
            path={route.path}
            component={route.component}
            isAuthenticated={isAuthenticated}
          />
        );
      })}
    </Switch>
  </BrowserRouter>
);

Router.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  return <Router isAuthenticated={isAuthenticated} />;
}
