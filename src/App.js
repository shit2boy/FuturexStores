import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar/NavigationBar";
import Products from "./Pages/Products";
import Carts from "./Pages/Cart/Carts";
import ProductState from "./Context/ProductItems/ProductState";
// import CartContext from "./Context/Cart/CartContext";
import "./App.css";

const App = () => {
  return (
    <ProductState>
      {/* <CartContext> */}
      <NavBar />
      <Switch>
        <Route exact path="/" component={Products} />
        <Route exact path="/cart" component={Carts} />
        {/* <Route exact path="/login" component={Login} /> */}
      </Switch>
      {/* </CartContext> */}
    </ProductState>
  );
};

export default App;