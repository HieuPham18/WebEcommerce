import { cartConstant } from "./cart.contant";

// add to cart
export const addProductToCart = (productItem) => {
  return {
    type: cartConstant.ADD_TO_CART,
    payload: productItem,
  };
};
// update
export const updateQuantityProduct = (cartItem, quantity) => {
  return {
    type: cartConstant.UPDATE_QUANTITY,
    payload: {
      cartItem,
      quantity,
    },
  };
};

// delete
export const deleteProductFromCart = (cartItem) => {
  return {
    type: cartConstant.DELETE_PRODUCT_FROM_CART,
    payload: cartItem,
  };
};

export const deleteCart = () => {
  return {
    type: cartConstant.DELETE_CART,
  };
}