import firebase from "firebase/compat/app";
import {orderConstant} from './order.contant'

export const addOrderToFirestore = (order) =>{
    return {
        type: orderConstant.SET_ORDERS, 
        payload: order,
    };
}
  
  