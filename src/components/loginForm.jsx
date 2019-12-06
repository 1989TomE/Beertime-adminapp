import React, { useState } from "react";
import InputField from "./inputField";
import Button from "./button";
import { toast } from "react-toastify";
import { login } from "../utils/backendCalls";
import { validate } from "../utils/functions";

const LoginForm = props => {
  const [state, setState] = useState({
    email: "",
    password: "",
    errors: {}
  });

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleLogin = () => {
    const { email, password } = state;
    const inputsToValidate = { email, password };
    const errors = { ...state.errors };

    for (let key in inputsToValidate) {
      const value = inputsToValidate[key];
      const error = validate(value, key);
      if (error !== null) {
        errors[key] = error;
        toast.error(error);
        break;
      } else {
        delete errors[key];
      }
    }
    setState({ ...state, errors });

    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      login(email, password);
    }
  };

  const { email, password, errors } = state;
  return (
    <div className="login_form">
      <div className="login_form_topic">Přihlášení:</div>
      <InputField
        id="email"
        name="email"
        type="text"
        value={email}
        errors={errors}
        handleChange={handleChange}
      />

      <InputField
        id="password"
        name="password"
        type="password"
        value={password}
        errors={errors}
        handleChange={handleChange}
      />

      <Button
        type="submit"
        label="Přihlásit se"
        name="login_button"
        handleClick={handleLogin}
      />
    </div>
  );
};

export default LoginForm;
