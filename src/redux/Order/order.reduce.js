
import { connectFirestoreEmulator } from "firebase/firestore";
import { addData } from "./order.action";
import { orderConstant } from "./order.contant";
const initialState = {
    orders: [],
};
export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case orderConstant.SET_ORDERS:
            addData(action.payload)
            return {
                ...state,
                orders: [...state.orders, action.payload],
            }

        default:
            return state;
    }
};

// console.log("orderReducer", orderReducer)