import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { deleteProductFromCart, updateQuantityProduct, deleteCart } from '../redux/Cart/cart.action'
import numberWithCommas from '../utils/numberWithCommas'
import { useUserAuth } from "../context/UserAuthContext";
import '../stylesheets/base.scss'
import '../stylesheets/grid.scss'
import '../stylesheets/CartPage.scss'


function CartPage() {
    // Init
    let totalProduct = 0, totalPrice = 0
    const [numberPrice, setNumberPrice] = useState(0)
    const [numberProduct, setNumberProduct] = useState(0)
    const { cartItems } = useSelector(state => state.cartReducer)
    const navigate = useNavigate()
    const { user } = useUserAuth()
    const dispatch = useDispatch()

    // console.log(cartItems)

    // Set total number product and price of order
    useEffect(() => {
        setNumberProduct(totalProduct)
        setNumberPrice(totalPrice)
    }, [cartItems])

    // Handle delete product from card
    const deleteProduct = (cartItem) => {
        dispatch(deleteProductFromCart(cartItem));
    };

    // Hander update quantity 
    const updateQuantity = (cartItem, quantity) => {
        dispatch(updateQuantityProduct(cartItem, quantity));
    };

    // Save in LocalStoreage
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    // Check user login
    const check = () => {
        if (!user) {
            alert("Vui lòng đăng nhập.");
            navigate("/login");
            return false;
        }
        return true;
    };

    return (
        <>
            <div className="cart-page">
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-12 m-12 c-12">
                            <h1 className="heading-cart" style={{marginTop: 20}}>
                                
                            </h1>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col l-12 m-12 c-12">
                            <div className="cart-list">
                                <table border="1" className="table-cart">
                                    <caption style={{ fontSize: 24, textDecoration: 'uppercase', padding: 16 }}>Thông tin sản phẩm</caption>
                                    <thead>
                                        <tr>
                                            <th>Hình ảnh</th>
                                            <th>Tên sản phẩm</th>
                                            <th>Màu sắc</th>
                                            <th>Phiên bản</th>
                                            <th>Số lượng</th>
                                            <th>Giá</th>
                                            <th>Tùy chỉnh</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cartItems !== undefined && cartItems.length !== 0 && cartItems.map((cartItem) => {
                                                if (cartItem !== undefined && cartItem.productInfo !== undefined) {
                                                    // Total product of order
                                                    totalProduct = cartItems.length;
                                                    // Total price of order
                                                    totalPrice += cartItem.productInfo.price * cartItem.quantity

                                                    // console.log("toal:", totalPrice)

                                                    return (
                                                        <tr key={Math.random()}>
                                                            <td>
                                                                <img style={{ height: 80 }} src={cartItem.productInfo.image.imgAvt} />
                                                            </td>
                                                            <td style={{ fontWeight: 500, lineHeight: '20px', textAlign: 'left' }}>
                                                                <Link style={{ textDecoration: 'none', color: '#00483d', }} to={`/productinfo/${cartItem.productInfo.slug}`}>{cartItem.productInfo.name}</Link>
                                                            </td>
                                                            <td>{cartItem.color}</td>
                                                            <td>{cartItem.capacity}</td>

                                                            <td>
                                                                <div className="quantity">
                                                                    <div className="quantity-item" onClick={() =>
                                                                        cartItem.quantity > 1 ? updateQuantity(cartItem, cartItem.quantity - 1) : 1
                                                                    }>
                                                                        -
                                                                    </div>
                                                                    <div className="quantity-item">
                                                                        {cartItem.quantity}
                                                                    </div>
                                                                    <div className="quantity-item" onClick={() =>
                                                                        updateQuantity(cartItem, cartItem.quantity + 1)
                                                                    }>
                                                                        +
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>{numberWithCommas(cartItem.productInfo.price * cartItem.quantity)} đ</td>

                                                            <td>
                                                                <div onClick={() => deleteProduct(cartItem)}>
                                                                    <i className="fa-solid fa-calendar-xmark icon-del"></i>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            })

                                        }
                                    </tbody>
                                </table>
                                <ToastContainer position="top-right" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col l-12 m-12 c-12">
                            <div className="cart-info">
                                <h1 className="total-cart-number">
                                    Tổng sản phẩm({numberProduct}):
                                </h1>
                                <div className="total-price-cart">
                                    <h2>Thành tiền: </h2>
                                    <h2>{numberWithCommas(numberPrice)} đ</h2>
                                </div>
                                <div className="go-to-checkout" onClick={() => {
                                    if (check()) {
                                        navigate('/checkout')
                                    }
                                }}>
                                    ĐẶT HÀNG
                                </div>
                                <div>
                                    <Link to="/" className="go-to-shopping">TIẾP TỤC MUA HÀNG</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
    {/* <tr>
                                            <td style={{ textAlign: 'center' }}>  <img style={{ height: 80 }} src="https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2022/02/09/image-removebg-preview-7.png" /></td>
                                            <td style={{ fontWeight: 500 }}>Samsung Galaxy S22 - 8GB/128GB - Chính hãng</td>
                                            <td>Hồng</td>
                                            <td>8GB/128GB</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <div className="quantity">
                                                    <div className="quantity-item">
                                                        -
                                                    </div>
                                                    <div className="quantity-item">
                                                        1
                                                    </div>
                                                    <div className="quantity-item">
                                                        +
                                                    </div>
                                                </div>
                                            </td>
                                            <td>12,800,000 đ</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <i className="fa-solid fa-calendar-xmark icon-del"></i>
                                            </td>
                                        </tr> */}

}
export default CartPage;