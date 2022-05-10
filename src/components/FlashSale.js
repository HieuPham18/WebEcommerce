import React, { useContext } from 'react'
import Slider from 'react-slick/lib/slider'
import { Link } from 'react-router-dom'
import numberWithCommas from '../utils/numberWithCommas';
import { dataContext } from '../context/DataContext';
import { getProducts } from '../data/actionData';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../stylesheets/base.scss'
import '../stylesheets/grid.scss'
import "../stylesheets/FlashSale.scss"


function FlashSale() {

    const { products } = useContext(dataContext)
    const plashSale = getProducts(8, products)

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0, 
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };
    return (
        <section className='plash-sale'>
            <div className='row product-flash-sale'>
                <div className='col l-12 m-12 c-12'>
                    <h1 className="product-flash-sale-title">F<i className="fa-solid fa-bolt-lightning"></i>AST-SALE ONLINE</h1>
                    <div className="timer" id="timer" data-start="March 03, 2022 10:10:11"
                        data-end="March 04, 2022 00:00:00"></div>
                </div>
            </div>
            <div className='row'>
                <div className='col l-12 m-12 c-12'>
                    <div className='plash-sale-container'>
                        <Slider {...settings}>
                            {
                                plashSale !== undefined && plashSale.map((item, index) => {
                                    return (
                                        // `/productinfo/${item.slug}`
                                        <Link to={`/${item.category}/${item.categorySlug}/${item.slug}`} key={index} className="plash-sale__item" style={{ textDecoration: 'none', backgroundColor: 'red' }}>
                                            <div>
                                                <div>
                                                    <img src={item.image.imgAvt} alt=""
                                                        className="product-flash-sale-img" />
                                                </div>
                                                <p className="product-flash-sale-name">{item.name}</p>
                                                <img src="./assets/image/product-hot/hot-sale/gia-soc.png" alt=""
                                                    className="product-flast-sale" />
                                                <p className="product-flash-sale-current-price">{item.price !== undefined && numberWithCommas(item.price - 500000)}<span
                                                    className="product-flash-sale-old-price">4,350,000đ</span>
                                                </p>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FlashSale