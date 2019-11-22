import React from "react";

const Beertime = () => {
  return (
    <div className="beertime">
      <div className="beertime_text_grey">Nepromarni příležitost</div>
      <div className="beertime_text_white">potkat se s kamrády a přáteli!</div>
      <div>
        <img
          src={require("../icons/text_logo2.png")}
          alt=""
          className="beertime_logo"
        />
      </div>
    </div>
  );
};

export default Beertime;
