import React from "react";
import PropTypes from "prop-types";
import "./OrderSummary.scss";
import CustomButton from "../../UI/CustomButton/CustomButton";

const orderSummary = props => {
  const ingredientsArray = Object.entries(props.ingredients);

  const allIngredientsInputted = ingredientsArray.map(ingredient => {
    const multiplesOfIngredients = [];

    for (let i = 1; i <= ingredient[1]; i++) {
      multiplesOfIngredients.push(
        <li className="capitalize" key={ingredient[0] + i}>
          {ingredient[0]}: {i}
        </li>
      );
    }

    return multiplesOfIngredients[multiplesOfIngredients.length - 1];
  });

  return (
    <div className="order-summary">
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{allIngredientsInputted}</ul>
      <p>
        Total: <strong>${props.price}</strong>
      </p>
      <p>Continue to checkout?</p>
      <CustomButton btnType="danger" clicked={props.cancel}>
        CANCEL
      </CustomButton>
      <CustomButton btnType="success" clicked={props.continue}>
        CONTINUE
      </CustomButton>
    </div>
  );
};

orderSummary.propTypes = {
  ingredients: PropTypes.object,
  cancel: PropTypes.func,
  continue: PropTypes.func,
  price: PropTypes.string
};

export default orderSummary;
