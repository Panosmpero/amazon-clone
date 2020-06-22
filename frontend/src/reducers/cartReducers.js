import {
  CART_ADD_ITEM,
  CART_ADD_FAIL,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from "../constants/cartConstants";

const cartReducer = (state = { cartItems: [], shipping: {}, payment: {} }, action) => {
  switch (action.type) {

    case CART_ADD_ITEM:
      const item = action.payload;
      // search if already in cart
      const product = state.cartItems.find(
        (x) => x.productId === item.productId
      );
      // if found update cart
      if (product) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.productId === product.productId ? item : x
          ),
        };
      }
      // else add to cart
      return { ...state, cartItems: [...state.cartItems, item] };

    case CART_REMOVE_ITEM:
      return {...state,
        cartItems: state.cartItems.filter(
          (product) => product.productId !== action.payload
        ),
      };

    case CART_ADD_FAIL:
      return { ...state, error: action.payload };

    case CART_SAVE_SHIPPING:
      return {...state, shipping: action.payload};

    case CART_SAVE_PAYMENT:
      return {...state, payment: action.payload};

    default:
      return state;
  }
};

export { cartReducer };
