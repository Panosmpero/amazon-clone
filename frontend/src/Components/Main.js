import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loading from "./Loading";

const Main = () => {
  // Access REDUX store's state
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return loading ? (
    <Loading />
  ) : error ? (
    <div>{error}</div>
  ) : (
    <>
      <div className="main-container">
        <div className="main-results">
          {products.length} of over 3,000 results for "laptop"
        </div>
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
      </div>
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
