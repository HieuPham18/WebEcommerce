import { cartConstant } from './cart.contant'
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';



const initialState = {
    cartItems: [],
    numberProduct: 0,
};
export const cartReducer = (state = initialState, action) => {
    // const navigate = useNavigate()
    // localStorage.setItem('cartItems', JSON.stringify(state))
    let index;
    // console.log("state:", state)
    // console.log("state-cart:",state.cartItems)
   
    switch (action.type) {
        case cartConstant.ADD_TO_CART:
            // console.log("payloat-cart:",action.payload)
            // console.log(state)
            index = state.cartItems.findIndex(
                (value) =>
                    value.productInfo.slug === action.payload.productInfo.slug &&
                    value.capacity === action.payload.capacity &&
                    value.color === action.payload.color
            );
            console.log("index: ", index)
            // Check product duplicate
            if (index !== -1) {
                console.log(index)
                toast.success("Sản phẩm đã được cập nhật");
                return {
                    ...state,
                    cartItems: [
                        ...state.cartItems.slice(0, index),
                        {
                            ...state.cartItems[index],
                            quantity: state.cartItems[index].quantity + action.payload.quantity,
                        },
                        ...state.cartItems.slice(index + 1),
                    ],
                };
            } else {
                toast.success(
                    "Sản phẩm đã được thêm vào giỏ hàng.",
                );
                return {
                    ...state,
                    cartItems: [...state.cartItems, action.payload],
                };
            }

        case cartConstant.UPDATE_QUANTITY:
            index = state.cartItems.findIndex((value) => value === action.payload.cartItem);
            if (index !== -1) {
                return {
                    ...state,
                    cartItems: [
                        ...state.cartItems.slice(0, index),
                        {
                            ...action.payload.cartItem,
                            quantity: action.payload.quantity,
                        },
                        ...state.cartItems.slice(index + 1),
                    ],
                };
            }
            break;

        case cartConstant.DELETE_PRODUCT_FROM_CART:
            // console.log(action.payload)
            index = state.cartItems.findIndex((value) => {
                return (
                    value.productInfo.slug === action.payload.productInfo.slug &&
                    value.productInfo.capacity === action.payload.productInfo.capacity &&
                    value.productInfo.color === action.payload.productInfo.color
                );
              });
              const newCart = [...state.cartItems];
              newCart.splice(index, 1);
              toast.success("Xoá thành công");
              return {
                ...state,
                cartItems: newCart,
              };

        case cartConstant.DELETE_CART:
            toast.success('Bạn đã đặt hàng thành công!')
            // setTimeout(() => {
            //     window.location.href('/')
            // }, 2000);
            return{
                ...state,
                cartItems: [] 
            }
        default:
            return state;
    }
}