import React from 'react';
import {
  Route, Redirect, BrowserRouter, Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';

const isAuthenticated = false; // TODO: auth logic

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export const Routers = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <h1>Login</h1>} />
      <PrivateRoute path="/app" component={() => <h1>App</h1>} />
    </Switch>
  </BrowserRouter>
);

export default function App() {
  return <Routers />;
}
