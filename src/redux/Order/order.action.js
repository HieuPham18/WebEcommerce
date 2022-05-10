import { orderConstant } from './order.contant'
import { collection, addDoc } from "firebase/firestore";
import fileDB from "../../config/firebase";
import { deleteCart } from "../Cart/cart.action";




export const addOrderToFirestore = (order) => {
    return {
        type: orderConstant.SET_ORDERS,
        payload: order,
    };
}

export const addData = async (order) => {
    try {
        await addDoc(collection(fileDB, "invoice"), order);
    } catch (error) {
        console.log("ERROR: ", error.message)
    }
}