import React from "react";
import Beertime from "./beertime";
import LoginForm from "./loginForm";
import { connect } from "react-redux";

const LoginPage = props => {
  const handleKeyPress = e => {
    console.log(e);
    if (e.charCode === 13) props.handle_login();
  };

  const { password, email, errors } = props;
  return (
    <div className="container">
      <Beertime />
      <LoginForm
        email={email}
        password={password}
        errors={errors}
        handleLogin={props.handle_login}
        handleKeyPress={handleKeyPress}
      />
    </div>
  );
};

const mapsTateToProps = state => {
  return {
    errors: state.inputsErrors,
    email: state.inputs.email,
    password: state.inputs.password
  };
};

export default connect(mapsTateToProps, null)(LoginPage);
