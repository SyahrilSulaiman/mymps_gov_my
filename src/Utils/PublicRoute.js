import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './Common';

// handle the public routes
function PublicRoute({ component: Component, ...rest }) {
  if(sessionStorage.getItem("role") == "Admin"){

    return (
      <Route
        {...rest}
        render={(props) => !getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/admin/dashboard' }} />}
      />
    )

  }else{

    return (
      <Route
        {...rest}
        render={(props) => !getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/bill' }} />}
      />
    )

  }
  
}

export default PublicRoute;