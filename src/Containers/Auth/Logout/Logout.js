import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import * as actions from "../../../store/actions/index";

class Logout extends React.Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

Logout.propTypes = {
  onLogout: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(actions.logout())
});

export default connect(null, mapDispatchToProps)(Logout);
