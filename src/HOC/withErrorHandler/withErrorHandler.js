import React, { Fragment } from "react";
import Modal from "../../Components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) =>
  class ErrorHandler extends React.Component {
    state = {
      error: null
    };

    constructor(props) {
      super(props);

      axios.interceptors.request.use(req => {
        this.setState({
          error: null
        });
        return req;
      });

      axios.interceptors.response.use(
        resp => resp,
        error => {
          this.setState({
            error
          });
        }
      );
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Fragment>
          <Modal hide={this.errorConfirmedHandler} show={this.state.error}>
            <p>{this.state.error ? this.state.error.message : null} </p>
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };

export default withErrorHandler;
