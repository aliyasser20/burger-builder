import React, { Fragment } from "react";
import "./Layout.scss";

const layout = props => (
  <Fragment>
    <div>Toolbar, Side Drawer, Backdrop</div>
    <main className="content">{props.children}</main>
  </Fragment>
);

export default layout;
