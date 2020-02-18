import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Layout from "../HOC/Layout/Layout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Checkout from "./Checkout/Checkout";
import Orders from "./Checkout/Orders/Orders";
import Auth from "./Auth/Auth";
import Logout from "./Auth/Logout/Logout";
import * as actions from "../store/actions/index";

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignIN();
  }

  render() {
    const guardedRoutes = (
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/logout" component={Logout} />
        <Route path="/orders" component={Orders} />
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    const routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    return <Layout>{this.props.token ? guardedRoutes : routes}</Layout>;
  }
}

App.propTypes = {
  onTryAutoSignIN: PropTypes.func,
  token: PropTypes.string
};

const mapStateToProps = state => ({
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignIN: () => dispatch(actions.authCheckState())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
