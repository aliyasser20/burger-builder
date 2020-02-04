import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./Modal.scss";
import Backdrop from "../Backdrop/Backdrop";

const Modal = props => {
  const classes = `modal ${props.show ? "open" : "closed"}`;

  return (
    <Fragment>
      <Backdrop show={props.show} hide={props.hide} />
      <div className={classes}>{props.children}</div>
    </Fragment>
  );
};

Modal.propTypes = {
  children: PropTypes.element,
  show: PropTypes.bool,
  hide: PropTypes.func
};

export default Modal;
