import React from "react";
import PropTypes from "prop-types";
import "./Ingredients.scss";

const ingredient = props => {
  let ingredientToBe = null;

  switch (props.type) {
    case "bread-bottom":
      ingredientToBe = <div className="bread-bottom"></div>;
      break;
    case "bread-top":
      ingredientToBe = (
        <div className="bread-top">
          <div className="seeds-1"></div>
          <div className="seeds-2"></div>
        </div>
      );
      break;
    case "meat":
      ingredientToBe = <div className="meat"></div>;
      break;
    case "salad":
      ingredientToBe = <div className="salad"></div>;
      break;
    case "cheese":
      ingredientToBe = <div className="cheese"></div>;
      break;
    default:
      ingredientToBe = null;
      break;
  }

  return ingredientToBe;
};

ingredient.propTypes = {
  type: PropTypes.string
};

export default ingredient;
