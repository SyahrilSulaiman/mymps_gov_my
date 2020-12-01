import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getEmail, getNOKP, getToken } from './Common';

// handle the private routes
function PrivateRoute({ component: Component}) {
  return (
    <Route
      render={(props) => getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

export default PrivateRoute;