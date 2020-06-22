import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";

const Cart = (props) => {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = () => {
    props.history.push("/signin?redirect=shipping");
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <div className="cart">
      <div className="cart-items-container">
        <div className="cart-legend">
          <div>Shopping Cart</div>
          <div>Price</div>
        </div>

        {cartItems.length > 0 ? (
          cartItems.map((product, idx) => (
            <div className="cart-product" key={`cart-item-${idx}`}>
              <Link to={`/product/${product.productId}`}>
                <div className="image-container">
                  <img className="cart-image" src={product.image} alt="product" />
                </div>
              </Link>
              <div className="cart-name">
                <Link className="cart-title" to={`/product/${product.productId}`}>
                  {product.title}
                </Link>
                <div className="cart-quantity">
                  Quantity:{" "}
                  <select
                    value={product.qty}
                    onChange={(e) =>
                      dispatch(
                        addToCart(product.productId, Number(e.target.value))
                      )
                    }
                  >
                    {[...Array(product.stockCount).keys()].map((count, idx) => (
                      <option value={count + 1} key={`cart-qty-${idx}`}>
                        {count + 1}
                      </option>
                    ))}
                  </select>
                  <button
                    className="btn-delete"
                    onClick={() => handleRemoveFromCart(product.productId)}
                  >
                    <i className="far fa-times-circle"></i>
                  </button>
                </div>
              </div>
              <div className="cart-price">${product.price}</div>
            </div>
          ))
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div style={{ padding: "0.5rem" }}>No items in cart</div>
        )}
      </div>

      <div className="cart-actions">
        <h3>
          Subtotal ({cartItems.reduce((acc, x) => acc + x.qty, 0)} items): ${" "}
          {cartItems.reduce((acc, x) => acc + x.price * x.qty, 0).toFixed(2)}
        </h3>
        <button
          className="btn-checkout"
          disabled={cartItems.length > 0 ? false : true}
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
