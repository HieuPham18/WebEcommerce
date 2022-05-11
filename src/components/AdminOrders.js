import React, { useEffect, useState } from "react" // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import numberWithCommas from "../utils/numberWithCommas"
import CottageIcon from '@mui/icons-material/Cottage';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import moment from "moment";
import '../stylesheets/AdminProducts.scss'
import '../stylesheets/grid.scss'
import '../stylesheets/base.scss'

import { getData } from "../data/actionData";
import OrderDetal from "./OrderDetail";

function AdminOrders({ searchProduct, title }) {
    const [historyOrder, setHistoryOrder] = useState([])
    const [order, setOrder] = useState(false)
    const [idOrder, setIdOrder] = useState()

    const openOrder = () => {
        setOrder(true)
    }

    const closeOrder = () => {
        setOrder(false)
    }

    const handleViewOrder = (id) => {
        openOrder();
        setIdOrder(id);
    }

    const collection_order = 'invoice'
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    //get Data
    useEffect(() => {
        getData(setHistoryOrder, collection_order)
    }, [])


    return (
        <>
            <div className='admin-heading'>
                <div className='admin-heading-left'>
                    <CottageIcon sx={{ fontSize: 24, color: '#00483d' }} />
                    <h2>Admin</h2>
                    <ArrowRightIcon sx={{ fontSize: 16 }} />
                    <h2 style={{ textAlign: 'center', fontWeight: 600, color: 'green' }}>
                        {
                            title === 'orders' ? "Thông tin đơn hàng" : ''
                        }

                    </h2>
                </div>
                <div className='admin-heading-right'>
                    {/* <div>
                        
                        <Select style={{ display: 'block', width: 200, padding: 2 }} options={options} onChange={(value) => selectInput(value)} />
                    </div> */}
                </div>
            </div>
            {/* Component  */}
            <table className="table-product styled-table">
                <thead>
                    <tr>
                        <th>ID đơn hàng</th>
                        <th>Tên khách hàng</th>
                        <th>Thời gian đặt hàng</th>
                        <th>Địa chỉ</th>
                        <th>Tổng tiền</th>
                        <th>Tùy chọn</th>
                        {/* {/* <th>Phân loại</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        // historyOrder !== undefined && historyOrder.map(value => {
                        historyOrder !== undefined && historyOrder.sort((a, b) => b.orderTime - a.orderTime).map(value => {
                            return (
                                <tr key={value.id}>
                                    <td>{value.id}</td>
                                    <td>{value.name}</td>
                                    <td>
                                        {moment(value.orderTime.toDate()).format("DD/MM/YYYY hh:mm:ss a")}
                                    </td>
                                    <td>{value.address}</td>
                                    <td>{numberWithCommas(value.orderTotal)} đ</td>
                                    <td style={{ cursor: "pointer" }}><div onClick={() => { handleViewOrder(value.id) }}><i className="fa-solid fa-eye"></i> Xem chi tiết</div></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {
                order && <OrderDetal closeOrder={closeOrder} historyOrder={historyOrder} idOrder={idOrder} />
            }
        </>
    )
}
export default AdminOrders