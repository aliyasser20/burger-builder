import React from "react";
import PropTypes from "prop-types";
import "./CustomInput.scss";

const customInput = props => {
  let inputElement;

  const classes = `input-element ${
    !props.valid && props.touched ? "invalid" : null
  }`;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          onChange={props.change}
          className={classes}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={props.change}
          className={classes}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          onChange={props.change}
          className="input-element"
          value={props.value}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      break;
  }

  return (
    <div className="custom-input">
      <label className="label">{props.label}</label>
      {inputElement}
    </div>
  );
};

customInput.propTypes = {
  label: PropTypes.string,
  elementConfig: PropTypes.object,
  value: PropTypes.string,
  change: PropTypes.func,
  elementType: PropTypes.string,
  valid: PropTypes.bool,
  touched: PropTypes.bool
};

export default customInput;
