import React from "react";
import axios from "../../../axios-orders";
import CustomButton from "../../../Components/UI/CustomButton/CustomButton";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import "./ContactData.scss";
import CustomInput from "../../../Components/UI/CustomInput/CustomInput";

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: ""
      },
      postalCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postal Code"
        },
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email"
        },
        value: ""
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: ""
      }
    },
    loading: false
  };

  orderHandler = e => {
    e.preventDefault();

    console.log("fired");
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price
    };
    this.setState({ loading: true });
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({
          loading: false
        });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({
          loading: false
        });
      });
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

    console.log(formElementsArray);

    return (
      <div className="contact-data">
        <h4>Enter your contact information</h4>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <form action="">
            {formElementsArray.map(formElement => (
              <CustomInput
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
              />
            ))}
            <CustomButton btnType="success" clicked={this.orderHandler}>
              ORDER
            </CustomButton>
          </form>
        )}
      </div>
    );
  }
}

export default ContactData;
