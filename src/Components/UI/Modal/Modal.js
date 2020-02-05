import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./Modal.scss";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    const classes = `modal ${this.props.show ? "open" : "closed"}`;

    return (
      <Fragment>
        <Backdrop show={this.props.show} hide={this.props.hide} />
        <div className={classes}>{this.props.children}</div>
      </Fragment>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.element,
  show: PropTypes.bool,
  hide: PropTypes.func
};

export default Modal;
