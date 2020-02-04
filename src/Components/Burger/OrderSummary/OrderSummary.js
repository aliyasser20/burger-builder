import React from "react";
import PropTypes from "prop-types";
import "./OrderSummary.scss";
import CustomButton from "../../UI/CustomButton/CustomButton";

// This could've been a functional component, was originally and then switched to class for debugging purposes //
class OrderSummary extends React.Component {
  render() {
    const ingredientsArray = Object.entries(this.props.ingredients);

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
          Total: <strong>${this.props.price}</strong>
        </p>
        <p>Continue to checkout?</p>
        <CustomButton btnType="danger" clicked={this.props.cancel}>
          CANCEL
        </CustomButton>
        <CustomButton btnType="success" clicked={this.props.continue}>
          CONTINUE
        </CustomButton>
      </div>
    );
  }
}

OrderSummary.propTypes = {
  ingredients: PropTypes.object,
  cancel: PropTypes.func,
  continue: PropTypes.func,
  price: PropTypes.string
};

export default OrderSummary;
