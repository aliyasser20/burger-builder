import React from "react";
import axios from "../../../axios-orders";
import CustomButton from "../../../Components/UI/CustomButton/CustomButton";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import "./ContactData.scss";

class ContactData extends React.Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = e => {
    e.preventDefault();

    console.log("fired");
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
    return (
      <div className="contact-data">
        <h4>Enter your contact information</h4>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <form action="">
            <input type="text" name="name" placeholder="Your Name" />
            <input type="email" name="email" placeholder="Your Email" />
            <input type="text" name="street" placeholder="Street" />
            <input type="text" name="postal" placeholder="Postal Code" />
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
