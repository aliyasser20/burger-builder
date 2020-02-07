import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends React.Component {
  state = {
    ingredients: null,
    price: 0
  };

  UNSAFE_componentWillMount(props) {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price;
    // eslint-disable-next-line
    for (const param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = Number(param[1]);
      }
    }

    this.setState({
      ingredients,
      price
    });
  }

  onCheckoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  onCheckoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          onCheckoutCancelled={this.onCheckoutCancelledHandler}
          onCheckoutContinue={this.onCheckoutContinueHandler}
          ingredients={this.state.ingredients}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.price}
              {...props}
            />
          )}
        ></Route>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
};

export default Checkout;
