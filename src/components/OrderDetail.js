import React, { useContext, useEffect, useState } from "react" // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import numberWithCommas from "../utils/numberWithCommas"
import Logo from '../assets/images/logo/logo-text.png'
import { coverNumbertoString } from "../data/convertNumber";
import '../stylesheets/OrderDetal.scss'
import '../stylesheets/grid.scss'
import '../stylesheets/base.scss'
import CloseIcon from '@mui/icons-material/Close';

function OrderDetal({ closeOrder, historyOrder, idOrder }) {
    const [rsOrder, setRsOrder] = useState()
    useEffect(() => {
        if (historyOrder.length > 0) {
            const rs = historyOrder.find(item => item.id === idOrder)
            setRsOrder(rs)
        }
    }, [idOrder])
    return (
        <div className="order-detal">
            <div className="order-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <img style={{ maxWidth: 150 }} alt="" src={Logo} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: 24, color: '#00483d' }}>HÓA ĐƠN GIÁ TRỊ GIA TĂNG</h1>
                    </div>
                    <div>
                        <h4>Mẫu số: <span style={{ color: 'red' }}>01GTKT0_52</span></h4>
                        <h4>Kí hiệu: HH/29E</h4>
                    </div>
                </div>
                <div style={{ borderBottom: '1px solid #bbb', marginTop: 20 }}>
                    <p className="info-company-order"><strong>Đơn vị bán hàng: CÔNG TY CỔ PHẦN XÂY DỰNG VÀ ĐẦU TƯ THƯƠNG MẠI HOÀNG HÀ</strong></p>
                    <p className="info-company-order"><strong>Mã số thuế:</strong> 0107954697 </p>
                    <p className="info-company-order"><strong>Địa chỉ:</strong> Số 26 Phù Đổng Thiên Vương, P. Phạm Đình Hổ, Q. Hai Bà Trưng, Hà Nội. </p>
                    <p className="info-company-order"><strong>Điện thoại:</strong> 19002091 </p>
                    <div style={{ width: '100%', display: 'flex' }}>
                        <p className="info-company-order"><strong>Số tài khoản:</strong> 12345678912312 </p>
                        <p className="info-company-order mLeft40"><strong>Ngân hàng:</strong> Ngân hàng Quân Đội MB - Chi nhánh Hà Nội </p>
                    </div>
                </div>
                <div style={{ borderBottom: '1px solid #bbb', marginTop: 10 }}>
                    {
                        rsOrder !== undefined && <div>
                            <p className="info-customer-order"><strong>Khách hàng:</strong> {rsOrder.name} </p>
                            <p className="info-customer-order"><strong>Số điện thoại:</strong> {rsOrder.phoneNumber} </p>
                            <p className="info-customer-order"><strong>Địa chỉ:</strong> {rsOrder.address} </p>
                            <p className="info-customer-order"><strong>Ghi chú(nếu có): {rsOrder.note}</strong> </p>
                        </div>
                    }
                </div>
                <div className=''>
                    <h3 style={{ textAlign: 'center', padding: '12px 0px' }}>Thông tin đơn hàng</h3>
                    {/* Component  */}
                    <table className="">
                        <thead>
                            <tr>
                                <th style={{ fontSize: 13, padding: 6 }}>STT</th>
                                <th style={{ fontSize: 13, padding: 6 }}>Tên sản phẩm</th>
                                <th style={{ fontSize: 13, padding: 6 }}>Màu sắc</th>
                                <th style={{ fontSize: 13, padding: 6 }}>Phiên bản</th>
                                <th style={{ fontSize: 13, padding: 6 }}>Giá(VNĐ)</th>
                                <th style={{ fontSize: 13, padding: 6 }}>Số lượng</th>
                                <th style={{ fontSize: 13, padding: 6 }}>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rsOrder !== undefined && rsOrder.orderItem.map((value, index) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                                {/* <td ><img style={{ height: 60 }} src={value.img} alt="" /></td> */}
                                                <td style={{ fontSize: 13, padding: 6 }}>{index + 1}</td>
                                                <td style={{ fontSize: 13, padding: 6, textAlign: 'left' }}>{value.nameProduct}</td>
                                                <td style={{ fontSize: 13, padding: 6 }}>{value.color}</td>
                                                <td style={{ fontSize: 13, padding: 6 }}>{value.capacity}</td>
                                                <td style={{ fontSize: 13, padding: 6 }}>{numberWithCommas(value.price)}</td>
                                                <td style={{ fontSize: 13, padding: 6 }}>{value.quantity}</td>
                                                <td style={{ fontSize: 13, padding: 6 }}>{numberWithCommas(value.price * value.quantity)}</td>
                                            </tr>

                                        </>
                                    )
                                })
                            }
                            <tr>
                                <td style={{ fontSize: 13, padding: 8, textAlign: "right", fontWeight: 'bold' }} colspan="5">Tổng cộng tiền hàng: </td>
                                <td style={{ fontSize: 13, padding: 8 }} colspan="5">
                                    {
                                        rsOrder !== undefined && <span>{numberWithCommas(rsOrder.orderTotal)}</span>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td colspan="5" style={{ fontSize: 13, padding: 8, textAlign: "right", fontWeight: 'bold' }}>
                                    <span>Thuế suất GTGT(VAT)</span>
                                    <span> - </span>
                                    <span>Tổng tiền thuế GTGT(10%):</span>
                                </td>
                                <td colspan="2" style={{ fontSize: 13, padding: 8 }}>
                                    {
                                        rsOrder !== undefined && <span>{numberWithCommas(rsOrder.orderTotal * 0.1)}</span>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td colspan="5" style={{ fontSize: 13, padding: 8, textAlign: "right", fontWeight: 'bold' }}>Tổng tiền thanh toán: </td>
                                <td colspan="2" style={{ fontSize: 13, padding: 8 }}>
                                    {
                                        rsOrder !== undefined && <span>{numberWithCommas(rsOrder.orderTotal + rsOrder.orderTotal * 0.1)}</span>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td colspan="7" style={{ fontSize: 13, padding: 8, textAlign: "left" }}>Số tiền bằng chữ:
                                    {
                                        rsOrder !== undefined && <span style={{ fontWeight: "bold" }}>{coverNumbertoString.doc(parseInt(rsOrder.orderTotal + rsOrder.orderTotal * 0.1))} đồng</span>
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 60, padding: '0 80px' }}>
                    <div>
                        <h2>Người mua hàng</h2>
                    </div>
                    <div>
                        <h2>Người bán hàng</h2>
                    </div>
                </div>
            </div>
            <div style={{ position: 'absolute', top: 5, right: 5, cursor: 'pointer', }} onClick={closeOrder}>
                <CloseIcon sx={{ fontSize: 30 }} />
            </div>
        </div>

    )
}
export default OrderDetal