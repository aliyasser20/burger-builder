import React, { Fragment } from "react";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3
};

class BurgerBuilder extends React.Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then(response => {
        this.setState({
          ingredients: response.data
        });
      })
      .catch(error =>
        this.setState({
          error: true
        })
      );
  }

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

  purchaseHandler = () => {
    this.setState(prevState => ({ purchasing: !prevState.purchasing }));
  };

  purchaseContinueHandler = () => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Ali Sayed",
        address: "Ottawa"
      },
      email: "test@test.com",
      deliveryMethod: "fastest"
    };

    this.setState({ loading: true });

    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({
          loading: false,
          purchasing: false
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          purchasing: false
        });
      });
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

    const orderSummary = this.state.ingredients ? (
      <OrderSummary
        ingredients={this.state.ingredients}
        cancel={this.purchaseHandler}
        continue={this.purchaseContinueHandler}
        price={this.state.totalPrice.toFixed(2)}
      />
    ) : (
      <Spinner />
    );

    const spinner = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    return (
      <Fragment>
        <Modal show={this.state.purchasing} hide={this.purchaseHandler}>
          {this.state.loading ? <Spinner /> : orderSummary}
        </Modal>
        {this.state.ingredients ? (
          <Fragment>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls
              ingredientAdded={this.addIngredientHandler}
              ingredientRemoved={this.removeIngredientHandler}
              disabled={disabledInfo}
              price={this.state.totalPrice.toFixed(2)}
              purchasable={this.state.purchasable}
              purchase={this.purchaseHandler}
            />
          </Fragment>
        ) : (
          spinner
        )}
      </Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
