import React, { Component } from "react";
import { formatTimestamp } from "../utils/functions";

class DataTable extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.errors.rowsToDisplay == undefined ? true : false;
  }

  render() {
    const { webData } = this.props;
    return (
      <div className="web_data_table" id="web_data_table">
        <div className="row">
          <div className="column s">Datum</div>
          <div className="column s">Přihlášených uživatel</div>
          <div className="column s">Aktivní uživatelé</div>
          <div className="column s">Počet otevření aplikace</div>
          <div className="column s">Počet pozvánek</div>
        </div>
        <ul>
          <li>
            {webData.map(row => (
              <div key={row.web_data_id} className="row">
                <div className="column s">{formatTimestamp(row.timestamp)}</div>
                <div className="column"> {row.users_count_with_app}</div>
                <div className="column"> {row.how_many_opened_app}</div>
                <div className="column"> {row.app_open_number_SUM}</div>
                <div className="column"> {row.invitations_count}</div>
              </div>
            ))}
          </li>
        </ul>
      </div>
    );
  }
}

export default DataTable;
