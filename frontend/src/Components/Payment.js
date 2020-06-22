import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { savePayment } from "../actions/cartActions";
import CheckoutSteps from "./CheckoutSteps";

const Payment = (props) => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePayment(paymentMethod));
    props.history.push("/placeorder");
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-container">
          <div>
            <h3>Payment</h3>
          </div>

          <div></div>

          <label htmlFor="paymentMethod">
            <input
              type="radio"
              name="paymentMethod"
              id="paymentMethod"
              value="paypal"
              onChange={(e) => setPaymentMethod(e.currentTarget.value)}
            />
            <i className="fab fa-paypal"></i>Paypal
          </label>

          <div>
            <button type="submit">Continue</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Payment;
