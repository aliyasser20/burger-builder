import React from "react";
import PropTypes from "prop-types";
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";
import MenuButton from "../MenuButton/MenuButton";
import "./Toolbar.scss";

const toolbar = props => (
  <header className="toolbar">
    <MenuButton toggle={props.toggle} />
    <div className="logo-wrapper">
      <Logo />
    </div>
    <nav className="desktop-only">
      <NavigationItems token={props.token} />
    </nav>
  </header>
);

toolbar.propTypes = {
  toggle: PropTypes.func,
  token: PropTypes.string
};

export default toolbar;
