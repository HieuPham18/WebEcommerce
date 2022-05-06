import { async } from "@firebase/util";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

//Create dataContext
export const dataContext = createContext();

//API
const apiProducts = 'https://webecommerceapi.herokuapp.com/products'
const apiPosts = 'https://webecommerceapi.herokuapp.com/blogs'

//Return dataContext.Provider
export function DataContextProvider({children}){
    const [products, setProducts] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getProducts()
        getPosts()
    }, [])

    const getProducts = async()=>{
        const reponse = await axios.get(apiProducts)
        setProducts(reponse.data)
    }
    const getPosts = async()=>{
        const reponse = await axios.get(apiPosts)
        setPosts(reponse.data)
    }

    return(
        <dataContext.Provider value={{products, posts}}>
            {children}
        </dataContext.Provider>
    )
}

