import fileDB from "../../config/firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const productCollectionRef = collection(fileDB, 'phone')

class ProductDataService {
    // addProducts = (collection_name, newProduct) => {
    //     return addDoc(productCollectionRef(collection_name), newProduct)
    // }
    addProducts = (value, newProduct) => {
        return addDoc(collection(fileDB, `${value}`), newProduct)
    }
    
    // updateProduct = (id, updateProduct) => {
    //     const ProductDoc = doc(fileDB, "phone", id)
    //     return updateDoc(ProductDoc, updateProduct)
    // }
    updateProduct = (id, updateProduct, value) => {
        const ProductDoc = doc(fileDB, `${value}`, id)
        return updateDoc(ProductDoc, updateProduct)
    }

    // deleteProduct = (id) => {
    //     const ProductDoc = doc(fileDB, "phone", id)
    //     return deleteDoc(ProductDoc)
    // }
    deleteProduct = (value, id) => {
        const ProductDoc = doc(fileDB, `${value}`, id)
        return deleteDoc(ProductDoc)
    }

    // getAllProducts = () => {
    //     return getDocs(productCollectionRef)
    // }
    getAllProducts = (value) => {
        return getDocs(collection(fileDB, `${value}`))
    }

    getProducts = (value) => {
        return getDocs(collection(fileDB, `${value}`))
    }

    // getProduct = (id) => {
    //     const bookDoc = doc(fileDB, "phone", id)
    //     return getDoc(bookDoc)
    // }

    getProduct = (id, value) => {
        const bookDoc = doc(fileDB,`${value}`, id)
        return getDoc(bookDoc)
    }
}
export default new ProductDataService()