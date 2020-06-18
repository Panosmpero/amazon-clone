import React from 'react';
import { Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import ProductDetail from "./Components/ProductDetail";
import Cart from "./Components/Cart";
import './App.scss';
import Signin from "./Components/Signin"
import Register from './Components/Register';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/signin" component={Signin} />
        <Route path="/register" component={Register} />
        <Route path="/products/:id" component={ProductDetail} />
        <Route path="/cart/:id?" component={Cart} />
      </Switch>   
      <Footer />
    </>
  );
}

export default App;
