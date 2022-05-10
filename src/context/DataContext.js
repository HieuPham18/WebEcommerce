
import { createContext, useEffect, useState } from "react";
import axios from "axios";

//Create dataContext
export const dataContext = createContext();

//API
const apiProducts = 'https://webecommerceapi.herokuapp.com/products'
const apiPosts = 'https://webecommerceapi.herokuapp.com/blogs'
const apiImgSilde = 'https://webecommerceapi.herokuapp.com/slider-banner'


//Return dataContext.Provider
export function DataContextProvider({children}){
    const [products, setProducts] = useState([])
    const [posts, setPosts] = useState([])
    const [imgSilde, setImgSilder] = useState([])


    useEffect(() => {
        getProducts()
        getPosts()
        getImgSilder()
    }, [])

    const getProducts = async()=>{
        const reponse = await axios.get(apiProducts)
        setProducts(reponse.data)
    }
    const getPosts = async()=>{
        const reponse = await axios.get(apiPosts)
        setPosts(reponse.data)
    }
    const getImgSilder = async()=>{
        const reponse = await axios.get(apiImgSilde)
        setImgSilder(reponse.data)
    }

    return(
        <dataContext.Provider value={{products, posts, imgSilde}}>
            {children}
        </dataContext.Provider>
    )
}

