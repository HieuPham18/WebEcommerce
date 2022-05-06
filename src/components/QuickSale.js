import React from "react"
import '../stylesheets/QuickSale.scss'
import {Link} from 'react-router-dom'
import quichsale1 from '../assets/images/baner/quicksale1.png'
import quichsale2 from '../assets/images/baner/quicksale2.jpg'
import quichsale3 from '../assets/images/baner/quicksale3.png'
import quichsale4 from '../assets/images/baner/quicksale4.jpg'

function QuickSale(){
    return(
            
                <div className="banner">
                    <div className="quick-sale">
                        <div className="quick-sale-item">
                            <Link to="" href="">
                                <img src={quichsale1} alt="" className="quick-sale-img"/>
                            </Link>
                        </div>
                        <div className="quick-sale-item">
                            <Link to="" href="">
                                <img src={quichsale2} alt="" className="quick-sale-img"/>
                            </Link>
                        </div>
                        <div className="quick-sale-item hide-on-mobile">
                            <Link to="" href="">
                            <img src={quichsale3} alt="" className="quick-sale-img"/>
                            </Link>
                        </div>
                        <div className="quick-sale-item hide-on-tablet hide-on-mobile">
                            <Link to="" href="">
                                <img src={quichsale4} alt="" className="quick-sale-img"/>
                            </Link>
                        </div>
                    </div>
                </div>
        )
}

export default QuickSale