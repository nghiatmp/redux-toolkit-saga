import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

export interface PrivateRouteProps {
}

export function PrivateRoute (props: RouteProps) {
  console.log({props});
  
  // check user is logged in
  //if yes , show route
  //otherwise, redirect to login

  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  if (!isLoggedIn) return <Redirect to="/login"/>
  return (
    <Route {...props}/>
  );
}
