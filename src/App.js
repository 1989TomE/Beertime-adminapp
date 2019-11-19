import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import $ from "jquery";
import { handleAjaxError, http, apiEndPoint } from "./utils/backendCalls";
import { ToastContainer, toast } from "react-toastify";
import ProtectedRoute from "./components/protectedRoute";
import LoginPage from "./components/loginPage";
import NotFoundPage from "./components/notFoundPage";
import UserDetail from "./components/userDetail";
import WebDataPage from "./components/webDataPage";
import UsersPage from "./components/usersPage";
import {
  deepClone,
  validate,
  saveAndDisplayInputErrors
} from "./utils/functions";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    email: "",
    password: "",
    webData: [],
    usersData: [],
    rowsToDisplay: 15,
    searchInput: "",
    rowsToDisplayCheckbox: "checked",
    activityCheckbox: "",
    errors: {},
    currentUser: null,
    loader: true,
    usersDataBackup: []
  };
  // preserve the initial state in a new object

  componentDidMount() {
    this.ajaxSetup();
    this.loadDataFromServer();
  }

  ajaxSetup = () => {
    $.ajaxSetup({ cache: false });
  };

  loadDataFromServer = async () => {
    const token = localStorage.getItem("token");
    try {
      let data = await http.get(apiEndPoint + "mainData.php", {
        limit: 100,
        token: token
      });
      data = $.parseJSON(data);
      const webData = data.webData;
      const usersData = data.usersData;
      const usersDataBackup = deepClone(data.usersData);
      this.setState({ webData, usersData, usersDataBackup });
    } catch (error) {
      handleAjaxError(error);

      if (error.type === "auth") {
        localStorage.clear();
        window.location.reload(false);
      }
    }
  };

  handleChangeForCheckbox = e => {
    const name = e.currentTarget.name;
    const clickedValue = e.currentTarget.value;

    let newValue = clickedValue === "checked" ? "" : "checked";
    this.setState({ [name]: newValue });
  };

  // for any input field
  handleChangeForInput = e => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    // check for input errors
    const error = validate(value, name);

    // show and save error or delete it if error has been fixed
    const errors = saveAndDisplayInputErrors(error, name, {
      ...this.state.errors
    });

    this.setState({ errors, [name]: value });
  };

  // for any input field
  handleChangeForUserInputFields = (e, facebook_id) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    const currentUserID = facebook_id;

    // check for input errors
    const error = validate(value, name);
    const errors = saveAndDisplayInputErrors(error, name, {
      ...this.state.errors
    });

    // update user data
    const usersData = [...this.state.usersData];
    const index = usersData.findIndex(
      user => user.facebook_id === currentUserID
    );
    const cloneUser = usersData[index];
    cloneUser[name] = value;
    this.setState({ errors, usersData });
  };

  handleSaveChanges = async facebook_id => {
    const usersData = this.state.usersData;

    const index = usersData.findIndex(user => user.facebook_id === facebook_id);

    const dataToServer = JSON.stringify(usersData[index]);

    const errors = this.state.errors;
    if (Object.keys(errors).length > 0) {
      toast.error(
        "Pole " + Object.keys(errors)[0] + " obsahuje nepovolené znaky."
      );
      return;
    }

    try {
      let data = await http.post(apiEndPoint + "update_user_data.php", {
        data: dataToServer
      });

      data = $.parseJSON(data);
      toast.success("Změny byly uloženy.");
      //update backup
      const clone = deepClone(this.state.usersData);
      this.setState({ usersDataBackup: clone });
    } catch (error) {
      handleAjaxError(error);
      this.setState({ usersData: this.state.usersDataBackup });
    }
  };

  render() {
    const {
      usersData,
      webData,
      usersDataBackup,
      rowsToDisplay,
      activityCheckbox,
      rowsToDisplayCheckbox,
      errors,
      searchInput,
      email,
      password,
      loader
    } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <Switch>
          <Route path="/not-found" component={NotFoundPage} />
          <Route
            path="/login"
            render={props => (
              <LoginPage
                {...props}
                value={email}
                passwordValue={password}
                errors={errors}
                handleLogin={this.handleLogin}
                loader={loader}
              />
            )}
          />

          <Route
            path="/webdata"
            render={props => (
              <ProtectedRoute
                {...props}
                component={WebDataPage}
                webData={webData}
                handleChangeForInput={this.handleChangeForInput}
                errors={errors}
                rowsToDisplay={rowsToDisplay}
                rowsToDisplayCheckbox={rowsToDisplayCheckbox}
                activityCheckbox={activityCheckbox}
                handleChangeForCheckbox={this.handleChangeForCheckbox}
              />
            )}
          />
          <Route
            path="/users"
            render={props => (
              <ProtectedRoute
                {...props}
                component={UsersPage}
                usersData={usersData}
                searchInput={searchInput}
                handleChangeForInput={this.handleChangeForInput}
                errors={errors}
              />
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
                errors={errors}
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

export default App;
