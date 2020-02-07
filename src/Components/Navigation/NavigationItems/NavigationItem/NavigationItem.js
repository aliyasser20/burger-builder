import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "./NavigationItem.scss";

const navigationItem = props => (
  <li className="navigation-item">
    <NavLink to={props.link} exact={props.exact}>
      {props.children}
    </NavLink>
  </li>
);

navigationItem.propTypes = {
  link: PropTypes.string,
  children: PropTypes.string,
  exact: PropTypes.bool
};

export default navigationItem;
