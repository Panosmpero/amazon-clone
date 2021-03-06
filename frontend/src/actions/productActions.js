import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL
} from "../constants/productConstants";
import axios from "axios";


// List of all Products
const listProducts = () => async (dispatch) => {

  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};


// Get Details for a Product
const detailsProduct = (productId) => async (dispatch) => {

  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};


// Save a new Product
const saveProduct = (product) => async (dispatch, getState) => {

  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });

    const {
      userSignin: { userInfo },
    } = getState();

    // if there is no _id in MongoDB create a new Product
    if (!product._id) {
      const { data } = await axios.post("/api/products", product, {
        headers: {
          authorization: `Bearer ${userInfo.token}`
        }
      });
      dispatch({ type: PRODUCT_SAVE_SUCCESS, success: true, payload: data });

    // else Update an existing one
    } else {
      const { data } = await axios.put(`/api/products/${product._id}`, product, {
        headers: {
          authorization: `Bearer ${userInfo.token}`
        }        
      });
      dispatch({ type: PRODUCT_SAVE_SUCCESS, success: true, payload: data });
    }

  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};


// Delete a Product
const deleteProduct = (productId) => async (dispatch, getState) => {

  try {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const { data } = await axios.delete(`/api/products/${productId}`, {
      headers: {
        authorization: `Bearer ${userInfo.token}`
      }
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, success: true, payload: data });

  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

const sortProducts = (type) => async (dispatch, getState) => {
  try {
    
  } catch (error) {
    
  }
}


export { listProducts, detailsProduct, saveProduct, deleteProduct, sortProducts };
