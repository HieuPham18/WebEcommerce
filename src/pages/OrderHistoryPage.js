import React, { useEffect, useState } from 'react'
import { getData } from '../data/actionData'
import moment from "moment";
import '../stylesheets/base.scss'
import '../stylesheets/grid.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'
import numberWithCommas from '../utils/numberWithCommas';
import { useUserAuth } from '../context/UserAuthContext';


function OrderHistoryPage() {
    const { user } = useUserAuth();
    const [historyOrder, setHistoryOrder] = useState([])
    const collection_order = 'invoice'
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    //get Data
    useEffect(() => {
        getData(setHistoryOrder, collection_order)
    }, [])

    console.log("uid", user)
    return (
        <>
            <Header />
            <div className='container' style={{ marginTop: 50 }}>
                <div className='grid wide'>
                    <div className='row'>
                        <div className='col l-12 m-12 c-12'>
                            <h2 style={{ textAlign: 'center', padding: '16px 0' }}>Lịch sử mua hàng</h2>
                            <table className="styled-table" style={{ width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th>ID Đơn hàng</th>
                                        <th>Người nhận</th>
                                        <th>Thời gian</th>
                                        <th>Địa chỉ</th>
                                        <th>Tổng tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        historyOrder !== undefined && user !== null && historyOrder.filter(item => item.orderUserID === user.uid).map(value => {
                                            return (
                                                <tr key={value.id}>
                                                    <td>{value.id}</td>
                                                    <td>{value.name}</td>
                                                    <td>
                                                        {moment(value.orderTime.toDate()).format("DD/MM/YYYY hh:mm:ss a")}
                                                    </td>
                                                    <td>{value.address}</td>
                                                    <td>{numberWithCommas(value.orderTotal)} đ</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default OrderHistoryPage