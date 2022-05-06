import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useUserAuth } from '../context/UserAuthContext'
import { useSelector } from 'react-redux'
import { getData, getProductBySlug } from '../data/actionData'
import Logo from '../assets/images/logo/logo-text.png'
import numberWithCommas from '../utils/numberWithCommas'
import 'react-toastify/dist/ReactToastify.css';
import '../stylesheets/grid.scss'
import '../stylesheets/base.scss'
import '../stylesheets/Header.scss'

function Header() {
    const [togger, setTogger] = useState(false)
    const [phones, setPhones] = useState([])
    const [laptops, setLaptops] = useState([])
    const [listProduct, setlistProduct] = useState([])
    const [itemSearch, setItemSearch] = useState([])
    const { cartItems } = useSelector(state => state.cartReducer)
    const navigate = useNavigate()
    const { user, logOut } = useUserAuth();

    const collection_phone = "phone"
    const collection_laptop = "laptop"

    const handleLogOut = async () => {
        try {
            await logOut();
            toast.success("Bạn đã đăng xuất khỏi hệ thống")
            navigate("/");
        } catch (error) { }
    };

    useEffect(() => {
        // call data
        getData(setPhones, collection_phone)
        getData(setLaptops, collection_laptop)
    }, [])

    useEffect(() => {
        if (phones !== undefined && laptops !== undefined) {
            setlistProduct(phones.concat(laptops))
        }
    }, [phones, laptops])

    const handleChange = (e) => {
        // console.log("bat e:" , typeof e.target.value)
        if (listProduct !== undefined) {
            const searchFilter = listProduct.filter(value => {
                return value.name.toLowerCase().includes(e.target.value.toLowerCase())
            })
            if (e.target.value === '') {
                setItemSearch([])
            }
            else {
                // console.log("search: ", searchFilter)
                setItemSearch(searchFilter)
            }
        }
    }

    console.log("togger", togger)
    return (
        <header className="header">
            <nav className="header-navbar hide-on-mobile">
                <div className="grid wide">
                    <div className="row ">
                        {/* <!-- Navbar Left --> */}
                        <div className="col l-4 m-4">
                            <ul className="navbar__list navbar__list--left">
                                <li className="navbar__list-item">
                                    <Link to="/introduce" className="navbar__list-link">Giới
                                        thiệu</Link>
                                </li>
                                <li className="navbar__list-item">
                                    <Link to="" className="navbar__list-link">Kết nối</Link>
                                    <a href="https://www.facebook.com/hoanghamobilecom" className="navbar-icon--link" target="_blank">
                                        <i className="fa-brands fa-facebook"></i>
                                    </a>
                                    <a href="https://www.instagram.com/" className="navbar-icon--link">
                                        <i className="fa-brands fa-instagram"></i>
                                    </a>
                                    <a href="https://www.gmail.com/" className="navbar-icon--link">
                                        <i className="fa-solid fa-envelope"></i>
                                    </a>
                                    <a href="https://www.youtube.com/" className="navbar-icon--link">
                                        <i className="fa-brands fa-youtube"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* <!-- Navbar Right --> */}
                        <div className="col l-8 m-8">
                            <ul className="navbar__list  navbar__list--right">
                                <li className="navbar__list-item">
                                    <Link to="" href="#" className="navbar__list-link">Thông báo</Link>
                                    <div className="navbar-notify">
                                        <h1 className="navbar-notify-heading">Thông báo mới nhất</h1>
                                        <div className="not-notify">
                                            <img src="./assets/image/notifycation/1592461.png" alt=""
                                                className="not-notify-img" />
                                            <p className="not-notify-text"> Chưa có thông báo</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="navbar__list-item">
                                    <Link to="/guarantee" className="navbar__list-link">Trung tâm bảo hành</Link>
                                </li>
                                <li className="navbar__list-item">
                                    <Link to="/checkorder" className="navbar__list-link">Tra cứu đơn
                                        hàng</Link>
                                </li>
                                <li className="navbar__list-item">
                                    <div className="header__user">
                                        {
                                            user ? (
                                                <div className="user-info">
                                                    <img src="https://img.lovepik.com/element/40144/0477.png_300.png" style={{
                                                        verticalAlign: 'middle', width: 20,
                                                        height: 20,
                                                        borderRadius: 50
                                                    }} />
                                                    <span className="header__user__email" style={{ marginLeft: 3, marginRight: 10, fontSize: 11 }}>{user && user.email}</span>
                                                    {/* <div></div> */}
                                                    {/* <span
                                                        className="header__user__logout"
                                                        title="Đăng xuất"
                                                        onClick={handleLogOut}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <i className="fa-solid fa-right-from-bracket"></i>
                                                    </span> */}

                                                    <ul className="sub-menu-user">
                                                        <li className='sub-menu-user-item'>
                                                            <Link to="/history-order" style={{ textDecoration: 'none', color: '#00483d' }}>Lịch sử đơn hàng</Link>
                                                        </li>
                                                        <li onClick={handleLogOut} className='sub-menu-user-item'>Đăng xuất</li>
                                                    </ul>
                                                </div>

                                            ) : (
                                                <div className="header__menu__item header__menu__right__item">
                                                    <Link to="/login" className="navbar__list-link">Đăng nhập</Link>
                                                </div>
                                            )
                                        }
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="header-with-search ">
                <div className="grid wide">
                    <div className="row" style={{ alignItems: 'center' }}>
                        {/* <!-- Start Menu mobile --> */}
                        <div className='col c-3 hide-on-tablet hide-on-pc'>
                            <div onClick={() => setTogger(true)} id="togger" className="mobile-menu hide-on-tablet">
                                <i className="fa-solid fa-bars mobile_menu-icon"></i>
                            </div>
                        </div>
                        <div className='col c-6 hide-on-tablet hide-on-pc'>
                            <div className="header__logo">
                                <Link to="/" className="header__logo-link">
                                    <img src={Logo} alt="" className="header__logo-img" />
                                </Link>
                            </div>
                        </div>
                        {/* <!-- Start Menu mobile --> */}
                        <div className="col l-3 hide-on-mobile">
                            <div className="header__logo">
                                <Link to="/" className="header__logo-link">
                                    <img src={Logo} alt="" className="header__logo-img" />
                                </Link>
                            </div>
                        </div>
                        <div className="col l-7 hide-on-mobile">
                            <div className="header-search hide-on-mobile">
                                <div className="header__input-search-warp">
                                    <input
                                        type="text"
                                        placeholder="Nhập sản phẩm cần tìm kiếm.."
                                        className="header__search-input"
                                        onChange={handleChange}
                                    />
                                    {
                                        itemSearch.length != 0 && (
                                            <div className="history-search">
                                                <ul>
                                                    {
                                                        itemSearch.map((product, index) => (
                                                            <li key={index} className="output-search">
                                                                <Link
                                                                    to={`/${product.category}/${product.categorySlug}/${product.slug}`}
                                                                    className="product-search-item"
                                                                >
                                                                    <div>
                                                                        <img style={{ height: 50, }} src={product.imgAvt} />
                                                                    </div>
                                                                    <Link
                                                                        to={`/${product.category}/${product.categorySlug}/${product.slug}`}
                                                                        style={{ marginLeft: 15, cursor: 'pointer', textDecoration: 'none' }}>
                                                                        <div className="product-search-item--name">
                                                                            {product.name}
                                                                        </div>
                                                                        <div className="product-search-item--price">
                                                                            {numberWithCommas(product.price)} đ
                                                                        </div>
                                                                    </Link>
                                                                </Link>
                                                            </li>
                                                        ))
                                                    }

                                                </ul>
                                            </div>
                                        )
                                    }
                                </div>
                                <button className="search-btn">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                        </div>
                        <div className="col l-2 c-3">
                            <div className="header__cart">
                                <Link to="/cart" href="">
                                    <i className="fa-solid fa-cart-arrow-down icon-cart"></i>
                                </Link>
                                <span className="header__cart-number-product">{cartItems.length}</span>
                                {/* <span className="header__cart-number-product">1</span> */}

                                <div className='cart-detal'>
                                    <div style={{ fontSize: 16, padding: '0px 4px', color: '#196F3D' }}>Sản phẩm trong giỏ hàng</div>
                                    <ul className="cart-list-detal">
                                        {
                                            cartItems.map((value, index) => {
                                                return (
                                                    <Link key={index} to={`/${value.productInfo.category}/${value.productInfo.categorySlug}/${value.productInfo.slug}`} className='cart-item-detal' style={{ display: 'flex', textDecoration: 'none' }}>
                                                        <div style={{ padding: '8px 12px' }}>
                                                            <img src={value.productInfo.image.imgAvt} style={{ height: 46 }} />
                                                        </div>
                                                        <div style={{ padding: '8px 0' }}>
                                                            <div style={{ fontSize: 12, fontWeight: 500, color: '#333' }}>{value.productInfo.name}</div>
                                                            <div style={{ color: 'red' }}>{numberWithCommas(value.productInfo.price)} đ</div>
                                                        </div>
                                                    </Link>
                                                )
                                            })
                                          }
                                    </ul>
                                    <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', padding: '0 12px', alignItems: 'center' }}>
                                        <p>({cartItems.length} sản phẩm): </p>
                                        <Link to="/cart" style={{ textDecoration: 'none', padding: 8, backgroundColor: '#239B56', color: 'white', borderRadius: 4 }}>
                                            Xem giỏ hàng
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row hide-on-tablet hide-on-pc'>
                        <div className='col c-12'>
                            <div className="header-search-moblie hide-on-tablet" >
                                <div className="header__input-search-warp">
                                    <input 
                                    type="text" 
                                    placeholder="Nhập sản phẩm cần tìm kiếm.." 
                                    className="header__search-input" 
                                    style={{ width: '80%' }} 
                                    onChange={handleChange}
                                    />

                                    {
                                        itemSearch.length != 0 && (
                                            <div className="history-search">
                                                <ul>
                                                    {
                                                        itemSearch.map((product, index) => (
                                                            <li key={index} className="output-search">
                                                                <Link
                                                                    to={`/${product.category}/${product.categorySlug}/${product.slug}`}
                                                                    className="product-search-item"
                                                                >
                                                                    <div>
                                                                        <img style={{ height: 50, }} src={product.imgAvt} />
                                                                    </div>
                                                                    <Link
                                                                        to={`/${product.category}/${product.categorySlug}/${product.slug}`}
                                                                        style={{ marginLeft: 15, cursor: 'pointer', textDecoration: 'none', textAlign: 'left'}}>
                                                                        <div className="product-search-item--name">
                                                                            {product.name}
                                                                        </div>
                                                                        <div className="product-search-item--price">
                                                                            {numberWithCommas(product.price)} đ
                                                                        </div>
                                                                    </Link>
                                                                </Link>
                                                            </li>
                                                        ))
                                                    }

                                                </ul>
                                            </div>
                                        )
                                    }

                                    <button className="search-btn">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="header__menu ">
                <div className="grid wide">
                    {/* Menu laptop tablet */}
                    <ul className="header__menu-list hide-on-mobile ">
                        <Link to="/" className="header__menu-item">
                            <div href="" className="header__menu-item-link">
                                <i className="fa-solid fa-house icon-menu"></i>
                                <span className="icon-menu-name">Trang chủ</span>
                            </div>
                        </Link>
                        <Link to="/dien-thoai-di-dong" className="header__menu-item">
                            <div href="" className="header__menu-item-link">
                                <i className="fa-solid fa-mobile-button icon-menu"></i>
                                <span className="icon-menu-name">Điện thoại</span>
                            </div>
                            <div className="header__menu-detal">
                                <div className="sub-menu">
                                    <div className="sub-manufactor top-auto">
                                        <h2 className="align-left">Hãng sản xuất</h2>
                                        <ul className="manufactor__list">
                                            <li className="manufactor__item">
                                                <Link to="/dien-thoai-di-dong/apple" className="manufactor-name">
                                                    Apple
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="/dien-thoai-di-dong/xiaomi" href="" className="manufactor-name">
                                                    Xiaomi
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="/dien-thoai-di-dong/oppo" href="" className="manufactor-name">
                                                    OPPO
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="/dien-thoai-di-dong/samsung" href="" className="manufactor-name">
                                                    SamSung
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="/dien-thoai-di-dong/vivo" href="" className="manufactor-name">
                                                    Vivo
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="/dien-thoai-di-dong/huawei" href="" className="manufactor-name">
                                                    Huawei
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="/dien-thoai-di-dong/" href="" className="manufactor-name">
                                                    SamSung1
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="/dien-thoai-di-dong/realme" href="" className="manufactor-name">
                                                    realme
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="/dien-thoai-di-dong/nokia" href="" className="manufactor-name">
                                                    Nokia
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    BPhone
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="/dien-thoai-di-dong/vsmart" href="" className="manufactor-name">
                                                    Vsmart
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="sub-price top-auto">
                                        <h2 className="algin-left">Mức giá</h2>
                                        <ul className="price__list">
                                            <li className="price__item">
                                                <Link to="" href="" className="price-name">
                                                    Từ 2 đến 3 triệu
                                                </Link>
                                            </li>
                                            <li className="price__item">
                                                <Link to="" href="" className="price-name">
                                                    Từ 3 đến 5 triệu
                                                </Link>
                                            </li>
                                            <li className="price__item">
                                                <Link to="" href="" className="price-name">
                                                    Từ 5 đến 10 triệu
                                                </Link>
                                            </li>
                                            <li className="price__item">
                                                <Link to="" href="" className="price-name">
                                                    Từ 10 đến 20 triệu
                                                </Link>
                                            </li>
                                            <li className="price__item">
                                                <Link to="" href="" className="price-name">
                                                    Trên 20 triệu
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="sub-care top-auto">
                                        <h2 className="algin-left">Quan tâm</h2>
                                        <ul className="care__list">
                                            <li className="care__item">
                                                <Link to="" href="" className="care-name">
                                                    Hôm nay
                                                </Link>
                                            </li>
                                            <li className="care__item">
                                                <Link to="" href="" className="care-name">
                                                    Tuần này
                                                </Link>
                                            </li>
                                            <li className="care__item">
                                                <Link to="" href="" className="care-name">
                                                    Tháng này
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="sub-ads">
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/lap-top" className="header__menu-item">
                            <div href="" className="header__menu-item-link">
                                <i className="fa-solid fa-laptop-code icon-menu"></i>
                                <span className="icon-menu-name">Laptop</span>
                            </div>
                            <div className="header__menu-detal">
                                <div className="sub-menu">
                                    <div className="sub-manufactor top-auto">
                                        <h2 className="algin-left">Hãng sản xuất</h2>
                                        <ul className="manufactor__list">
                                            <li className="manufactor__item">
                                                <Link to="/lap-top/apple" className="manufactor-name">
                                                    Apple
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="/lap-top/xiaomi" href="" className="manufactor-name">
                                                    Xiaomi
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="/lap-top/oppo" href="" className="manufactor-name">
                                                    OPPO
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="/lap-top/samsung" href="" className="manufactor-name">
                                                    SamSung
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="/lap-top/dell" href="" className="manufactor-name">
                                                    DELL
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="/lap-top/asus" href="" className="manufactor-name">
                                                    Asus
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="/lap-top/lenovo" href="" className="manufactor-name">
                                                    Lenovo
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="/lap-top/hp" href="" className="manufactor-name">
                                                    HP
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="sub-price top-auto">
                                        <h2 className="algin-left">Mức giá</h2>
                                        <ul className="price__list">
                                            <li className="price__item">
                                                <Link to="" href="" className="price-name">
                                                    Từ 2 đến 3 triệu
                                                </Link>
                                            </li>
                                            <li className="price__item">
                                                <Link to="" href="" className="price-name">
                                                    Từ 3 đến 5 triệu
                                                </Link>
                                            </li>
                                            <li className="price__item">
                                                <Link to="" href="" className="price-name">
                                                    Từ 5 đến 10 triệu
                                                </Link>
                                            </li>
                                            <li className="price__item">
                                                <Link to="" href="" className="price-name">
                                                    Từ 10 đến 20 triệu
                                                </Link>
                                            </li>
                                            <li className="price__item">
                                                <Link to="" href="" className="price-name">
                                                    Trên 20 triệu
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="sub-care top-auto">
                                        <h2 className="algin-left">Quan tâm</h2>
                                        <ul className="care__list">
                                            <li className="care__item">
                                                <Link to="" href="" className="care-name">
                                                    Hôm nay
                                                </Link>
                                            </li>
                                            <li className="care__item">
                                                <Link to="" href="" className="care-name">
                                                    Tuần này
                                                </Link>
                                            </li>
                                            <li className="care__item">
                                                <Link to="" href="" className="care-name">
                                                    Tháng này
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="sub-ads">
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/tablet" className="header__menu-item">
                            <div href="" className="header__menu-item-link">
                                <i className="fa-solid fa-tablet icon-menu"></i>
                                <span className="icon-menu-name">Tablet</span>
                            </div>
                            <div className="header__menu-detal">
                                <div className="sub-menu">
                                    <div className="sub-manufactor top-auto">
                                        <h2 className="algin-left">Hãng sản xuất</h2>
                                        <ul className="manufactor__list">
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    Apple
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    Xiaomi
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    OPPO
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    SamSung
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    DELL
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    Asus
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    Lenovo
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    HP
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    Nokia
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    BPhone
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    Vsmart
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="sub-price top-auto">
                                        <h2 >Mức giá</h2>
                                        <ul className="price__list">
                                            <li className="price__item">
                                                <Link to="" href="" className="price-name">
                                                    Từ 2 đến 3 triệu
                                                </Link>
                                            </li>
                                            <li className="price__item">
                                                <Link to="" href="" className="price-name">
                                                    Từ 3 đến 5 triệu
                                                </Link>
                                            </li>
                                            <li className="price__item">
                                                <Link to="" href="" className="price-name">
                                                    Từ 5 đến 10 triệu
                                                </Link>
                                            </li>
                                            <li className="price__item">
                                                <Link to="" href="" className="price-name">
                                                    Từ 10 đến 20 triệu
                                                </Link>
                                            </li>
                                            <li className="price__item">
                                                <Link to="" href="" className="price-name">
                                                    Trên 20 triệu
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="sub-care top-auto">
                                        <h2 className="align-left">Quan tâm</h2>
                                        <ul className="care__list">
                                            <li className="care__item">
                                                <Link to="" href="" className="care-name">
                                                    Hôm nay
                                                </Link>
                                            </li>
                                            <li className="care__item">
                                                <Link to="" href="" className="care-name">
                                                    Tuần này
                                                </Link>
                                            </li>
                                            <li className="care__item">
                                                <Link to="" href="" className="care-name">
                                                    Tháng này
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="sub-ads">
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/watch" className="header__menu-item">
                            <div href="" className="header__menu-item-link">
                                <i className="fa-solid fa-clock icon-menu"></i>
                                <span className="icon-menu-name">Đồng hồ</span>
                            </div>
                            <div className="header__menu-detal">
                                <div className="sub-menu">
                                    <div className="sub-manufactor top-auto">
                                        <h2 className="align-left">Hãng sản xuất</h2>
                                        <ul className="manufactor__list">
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    Apple Watch
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    Xiaomi
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    OPPO
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    SamSung
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    Masstel
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    Fitbit
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    Tic Watch
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    HP
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    Đồng hồ trẻ em
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    BPhone
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="sub-price top-auto">
                                        <h2 >Mức giá</h2>
                                        <ul className="price__list">
                                            <li className="price__item">
                                                <Link to="" href="" className="price-name">
                                                    Từ 2 đến 3 triệu
                                                </Link>
                                            </li>
                                            <li className="price__item">
                                                <Link to="" href="" className="price-name">
                                                    Từ 3 đến 5 triệu
                                                </Link>
                                            </li>
                                            <li className="price__item">
                                                <Link to="" href="" className="price-name">
                                                    Từ 5 đến 10 triệu
                                                </Link>
                                            </li>
                                            <li className="price__item">
                                                <Link to="" href="" className="price-name">
                                                    Từ 10 đến 20 triệu
                                                </Link>
                                            </li>
                                            <li className="price__item">
                                                <Link to="" href="" className="price-name">
                                                    Trên 20 triệu
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="sub-care top-auto">
                                        <h2 >Quan tâm</h2>
                                        <ul className="care__list">
                                            <li className="care__item">
                                                <Link to="" href="" className="care-name">
                                                    Hôm nay
                                                </Link>
                                            </li>
                                            <li className="care__item">
                                                <Link to="" href="" className="care-name">
                                                    Tuần này
                                                </Link>
                                            </li>
                                            <li className="care__item">
                                                <Link to="" href="" className="care-name">
                                                    Tháng này
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="sub-ads">
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/head-phone" className="header__menu-item">
                            <div href="" className="header__menu-item-link">
                                <i className="fa-solid fa-headphones icon-menu"></i>
                                <span className="icon-menu-name">Tai nghe</span>
                            </div>
                            <div className="header__menu-detal header__menu--headphone">
                                <div className="sub-menu">
                                    <div className="sub-manufactor top-auto">
                                        <h2 className="align-left">Hãng sản xuất</h2>
                                        <ul className="manufactor__list">
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    Apple
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    Xiaomi
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    OPPO
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    SamSung
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    Vivo
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    Huawei
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    AKG
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    realme
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    Nokia
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    BPhone
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    Sennheiser
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    LG
                                                </Link>
                                            </li>
                                            <li className="manufactor__item">
                                                <Link to="" href="" className="manufactor-name">
                                                    JBL
                                                </Link>
                                            </li>

                                        </ul>
                                    </div>
                                    <div className="sub-price top-auto">
                                        <h2 className="align-left">Mức giá</h2>
                                        <ul className="price__list">
                                            <li className="price__item">
                                                <Link to="" href="" className="price-name">
                                                    Từ 2 đến 3 triệu
                                                </Link>
                                            </li>
                                            <li className="price__item">
                                                <Link to="" href="" className="price-name">
                                                    Từ 3 đến 5 triệu
                                                </Link>
                                            </li>
                                            <li className="price__item">
                                                <Link to="" href="" className="price-name">
                                                    Từ 5 đến 10 triệu
                                                </Link>
                                            </li>
                                            <li className="price__item">
                                                <Link to="" href="" className="price-name">
                                                    Từ 10 đến 20 triệu
                                                </Link>
                                            </li>
                                            <li className="price__item">
                                                <Link to="" href="" className="price-name">
                                                    Trên 20 triệu
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="sub-care top-auto">
                                        <h2 className="align-left">Quan tâm</h2>
                                        <ul className="care__list">
                                            <li className="care__item">
                                                <Link to="" href="" className="care-name">
                                                    Hôm nay
                                                </Link>
                                            </li>
                                            <li className="care__item">
                                                <Link to="" href="" className="care-name">
                                                    Tuần này
                                                </Link>
                                            </li>
                                            <li className="care__item">
                                                <Link to="" href="" className="care-name">
                                                    Tháng này
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="sub-ads">
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="#" className="header__menu-item ">
                            <div href="" className="header__menu-item-link">
                                <i className="fa-solid fa-bolt-lightning icon-menu"></i>
                                <span className="icon-menu-name">FLAST SALE</span>
                            </div>
                        </Link>
                        <Link to="#" className="header__menu-item hide-on-tablet">
                            <div href="https://hoanghamobile.com/tin-tuc/" className="header__menu-item-link">
                                <i className="fa-solid fa-newspaper icon-menu"></i>
                                <span className="icon-menu-name">Tin tức</span>
                            </div>
                        </Link>
                    </ul>
                    {/* <!-- Menu sub menu moblie --> */}
                    {
                        togger && (

                            <div className="modal-menu-mobile hide-on-pc">
                                <div className="sub-menu-mobile">
                                    <div className="login-sub-menu">
                                        <i className="fa-solid fa-circle-user icon-login"></i>
                                        <div>
                                            <h1 style={{ fontSize: 16, padding: '4px 0' }}>Đăng nhập</h1>
                                            <p style={{ fontStyle: 'italic' }}>Đăng nhập để nhận thêm nhiều ưu đãi</p>
                                        </div>
                                    </div>
                                    <div className="close-sub-menu-mobile" onClick={() => setTogger(false)}>
                                        <i className="fa-solid fa-xmark icon-close-sub-menu"></i>
                                    </div>
                                    <ul className="sub-menu-mobile__list">
                                        <li className="sub-menu-mobile__item">
                                            <Link to="/" className="sub-menu-mobile__item-link" onClick={() => setTogger(false)}>
                                                <i className="fa-solid fa-house sub-menu-icon"></i>
                                                <span className="icon-sub-menu-name">Trang chủ</span>
                                            </Link>
                                        </li>
                                        <li className="sub-menu-mobile__item">
                                            <Link to="/dien-thoai-di-dong" className="sub-menu-mobile__item-link" onClick={() => setTogger(false)}>
                                                <i className="fa-solid fa-mobile-button sub-menu-icon"></i>
                                                <span className="icon-sub-menu-name">Điện thoại</span>
                                            </Link>
                                        </li>
                                        <li className="sub-menu-mobile__item">
                                            <Link to="/lap-top" className="sub-menu-mobile__item-link">
                                                <i className="fa-solid fa-laptop-code sub-menu-icon"></i>
                                                <span className="icon-sub-menu-name">Laptop</span>
                                            </Link>
                                        </li>
                                        <li className="sub-menu-mobile__item">
                                            <Link to="/tablet" className="sub-menu-mobile__item-link">
                                                <i className="fa-solid fa-tablet sub-menu-icon"></i>
                                                <span className="icon-sub-menu-name">Tablet</span>
                                            </Link>
                                        </li>
                                        <li className="sub-menu-mobile__item">
                                            <Link to="/headp-phone" className="sub-menu-mobile__item-link">
                                                <i className="fa-solid fa-headphones sub-menu-icon"></i>
                                                <span className="icon-sub-menu-name">Loa & Tai nghe</span>
                                            </Link>
                                        </li>
                                        <li className="sub-menu-mobile__item">
                                            <Link to="/" className="sub-menu-mobile__item-link">
                                                <i className="fa-solid fa-screwdriver-wrench sub-menu-icon"></i>
                                                <span className="icon-sub-menu-name">Sửa chữa</span>
                                            </Link>
                                        </li>

                                    </ul>
                                    {/* <script>
                                            var toggerMenu = document.querySelector("#togger");
                                            // console.log(opacity 2s linear);
                                            toggerMenu.addEventListener("click", function () {
                                                document.querySelector(".modal").style.display = "block";
                                                document.querySelector(".modal").style.animation = "modalFadeIn ease 0.2s";
                                                // document.querySelector(".sub-menu-mobile").style.transition = "all 1s ease-in-out";
                                            })
                                            document.querySelector(".close-sub-menu-mobile").addEventListener("click", function () {
                                                document.querySelector(".modal").style.display = "none";
                                            })
                                        </script> */}
                                    {/* <!-- About --> */}
                                    <ul className="sub-menu-mobile-about__list">
                                        <li className="sub-menu-mobile-about__item">
                                            <a href="" className="sub-menu-mobile__item-link">
                                                <i className="fa-solid fa-address-card sub-menu-icon-about"></i>
                                                <span className="icon-menu-name-about">Giới thiệu</span>
                                            </a>
                                        </li>
                                        <li className="sub-menu-mobile-about__item">
                                            <a href="" className="sub-menu-mobile__item-link">
                                                <i className="fa-solid fa-eye sub-menu-icon-about"></i>
                                                <span className="icon-menu-name-about">Sản phẩm đã xem</span>
                                            </a>
                                        </li>
                                        <li className="sub-menu-mobile-about__item">
                                            <a href="" className="sub-menu-mobile__item-link">
                                                <i className="fa-solid fa-check-to-slot sub-menu-icon-about"></i>
                                                <span className="icon-menu-name-about">Trung tâm bảo hành</span>
                                            </a>
                                        </li>
                                        <li className="sub-menu-mobile-about__item">
                                            <a href="" className="sub-menu-mobile__item-link">
                                                <i className="fa-solid fa-location-dot sub-menu-icon-about"></i>
                                                <span className="icon-menu-name-about">Hệ thông siêu thị</span>
                                            </a>
                                        </li>
                                        <li className="sub-menu-mobile-about__item">
                                            <a href="" className="sub-menu-mobile__item-link">
                                                <i className="fa-solid fa-phone-volume sub-menu-icon-about"></i>
                                                <span className="icon-menu-name-about">Tuyển dụng</span>
                                            </a>
                                        </li>
                                        <li className="sub-menu-mobile-about__item">
                                            <a href="" className="sub-menu-mobile__item-link">
                                                <i className="fa-solid fa-truck-fast sub-menu-icon-about"></i>
                                                <span className="icon-menu-name-about">Tra cứu đơn hàng</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        )
                    }
                    {/* <!-- Menu on moblie --> */}
                    <ul className="header__menu-mobile-list hide-on-tablet hide-on-pc">
                        <li className="header__menu-item">
                            <Link to="/dien-thoai-di-dong" className="header__menu-item-link">
                                <div className="icon-menu">
                                    <i className="fa-solid fa-mobile-button icon-menu-style"></i>
                                </div>

                                <span className="icon-menu-name">Điện thoại</span>
                            </Link>
                        </li>
                        <li className="header__menu-item">
                            <Link to="/lap-top" className="header__menu-item-link">
                                <div className="icon-menu">

                                    <i className="fa-solid fa-laptop-code icon-menu-style"></i>
                                </div>
                                <span className="icon-menu-name">Laptop</span>
                            </Link>

                        </li>
                        <li className="header__menu-item">
                            <Link to="/tablet" className="header__menu-item-link">
                                <div className="icon-menu">

                                    <i className="fa-solid fa-tablet icon-menu-style"></i>
                                </div>
                                <span className="icon-menu-name">Tablet</span>
                            </Link>
                        </li>
                        <li className="header__menu-item">
                            <Link to="/watch" className="header__menu-item-link">
                                <div className="icon-menu">
                                    <i className="fa-solid fa-clock icon-menu-style"></i>
                                </div>
                                <span className="icon-menu-name">Đồng hồ</span>
                            </Link>
                        </li>
                        <li className="header__menu-item">
                            <Link to="/head-phone" className="header__menu-item-link">
                                <div className="icon-menu">
                                    <i className="fa-solid fa-headphones icon-menu-style"></i>
                                </div>
                                <span className="icon-menu-name">Tai nghe</span>
                            </Link>
                        </li>
                        <li className="header__menu-item ">
                            <Link to="/" className="header__menu-item-link">
                                <div className="icon-menu">
                                    <i className="fa-solid fa-bolt-lightning icon-menu-style"></i>
                                </div>
                                <span className="icon-menu-name">Flash Sale</span>
                            </Link>
                        </li>
                        <li className="header__menu-item hide-on-tablet">
                            <Link to="/" className="header__menu-item-link">
                                <div className="icon-menu">

                                    <i className="fa-solid fa-newspaper icon-menu-style"></i>
                                </div>
                                <span className="icon-menu-name ">Tin tức</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </header >
    )
}

export default Header
