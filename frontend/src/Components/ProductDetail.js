import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";

const ProductDetail = (props) => {
  const [quantity, setQuantity] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const addToCart = () => {
    props.history.push(`/cart/${props.match.params.id}?qty=${quantity}`);
  };

  return (
    <div className="details-container">
      <div className="detail-back">
        <Link to="/">
          <i className="fas fa-chevron-left"></i> Back to results
        </Link>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="details">
          <div className="detail-image-container">
            <img className="detail-image" src={product.image} alt="product" />
          </div>

          <div className="detail-title">
            <h3>
              {product.renewed ? "(Renewed)" : null} {product.title}
            </h3>
            <div className="detail-brand">by {product.brand}</div>
            <div className="detail-rating">
              {product.rating} {product.numReviews}
            </div>
            <div className="detail-price">{product.price}</div>
          </div>

          <div className="detail-checkout">
            <div>{product.price}</div>
            <div>+ $0 Shipping & Import Fees</div>
            <div>{product.stockCount ? "In Stock." : "Out of Stock."}</div>
            <div>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                {[...Array(product.stockCount).keys()].map((count, idx) => (
                  <option value={count + 1} key={`detail-qty-${idx}`}>
                    {count + 1}
                  </option>
                ))}
              </select>
            </div>
            {product.stockCount ? (
              <>
                <button onClick={addToCart}>
                  <i className="fas fa-cart-plus"></i>
                  <span>Add to Cart</span>
                </button>
                <button>
                  <i className="fas fa-play" style={{ padding: ".6rem" }}></i>
                  <span>
                    Buy Now <br />
                    (disabled)
                  </span>
                </button>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
