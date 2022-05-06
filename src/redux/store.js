import { createStore, applyMiddleware  } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers } from "redux";
import {cartReducer} from "./Cart/cart.reduce"
import {orderReducer} from './Order/order.reduce'
import thunk from "redux-thunk";

const middleware = [thunk]
// 
const rootReducer = combineReducers({
        cartReducer: cartReducer, 
        orderReducer: orderReducer,
  });

const intialStore = {
    cartReducer : {
        cartItems: JSON.parse(localStorage.getItem('cartItems')) ?? []
    },
    // orderReducer : {
    //     orderReducer: JSON.parse(localStorage.getItem('orderItems')) ?? []
    // }
}

export const store = createStore(rootReducer, intialStore, composeWithDevTools(applyMiddleware(...middleware)))