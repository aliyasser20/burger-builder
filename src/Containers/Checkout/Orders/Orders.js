import React from "react";
import axios from "../../../axios-orders";
import Order from "../../../Components/Order/Order";
import withErrorHandler from "../../../HOC/withErrorHandler/withErrorHandler";

class Orders extends React.Component {
  state = {
    orders: [],
    loading: true
  };

  constructor(props) {
    super(props);
    axios
      .get("/orders.json")
      .then(response => {
        const ordersArray = [];

        // eslint-disable-next-line
        for (const key in response.data) {
          ordersArray.push({ id: key, ...response.data[key] });
        }
        console.log(ordersArray);

        this.setState({
          orders: ordersArray,
          loading: false
        });
      })
      .catch(error =>
        this.setState({
          loading: false
        })
      );
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            deliveryMethod={order.deliveryMethod}
            customer={order.customer}
            price={order.price}
            ingredients={order.ingredients}
            key={order.id}
          ></Order>
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
