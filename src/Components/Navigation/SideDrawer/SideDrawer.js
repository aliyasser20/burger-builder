import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import "./SideDrawer.scss";

const sideDrawer = props => {
  const classes = `side-drawer ${props.show ? "open" : "close"}`;

  return (
    <Fragment>
      <Backdrop show={props.show} hide={props.toggle} />
      <div className={classes}>
        <div className="logo-wrapper">
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Fragment>
  );
};

sideDrawer.propTypes = {
  toggle: PropTypes.func,
  show: PropTypes.bool
};

export default sideDrawer;
