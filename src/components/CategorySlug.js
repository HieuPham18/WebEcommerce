import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getData } from '../data/actionData'
import numberWithCommas from '../utils/numberWithCommas'
import { dataContext } from '../context/DataContext'
import Loading from './Loading'
import '../stylesheets/grid.scss'
import '../stylesheets/base.scss'

function CategorySlug() {
    

    const { products } = useContext(dataContext)

    const [data, setData] = useState([])
    const { category } = useParams()
    const { categorySlug } = useParams()

    useEffect(()=>{
        const rs = products.filter(product => product.category === category && product.categorySlug === categorySlug)
        setData(rs)
    }, [products, category, categorySlug])

    // Title
    let title
    if (category === 'dien-thoai-di-dong') {
        title = 'Điện thoại'
    }
    else if (category === 'lap-top') {
        title = 'Laptop'
    }
    else if (category === 'tablet') {
        title = 'Tablet'
    }
    else if (category === 'watch') {
        title = 'Đồng hồ '
    }
    else if (category === 'head-phone') {
        title = 'Tai nghe'
    }


    console.log("categories", category)
    console.log("categorslug", categorySlug)


    return (
        <section>
            {/* <h2>param: {category}</h2>
            <h1>Day la trang san pham theo hang san xuat</h1> */}
            <div className='categorySlug'>
                <div className='grid wide'>
                    <div className='row'>
                        <div className='col l-12 m-12 c-12'>
                            <div className="category-header">
                                <div className="breadcrumb">
                                    <Link style={{ color: "black", fontWeight: "bold", textDecoration: "none", fontSize: 16 }} to="/">
                                        <span>
                                            <i style={{ fontSize: 14 }} className="fa-solid fa-house"></i>
                                        </span>
                                        Trang chủ
                                    </Link>
                                    <span style={{ fontSize: 16 }}> &gt; </span>
                                    <Link to={`/${category}`} style={{ fontSize: 16, color: '#009981', fontWeight: 600, textDecoration: 'none' }}>
                                        {title}
                                    </Link>
                                    <span style={{ fontSize: 16 }}> &gt; </span>
                                    <span style={{ fontSize: 16, color: '#009981', fontWeight: 600 }}>
                                        {categorySlug}
                                    </span>
                                </div>
                                {/* <div className="product-filter">
                                    <p className="product-filter-heading">Lọc sản phẩm:</p>
                    
                                    <select id="price" value={value} onChange={handlePrice}>
                                        <option value="all_price">----Lọc theo giá---</option>
                                        <option value="mintomax">Giá: Thấp đến cao</option>
                                        <option value="maxtomin">Giá: Cao đến thấp</option>
                                    </select>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        {
                            data.length === 0 ? <div style={{margin: '0 auto', padding: '64px 0px'}}><Loading /></div> : data.map(item =>
                                    (
                                        <Link to={`/${item.category}/${item.categorySlug}/${item.slug}`} key={item.id}
                                            className="col l-2-4 m-4 c-6 product-hot__item"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <div className="product-hot-link">
                                                <img src={item.image.imgAvt}
                                                    alt="" className="product-hot-img" />
                                                <p className="product-hot-name">{item.name}</p>
                                                <p className="product-hot-current-price">{numberWithCommas(item.price)} đ<span
                                                    className="product-hot-old-price">{numberWithCommas(parseInt(item.price) + parseInt(item.discount))} đ</span></p>
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
                                                        handleGoProduct(item.slug)
                                                    }}>add</button> */}
                                            </div>
                                        </Link>
                                    ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CategorySlug