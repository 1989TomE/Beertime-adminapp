import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Joi from "@hapi/joi";
import $ from "jquery";
import { handleAjaxError, http, apiEndPoint } from "./utils/backendCalls";
import { ToastContainer, toast } from "react-toastify";
import ProtectedRoute from "./components/protectedRoute";
import LoginPage from "./components/loginPage";
import NotFoundPage from "./components/notFoundPage";
import UserDetail from "./components/userDetail";
import WebDataPage from "./components/webDataPage";
import UsersPage from "./components/usersPage";
import { deepClone } from "./utils/functions";
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

  validate = (value, name) => {
    const schema = Joi.object({
      default: Joi.string().pattern(
        /^[a-zA-Z0-9áčďéěíňóřšťůúýžÁČĎÉĚÍŇÓŘŠŤŮÚÝŽ ]*$/
      ),
      rowsToDisplay: Joi.number()
        .allow("")
        .max(100),
      searchInput: Joi.string()
        .allow("")
        .pattern(/^[a-zA-Z0-9áčďéěíňóřšťůúýžÁČĎÉĚÍŇÓŘŠŤŮÚÝŽ ]*$/),
      drink_count: Joi.number()
        .allow("")
        .min(0)
        .max(9)
    });

    // set default or named validation
    const getSchemaHelper = name => {
      if (name === "rowsToDisplay" || name === "searchInput") {
        return name;
      } else {
        return "default";
      }
    };

    const getSchema = getSchemaHelper(name);
    var result = schema.validate({ [getSchema]: value });

    const errors = { ...this.state.errors };

    if (result.error) {
      // dont show error message again if it has been shown already
      if (!this.state.errors[name]) {
        if (name === "searchInput")
          errors[name] =
            "Pole vyhledávání může obsahovat pouze písmena a čísla.";
        else if (name === "rowsToDisplay")
          errors[name] =
            "Pole může obsahovat pouze čísla menší nebo rovna 100.";
        else if (name === "email")
          errors[name] = "Email není ve správném formátu";
        else if (name === "password")
          errors[name] = "Pole Heslo musí být vyplněno";
        else errors[name] = "Pole může obsahovat pouze písmena a čísla";
        toast.error(errors[name]);
      }
    } else {
      delete errors[name];
    }
    return errors;
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
    const errors = this.validate(value, name);
    if (
      name === "rowsToDisplay" ||
      name === "searchInput" ||
      name === "email" ||
      name === "password"
    ) {
      this.setState({ errors, [name]: value });
    } else {
      const usersData = [...this.state.usersData];
      const currentUser = $("#facebook_id").val();
      const index = usersData.findIndex(
        user => user.facebook_id === currentUser
      );
      const cloneUser = usersData[index];
      cloneUser[name] = value;
      this.setState({ errors, usersData });
    }
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
                handleChangeForInput={this.handleChangeForInput}
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
