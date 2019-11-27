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
    const { loadDataFromServer } = this.props;
    ajaxSetup();
    loadDataFromServer();
  }

  render() {
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
              <ProtectedRoute {...props} component={UserDetail} />
            )}
          />
          <Redirect exact from="/" to="/webdata" />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadDataFromServer: () => {
      dispatch(fetch_data);
    }
  };
};

export default connect(null, mapDispatchToProps)(App);
