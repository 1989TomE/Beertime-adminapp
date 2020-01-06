import React, { Component } from "react";
import { formatTimestamp, validate } from "../utils/functions";
import Checkbox from "./inputCheckbox";
import DataTable from "./dataTable";
import InputField from "./inputField";
import NavBar from "./navBar";
import Button from "./button";
import Chart from "chart.js";
import { connect } from "react-redux";
import { toast } from "react-toastify";

class WebDataPage extends React.PureComponent {
  state = {
    toggleButton: {
      dataVisibleButtonLable: "Zobrazit podrobná data",
      dataVisible: false
    },
    rowsToDisplay: 15,
    errors: {},
    checkboxes: {
      rowsToDisplayCheckbox: "checked",
      activityCheckbox: ""
    }
  };

  componentDidMount() {
    this.renderGraph();
  }

  componentDidUpdate() {
    this.renderGraph();
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    const errors = { ...this.state.errors };

    const error = validate(value, name);

    if (error !== null) {
      if (!errors.hasOwnProperty(name)) toast.error(error);

      errors[name] = error;
    } else {
      delete errors[name];
    }

    this.setState({ [name]: value, errors });
  };

  handleCheckbox = e => {
    const name = e.target.name;
    const checkboxes = { ...this.state.checkboxes };

    const oldValue = checkboxes[name];
    const newValue = oldValue === "checked" ? "" : "checked";
    checkboxes[name] = newValue;

    this.setState({ checkboxes });
  };

  getToggleButtonLable = state => {
    return state === true ? "Zobrazit podrobná data" : "Skrýt podrobná data";
  };

  handleDataToggle = () => {
    const { dataVisible } = this.state.toggleButton;
    const newLable = this.getToggleButtonLable(dataVisible);
    const toggleButton = {
      dataVisible: !dataVisible,
      dataVisibleButtonLable: newLable
    };
    this.setState({
      toggleButton
    });
  };

  getGraphRatio = () => {
    if (window.innerWidth < 520) return 1.5;
    if (window.innerWidth < 720) return 2;
    else return 3;
  };

  getWebData = () => {
    const { webData } = this.props;
    const { rowsToDisplay } = this.state;
    return webData.slice(0, rowsToDisplay);
  };

  getGraphLabels = () => {
    const webData = this.getWebData();
    return webData
      .map(row => {
        return formatTimestamp(row.timestamp);
      })
      .reverse();
  };

  getGraphDatasets = () => {
    const { rowsToDisplayCheckbox, activityCheckbox } = this.state.checkboxes;
    const datasets = [];

    const webData = this.getWebData();

    if (rowsToDisplayCheckbox === "checked") {
      // extrat user count graph data from props
      const graphUsersCount = webData
        .map(row => {
          return row.users_count_with_app;
        })
        .reverse();

      const usersCountGraphData = {
        label: "Počet uživatelů",
        backgroundColor: "rgba(255, 255, 255, 0)",
        borderColor: "rgb(251, 176, 59)",
        fill: false,
        pointBackgroundColor: "rgb(251, 176, 59)",
        data: graphUsersCount
      };

      datasets.push(usersCountGraphData);
    }

    if (activityCheckbox === "checked") {
      // extrat activity graph data from props
      const graphActivity = webData
        .map(row => {
          return row.how_many_opened_app;
        })
        .reverse();

      const activityGraphData = {
        label: "Aktivita uživatelů",
        backgroundColor: "rgba(255, 255, 255, 0)",
        borderColor: "rgb(60, 60, 60)",
        pointBackgroundColor: "rgb(60, 60, 60)",
        data: graphActivity
      };

      datasets.push(activityGraphData);
    }

    return datasets;
  };

  renderGraph() {
    const { errors } = this.state;

    const webData = this.getWebData();

    if (webData.length > 0 && errors.rowsToDisplay == undefined) {
      // get required graph data
      const graphLabels = this.getGraphLabels();
      const graphDatasets = this.getGraphDatasets();
      const graphRatio = this.getGraphRatio();

      let ctx = document.getElementById("myChart").getContext("2d");
      var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: "line",
        // The data for our dataset
        data: {
          labels: graphLabels,
          datasets: graphDatasets
        },
        // Configuration options go here
        options: {
          tooltips: {
            enabled: false
          },
          legend: {
            display: false,
            position: "bottom"
          },
          aspectRatio: graphRatio,
          animation: {
            duration: 0 // general animation time
          },
          hover: {
            animationDuration: 0 // duration of animations when hovering an item
          },
          responsiveAnimationDuration: 0, // animation duration after a resize
          steppedLine: false
        }
      });
    }
  }

  render() {
    const { webData, loader } = this.props;
    const { toggleButton, errors, rowsToDisplay, checkboxes } = this.state;
    const { dataVisible, dataVisibleButtonLable } = toggleButton;

    return (
      <div className="main">
        <NavBar />
        <div className="web_data">
          <div className="web_data_top">
            <div className="web_data_head">
              <div className="web_data_head_input_holder">
                <InputField
                  name="rowsToDisplay"
                  errors={errors}
                  value={rowsToDisplay}
                  schemaname="rowsToDisplay"
                  type="text"
                  handleChange={e => this.handleChange(e)}
                />
                Počet dní
              </div>
              <div className="web_data_head_input_holder">
                <Checkbox
                  name="rowsToDisplayCheckbox"
                  label="Počet uživatelů"
                  checkmark="checkmark_alt"
                  className="checkbox_alt"
                  handleCheckbox={this.handleCheckbox}
                  checkboxes={checkboxes}
                />
              </div>
              <div className="web_data_head_input_holder">
                <Checkbox
                  name="activityCheckbox"
                  label="Aktivita uživatelů"
                  checkmark="checkmark"
                  className="checkbox"
                  handleCheckbox={this.handleCheckbox}
                  checkboxes={checkboxes}
                />
              </div>
            </div>

            <div className="web_data_graph" id="web_data_graph">
              {webData.length === 0 && loader === false && (
                <div className="noData">Graf nelze vykreslit</div>
              )}
            </div>
            <canvas id="myChart"></canvas>
            <div className="web_data_toggle_button_holder">
              <Button
                handleClick={this.handleDataToggle}
                label={dataVisibleButtonLable}
                className="button2"
                name="webDataToggle"
              />
            </div>
          </div>
          {dataVisible && <DataTable />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    webData: state.webData,
    loader: state.loader
  };
};

export default connect(mapStateToProps, null)(WebDataPage);
