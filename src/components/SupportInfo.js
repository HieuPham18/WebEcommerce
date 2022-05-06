import React, { useState, useEffect } from 'react'
import '../stylesheets/base.scss'
import '../stylesheets/grid.scss'
import "../stylesheets/SupportInfo.scss"
import logoNotify from '../assets/images/notifycation/sub-logo.png'

function SupportInfo() {

    return (
        <section className='support'>
            <div className='grid wide'>
                <div className='row procedure__list'>
                    <div className="col l-3 m-6 c-6">
                        <div className="procedure__item">
                            <i className="fa-solid fa-check-to-slot procedure-icon "></i>
                            <div className="procedure__item-text ">
                                <p>Sản phẩm</p>
                                <h2>CHÍNH HÃNG</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col l-3 m-6 c-6">
                        <div className="procedure__item">
                            <i className="fa-solid fa-dolly procedure-icon"></i>
                            <div className="procedure__item-text">
                                <p>Miễn phí vận chuyển</p>
                                <h2>TOÀN QUỐC</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col l-3 m-6 c-6">
                        <div className="procedure__item">
                            <i className="fa-solid fa-headset procedure-icon"></i>
                            <div className="procedure__item-text">
                                <p>Hotline hỗ trợ</p>
                                <h2>1900.2091</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col l-3 m-6 c-6">
                        <div className="procedure__item">
                            <i className="fa-solid fa-rotate procedure-icon"></i>
                            <div className="procedure__item-text">
                                <p>Thủ tục đổi trả</p>
                                <h2>DỄ DÀNG</h2>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Email form */}
                <div className="row register-notify-email">
                    <div className="col l-8 m-12 c-12">
                        <div className="row register-notify-email--left">
                            <div className="col l-4 m-6 c-12 register-email__img" >
                                <img src={logoNotify} className="logo-notify-img" alt="" />
                            </div>
                            <div className="col l-8 m-6 c-12 register-email__text align-center">
                                <h2 className="register-email__title">Đăng ký nhận tin</h2>
                                <p className="register-email__desc">Đăng ký để nhận những chương trình khuyến mại hot nhất
                                    của Hoàng Hà Mobile</p>
                            </div>
                        </div>
                    </div>
                    <div className="col l-4 m-12 c-12 register-email__input align-center">
                        <input type="email" className="register-email__from-input" placeholder="Nhập E-mail của bạn" name=""
                            id=""/>
                            <button type="submit" className="btn-sub-email">
                                <i className="fa-solid fa-plane-departure icon-sub-email"></i>
                            </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SupportInfo