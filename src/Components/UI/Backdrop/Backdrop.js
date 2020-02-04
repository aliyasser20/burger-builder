import React from "react";
import PropTypes from "prop-types";
import "./Backdrop.scss";

const backdrop = props =>
  props.show ? <div onClick={props.hide} className="back-drop"></div> : null;

backdrop.propTypes = {
  show: PropTypes.bool,
  hide: PropTypes.func
};

export default backdrop;
