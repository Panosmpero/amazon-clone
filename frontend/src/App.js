import React from 'react';
import { Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import ProductDetail from "./Components/ProductDetail";
import './App.scss';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/products/:id" component={ProductDetail} />
      </Switch>   
      <Footer />
    </>
  );
}

export default App;
