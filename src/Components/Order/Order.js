import React from "react";
import PropTypes from "prop-types";
import "./Order.scss";

const order = props => {
  const ingredientsArray = Object.entries(props.ingredients);

  const ingredientList = ingredientsArray.map(ingredient => (
    <span className="ingredient" key={ingredient[0]}>
      {ingredient[0]} ({ingredient[1]})
    </span>
  ));

  return (
    <div className="order">
      <p>Ingredients: {ingredientList}</p>
      <p>
        Price: <strong>${Number(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

order.propTypes = {
  ingredients: PropTypes.object,
  price: PropTypes.number
};

export default order;
