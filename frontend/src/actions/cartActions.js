import {
  CART_ADD_ITEM,
  CART_ADD_FAIL,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT
} from "../constants/cartConstants";
import axios from "axios";
import Cookie from "js-cookie";


const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        productId: data._id,
        title: data.title,
        image: data.image,
        price: data.price,
        stockCount: data.stockCount,
        qty,
      },
    });
    // Save cart in Cookies to avoid bug on refresh
    // console.log(getState())
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));

  } catch (error) {
    dispatch({ type: CART_ADD_FAIL, payload: error.message });
  }
};


const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  });
  const {
    cart: { cartItems },
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
};


const saveShipping = (data) => (dispatch, getState) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
  const {
    cart: { shipping },
  } = getState();
  Cookie.set("shipping", JSON.stringify(shipping));
};


const savePayment = (data) => (dispatch, getState) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
  const {
    cart: { payment },
  } = getState();
  Cookie.set("payment", JSON.stringify(payment));
};

export { addToCart, removeFromCart, saveShipping, savePayment };
