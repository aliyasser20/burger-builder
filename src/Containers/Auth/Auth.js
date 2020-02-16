import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../store/actions/index";

import CustomInput from "../../Components/UI/CustomInput/CustomInput";
import CustomButton from "../../Components/UI/CustomButton/CustomButton";
import Spinner from "../../Components/UI/Spinner/Spinner";

import "./Auth.scss";

class Auth extends React.Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email Address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: false
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
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

  inputChangedHandler = (e, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: e.target.value,
        valid: this.checkValidity(
          e.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };

    this.setState({ controls: updatedControls });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => ({ isSignup: !prevState.isSignup }));
  };

  render() {
    const formElementsArray = [];

    // eslint-disable-next-line
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    const form = formElementsArray.map(formElement => (
      <CustomInput
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        change={e => this.inputChangedHandler(e, formElement.id)}
        valid={formElement.config.valid}
        touched={formElement.config.touched}
      />
    ));

    const errorMessage = this.props.error ? (
      <p>{this.props.error.message}</p>
    ) : null;

    const authForm = this.props.loading ? (
      <Spinner />
    ) : (
      <form onSubmit={this.onSubmitHandler}>
        {form}
        <CustomButton type="submit" btnType="success">
          SUBMIT
        </CustomButton>
        <CustomButton clicked={this.switchAuthModeHandler} btnType="danger">
          SWITCH TO {this.state.isSignup ? "SIGN IN" : "SIGNUP"}
        </CustomButton>
      </form>
    );

    return (
      <div className="auth">
        {errorMessage}
        {authForm}
      </div>
    );
  }
}

Auth.propTypes = {
  onAuth: PropTypes.func,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignup) =>
    dispatch(actions.auth(email, password, isSignup))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
