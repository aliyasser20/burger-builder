import React from "react";
import PropTypes from "prop-types";
import NavigationItem from "./NavigationItem/NavigationItem";
import "./NavigationItems.scss";

const navigationItems = props => (
  <ul className="navigation-items">
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    {props.token ? (
      <NavigationItem link="/orders">Orders</NavigationItem>
    ) : null}
    {props.token ? (
      <NavigationItem link="/logout">Logout</NavigationItem>
    ) : (
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    )}
  </ul>
);

navigationItems.propTypes = {
  token: PropTypes.string
};

export default navigationItems;
