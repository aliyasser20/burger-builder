import React, { Fragment } from "react";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3
};

class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false
  };

  updatePurchaseState = ingredients => {
    const sum = Object.values(ingredients).reduce((a, b) => a + b, 0);

    this.setState({
      purchasable: sum > 0
    });
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;

    const updatedTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedTotalPrice
    });

    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];

    if (oldCount > 0) {
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
        ...this.state.ingredients
      };

      updatedIngredients[type] = updatedCount;

      const updatedTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

      this.setState({
        ingredients: updatedIngredients,
        totalPrice: updatedTotalPrice
      });

      this.updatePurchaseState(updatedIngredients);
    }
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    /* eslint-disable */
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    /* eslint-enable */

    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice.toFixed(2)}
          purchasable={this.state.purchasable}
        />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
