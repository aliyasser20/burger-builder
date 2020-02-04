import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./Layout.scss";
import Toolbar from "../Navigation/Toolbar/Toolbar";

const layout = props => (
  <Fragment>
    <Toolbar />
    <div>Toolbar, Side Drawer, Backdrop</div>
    <main className="content">{props.children}</main>
  </Fragment>
);

layout.propTypes = {
  children: PropTypes.element
};

export default layout;
