import React, { Component } from "react";
import Joi from "@hapi/joi";
import { toast } from "react-toastify";
import Beertime from "./beertime";
import LoginForm from "./loginForm";
import { http, apiEndPoint } from "../utils/backendCalls";
import $ from "jquery";

class LoginPage extends Component {

  handleKeyPress = (e) => {
  if (e.charCode === 13) this.handleLogin();
  }



  handleLogin = async () => {
    const email = this.props.email;
    const password = this.props.password;

    //validation
    const schema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "cz", "eu"] }
      }),
      password: Joi.string().min(1)
    });
    const errors = {};
    const result = schema.validate({ email: email, password: password });

    // error in input
    if (result.error) {
      const field = result.error.details[0].path[0];
      const errorMessage = result.error.details[0].message;
      errors[field] = errorMessage;
      toast.error(errorMessage);
      this.setState({ errors });
    } else {
      //send ajax to server and validate there
      let data = await http.post(apiEndPoint + "login.php", {
        email: email,
        password: password
      });

      data = $.parseJSON(data);
      if (data.response === "fail") {
        toast.error("Nesprávný email nebo heslo");
      } else if ((data.response = "success")) {
        localStorage.setItem("token", data.jwt);
        window.location.href = "/webData";
      }
    }
  };

  render() {
    const { password, email, errors } = this.props;
    return (
      <div className="container">
        <Beertime />
        <LoginForm
          email={email}
          password={password}
          errors={errors}
          handleLogin={this.handleLogin}
          handleKeyPress={this.handleKeyPress}
        />
      </div>
    );
  }
}

export default LoginPage;
