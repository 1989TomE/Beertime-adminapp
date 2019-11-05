import React from "react";

const StatusIcon = ({ count, drinkType }) => {
  const src = require("../icons/" + drinkType + "_orange_" + count + ".png");
  return (
    <div className="statusIconHolder">
      <img src={src} alt="" className="statusIcon"></img>
    </div>
  );
};

export default StatusIcon;
