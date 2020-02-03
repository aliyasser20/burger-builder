import React from "react";
import PropTypes from "prop-types";
import Ingredient from "./Ingredients/Ingredient";
import "./Burger.scss";

const burger = props => {
  const ingredientsArray = Object.entries(props.ingredients);

  let allIngredientsInputted = ingredientsArray.map(ingredient => {
    const multiplesOfIngredients = [];

    for (let i = 1; i <= ingredient[1]; i++) {
      multiplesOfIngredients.push(
        <Ingredient key={ingredient[0] + i} type={ingredient[0]} />
      );
    }

    return multiplesOfIngredients;
  });

  if (allIngredientsInputted.join("").length < 1)
    allIngredientsInputted = <p>Please start adding your ingredients!</p>;

  return (
    <div className="burger">
      <Ingredient type="bread-top" />
      {allIngredientsInputted}
      <Ingredient type="bread-bottom" />
    </div>
  );
};

export default burger;

burger.propTypes = {
  ingredients: PropTypes.object.isRequired
};
