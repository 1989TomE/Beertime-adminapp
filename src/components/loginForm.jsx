import React from "react";
import InputField from "./inputField";
import Button from "./button";
import { handle_login } from "../utils/auth";
import { connect } from "react-redux";

const LoginForm = props => {
  const { email, password, errors } = props;

  return (
    <div className="login_form">
      <div className="login_form_topic">Přihlášení:</div>
      <InputField
        id="email"
        name="email"
        type="text"
        value={email}
        errors={errors}
      />

      <InputField
        id="password"
        name="password"
        type="password"
        value={password}
        errors={errors}
      />

      <Button
        type="submit"
        label="Přihlásit se"
        name="login_button"
        handleClick={props.handle_login}
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

const mapDispatchToProps = dispatch => {
  return {
    handle_login: () => {
      dispatch(handle_login);
    }
  };
};

export default connect(mapsTateToProps, mapDispatchToProps)(LoginForm);
