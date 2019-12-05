import React, { Component } from "react";
import InputField from "./inputField";
import Button from "./button";

const LoginForm = props => {
  const { email, password, errors, handleLogin } = props;
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

      <Button label="Přihlásit se" name="login_button" />
    </div>
  );
};

export default LoginForm;
