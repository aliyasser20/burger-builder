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
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends React.Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  // componentDidMount() {
  //   axios
  //     .get("/ingredients.json")
  //     .then(response => {
  //       this.setState({
  //         ingredients: response.data
  //       });
  //     })
  //     .catch(error =>
  //       this.setState({
  //         error: true
  //       })
  //     );
  // }

  updatePurchaseState = ingredients => {
    const sum = Object.values(ingredients).reduce((a, b) => a + b, 0);

    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState(prevState => ({ purchasing: !prevState.purchasing }));
  };

  purchaseContinueHandler = () => {
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
  onIngredientAdded: PropTypes.func,
  onIngredientRemoved: PropTypes.func
};

const mapStateToProps = state => ({
  ings: state.ingredients,
  price: state.totalPrice
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingName =>
    dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
  onIngredientRemoved: ingName =>
    dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
