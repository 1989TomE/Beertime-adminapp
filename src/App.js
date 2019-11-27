import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ajaxSetup } from "./utils/backendCalls";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/protectedRoute";
import LoginPage from "./components/loginPage";
import NotFoundPage from "./components/notFoundPage";
import UserDetail from "./components/userDetail";
import WebDataPage from "./components/webDataPage";
import UsersPage from "./components/usersPage";
import { fetch_data } from "./store/actions/fetchServerDataActions";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  componentDidMount() {
    ajaxSetup();
    this.props.loadDataFromServer();
  }

  render() {
    const { usersData, usersDataBackup, usersDataInputErrors } = this.props;

    return (
      <React.Fragment>
        <ToastContainer />
        <Switch>
          <Route path="/not-found" component={NotFoundPage} />
          <Route path="/login" render={props => <LoginPage {...props} />} />
          <Route
            path="/webdata"
            render={props => (
              <ProtectedRoute {...props} component={WebDataPage} />
            )}
          />
          <Route
            path="/users"
            render={props => (
              <ProtectedRoute {...props} component={UsersPage} />
            )}
          />
          <Route
            path="/userdetail/:id"
            render={props => (
              <ProtectedRoute
                {...props}
                component={UserDetail}
                usersData={usersData}
                usersDataBackup={usersDataBackup}
                errors={usersDataInputErrors}
                handleChangeForUserInputFields={
                  this.handleChangeForUserInputFields
                }
                handleSaveChanges={this.handleSaveChanges}
              />
            )}
          />

          <Redirect exact from="/" to="/webdata" />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    usersData: state.usersDataHolder.usersData,
    usersDataBackup: state.usersDataHolder.usersDataBackup,
    webData: state.webData,
    usersDataInputErrors: state.usersDataInputErrors,
    inputs: state.inputs,
    inputsErrors: state.inputsErrors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadDataFromServer: () => {
      dispatch(fetch_data);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
