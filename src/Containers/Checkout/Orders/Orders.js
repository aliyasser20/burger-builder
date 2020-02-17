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
    this.props.onFetchOrders(this.props.token, this.props.userId);
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
  loading: PropTypes.bool,
  token: PropTypes.string,
  userId: PropTypes.string
};

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
