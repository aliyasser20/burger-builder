import React from "react";
import PropTypes from "prop-types";
import "./NavigationItem.scss";

const navigationItem = props => (
  <li className="navigation-item">
    <a className={props.active ? "active" : null} href={props.link}>
      {props.children}
    </a>
  </li>
);

navigationItem.propTypes = {
  link: PropTypes.string,
  children: PropTypes.string,
  active: PropTypes.bool
};

export default navigationItem;
