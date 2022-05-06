import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import Slider from "react-slick";
import { getData, getProductBySlug } from '../data/actionData'
import { addProductToCart } from "../redux/Cart/cart.action";
import numberWithCommas from "../utils/numberWithCommas";
import { dataContext } from "../context/DataContext";
import '../stylesheets/grid.scss'
import '../stylesheets/base.scss'
import '../stylesheets/ProductInfo.scss'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { Navigation, Thumbs } from "swiper"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../stylesheets/slide.scss'

function ProductInfoPage() {
    const { products } = useContext(dataContext)
    const [product, setProduct] = useState([])
    const [capacity, setCapacity] = useState("");
    const [color, setColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const { category } = useParams();
    const { slug } = useParams();
    const { cartItems } = useSelector(state => state.cartReducer)
    const readMoreElement = useRef()
    const aboutProductElement = useRef()
    const dispatch = useDispatch()
    const [slideThumb, setSlideThum] = useState()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    // search product by slug
    var productInfo = getProductBySlug(products, slug);


    const [imgDetal, setImgDetal] = useState('')
    const imageSilde = useRef()
    const imageUrl = useRef()

    if (imageSilde !== undefined && imageUrl !== undefined) {
        console.log("ref:", imageUrl.current)
        // imageUrl.current.children.map(item=>{
        //     item.onClick = () =>{
        //         imageSilde.current.src = item.src
        //     }
        // })
    }

    const [image, setImage] = useState('')

    useEffect(() => {
        // read more
        if (readMoreElement.current && aboutProductElement.current) {
            readMoreElement.current.onclick = function () {
                if (readMoreElement.current.innerText === 'Xem thêm') {
                    console.dir(aboutProductElement)
                    aboutProductElement.current.style.height = 'auto'
                    readMoreElement.current.innerText = 'Thu gọn'
                }
                else {
                    aboutProductElement.current.style.height = 620 + 'px'
                    readMoreElement.current.innerText = 'Xem thêm'
                }
            }

        }
    })

    useEffect(() => {
        setQuantity(1);
    }, [capacity, color])

    // Select version product
    const addToCart = (productItem) => {
        if (color !== "" && capacity !== "") {
            dispatch(addProductToCart(productItem));
        }
        else {
            toast.warning("Vui lòng chọn phiên bản")
            // <ToastContainer position="top-right" />
        }
    }

    //* Save cart at localStorage
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])


    //slide image info product
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <section>
            {
                // check list productinfo 
                products !== undefined && productInfo !== undefined && (
                    <div className="product-info">
                        <ToastContainer position="top-right" />
                        <div className="grid wide">
                            <div className="row">
                                <div className="col l-12 m-12 c-12">
                                    <h1 className="product-detal-name">
                                        {productInfo.name}
                                    </h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col l-4 m-12 c-12">
                                    <div className="slider-image-product-detal">
                                        <div className="image-product-detal-item" style={{ width: '100%' }}>
                                            {/* <Slider {...settings} >
                                                <div>
                                                    <img style={{ width: '100%'}} src = {productInfo.image.img01} />
                                                </div>
                                                <div>
                                                    <img style={{ width: '100%'}} src = {productInfo.image.img02} />
                                                </div>
                                                <div>
                                                    <img style={{ width: '100%'}} src = {productInfo.image.img03} />
                                                </div>
                                                <div>
                                                    <img style={{ width: '100%'}} src = {productInfo.image.img04} />
                                                </div>
                                            </Slider> */}
                                            <Swiper
                                                loop={true}
                                                spaceBetween={2}
                                                // slidesPerView={1}
                                                navigation={true}
                                                modules={[Navigation, Thumbs]}
                                                grabCursor={true}
                                                className="product-images-slider"
                                                thumbs={{ swiper: slideThumb }}
                                            >
                                                <SwiperSlide>
                                                    <img src={productInfo.image.img01} />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <img src={productInfo.image.img02} />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <img src={productInfo.image.img03} />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <img src={productInfo.image.img04} />
                                                </SwiperSlide>
                                            </Swiper>
                                            <div style={{ margin: 16 }}></div>
                                            <Swiper
                                                onSwiper={setSlideThum}
                                                loop={true}
                                                spaceBetween={8}
                                                slidesPerView={4}
                                                // navigation={true}
                                                modules={[Navigation, Thumbs]}
                                                // grabCursor={true}
                                                className="product-images-slider-thumbs"
                                            >
                                                <SwiperSlide>
                                                    <div className="product-images-slider-thumbs-wrapper">
                                                        <img style={{ width: "80%", }} src={productInfo.image.img01} />
                                                    </div>
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <div className="product-images-slider-thumbs-wrapper">
                                                        <img style={{ width: "80%" }} src={productInfo.image.img02} />
                                                    </div>
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <div className="product-images-slider-thumbs-wrapper">
                                                        <img style={{ width: "80%" }} src={productInfo.image.img03} />
                                                    </div>
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <div className="product-images-slider-thumbs-wrapper">
                                                        <img style={{ width: "80%" }} src={productInfo.image.img04} />
                                                    </div>
                                                </SwiperSlide>
                                            </Swiper>
                                        </div>
                                    </div>
                                </div>
                                <div className="col l-5 m-12 c-12">
                                    <div className="product-detal-infomation">
                                        <div className="product-detal-price">
                                            <h1 className="product-price">{numberWithCommas(productInfo.price)} đ</h1>
                                            <span className="product-detal-tax">Giá đã bao gồm 10% VAT</span>
                                        </div>
                                        <div className="free-ship">
                                            <i className="fa-solid fa-truck-fast icon-free-ship"></i> MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC
                                        </div>
                                        <div className="product-version">
                                            <h2 className="product-version-name">
                                                Lựa chọn phiên bản
                                            </h2>
                                            <div className="product-version-memory">
                                                {
                                                    productInfo.capacity.map(item => {
                                                        return (
                                                            <div className="product-version-item"
                                                                key={item}
                                                                onClick={() => setCapacity(item)}
                                                                style={item === capacity ? {
                                                                    color: '#00483d',
                                                                    outline: '2px solid #00483d'
                                                                } : {}}
                                                            >
                                                                <div className="memory-price">
                                                                    {/* <input type="radio" name="memory" id="memory1" /> */}
                                                                    <h2 className="memory-name">{item}</h2>
                                                                </div>
                                                                {/* <h3 className="product-memory-price">25,990,000 ₫</h3> */}
                                                            </div>

                                                        )
                                                    })
                                                }
                                            </div>
                                            {/* <h3 className="product-memory-price">30,990,000 ₫</h3> */}
                                            <h2 className="product-version-name">
                                                Lựa chọn màu sắc
                                            </h2>
                                            <div className="product-version-color">
                                                {
                                                    productInfo.colors.map((value, index) => {
                                                        return (
                                                            <div
                                                                className="product-version-item"
                                                                key={value}
                                                                onClick={() => setColor(value)}
                                                                style={color === value ?
                                                                    (color === 'red' ? { outline: '2px solid red' } : (color === 'black') ? { outline: '2px solid black' } : { outline: '2px solid blue' }) : {}}
                                                            >
                                                                <div className="color-price">
                                                                    {/* <input type="radio" name="color" id="" checked /> */}
                                                                    <h2 className="color-name">{value}</h2>
                                                                </div>
                                                            </div>
                                                        )

                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="quantity-info">
                                            <div className="quantity-info-item" onClick={() => {
                                                if (quantity > 1) {
                                                    setQuantity(quantity - 1)
                                                }
                                            }}
                                            >
                                                -
                                            </div>
                                            <div className="quantity-info-item">
                                                {quantity}
                                            </div>
                                            <div className="quantity-info-item" onClick={() => setQuantity(quantity + 1)}>
                                                +
                                            </div>
                                        </div>
                                        <div className="buy">
                                            <div className="buy-now">
                                                <Link to="/cart" className="btn-buy-now" onClick={() => addToCart({
                                                    productInfo,
                                                    color,
                                                    capacity,
                                                    quantity,
                                                }
                                                )}>
                                                    <strong>
                                                        MUA NGAY
                                                    </strong>
                                                    <span>
                                                        Giao tận nhà (COD) hoặc Nhận tại cửa hàng
                                                    </span>
                                                </Link>
                                                <button className="add-cart" onClick={() => addToCart({
                                                    productInfo,
                                                    color,
                                                    capacity,
                                                    quantity,
                                                }
                                                )}>
                                                    <i className="fa-solid fa-cart-plus icon-add-cart"></i>
                                                </button>
                                            </div>
                                        </div>
                                        {/* <!-- khuyen mai --> */}
                                        <div className="sales-promotion">
                                            <h2 className="sales-promotion-name">Chương trình khuyến mãi:</h2>
                                            <ul className="sales-promotion__list">
                                                <li className="sales-promotion__item">
                                                    <h6 className="sale-promotion-logo">KM1</h6>
                                                    <p className="sale-promotion-desc">Tặng phiếu mua hàng 4.000.000đ + Thanh toán qua
                                                        VNPAY giảm thêm 1.000.000đ (Chi tiết LH 1900.2091)</p>
                                                </li>
                                                <li className="sales-promotion__item">
                                                    <h6 className="sale-promotion-logo">KM2</h6>
                                                    <p className="sale-promotion-desc">

                                                        Dịch vụ phòng chờ hạng thương gia tại sân bay, Ưu đãi The Coffee Bean và
                                                        Galaxy Play
                                                    </p>
                                                </li>
                                                <li className="sales-promotion__item">
                                                    <h6 className="sale-promotion-logo">KM3</h6>
                                                    <p className="sale-promotion-desc">

                                                        Mua combo S22 Series cùng với Buds 2, R870, R880, R885 ưu đãi lên đến 50%
                                                        (Chi tiết mua combo LH 1900.2091)
                                                    </p>
                                                </li>
                                                <li className="sales-promotion__item">
                                                    <h6 className="sale-promotion-logo">KM4</h6>
                                                    <p className="sale-promotion-desc">

                                                        Best combo S22 Plus 8GB/128GB + Tai nghe Buds 2 + Samsung Galaxy Watch 4
                                                        ClassNameic 42mm LTE - (R885) chỉ với giá 26.590.000đ
                                                    </p>
                                                </li>
                                                <li className="sales-promotion__item">
                                                    <h6 className="sale-promotion-logo">KM5</h6>
                                                    <p className="sale-promotion-desc">

                                                        Ưu đãi giảm 30% gói Bảo hành mở rộng Samsung Care+ (12 tháng bảo vệ khi gặp
                                                        sự cố hư hỏng do rơi vỡ hoặc vào nước và 3 tháng gia hạn bảo hành chính
                                                        hãng)
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col l-3 m-12 c-12">
                                    <div className="configuration">
                                        <h2>
                                            Thông số kỹ thuật Samsung Galaxy S22 Plus - 8GB/256GB - Chính hãng
                                        </h2>
                                        <img src={productInfo.image.imgDetal} alt=""
                                            className="configuration-product-img" />
                                        <ul className="configuration__list">
                                            <li className="configuration__item">
                                                <span className="text-bold">
                                                    Công nghệ màn hình
                                                </span> : Dynamic AMOLED 2X, 10 - 120 Hz, Infinity O
                                            </li>
                                            <li className="configuration__item">
                                                <span className="text-bold">
                                                    Độ phân giải
                                                </span> Độ phân giải: 2340 x 1080, 12MP (UW) + 50MP (W) + 10MP (Tele), 10MP
                                            </li>
                                            <li className="configuration__item">
                                                <span className="text-bold">
                                                    Màn hình rộng
                                                </span> : 6.6"
                                            </li>
                                            <li className="configuration__item">
                                                <span className="text-bold">
                                                    Hệ điều hành
                                                </span> : Android 12
                                            </li>
                                            <li className="configuration__item">
                                                <span className="text-bold">
                                                    Chip xử lý (CPU)
                                                </span> : Snapdragon® 8 Gen 1 (4nm)
                                            </li>
                                            <li className="configuration__item">
                                                <span className="text-bold">
                                                    Bộ nhớ trong (ROM)
                                                </span> : 128GB
                                            </li>
                                            <li className="configuration__item">
                                                <span className="text-bold">
                                                    RAM
                                                </span> : 8GB
                                            </li>

                                            <li className="configuration__item">
                                                <span className="text-bold">
                                                    Mạng di động
                                                </span> : 5G
                                            </li>
                                            <li className="configuration__item">
                                                <span className="text-bold">
                                                    Số khe sim
                                                </span> : 1 nano SIM + 1 e-SIM
                                            </li>
                                            <li className="configuration__item">
                                                <span className="text-bold">
                                                    Dung lượng pin
                                                </span> : 4500 mAh, Công suất hỗ trợ: 45W, Sạc kèm máy: Không có
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col l-9 m-12 c-12">
                                    <div className="about-produc-detal" ref={aboutProductElement}>
                                        <h1 className="title-about-product-detal">
                                            Mua điện thoại di động Nokia C30 chính hãng giá tốt tại Hoàng Hà Mobile
                                        </h1>
                                        <div className="content-about-product-detal">
                                            <p className="about-product-detal-text">Nokia C30 là dòng smartphone giá rẻ của Nokia, rất
                                                được ưa chuộng tại thị trường hiện nay. Đây là dòng điện thoại giá rẻ sở hữu màn
                                                hình rộng, hiệu năng tốt, chụp ảnh chất lượng hay pin trâu và cực kỳ phù hợp với
                                                ngân sách
                                                của nhiều người dùng.</p>
                                            <img className="about-product-detal-img"
                                                src="https://lh6.googleusercontent.com/JRXfYiLlUCpikyH6qI5nnyFEODDLyHL9c-0FRNQfVjg2ObmyRZI46WsYg3MD-chMFr5Yo7qctWVcDoQUhGqCP5UGuKoc1oBmXOXOkRB_u27iUW4-e6C6h4CKwT22nVuOLaI8OzFP=s0"
                                                alt="" />
                                            <h3 className="about-product-detal-text">Thiết kế cứng cáp từ nhựa polycarbonate với màn
                                                hình LCD HD+</h3>
                                            <p className="about-product-detal-text">Nokia C30 sở hữu thiết kế không quá khác biệt so với
                                                thế hệ Nokia C20. Với các góc được bo tròn hoàn hảo cùng logo Nokia nổi bật phía
                                                viền dưới màn hình, Nokia C30 thực sự đã chinh phục được người dùng với thiết kế tao
                                                nhã và tinh tế. Cảm biến vân tay được đặt ở phía mặt lưng của máy giúp bạn mở khóa
                                                ngay lập tức, thao tác bằng một tay thuận tiện và nhanh chóng.</p>
                                            <p className="about-product-detal-text">Trọng lượng của máy khoảng 237g cho bạn cảm giác
                                                cứng cáp, hoàn toàn vừa vặn trong lòng bàn tay của bạn. Bên cạnh đó, Nokia C30 còn
                                                hoàn thiện với vỏ ngoài được làm từ chất liệu polycarbonate cao cấp đem đến sự chắc
                                                chắn,
                                                bền bỉ với khả năng chống chọi lại các va đập từ bên ngoài một cách hiệu quả.</p>
                                            <p className="about-product-detal-text">Về màn hình, Nokia C30 sở hữu kích thước 6.82 inch
                                                với tỷ lệ khung hình 20:9 giúp tối ưu hóa trải nghiệm của bạn từ học tập, làm việc
                                                đến xem phim, chơi game giải trí. Khả năng hiển thị của dòng máy này cũng được đánh
                                                giá
                                                tương đối ổn định, hài hòa dù sở hữu ấm nền IPS LCD hỗ trợ độ phân giải HD+ không
                                                quá cao.</p>
                                            <img className="about-product-detal-img"
                                                src="https://lh3.googleusercontent.com/3OLseGhAw5e9HhrMotO43EYlEpYrWSZ0v4IagUtCAmqzMaHsHpk0loTTjSSrHrqvR7cA2pGtnZGT_XSKF6cOLF4GEMLLpM6HLO85rGCNAd6WMbsGGWMJBfycfP8zJ5O0XIYT3gRQ=s0"
                                                alt="" />
                                            <h3 className="about-product-detal-text">Hiệu năng ổn định với con chip Spreadtrum SC9863A 8
                                                nhân
                                            </h3>
                                            <p className="about-product-detal-text">Nokia C30 sở hữu con chip Spreadtrum SC9863A 8 nhân.
                                                Tuy đây là con chip có hiệu năng không quá nổi bật nhưng với các tác vụ cơ bản như
                                                xem phim, lướt web, đọc báo,... hay một số tựa game giải trí nhẹ nhàng thì máy đều
                                                đáp ứng tốt, hoạt động trơn tru.
                                            </p >
                                            <img className="about-product-detal-img"
                                                src="https://lh6.googleusercontent.com/STZIKdzwPNWA6Smq53UGmrWR3EscO8XViB6enfYC3AKKZMY8t-ECnDrJa08x_cPL4tbWFhLMdtfya94RQAJvQ36m7JBfFVhe7O9Lhkx1dI2oSh-SqXxC-QUgN1D2ykttDZedgvgj=s0"
                                                alt="" />
                                            <p className="about-product-detal-text">Trọng lượng của máy khoảng 237g cho bạn cảm giác
                                                cứng cáp, hoàn toàn vừa vặn trong lòng bàn tay của bạn. Bên cạnh đó, Nokia C30 còn
                                                hoàn thiện với vỏ ngoài được làm từ chất liệu polycarbonate cao cấp đem đến sự chắc
                                                chắn,
                                                bền bỉ với khả năng chống chọi lại các va đập từ bên ngoài một cách hiệu quả.</p>
                                            <p className="about-product-detal-text">Về màn hình, Nokia C30 sở hữu kích thước 6.82 inch
                                                với tỷ lệ khung hình 20:9 giúp tối ưu hóa trải nghiệm của bạn từ học tập, làm việc
                                                đến xem phim, chơi game giải trí. Khả năng hiển thị của dòng máy này cũng được đánh
                                                giá
                                                tương đối ổn định, hài hòa dù sở hữu ấm nền IPS LCD hỗ trợ độ phân giải HD+ không
                                                quá cao.</p>
                                            <img className="about-product-detal-img"
                                                src="https://lh4.googleusercontent.com/SpWpzVRV5hSWEjw6i0Z7lczfuT10pqv2tG989tSoRjzJ7wMCS6aoCGv2TmwIBRySTwyhoyxV5oAZzOxSrkWDSkZf3DL5XkZQ_gNicb_tVHTxf5Nz0TbuOGsA87pquy5-xgU6eAom=s0"
                                                alt="" />
                                            <p className="about-product-detal-text">Nokia C30 sở hữu thiết kế không quá khác biệt so với
                                                thế hệ Nokia C20. Với các góc được bo tròn hoàn hảo cùng logo Nokia nổi bật phía
                                                viền dưới màn hình, Nokia C30 thực sự đã chinh phục được người dùng với thiết kế tao
                                                nhã và tinh tế. Cảm biến vân tay được đặt ở phía mặt lưng của máy giúp bạn mở khóa
                                                ngay lập tức, thao tác bằng một tay thuận tiện và nhanh chóng.</p>
                                            <p className="about-product-detal-text">Trọng lượng của máy khoảng 237g cho bạn cảm giác
                                                cứng cáp, hoàn toàn vừa vặn trong lòng bàn tay của bạn. Bên cạnh đó, Nokia C30 còn
                                                hoàn thiện với vỏ ngoài được làm từ chất liệu polycarbonate cao cấp đem đến sự chắc
                                                chắn,
                                                bền bỉ với khả năng chống chọi lại các va đập từ bên ngoài một cách hiệu quả.</p>
                                            <p className="about-product-detal-text">Về màn hình, Nokia C30 sở hữu kích thước 6.82 inch
                                                với tỷ lệ khung hình 20:9 giúp tối ưu hóa trải nghiệm của bạn từ học tập, làm việc
                                                đến xem phim, chơi game giải trí. Khả năng hiển thị của dòng máy này cũng được đánh
                                                giá
                                                tương đối ổn định, hài hòa dù sở hữu ấm nền IPS LCD hỗ trợ độ phân giải HD+ không
                                                quá cao.</p>
                                        </div>
                                    </div>
                                    <div className="read-more">
                                        <div className="read-more-link" id="viewMoreContent" ref={readMoreElement}>Xem thêm</div>
                                    </div>

                                </div>
                                <div className="col l-3 m-12 c-12">
                                    <div className="guarantee-information">
                                        <h2 className="guarantee-title">THÔNG TIN BẢO HÀNH</h2>
                                        <p className="guarantee-text">Bảo hành 12 tháng chính hãng, Bao xài đổi trả trong 15 ngày đầu.
                                        </p>
                                        <h4 className="guarantee-choose-place">CHỌN MÀU VÀ XEM ĐỊA CHỈ CÒN HÀNG</h4>
                                        <p className="city">
                                            <i className="fa-solid fa-location-dot"></i> Hà Nội
                                        </p>
                                        <ul className="city-place-list">
                                            <li className="city-place-item">
                                                <p>
                                                    <i className="fa-solid fa-caret-right"></i> 122 Thái Hà, Hà Nội
                                                </p>
                                                <Link to="" href="">Bản đồ đường đi</Link>
                                            </li>
                                            <li className="city-place-item">
                                                <p>
                                                    <i className="fa-solid fa-caret-right"></i> 122 Thái Hà, Hà Nội
                                                </p>
                                                <Link to="" href="">Bản đồ đường đi</Link>
                                            </li>
                                            <li className="city-place-item">
                                                <p>
                                                    <i className="fa-solid fa-caret-right"></i> 122 Thái Hà, Hà Nội
                                                </p>
                                                <Link to="" href="">Bản đồ đường đi</Link>
                                            </li>
                                            <li className="city-place-item">
                                                <p>
                                                    <i className="fa-solid fa-caret-right"></i> 122 Thái Hà, Hà Nội
                                                </p>
                                                <Link to="" href="">Bản đồ đường đi</Link>
                                            </li>
                                            <li className="city-place-item">
                                                <p>
                                                    <i className="fa-solid fa-caret-right"></i> 122 Thái Hà, Hà Nội
                                                </p>
                                                <Link to="" href="">Bản đồ đường đi</Link>
                                            </li>
                                            <li className="city-place-item">
                                                <p>
                                                    <i className="fa-solid fa-caret-right"></i> 122 Thái Hà, Hà Nội
                                                </p>
                                                <Link to="" href="">Bản đồ đường đi</Link>
                                            </li>
                                        </ul>
                                        <div className="suggest-phone">
                                            <Link to="" href="" className="suggest-phone-name">ĐTDĐ Nokia C30 TA-1359DS, 3/32VN, Xanh lục - TBH -
                                                503 Âu Cơ, Tân Phú, TPHCM - TBH</Link>
                                            <p className="suggest-phone-price">Giá chỉ từ: <span
                                            >2,740,000 ₫</span>
                                            </p>
                                            <p className="suggest-phone-save">Tiết kiệm: <span
                                            >-90,000 ₫</span></p>
                                            <p className="suggest-phone-guarantee">Bảo hành chính hãng đến ngày 08/02/2024. Bao xài đổi
                                                trả trong 15 ngày</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </section>
    )
}

export default ProductInfoPage;
