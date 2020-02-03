import React, { Fragment } from "react";
import Burger from "../../Components/Burger/Burger";

class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0
    }
  };

  render() {
    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients} />
        <div>Controls</div>
      </Fragment>
    );
  }
}

export default BurgerBuilder;
