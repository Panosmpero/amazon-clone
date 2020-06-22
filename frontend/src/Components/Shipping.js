import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShipping } from "../actions/cartActions";
import CheckoutSteps from "./CheckoutSteps";

const Shipping = (props) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const cart = useSelector((state) => state.cart);
  const { shipping } = cart;

  useEffect(() => {
    if (shipping) {
      setAddress(shipping.address);
      setCity(shipping.city);
      setPostalCode(shipping.postalCode);
      setCountry(shipping.country);
    }
  }, [shipping])

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShipping({address, city, postalCode, country}));
    props.history.push("/payment")
  };

  return (
    <>
      <CheckoutSteps step1 step2 />
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-container">
          <div>
            <h3>Shipping</h3>
          </div>

          <div></div>

          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              id="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="country">Country</label>
            <input
              type="text"
              name="country"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <div>
            <button type="submit">Continue</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Shipping;
