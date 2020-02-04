import React from "react";
import PropTypes from "prop-types";
import "./BuildControl.scss";

const buildControl = props => (
  <div className="build-control">
    <div className="label">{props.label}</div>
    <button
      disabled={props.disabled}
      type="button"
      className="less"
      onClick={props.less}
    >
      Less
    </button>
    <button type="button" className="more" onClick={props.more}>
      More
    </button>
  </div>
);

buildControl.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  less: PropTypes.func,
  more: PropTypes.func
};

export default buildControl;
