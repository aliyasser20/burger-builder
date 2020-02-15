import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "../../../axios-orders";

import Order from "../../../Components/Order/Order";
import withErrorHandler from "../../../HOC/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import Spinner from "../../../Components/UI/Spinner/Spinner";

class Orders extends React.Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orders = <Spinner />;

    if (!this.props.loading) {
      orders = (
        <div>
          {this.props.orders.map(order => (
            <Order
              deliveryMethod={order.deliveryMethod}
              customer={order.customer}
              price={Number(order.price)}
              ingredients={order.ingredients}
              key={order.id}
            ></Order>
          ))}
        </div>
      );
    }

    return orders;
  }
}

Orders.propTypes = {
  onFetchOrders: PropTypes.func,
  orders: PropTypes.array,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: () => dispatch(actions.fetchOrders())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
