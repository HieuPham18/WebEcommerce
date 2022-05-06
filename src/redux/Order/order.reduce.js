
import { orderConstant } from "./order.contant";
const initialState = {
    orders: [],
};
export const orderReducer = (state = initialState, action) => {
    console.log("payloat-order:", action.payload)
    console.log("state:", state)
    switch (action.type) {

        case orderConstant.SET_ORDERS:
            return {
                ...state,
                orders: [...state.orders, action.payload],
            }
        default:
            return state;
    }
};
export default orderReducer;