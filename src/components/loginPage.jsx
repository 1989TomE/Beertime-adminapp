import React, { Component } from "react";
import Beertime from "./beertime";
import LoginForm from "./loginForm";
import { connect } from "react-redux";

class LoginPage extends Component {
  handleKeyPress = e => {
    if (e.charCode === 13) this.handle_login();
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
          handleLogin={this.props.handle_login}
          handleKeyPress={this.handleKeyPress}
        />
      </div>
    );
  }
}

const mapsTateToProps = state => {
  return {
    errors: state.inputsErrors,
    email: state.inputs.email,
    password: state.inputs.password
  };
};

export default connect(mapsTateToProps, null)(LoginPage);
