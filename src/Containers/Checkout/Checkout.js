import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends React.Component {
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
          ingredients={this.props.ings}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          component={ContactData}
        ></Route>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  ings: PropTypes.object
};

const mapStateToProps = state => ({
  ings: state.ingredients
});

export default connect(mapStateToProps)(Checkout);
