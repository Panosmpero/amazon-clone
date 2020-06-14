import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import data from "../data";
import axios from "axios";

const Main = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/products");
      console.log(data)
      setProducts(data)
    }
    fetchData()
  },[])

  return (
    <>
      <main className="main">
        <div className="main-results">{products.length} of over 3,000 results for "laptop"</div>
        <div className="main-filters">Filters</div>
        <div className="main-products">
          Products

          {products.map((product, idx) => {
            let {
              _id,
              title,
              image,
              price,
              rating,
              numReviews,
              renewed,
            } = product;
            
            return (
              <div className="product" key={`main-product-${idx}`}>
                <Link to={`/product/${_id}`}>
                  <div className="image-container">
                    <img className="product-img" src={image} alt="product" />
                  </div>
                </Link>
                <div className="product-description">
                  <Link to={`/product/${_id}`}>
                    <h3 className="product-title">
                      {renewed ? "(Renewed)" : null} {title}
                    </h3>
                  </Link>
                  <div className="product-rating">
                    {rating} {numReviews}
                  </div>
                  <div className="product-price">{formatPrice(price)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};


function formatPrice(price) {
  let intNumber = price.toFixed(2).split(".")[0];
  let decimal = price.toFixed(2).split(".")[1];
  // thousands seperator https://stackoverflow.com/a/2901298/13266620
  intNumber = intNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div>
      <span>$</span>        
      <div className="product-int-num"> 
        {intNumber}
        <span>{decimal}</span>
      </div>
    </div>
  );
}

export default Main;
