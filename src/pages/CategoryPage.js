import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import numberWithCommas from '../utils/numberWithCommas'
import '../stylesheets/base.scss'
import '../stylesheets/grid.scss'
import '../stylesheets/CategoryPage.scss'
import { dataContext } from '../context/DataContext'
import Loading from '../components/Loading'

function CategoryPage() {
    const [categoryProduct, setCategoryProduct] = useState([])
    const [value, setValue] = useState("")
    const { category } = useParams()
    const {products} = useContext(dataContext)
    const [pageNumber, setPageNumber] = useState(0)

    const productPerPage = 10
    const pagesVisited = pageNumber * productPerPage
    
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    // console.log('cater:', category)

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

    //filter data
    useEffect(()=>{
        const reponse = products.filter(item=>item.category === category)
        setCategoryProduct(reponse)
        setPageNumber(0)
    }, [category, products])
    

    //* Sort product when user select
    const handlePrice = (e) => {
        setValue(e.target.value)
        let rs = []
        if (e.target.value === 'mintomax') {
            console.log("ClickL: min => max")
            if (categoryProduct !== undefined || categoryProduct !== '') {
                rs = categoryProduct.sort(function (a, b) {
                    return a.price - b.price
                })
                setCategoryProduct(rs)
            }
        }
        else if (e.target.value === 'maxtomin') {
            console.log("ClickL: max => min")
            if (categoryProduct !== undefined || categoryProduct !== '') {
                rs = categoryProduct.sort(function (a, b) {
                    return b.price - a.price
                })
                setCategoryProduct(rs)
            }
        }
    }

    const pageCount = Math.ceil(categoryProduct.length / productPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    return (
        <div className="category-page">
            <div className="grid wide">
                <div className='row'>
                    <div className='col l-12'>
                        <div className="category-header">
                            <div className="breadcrumb">
                                <Link style={{ color: "black", fontWeight: "bold", textDecoration: "none", fontSize: 16 }} to="/">
                                    <span>
                                        <i style={{ fontSize: 14 }} className="fa-solid fa-house"></i>
                                    </span>
                                    Trang chủ
                                </Link>
                                <span style={{ fontSize: 16 }}> &gt; </span>
                                <span style={{ fontSize: 16, color: '#009981', fontWeight: 600 }}>
                                    {title}
                                </span>
                            </div>
                            <div className="product-filter">
                                <p className="product-filter-heading">Lọc sản phẩm:</p>
                                {/* <Select style={{ display: 'block', width: 200 }} options={options} onChange={(value) => handlePrice(value)} /> */}
                                <select id="price" value={value} onChange={handlePrice}>
                                    <option value="all_price">----Lọc theo giá---</option>
                                    <option value="mintomax">Giá: Thấp đến cao</option>
                                    <option value="maxtomin">Giá: Cao đến thấp</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        categoryProduct.length === 0 
                        ? 
                            <div style={{margin: '0 auto', padding: '64px 0px'}}><Loading /></div>
                        : 
                            categoryProduct !== undefined && categoryProduct
                            .slice(pagesVisited, pagesVisited + productPerPage)
                            .map(item => {
                                return (
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
                                )
                            })
                    }
                </div>
                <div className="row">
                    <div className="col l-12 m-12 c-12" style={{marginTop: 30}}>
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"paginationBttns"}
                            previousLinkClassName={"previousButtn"}
                            nextLinkClassName={"nextButtn"}
                            disabledClassName={"paginationDisable"}
                            activeClassName={"paginationActive"}
                        />

                    </div>
                </div>
            </div>
        </div>
    )
}
export default CategoryPage