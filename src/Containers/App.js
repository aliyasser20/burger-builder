import React from "react";
import Layout from "../Components/Layout/Layout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";

class App extends React.Component {
  render() {
    return (
      <Layout>
        <BurgerBuilder />
      </Layout>
    );
  }
}

export default App;
