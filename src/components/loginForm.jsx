import React, { Component } from "react";
import InputField from "./inputField";
import Button from "./button";

class LoginForm extends Component {

  render() {
    const {
      email,
      password,
      errors,
      handleLogin,
      handleKeyPress
    } = this.props;
    return (
      <div className="login_form">
        <div className="login_form_topic">Přihlášení:</div>
        <InputField
          id="email"
          name="email"
          type="text"
          value={email}
          errors={errors}
          onKeyPress={handleKeyPress}
        />

        <InputField
          id="password"
          name="password"
          type="password"
          value={password}
          errors={errors}
          onKeyPress={handleKeyPress}
        />

        <Button handleEvent={handleLogin} label="Přihlásit se" name="login_button" />
      </div>
    );
  }
}

export default LoginForm;
