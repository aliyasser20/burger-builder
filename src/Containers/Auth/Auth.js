import React from "react";

import CustomInput from "../../Components/UI/CustomInput/CustomInput";
import CustomButton from "../../Components/UI/CustomButton/CustomButton";

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
    formValid: false
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

    return (
      <div className="auth">
        <form>
          {form}
          <CustomButton btnType="success">SUBMIT</CustomButton>
        </form>
      </div>
    );
  }
}

export default Auth;
