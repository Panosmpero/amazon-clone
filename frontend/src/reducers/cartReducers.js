import { CART_ADD_ITEM, CART_ADD_FAIL, CART_REMOVE_ITEM } from "../constants/cartConstants";

const cartReducer = (state = { cartItems: [] }, action) => {
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
      return { cartItems: [...state.cartItems, item] };

    case CART_REMOVE_ITEM:
      return { cartItems: state.cartItems.filter(product => product.productId !== action.payload) }

    case CART_ADD_FAIL:
      return { cartItems: [...state.cartItems], error: action.payload }

    default:
      return state;
  }
};

export { cartReducer };
