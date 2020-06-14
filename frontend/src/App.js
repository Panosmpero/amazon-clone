import React from 'react';
import { Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import ProductDetails from "./Components/ProductDetails";
import './App.scss';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/product/:id" component={ProductDetails} />
      </Switch>   
      <Footer />
    </>
  );
}

export default App;
