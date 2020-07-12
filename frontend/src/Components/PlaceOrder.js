import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";

const PlaceOrder = (props) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, payment } = cart;
  const { address, city, postalCode, country } = shipping;

  // redirect if missing
  if (!shipping) props.history.push("/shipping");
  if (!payment) props.history.push("/payment");

  // const dispatch = useDispatch();

  // const handleCheckout = () => {
  //   props.history.push("");
  // };

  let total = cartItems
    ? Number(cartItems.reduce((acc, x) => acc + x.price * x.qty, 0).toFixed(2))
    : 0;
  const shippingCost = total > 80 ? 0 : 10;
  total = total + shippingCost;
  const taxRating = 0.24;
  const preTax = (total / (1 + taxRating)).toFixed(2);
  const tax = (total - preTax).toFixed(2);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="placeorder">
        <div className="placeorder-info">
          <div className="placeorder-shipping-info">
            <h3>Shipping</h3>
            <div>
              {address}, {city}, {postalCode}, {country}
            </div>
          </div>

          <div className="placeorder-payment-info">
            <h3>Payment</h3>
            <div>Payment Method: {payment}</div>
          </div>

          <div className="placeorder-cart-items">
            <div className="placeorder-cart-legend">
              <div>Products</div>
              <div>Price</div>
            </div>
            {cartItems.length > 0 ? (
              cartItems.map((product, idx) => (
                <div
                  className="placeorder-cart-product"
                  key={`placeorder-cart-item-${idx}`}
                >
                  <Link to={`/product/${product.productId}`}>
                    <div className="placeorder-image-container">
                      <img
                        className="placeorder-cart-image"
                        src={product.image}
                        alt="product"
                      />
                    </div>
                  </Link>
                  <div className="placeorder-cart-details">
                    <Link
                      className="placeorder-cart-title"
                      to={`/product/${product.productId}`}
                    >
                      {product.title}
                    </Link>
                    <div className="placeorder-cart-quantity">
                      Quantity: <span>{product.qty}</span>
                    </div>
                  </div>
                  <div className="placeorder-cart-price">${product.price}</div>
                </div>
              ))
            ) : (
              <div style={{ padding: "0.5rem" }}>No items in cart</div>
            )}
          </div>
        </div>

        <div className="placeorder-actions">
          <h2>Order Summary</h2>
          <div>
            <div>Pre-Tax: </div>
            <div className="placeorder-actions-price">${preTax}</div>
          </div>
          <div>
            <div>Shipping: </div>
            <div className="placeorder-actions-price">${shippingCost}</div>
          </div>
          <div>
            <div>Tax 24%: </div>
            <div className="placeorder-actions-price">${tax}</div>
          </div>
          <div>
            <div>Order Total:</div>
            <div className="placeorder-actions-price">${total}</div>
          </div>

          <button>Place Order</button>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
