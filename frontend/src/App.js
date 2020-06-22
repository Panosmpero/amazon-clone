import React from 'react';
import { Route } from "react-router-dom";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import ProductDetail from "./Components/ProductDetail";
import Cart from "./Components/Cart";
import './App.scss';
import Signin from "./Components/Signin"
import Register from './Components/Register';
import CreateProduct from './Components/CreateProduct';
import Shipping from './Components/Shipping';
import Payment from './Components/Payment';
import PlaceOrder from './Components/PlaceOrder';

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/cart/:id?" component={Cart} />
        <Route path="/products" component={CreateProduct} />
        <Route path="/shipping" component={Shipping} />
        <Route path="/payment" component={Payment} />
        <Route path="/placeorder" component={PlaceOrder} />
        <Route path="/signin" component={Signin} />
        <Route path="/register" component={Register} />
        <Route exact path="/" component={Main} />
      </main>      
      <Footer />
    </>
  );
}

export default App;
