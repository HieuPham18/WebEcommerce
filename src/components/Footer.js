import { Link } from 'react-router-dom'
import '../stylesheets/grid.scss'
import '../stylesheets/base.scss'
import '../stylesheets/Footer.scss'
import logoMaster from '../assets/images/pay/logo-vnpay.png'
import logoAtm from '../assets/images/pay/logo-atm.png'
import logoJcb from '../assets/images/pay/logo-jcb.png'
import logoSamsung from '../assets/images/pay/logo-samsungpay.png'
import logoVisa from '../assets/images/pay/logo-visa.png'
import logoVn from '../assets/images/pay/logo-vnpay.png'
import logoNT from '../assets/images/ship/nhattin.jpg'
import logoVnPost from '../assets/images/ship/vnpost.jpg'
import logoBCT from '../assets/images/certifycate/logo-bct.png'


function Footer(){


    return(
        <footer className="footer">
        <div className="grid wide">
            <div className="row">
                <div className="col l-2 m-4 c-6 footer__content">
                    <h2 className="footer__heading">Hỗ trợ - Dịch vụ</h2>
                    <ul className="footer__list">
                        <li className="footer__item">
                            Mua hàng trả góp
                        </li>
                        <li className="footer__item">
                            Hướng dẫn đặt hàng và thanh toán
                        </li>
                        <li className="footer__item">
                            Chính sách bảo hành
                        </li>
                        <li className="footer__item">
                            Câu hỏi thường gặp
                        </li>
                        <li className="footer__item">
                            Tra cứu đơn hàng
                        </li>
                        <li className="footer__item">
                            Chính sách hủy giao dịch, đổi trả
                        </li>
                    </ul>
                </div>
                <div className="col l-2 m-4 c-6 footer__content">
                    <h2 className="footer__heading">Thông tin liên hệ</h2>
                    <ul className="footer__list">
                        <li className="footer__item">
                            Bán hàng Online
                        </li>
                        <li className="footer__item">
                            Chăm sóc Khách Hàng
                        </li>
                        <li className="footer__item">
                            Hỗ Trợ Kỹ thuật
                        </li>
                        <li className="footer__item">
                            Hỗ trợ Bảo hành & Sửa chữa
                        </li>
                        <li className="footer__item">
                            Liên hệ khối văn phòng
                        </li>
                    </ul>
                </div>
                <div className="col l-2 m-4 c-6 footer__content">
                    <h2 className="footer__heading">Hệ thống siêu thị</h2>
                    <Link to = "" href="" className="footer__list-market">Danh sách 93 siêu thị trên toàn quốc</Link>
                </div>
                <div className="col l-2 m-4 c-6 footer__content">
                    <h2 className="footer__heading">Tổng đài</h2>
                    <h4 className="footer__hotline">19006789</h4>
                </div>
                <div className="col l-2 m-4 c-6 footer__content">
                    <h2 className="footer__heading">Hình thức thanh toán</h2>
                    <div className="row sm-gutter">
                        <div className="col l-6 sm-gutter footer-pay__list">
                            <div className="footer-pay__item">
                                <img src={logoMaster} alt=""/>
                            </div>
                        </div>
                        <div className="col sm-gutter l-6">
                            <div className="footer-pay__item">
                                <img src={logoAtm} alt=""/>
                            </div>
                        </div>
                        <div className="col sm-gutter l-6">
                            <div className="footer-pay__item">
                                <img src={logoJcb} alt=""/>
                            </div>
                        </div>
                        <div className="col sm-gutter l-6">
                            <div className="footer-pay__item">
                                <img src={logoSamsung} alt=""/>
                            </div>
                        </div>
                        <div className="col sm-gutter l-6">
                            <div className="footer-pay__item">
                                <img src={logoVisa} alt=""/>
                            </div>
                        </div>
                        <div className="col sm-gutter l-6">
                            <div className="footer-pay__item">
                                <img src={logoVn} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col l-2 m-4 c-6 footer__content">
                    <h2 className="footer__heading">Phương thức vận chuyển</h2>
                    <div className="row sm-gutter">
                        <div className="col sm-gutter l-6">
                            <div className="footer-ship__item">
                                <img src={logoNT} alt=""/>
                            </div>
                        </div>
                        <div className="col sm-gutter l-6">
                            <div className="footer-ship__item">
                                <img src={logoVnPost} alt=""/>
                            </div>
                        </div>
                        <div className="col l-12">
                            <div className="footer-ship__item">
                                <img src={logoBCT} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row footer__place">
                <div className="col l-12 footer__info">
                    <p>© 2020. CÔNG TY CỔ PHẦN XÂY DỰNG VÀ ĐẦU TƯ THƯƠNG MẠI HOÀNG HÀ. MST: 0106713191. (Đăng ký lần
                        đầu: Ngày 15 tháng 12 năm 2014, Đăng ký thay đổi ngày 29/12/2020)</p>
                    <p>GP số 426/GP-TTĐT do sở TTTT Hà Nội cấp ngày 22/01/2021</p>
                    <p>Địa chỉ: 26 Phù Đổng Thiên Vương, P. Phạm Đình Hổ, Q. Hai Bà Trưng, Hà Nội. Điện thoại:
                        1900.2091. Chịu trách nhiệm nội dung: Phạm Văn Hiếu.</p>
                </div>
            </div>
        </div>
    </footer>
    )

}
export default Footer