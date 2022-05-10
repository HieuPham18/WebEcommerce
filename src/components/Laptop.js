import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { dataContext } from "../context/DataContext";
import numberWithCommas from '../utils/numberWithCommas';
import { getProducts } from "../data/actionData";
import '../stylesheets/grid.scss';
import '../stylesheets/base.scss';

function Laptop() {
    const {products} = useContext(dataContext)
    // const laptops = getProducts(10, products)

    return (
        <section className="product-hot">
            <h1 className="product-hot-title">LAPTOP</h1>
            <div className="row sm-gutter product-hot__list">
                {
                    products !== undefined && getProducts(10, products.filter(item => item.category === 'lap-top')).map((laptop, index) => {
                        // console.log(laptop.id)
                        return (
                            <Link to={`/${laptop.category}/${laptop.categorySlug}/${laptop.slug}`} key={index} className="col l-2-4 m-4 c-6 product-hot__item" style={{ textDecoration: 'none', marginTop: 20 }}>
                                <div className="product-hot-link">
                                    <img src={laptop.image.imgAvt}
                                        alt="" className="product-hot-img" />
                                    <p className="product-hot-name">{laptop.name}</p>
                                    <p className="product-hot-current-price">
                                        {laptop.price !== undefined && numberWithCommas(laptop.price)} đ
                                        <span className="product-hot-old-price">
                                            {
                                                (laptop.price !== undefined && laptop.discount) &&
                                                numberWithCommas(parseInt(laptop.price) + parseInt(laptop.discount))
                                            }
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
                                    {/* Go to info product
                                    <button onClick={() => {
                                        handleGoProduct(laptop.slug)
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
export default Laptop;