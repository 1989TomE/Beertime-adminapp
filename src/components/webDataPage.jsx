import React, { Component } from "react";
import { formatTimestamp } from "../utils/functions";
import Checkbox from "./inputCheckbox";
import DataTable from "./dataTable";
import InputField from "./inputField";
import NavBar from "./navBar";
import Button from "./button";
import Chart from "chart.js";

class WebDataPage extends Component {
  state = {
    dataVisibleButtonLable: "Zobrazit podrobná data",
    dataVisible: false
  };

  componentDidMount() {
    this.renderGraph();
  }

  componentDidUpdate() {
    this.renderGraph();
  }

  getToggleButtonLable = state => {
    return state === true ? "Zobrazit podrobná data" : "Skrýt podrobná data";
  };

  handleDataToggle = () => {
    const { dataVisible } = this.state;
    const newLable = this.getToggleButtonLable(dataVisible);
    this.setState({
      dataVisible: !dataVisible,
      dataVisibleButtonLable: newLable
    });
  };

  getGraphRatio = () => {
    if (window.innerWidth < 520) return 1.5;
    if (window.innerWidth < 720) return 2;
    else return 3;
  };

  getWebData = () => {
    const { rowsToDisplay, webData } = this.props;
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
    const { rowsToDisplayCheckbox, activityCheckbox } = this.props;
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
    const { errors } = this.props;

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
    const {
      rowsToDisplay,
      handleChangeForInput,
      rowsToDisplayCheckbox,
      activityCheckbox,
      webData,
      handleChangeForCheckbox,
      errors
    } = this.props;
    const { dataVisible, dataVisibleButtonLable } = this.state;

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
                />
                Počet dní
              </div>
              <div className="web_data_head_input_holder">
                <Checkbox
                  handleChangeForCheckbox={handleChangeForCheckbox}
                  checked={rowsToDisplayCheckbox}
                  name="rowsToDisplayCheckbox"
                  label="Počet uživatelů"
                  checkmark="checkmark_alt"
                  className="checkbox_alt"
                />
              </div>
              <div className="web_data_head_input_holder">
                <Checkbox
                  handleChangeForCheckbox={handleChangeForCheckbox}
                  checked={activityCheckbox}
                  name="activityCheckbox"
                  label="Aktivita uživatelů"
                  checkmark="checkmark"
                  className="checkbox"
                />
              </div>
            </div>
            <div className="web_data_graph" id="web_data_graph">
              
              {webData.length === 0 && <div className="noData">Graf nelze vykreslit</div>}
          </div>
            <canvas id="myChart"></canvas>
            <div className="web_data_toggle_button_holder">
              <Button
                handleEvent={this.handleDataToggle}
                label={dataVisibleButtonLable}
                className="button2"
              />
            </div>
          </div>
          {dataVisible && <DataTable webData={webData} errors={errors} />}
        </div>
      </div>
    );
  }
}

export default WebDataPage;
