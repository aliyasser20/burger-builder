import React from "react";
import PropTypes from "prop-types";
import "./CustomButton.scss";

const customButton = props => {
  const classes = `custom-button ${props.btnType}`;
  const buttonType = props.type ? props.type : "button";

  return (
    <button
      className={classes}
      disabled={props.disabled}
      type={buttonType}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

customButton.propTypes = {
  clicked: PropTypes.func,
  children: PropTypes.string,
  btnType: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool
};

export default customButton;
