import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "../../axios-orders";

import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

class BurgerBuilder extends React.Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState = ingredients => {
    const sum = Object.values(ingredients).reduce((a, b) => a + b, 0);

    return sum > 0;
  };

  purchaseHandler = () => {
    if (this.props.token) {
      this.setState(prevState => ({ purchasing: !prevState.purchasing }));
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    /* eslint-disable */
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    /* eslint-enable */

    const orderSummary = this.props.ings ? (
      <OrderSummary
        ingredients={this.props.ings}
        cancel={this.purchaseHandler}
        continue={this.purchaseContinueHandler}
        price={this.props.price.toFixed(2)}
      />
    ) : (
      <Spinner />
    );

    const spinner = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    return (
      <Fragment>
        <Modal show={this.state.purchasing} hide={this.purchaseHandler}>
          {orderSummary}
        </Modal>
        {this.props.ings ? (
          <Fragment>
            <Burger ingredients={this.props.ings} />
            <BuildControls
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemoved}
              disabled={disabledInfo}
              price={this.props.price.toFixed(2)}
              purchasable={this.updatePurchaseState(this.props.ings)}
              purchase={this.purchaseHandler}
              token={this.props.token}
            />
          </Fragment>
        ) : (
          spinner
        )}
      </Fragment>
    );
  }
}

BurgerBuilder.propTypes = {
  history: PropTypes.object,
  ings: PropTypes.object,
  price: PropTypes.number,
  error: PropTypes.bool,
  onIngredientAdded: PropTypes.func,
  onIngredientRemoved: PropTypes.func,
  onInitIngredients: PropTypes.func,
  onInitPurchase: PropTypes.func,
  token: PropTypes.string,
  onSetAuthRedirectPath: PropTypes.func
};

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
  onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
  onInitIngredients: () => dispatch(actions.initIngredients()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
  onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
