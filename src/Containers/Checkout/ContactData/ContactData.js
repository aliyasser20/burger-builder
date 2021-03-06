import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "../../../axios-orders";

import CustomButton from "../../../Components/UI/CustomButton/CustomButton";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import "./ContactData.scss";
import CustomInput from "../../../Components/UI/CustomInput/CustomInput";
import withErrorHandler from "../../../HOC/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      postalCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postal Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest"
      }
    },
    formValid: false
  };

  orderHandler = e => {
    e.preventDefault();

    // console.log("fired");
    const formData = {};

    // eslint-disable-next-line
    for (const key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangedHandler = (e, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

    updatedFormElement.value = e.target.value;

    if (updatedFormElement.valid !== undefined) {
      updatedFormElement.valid = this.checkValidity(
        updatedFormElement.value,
        updatedFormElement.validation
      );
    }
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    updatedFormElement.touched = true;

    let formValid = false;
    // eslint-disable-next-line
    for (let key in updatedOrderForm) {
      if (updatedOrderForm[key].valid !== undefined) {
        formValid = updatedOrderForm[key].valid;
      }
    }

    this.setState({
      orderForm: updatedOrderForm,
      formValid
    });
  };

  checkValidity = (value, rules) => {
    let isValid;

    if (rules.required) {
      isValid = value.trim() !== "";
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength;
    }

    return isValid;
  };

  render() {
    const formElementsArray = [];

    // eslint-disable-next-line
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    return (
      <div className="contact-data">
        <h4>Enter your contact information</h4>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement => (
              <CustomInput
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                change={e => this.inputChangedHandler(e, formElement.id)}
                valid={formElement.config.valid}
                touched={formElement.config.touched}
              />
            ))}
            <CustomButton
              type="submit"
              disabled={!this.state.formValid}
              btnType="success"
            >
              ORDER
            </CustomButton>
          </form>
        )}
      </div>
    );
  }
}

ContactData.propTypes = {
  ings: PropTypes.object,
  price: PropTypes.number,
  onOrderBurger: PropTypes.func,
  loading: PropTypes.bool,
  token: PropTypes.string,
  userId: PropTypes.string
};

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData, token) =>
    dispatch(actions.purchaseBurger(orderData, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
