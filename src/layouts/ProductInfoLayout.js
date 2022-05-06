import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"

function ProductInfoLayout(props) {

    return (
        <>
            <Header />
                <div className="container">{props.children}</div>
            <Footer />
        </>

    )
}

export default ProductInfoLayout