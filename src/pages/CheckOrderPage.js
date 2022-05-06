import React from "react";
import '../stylesheets/grid.scss'
import '../stylesheets/base.scss'
import '../stylesheets/CheckOrder.scss'


function CheckOrderPage() {

    return (
        <div className="grid wide">
            <div className="row">
                <div className="col l-12 m-12 c-12">
                    <div className="check-order">
                        <div className="check-order-input">
                            <h1 className="check-order-heading">Kiểm tra đơn hàng của bạn</h1>
                            <input type="text" placeholder="Vui lòng nhập mã vận đơn *" className="check-order-form" />
                                <button className="btn-search-check-order">
                                    Tra cứu
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CheckOrderPage