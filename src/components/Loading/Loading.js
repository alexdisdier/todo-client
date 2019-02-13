import React from "react";

// source animation loading: https://codepen.io/alexdisdier/pen/XOBVdR
import image from "../../assets/img/loading.svg";
import "./Loading.css";

const loading = () => {
  return (
    <div className="loader center-page loader--style1" title="0">
      <img src={image} alt="loading gif" />
    </div>
  );
};

export default loading;
