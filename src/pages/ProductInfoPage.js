import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { getProductBySlug } from '../data/actionData'
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
    // const [product, setProduct] = useState([])
    // // const { category } = useParams();
    const { products } = useContext(dataContext)
    const [capacity, setCapacity] = useState("");
    const [color, setColor] = useState("");
    const [quantity, setQuantity] = useState(1);
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


    // const [imgDetal, setImgDetal] = useState('')
    // const [image, setImage] = useState('')

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


    useEffect(() => {
        // read more
        if (readMoreElement.current && aboutProductElement.current) {
            readMoreElement.current.onclick = function () {
                if (readMoreElement.current.innerText === 'Xem th??m') {
                    console.dir(aboutProductElement)
                    aboutProductElement.current.style.height = 'auto'
                    readMoreElement.current.innerText = 'Thu g???n'
                }
                else {
                    aboutProductElement.current.style.height = 620 + 'px'
                    readMoreElement.current.innerText = 'Xem th??m'
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
            toast.warning("Vui l??ng ch???n phi??n b???n")
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
                                            <h1 className="product-price">{numberWithCommas(productInfo.price)} ??</h1>
                                            <span className="product-detal-tax">Gi?? ???? bao g???m 10% VAT</span>
                                        </div>
                                        <div className="free-ship">
                                            <i className="fa-solid fa-truck-fast icon-free-ship"></i> MI???N PH?? V???N CHUY???N TO??N QU???C
                                        </div>
                                        <div className="product-version">
                                            <h2 className="product-version-name">
                                                L???a ch???n phi??n b???n
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
                                                                {/* <h3 className="product-memory-price">25,990,000 ???</h3> */}
                                                            </div>

                                                        )
                                                    })
                                                }
                                            </div>
                                            {/* <h3 className="product-memory-price">30,990,000 ???</h3> */}
                                            <h2 className="product-version-name">
                                                L???a ch???n m??u s???c
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
                                                        Giao t???n nh?? (COD) ho???c Nh???n t???i c???a h??ng
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
                                            <h2 className="sales-promotion-name">Ch????ng tr??nh khuy???n m??i:</h2>
                                            <ul className="sales-promotion__list">
                                                <li className="sales-promotion__item">
                                                    <h6 className="sale-promotion-logo">KM1</h6>
                                                    <p className="sale-promotion-desc">T???ng phi???u mua h??ng 4.000.000?? + Thanh to??n qua
                                                        VNPAY gi???m th??m 1.000.000?? (Chi ti???t LH 1900.2091)</p>
                                                </li>
                                                <li className="sales-promotion__item">
                                                    <h6 className="sale-promotion-logo">KM2</h6>
                                                    <p className="sale-promotion-desc">

                                                        D???ch v??? ph??ng ch??? h???ng th????ng gia t???i s??n bay, ??u ????i The Coffee Bean v??
                                                        Galaxy Play
                                                    </p>
                                                </li>
                                                <li className="sales-promotion__item">
                                                    <h6 className="sale-promotion-logo">KM3</h6>
                                                    <p className="sale-promotion-desc">

                                                        Mua combo S22 Series c??ng v???i Buds 2, R870, R880, R885 ??u ????i l??n ?????n 50%
                                                        (Chi ti???t mua combo LH 1900.2091)
                                                    </p>
                                                </li>
                                                <li className="sales-promotion__item">
                                                    <h6 className="sale-promotion-logo">KM4</h6>
                                                    <p className="sale-promotion-desc">

                                                        Best combo S22 Plus 8GB/128GB + Tai nghe Buds 2 + Samsung Galaxy Watch 4
                                                        ClassNameic 42mm LTE - (R885) ch??? v???i gi?? 26.590.000??
                                                    </p>
                                                </li>
                                                <li className="sales-promotion__item">
                                                    <h6 className="sale-promotion-logo">KM5</h6>
                                                    <p className="sale-promotion-desc">

                                                        ??u ????i gi???m 30% g??i B???o h??nh m??? r???ng Samsung Care+ (12 th??ng b???o v??? khi g???p
                                                        s??? c??? h?? h???ng do r??i v??? ho???c v??o n?????c v?? 3 th??ng gia h???n b???o h??nh ch??nh
                                                        h??ng)
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col l-3 m-12 c-12">
                                    <div className="configuration">
                                        <h2>
                                            Th??ng s??? k??? thu???t Samsung Galaxy S22 Plus - 8GB/256GB - Ch??nh h??ng
                                        </h2>
                                        <img src={productInfo.image.imgDetal} alt=""
                                            className="configuration-product-img" />
                                        <ul className="configuration__list">
                                            <li className="configuration__item">
                                                <span className="text-bold">
                                                    C??ng ngh??? m??n h??nh
                                                </span> : Dynamic AMOLED 2X, 10 - 120 Hz, Infinity O
                                            </li>
                                            <li className="configuration__item">
                                                <span className="text-bold">
                                                    ????? ph??n gi???i
                                                </span> ????? ph??n gi???i: 2340 x 1080, 12MP (UW) + 50MP (W) + 10MP (Tele), 10MP
                                            </li>
                                            <li className="configuration__item">
                                                <span className="text-bold">
                                                    M??n h??nh r???ng
                                                </span> : 6.6"
                                            </li>
                                            <li className="configuration__item">
                                                <span className="text-bold">
                                                    H??? ??i???u h??nh
                                                </span> : Android 12
                                            </li>
                                            <li className="configuration__item">
                                                <span className="text-bold">
                                                    Chip x??? l?? (CPU)
                                                </span> : Snapdragon?? 8 Gen 1 (4nm)
                                            </li>
                                            <li className="configuration__item">
                                                <span className="text-bold">
                                                    B??? nh??? trong (ROM)
                                                </span> : 128GB
                                            </li>
                                            <li className="configuration__item">
                                                <span className="text-bold">
                                                    RAM
                                                </span> : 8GB
                                            </li>

                                            <li className="configuration__item">
                                                <span className="text-bold">
                                                    M???ng di ?????ng
                                                </span> : 5G
                                            </li>
                                            <li className="configuration__item">
                                                <span className="text-bold">
                                                    S??? khe sim
                                                </span> : 1 nano SIM + 1 e-SIM
                                            </li>
                                            <li className="configuration__item">
                                                <span className="text-bold">
                                                    Dung l?????ng pin
                                                </span> : 4500 mAh, C??ng su???t h??? tr???: 45W, S???c k??m m??y: Kh??ng c??
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col l-9 m-12 c-12">
                                    <div className="about-produc-detal" ref={aboutProductElement}>
                                        <h1 className="title-about-product-detal">
                                            Mua ??i???n tho???i di ?????ng Nokia C30 ch??nh h??ng gi?? t???t t???i Ho??ng H?? Mobile
                                        </h1>
                                        <div className="content-about-product-detal">
                                            <p className="about-product-detal-text">Nokia C30 l?? d??ng smartphone gi?? r??? c???a Nokia, r???t
                                                ???????c ??a chu???ng t???i th??? tr?????ng hi???n nay. ????y l?? d??ng ??i???n tho???i gi?? r??? s??? h???u m??n
                                                h??nh r???ng, hi???u n??ng t???t, ch???p ???nh ch???t l?????ng hay pin tr??u v?? c???c k??? ph?? h???p v???i
                                                ng??n s??ch
                                                c???a nhi???u ng?????i d??ng.</p>
                                            <img className="about-product-detal-img"
                                                src="https://lh6.googleusercontent.com/JRXfYiLlUCpikyH6qI5nnyFEODDLyHL9c-0FRNQfVjg2ObmyRZI46WsYg3MD-chMFr5Yo7qctWVcDoQUhGqCP5UGuKoc1oBmXOXOkRB_u27iUW4-e6C6h4CKwT22nVuOLaI8OzFP=s0"
                                                alt="" />
                                            <h3 className="about-product-detal-text">Thi???t k??? c???ng c??p t??? nh???a polycarbonate v???i m??n
                                                h??nh LCD HD+</h3>
                                            <p className="about-product-detal-text">Nokia C30 s??? h???u thi???t k??? kh??ng qu?? kh??c bi???t so v???i
                                                th??? h??? Nokia C20. V???i c??c g??c ???????c bo tr??n ho??n h???o c??ng logo Nokia n???i b???t ph??a
                                                vi???n d?????i m??n h??nh, Nokia C30 th???c s??? ???? chinh ph???c ???????c ng?????i d??ng v???i thi???t k??? tao
                                                nh?? v?? tinh t???. C???m bi???n v??n tay ???????c ?????t ??? ph??a m???t l??ng c???a m??y gi??p b???n m??? kh??a
                                                ngay l???p t???c, thao t??c b???ng m???t tay thu???n ti???n v?? nhanh ch??ng.</p>
                                            <p className="about-product-detal-text">Tr???ng l?????ng c???a m??y kho???ng 237g cho b???n c???m gi??c
                                                c???ng c??p, ho??n to??n v???a v???n trong l??ng b??n tay c???a b???n. B??n c???nh ????, Nokia C30 c??n
                                                ho??n thi???n v???i v??? ngo??i ???????c l??m t??? ch???t li???u polycarbonate cao c???p ??em ?????n s??? ch???c
                                                ch???n,
                                                b???n b??? v???i kh??? n??ng ch???ng ch???i l???i c??c va ?????p t??? b??n ngo??i m???t c??ch hi???u qu???.</p>
                                            <p className="about-product-detal-text">V??? m??n h??nh, Nokia C30 s??? h???u k??ch th?????c 6.82 inch
                                                v???i t??? l??? khung h??nh 20:9 gi??p t???i ??u h??a tr???i nghi???m c???a b???n t??? h???c t???p, l??m vi???c
                                                ?????n xem phim, ch??i game gi???i tr??. Kh??? n??ng hi???n th??? c???a d??ng m??y n??y c??ng ???????c ????nh
                                                gi??
                                                t????ng ?????i ???n ?????nh, h??i h??a d?? s??? h???u ???m n???n IPS LCD h??? tr??? ????? ph??n gi???i HD+ kh??ng
                                                qu?? cao.</p>
                                            <img className="about-product-detal-img"
                                                src="https://lh3.googleusercontent.com/3OLseGhAw5e9HhrMotO43EYlEpYrWSZ0v4IagUtCAmqzMaHsHpk0loTTjSSrHrqvR7cA2pGtnZGT_XSKF6cOLF4GEMLLpM6HLO85rGCNAd6WMbsGGWMJBfycfP8zJ5O0XIYT3gRQ=s0"
                                                alt="" />
                                            <h3 className="about-product-detal-text">Hi???u n??ng ???n ?????nh v???i con chip Spreadtrum SC9863A 8
                                                nh??n
                                            </h3>
                                            <p className="about-product-detal-text">Nokia C30 s??? h???u con chip Spreadtrum SC9863A 8 nh??n.
                                                Tuy ????y l?? con chip c?? hi???u n??ng kh??ng qu?? n???i b???t nh??ng v???i c??c t??c v??? c?? b???n nh??
                                                xem phim, l?????t web, ?????c b??o,... hay m???t s??? t???a game gi???i tr?? nh??? nh??ng th?? m??y ?????u
                                                ????p ???ng t???t, ho???t ?????ng tr??n tru.
                                            </p >
                                            <img className="about-product-detal-img"
                                                src="https://lh6.googleusercontent.com/STZIKdzwPNWA6Smq53UGmrWR3EscO8XViB6enfYC3AKKZMY8t-ECnDrJa08x_cPL4tbWFhLMdtfya94RQAJvQ36m7JBfFVhe7O9Lhkx1dI2oSh-SqXxC-QUgN1D2ykttDZedgvgj=s0"
                                                alt="" />
                                            <p className="about-product-detal-text">Tr???ng l?????ng c???a m??y kho???ng 237g cho b???n c???m gi??c
                                                c???ng c??p, ho??n to??n v???a v???n trong l??ng b??n tay c???a b???n. B??n c???nh ????, Nokia C30 c??n
                                                ho??n thi???n v???i v??? ngo??i ???????c l??m t??? ch???t li???u polycarbonate cao c???p ??em ?????n s??? ch???c
                                                ch???n,
                                                b???n b??? v???i kh??? n??ng ch???ng ch???i l???i c??c va ?????p t??? b??n ngo??i m???t c??ch hi???u qu???.</p>
                                            <p className="about-product-detal-text">V??? m??n h??nh, Nokia C30 s??? h???u k??ch th?????c 6.82 inch
                                                v???i t??? l??? khung h??nh 20:9 gi??p t???i ??u h??a tr???i nghi???m c???a b???n t??? h???c t???p, l??m vi???c
                                                ?????n xem phim, ch??i game gi???i tr??. Kh??? n??ng hi???n th??? c???a d??ng m??y n??y c??ng ???????c ????nh
                                                gi??
                                                t????ng ?????i ???n ?????nh, h??i h??a d?? s??? h???u ???m n???n IPS LCD h??? tr??? ????? ph??n gi???i HD+ kh??ng
                                                qu?? cao.</p>
                                            <img className="about-product-detal-img"
                                                src="https://lh4.googleusercontent.com/SpWpzVRV5hSWEjw6i0Z7lczfuT10pqv2tG989tSoRjzJ7wMCS6aoCGv2TmwIBRySTwyhoyxV5oAZzOxSrkWDSkZf3DL5XkZQ_gNicb_tVHTxf5Nz0TbuOGsA87pquy5-xgU6eAom=s0"
                                                alt="" />
                                            <p className="about-product-detal-text">Nokia C30 s??? h???u thi???t k??? kh??ng qu?? kh??c bi???t so v???i
                                                th??? h??? Nokia C20. V???i c??c g??c ???????c bo tr??n ho??n h???o c??ng logo Nokia n???i b???t ph??a
                                                vi???n d?????i m??n h??nh, Nokia C30 th???c s??? ???? chinh ph???c ???????c ng?????i d??ng v???i thi???t k??? tao
                                                nh?? v?? tinh t???. C???m bi???n v??n tay ???????c ?????t ??? ph??a m???t l??ng c???a m??y gi??p b???n m??? kh??a
                                                ngay l???p t???c, thao t??c b???ng m???t tay thu???n ti???n v?? nhanh ch??ng.</p>
                                            <p className="about-product-detal-text">Tr???ng l?????ng c???a m??y kho???ng 237g cho b???n c???m gi??c
                                                c???ng c??p, ho??n to??n v???a v???n trong l??ng b??n tay c???a b???n. B??n c???nh ????, Nokia C30 c??n
                                                ho??n thi???n v???i v??? ngo??i ???????c l??m t??? ch???t li???u polycarbonate cao c???p ??em ?????n s??? ch???c
                                                ch???n,
                                                b???n b??? v???i kh??? n??ng ch???ng ch???i l???i c??c va ?????p t??? b??n ngo??i m???t c??ch hi???u qu???.</p>
                                            <p className="about-product-detal-text">V??? m??n h??nh, Nokia C30 s??? h???u k??ch th?????c 6.82 inch
                                                v???i t??? l??? khung h??nh 20:9 gi??p t???i ??u h??a tr???i nghi???m c???a b???n t??? h???c t???p, l??m vi???c
                                                ?????n xem phim, ch??i game gi???i tr??. Kh??? n??ng hi???n th??? c???a d??ng m??y n??y c??ng ???????c ????nh
                                                gi??
                                                t????ng ?????i ???n ?????nh, h??i h??a d?? s??? h???u ???m n???n IPS LCD h??? tr??? ????? ph??n gi???i HD+ kh??ng
                                                qu?? cao.</p>
                                        </div>
                                    </div>
                                    <div className="read-more">
                                        <div className="read-more-link" id="viewMoreContent" ref={readMoreElement}>Xem th??m</div>
                                    </div>

                                </div>
                                <div className="col l-3 m-12 c-12">
                                    <div className="guarantee-information">
                                        <h2 className="guarantee-title">TH??NG TIN B???O H??NH</h2>
                                        <p className="guarantee-text">B???o h??nh 12 th??ng ch??nh h??ng, Bao x??i ?????i tr??? trong 15 ng??y ?????u.
                                        </p>
                                        <h4 className="guarantee-choose-place">CH???N M??U V?? XEM ?????A CH??? C??N H??NG</h4>
                                        <p className="city">
                                            <i className="fa-solid fa-location-dot"></i> H?? N???i
                                        </p>
                                        <ul className="city-place-list">
                                            <li className="city-place-item">
                                                <p>
                                                    <i className="fa-solid fa-caret-right"></i> 122 Th??i H??, H?? N???i
                                                </p>
                                                <Link to="" href="">B???n ????? ???????ng ??i</Link>
                                            </li>
                                            <li className="city-place-item">
                                                <p>
                                                    <i className="fa-solid fa-caret-right"></i> 122 Th??i H??, H?? N???i
                                                </p>
                                                <Link to="" href="">B???n ????? ???????ng ??i</Link>
                                            </li>
                                            <li className="city-place-item">
                                                <p>
                                                    <i className="fa-solid fa-caret-right"></i> 122 Th??i H??, H?? N???i
                                                </p>
                                                <Link to="" href="">B???n ????? ???????ng ??i</Link>
                                            </li>
                                            <li className="city-place-item">
                                                <p>
                                                    <i className="fa-solid fa-caret-right"></i> 122 Th??i H??, H?? N???i
                                                </p>
                                                <Link to="" href="">B???n ????? ???????ng ??i</Link>
                                            </li>
                                            <li className="city-place-item">
                                                <p>
                                                    <i className="fa-solid fa-caret-right"></i> 122 Th??i H??, H?? N???i
                                                </p>
                                                <Link to="" href="">B???n ????? ???????ng ??i</Link>
                                            </li>
                                            <li className="city-place-item">
                                                <p>
                                                    <i className="fa-solid fa-caret-right"></i> 122 Th??i H??, H?? N???i
                                                </p>
                                                <Link to="" href="">B???n ????? ???????ng ??i</Link>
                                            </li>
                                        </ul>
                                        <div className="suggest-phone">
                                            <Link to="" href="" className="suggest-phone-name">??TD?? Nokia C30 TA-1359DS, 3/32VN, Xanh l???c - TBH -
                                                503 ??u C??, T??n Ph??, TPHCM - TBH</Link>
                                            <p className="suggest-phone-price">Gi?? ch??? t???: <span
                                            >2,740,000 ???</span>
                                            </p>
                                            <p className="suggest-phone-save">Ti???t ki???m: <span
                                            >-90,000 ???</span></p>
                                            <p className="suggest-phone-guarantee">B???o h??nh ch??nh h??ng ?????n ng??y 08/02/2024. Bao x??i ?????i
                                                tr??? trong 15 ng??y</p>
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
