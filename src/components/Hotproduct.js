import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dataContext } from "../context/DataContext";
import numberWithCommas from '../utils/numberWithCommas'
import '../stylesheets/grid.scss'
import '../stylesheets/base.scss'
import Loading from "./Loading";

function Hotproducts() {
   
    const {products} = useContext(dataContext)
    // const phones = getProducts(10, hotPhones)


    return (
        <section className="product-hot">
            <h1 className="product-hot-title">ĐIỆN THOẠI NỔI BẬT</h1>
            <div className="row sm-gutter product-hot__list">
                {
                    products === undefined ? <Loading /> : products.filter(item => item.category === 'dien-thoai-di-dong').map((hotPhone, index) => {
                        // console.log(hotProduct.id)
                        return (
                            <Link to={`/${hotPhone.category}/${hotPhone.categorySlug}/${hotPhone.slug}`} key={index} className="col l-2-4 m-4 c-6 product-hot__item" style={{ textDecoration: 'none', marginTop: 20 }}>
                                <div className="product-hot-link">
                                    <img src={hotPhone.image.imgAvt}
                                        alt="" className="product-hot-img" />
                                    <p className="product-hot-name">{hotPhone.name}</p>
                                    <p className="product-hot-current-price">
                                        {hotPhone.price !== undefined && numberWithCommas((parseInt(hotPhone.price)))} đ
                                        <span className="product-hot-old-price">
                                            {(hotPhone.price !== undefined && hotPhone.discount) && numberWithCommas(parseInt(hotPhone.price) + parseInt(hotPhone.discount))}
                                            đ
                                        </span>
                                    </p>
                                    <div className="product-hot__item-action">
                                        <span className="product-hot__item-like">
                                            <i className="fa-solid fa-heart icon-like"></i>
                                        </span>
                                        <div className="product-hot__item-rating">
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                        <span className="product-hot__item-bought">
                                            Đã bán: 96
                                        </span>
                                    </div>
                                    <div className="product-item-authentic">
                                        <i className="fa-solid fa-check product-item-authentic-icon"></i>
                                        <span className="product-item-authentic-text">Chính hãng</span>
                                    </div>
                                    {/* Go to info product */}
                                    {/* <button onClick={() => {
                                        handleGoProduct(hotProduct.slug)
                                    }}>add</button> */}
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </section>
    )

}
export default Hotproducts;