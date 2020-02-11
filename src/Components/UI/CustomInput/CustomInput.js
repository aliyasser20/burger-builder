import React from "react";
import "./CustomInput.scss";

const customInput = props => {
  let inputElement;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className="input-element"
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className="input-element"
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select className="input-element" value={props.value}>
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

export default customInput;
