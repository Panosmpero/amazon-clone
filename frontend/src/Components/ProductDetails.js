import React from "react";
import { Link } from "react-router-dom";
import data from "../data";

const ProductDetails = (props) => {

  const product = data.products.find(
    (product) => product._id === props.match.params.id
  );
  
  const { title, image, price, brand, rating, numReviews, renewed } = product;

  return (
    <div className="details-container">
      <div className="detail-back">
        <Link to="/"><i className="fas fa-chevron-left"></i>  Back to results</Link>
      </div>

      <div className="details">        
        <div className="detail-image">
          <img src={image} alt="product"/>
        </div>

        <div className="detail-title">
          <h3>{renewed ? "(Renewed)" : null} {title}</h3>
          <div className="detail-brand">by {brand}</div>
          <div className="detail-rating">{rating} {numReviews}</div>
          <div className="detail-price">{price}</div>
        </div>

        <div className="detail-checkout">
          <div>{price}</div>
          <div>+ $50 Shipping & Import Fees</div>
          <div>In Stock.</div>
          <button><i className="fas fa-cart-plus"></i><span>Add to Cart</span></button>
          <button><i className="fas fa-play" style={{"padding": ".6rem"}} ></i><span>Buy Now</span></button>
        </div>
        

      </div>
    </div>
  );
};

export default ProductDetails;
