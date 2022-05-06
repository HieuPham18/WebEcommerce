import React from 'react'
import '../stylesheets/grid.scss'
import '../stylesheets/base.scss'
import '../stylesheets/CheckOrder.scss'
import guaranteeImg from '../assets/images/guarantee/guarantee-services.png'

function GuaranteePage() {

    return (
        <div className="grid wide">
            <div className="row">
                <div className="col l-12 m-12 c-12">
                    <div className="guarantee">
                        <img src={guaranteeImg} alt="" className='image-guarantee'/>
                        <div className="guarantee-input">
                            <h1 className="guarantee-heading">Tra cứu bảo hành sản phẩm</h1>
                            <input type="text" placeholder="Nhập IMEI sản phẩm hoặc mã phiếu bảo hành cần tra cứu" className="guarantee-form" />
                            <button className="btn-search">
                                <i className="fa-solid fa-magnifying-glass icon-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GuaranteePage