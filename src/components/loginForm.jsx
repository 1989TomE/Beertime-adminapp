import React, { Component } from "react";
import InputField from "./inputField";
import Button from "./button";

class LoginForm extends Component {
  state = {};
  render() {
    const {
      email,
      password,
      handleChangeForInput,
      errors,
      handleLogin
    } = this.props;
    return (
      <div className="login_form">
        <div className="login_form_topic">Přihlášení:</div>
        <InputField
          id="email"
          name="email"
          type="text"
          value={email}
          handleChangeEvent={handleChangeForInput}
          errors={errors}
        />

        <InputField
          id="password"
          name="password"
          type="password"
          value={password}
          handleChangeEvent={handleChangeForInput}
          errors={errors}
        />

        <Button handleEvent={handleLogin} label="Přihlásit se" />
      </div>
    );
  }
}

export default LoginForm;
