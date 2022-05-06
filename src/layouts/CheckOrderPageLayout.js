import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"

function CheckOrderPageLayout(props) {

    return (
        <>
            <Header />
                <div className="container">{props.children}</div>
            <Footer />
        </>

    )
}

export default CheckOrderPageLayout