import React from "react";
import PropTypes from "prop-types";
import "./CustomButton.scss";

const customButton = props => {
  const classes = `custom-button ${props.btnType}`;
  return (
    <button className={classes} type="button" onClick={props.clicked}>
      {props.children}
    </button>
  );
};

customButton.propTypes = {
  clicked: PropTypes.func,
  children: PropTypes.string,
  btnType: PropTypes.string
};

export default customButton;
