import React from "react";
import PropTypes from "prop-types";
import "./MenuButton.scss";

const menuButton = props => (
  <div className="menu-button" onClick={props.toggle}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

menuButton.propTypes = {
  toggle: PropTypes.func
};

export default menuButton;
