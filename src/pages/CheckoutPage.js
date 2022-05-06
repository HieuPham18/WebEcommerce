import { map } from '@firebase/util'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import '../stylesheets/base.scss'
import '../stylesheets/grid.scss'
import '../stylesheets/CheckoutPage.scss'
import { useNavigate } from 'react-router-dom';
import { addOrderToFirestore } from '../redux/Order/order.action'
import firebase from "firebase/compat/app";
import userEvent from '@testing-library/user-event';
import { useUserAuth } from '../context/UserAuthContext';
import { async } from '@firebase/util';
import fileDB from '../config/firebase';
import { doc, setDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import getData from '../data/actionData'
import { Link } from "react-router-dom";
import numberWithCommas from '../utils/numberWithCommas';
import moment from 'moment'
import { deleteCart } from '../redux/Cart/cart.action';

function CheckoutPage() {
    let totalPrice = 0, totalProduct = 0
    const [numberPrice, setNumberPrice] = useState(0)
    const [numberProduct, setNumberProduct] = useState(0)
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [note, setNote] = useState('')
    const { cartItems } = useSelector(state => state.cartReducer)
    const { orderItems } = useSelector(state => state.orderReducer)
    const { user, logOut } = useUserAuth();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const collection_name = 'invoice'

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    useEffect(() => {
        setNumberProduct(totalProduct)
        setNumberPrice(totalPrice)
    }, [cartItems])

    console.log("card-tem:", cartItems)
    console.log("order-tem:", orderItems)

    const check = () => {
        if (!user) {
            alert("Vui lòng đăng nhập.");
            navigate("/login");
            return false;
        }
        return true;
    };

    const setDatatoFirebase = async (obj) => {
        try {
            await addDoc(collection(fileDB, collection_name), obj);
        } catch (error) {

        }
    }


    const handleOnSubmit = (e) => {
        e.preventDefault()
        if (check()) {
            // Check information custfomer
            if (name === "" || phoneNumber === "" || address === "") {
                alert("Xin vui lòng nhập đủ thông tin")
                return
            }
            // Time
            const timestamp = new Date();

            console.log("time: ", moment(timestamp).format('MMMM Do YYYY, h:mm:ss a'))
            // Init Obj order
            const order = {
                orderUserID: user.uid,
                name: name,
                phoneNumber: phoneNumber,
                address: address,
                orderItem: cartItems.map(item => {
                    const nameProduct = item.productInfo.name
                    const price = item.productInfo.price
                    const color = item.color
                    const capacity = item.capacity
                    return {
                        nameProduct,
                        price,
                        color,
                        capacity
                    }
                }),
                orderTotal: numberPrice,
                orderTime: timestamp
            }

            setDatatoFirebase(order)

            // console.log("order:", order)

            dispatch(addOrderToFirestore(order));
            dispatch(deleteCart(cartItems))

            // Set default input
            setName("")
            setAddress("")
            setPhoneNumber("")
            setNote("")

        }


        // go to page
        // navigate("/");
    }

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])
    return (

        <>
            <section className='checkout'>
                <div className='grid wide'>
                    <div className='row'>
                        <div className='col l-6 m-12 c-12'>
                            <div className='form-group'>
                                <h3 className='form-title'>Thông tin khách hàng</h3>
                                <div className='info-customer'>
                                    <label>Họ và tên:<span style={{ color: 'red' }}>*</span> </label>
                                    <input
                                        className='form-info-control'
                                        type='text'
                                        placeholder='Nhập họ tên...'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <label>Số điện thoại:<span style={{ color: 'red' }}>*</span> </label>
                                    <input
                                        className='form-info-control'
                                        type='number'
                                        placeholder='Nhập số điện thoại...'
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                    <label>Địa chỉ:<span style={{ color: 'red' }}>*</span> </label>
                                    <input
                                        className='form-info-control'
                                        type='text'
                                        placeholder='Nhập địa chỉ nhận hàng...'
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                    <label>Ghi chú:<span style={{ color: 'red' }}>*</span> </label>
                                    <input
                                        className='form-info-control'
                                        type='text'
                                        placeholder='Chi chú (nếu có)'
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col l-6 m-12 c-12'>
                            <div className='info-cart'>
                                <h3 className='form-title'>Thông tin đơn hàng</h3>
                                <div className='cart-order'>
                                    <ul className='list-order-product'>
                                        {
                                            cartItems !== undefined && cartItems.map((cart) => {
                                                totalProduct = cartItems.length
                                                totalPrice += parseInt(cart.productInfo.price) * cart.quantity
                                                // console.log("total: ", totalPrice)
                                                // console.log("total2: ", totalProduct)
                                                return (
                                                    <li className='order-product-item' key={Math.random()}>
                                                        <div>
                                                            <img src={cart.productInfo.image.imgAvt} style={{ height: 85 }} />
                                                        </div>
                                                        <div className="order-product-info">
                                                            <div
                                                                style={{ fontSize: 17, paddingBottom: 4, fontWeight: 650, lineHeight: 1.1 }}
                                                            >
                                                                {cart.productInfo.name}
                                                            </div>

                                                            <div style={{ display: 'flex', fontSize: 14, padding: '4px 0' }}>
                                                                <div>
                                                                    <strong>Màu: </strong>{cart.color}
                                                                </div>
                                                                <div style={{ margin: '0 8px' }}>
                                                                    -
                                                                </div>
                                                                <div>
                                                                    <strong>Phiên bản: </strong>{cart.capacity}
                                                                </div>
                                                                <div style={{ margin: '0 8px' }}>
                                                                    -
                                                                </div>
                                                                <div>
                                                                    <strong>Số lượng: </strong>{cart.quantity}
                                                                </div>
                                                            </div>
                                                            <div style={{ color: 'red', fontSize: 14, fontWeight: 600 }}>{numberWithCommas(cart.productInfo.price * cart.quantity)} đ</div>
                                                        </div>
                                                    </li>

                                                )
                                            })

                                        }
                                    </ul>
                                    <form className='total-order' onSubmit={handleOnSubmit}>
                                        <div style={{ fontSize: 20, fontWeight: 700, color: '#00483d', margin: '12px 0' }}>Total
                                            ({numberProduct} sản phẩm): <span style={{ color: 'red' }}>{numberWithCommas(numberPrice)} đ</span>
                                        </div>
                                        <button className='btn btn-order'>Đặt hàng</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default CheckoutPage