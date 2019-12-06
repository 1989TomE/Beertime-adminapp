import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
const ProtectedRoute = props => {
  const { component: ComponentName, ...rest } = props;
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn() === true ? (
          <ComponentName {...props} {...rest} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
export default ProtectedRoute;
