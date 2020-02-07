import React from "react";
import PropTypes from "prop-types";
import Burger from "../../Burger/Burger";
import CustomButton from "../../UI/CustomButton/CustomButton";
import "./CheckoutSummary.scss";

const checkoutSummary = props => (
  <div className="checkout-summary">
    <h2>We hope it tastes well!</h2>
    <div className="burger-holder">
      <Burger ingredients={props.ingredients} />
    </div>
    <CustomButton clicked={props.onCheckoutCancelled} btnType="danger">
      CANCEL
    </CustomButton>
    <CustomButton clicked={props.onCheckoutContinue} btnType="success">
      CONTINUE
    </CustomButton>
  </div>
);

checkoutSummary.propTypes = {
  ingredients: PropTypes.object,
  onCheckoutCancelled: PropTypes.func,
  onCheckoutContinue: PropTypes.func
};

export default checkoutSummary;
