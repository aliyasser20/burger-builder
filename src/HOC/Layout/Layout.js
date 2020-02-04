import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./Layout.scss";
import Toolbar from "../../Components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../Components/Navigation/SideDrawer/SideDrawer";

class Layout extends React.Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => ({
      showSideDrawer: !prevState.showSideDrawer
    }));
  };

  render() {
    return (
      <Fragment>
        <Toolbar toggle={this.sideDrawerToggleHandler} />
        <SideDrawer
          show={this.state.showSideDrawer}
          toggle={this.sideDrawerToggleHandler}
        />
        <main className="content">{this.props.children}</main>
      </Fragment>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element
};

export default Layout;
