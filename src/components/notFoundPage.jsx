import React from "react";
import Beertime from "./beertime";

const NotFoundPage = () => {
  return (
    <div className="container">
      <Beertime />
      <div className="not-found">
        Ups, požadovaná stránka nebyla nalezena :-(
      </div>
    </div>
  );
};

export default NotFoundPage;
