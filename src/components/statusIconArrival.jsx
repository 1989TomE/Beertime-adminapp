import React from "react";

const StatusIconArrival = ({ statusTime }) => {
  return (
    <div className="statusIconHolder">
      <img
        src={require("../icons/arrival_orange_alt.png")}
        alt=""
        className="statusArrival"
      ></img>
      <div className="statusIconTime"> {statusTime}</div>
    </div>
  );
};

export default StatusIconArrival;
