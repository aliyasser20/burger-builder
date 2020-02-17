import React from "react";
import PropTypes from "prop-types";
import BuildControl from "./BuildControl/BuildControl";
import "./BuildControls.scss";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" }
];

const buildControls = props => (
  <div className="build-controls">
    <p>
      Current Price: <strong>${props.price}</strong>
    </p>
    {controls.map(control => (
      <BuildControl
        label={control.label}
        type={control.type}
        key={control.label}
        more={() => props.ingredientAdded(control.type)}
        less={() => props.ingredientRemoved(control.type)}
        disabled={props.disabled[control.type]}
      />
    ))}
    <button
      disabled={!props.purchasable}
      className="order-button"
      type="button"
      onClick={props.purchase}
    >
      {props.token ? "ORDER NOW" : "SIGNUP TO ORDER"}
    </button>
  </div>
);

buildControls.propTypes = {
  price: PropTypes.string,
  ingredientAdded: PropTypes.func,
  ingredientRemoved: PropTypes.func,
  disabled: PropTypes.object,
  purchasable: PropTypes.bool,
  purchase: PropTypes.func,
  token: PropTypes.string
};

export default buildControls;
