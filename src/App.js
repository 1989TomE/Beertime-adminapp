import React, { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ajaxSetup } from "./utils/backendCalls";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/protectedRoute";
import LoginPage from "./components/loginPage";
// import UserDetail from "./components/userDetail";
import NotFoundPage from "./components/notFoundPage";
import WebDataPage from "./components/webDataPage";
import UsersPage from "./components/usersPage";
import { fetch_data } from "./store/actions/fetchServerDataActions";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/loader";

const UserDetail = React.lazy(() => import("./components/userDetail"));

const App = props => {
  useEffect(() => {
    const { loadDataFromServer } = props;
    ajaxSetup();
    loadDataFromServer();
  }, []);

  return (
    <React.Fragment>
      <ToastContainer />
      <BrowserRouter>
        <React.Suspense fallback={<Loader className="loader_wrapper" />}>
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
        </React.Suspense>
      </BrowserRouter>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    loadDataFromServer: () => {
      dispatch(fetch_data);
    }
  };
};

export default connect(null, mapDispatchToProps)(App);
