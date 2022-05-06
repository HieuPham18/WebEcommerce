import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'


function CheckoutPageLayout(props){
    return(
        <>
            <Header />
                <div>{props.children}</div>
            <Footer />
        </>
    )
}

export default CheckoutPageLayout