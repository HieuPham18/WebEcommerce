import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";
import { useState } from "react";
import fileDB from "../config/firebase";
import ProductDataService from './datatest/service'

//* Get data from firebase
export const getData = async (setData, collection_name) => {
    try {
        const data = await ProductDataService.getAllProducts(collection_name)
        let temp = []
        data.forEach((doc) => {
            const obj = {
                id: doc.id,
                ...doc.data(),
            }
            temp.push(obj)
        });
        setData(temp)
    } catch (error) {
        console.log(error.message)
    }
}

// * search product by sslug
export const getProductBySlug = (data, slug) => data.find((e) => e.slug === slug);

//* Get Random product from firebase
export const getProducts = (count, value) => {
    if (value !== undefined || value !== '') {
        const max = value.length - count;
        const min = 0;
        const start = Math.floor(Math.random() * (max - min) + min);
        return value.slice(start, start + count);
    }
};




















// const getAllProducts = () => products;
// const getProducts = (count) => {
//     const max = products.length - count;
//     const min = 0;
//     const start = Math.floor(Math.random() * (max - min) + min);
//     return products.slice(start, start + count);
// };
// const getProductBySlug = (data, slug) => data.find((e) => e.slug === slug);

// const getCartItemDetails = (cartItems) => {
//     let res = [];
//     if (cartItems.length > 0) {
//         cartItems.forEach((e) => {
//             res.push({
//                 e,
//                 product: getProductBySlug(e.slug),
//             });
//         });
//     }
//     return res.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
// };

// const productData = {
//     getProductFB,
//     // getAllProducts,
//     // getProducts,
//     // getProductBySlug,
//     // getCartItemDetails,
// };

// export default productData;

// export default CallData