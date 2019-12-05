import React from "react";
import Beertime from "./beertime";
import LoginForm from "./loginForm";
import { connect } from "react-redux";

const LoginPage = props => {
  return (
    <div className="container">
      <Beertime />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
