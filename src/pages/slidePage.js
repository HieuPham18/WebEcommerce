import React, {useState} from "react";
import '../stylesheets/grid.scss'
import '../stylesheets/base.scss'
import '../stylesheets/slide.scss'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { Navigation, Thumbs } from "swiper"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


function SlidePage() {

    const [state, setState] = useState()

    return (
        <div className="grid wide">
            <div className="row">
                <div className="col l-4">
                    <div style={{ marginTop: 30 }}>
                        <div style={{ width: 370 }}>
                            <Swiper
                                loop={true}
                                spaceBetween={2}
                                // slidesPerView={1}
                                navigation={true}
                                modules={[Navigation, Thumbs]}
                                grabCursor={true}
                                className="product-images-slider"
                                thumbs={{swiper: state}}
                            >
                                <SwiperSlide>
                                    <img src="https://cdn.hoanghamobile.com/i/preview/Uploads/2021/05/04/10s-2.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    {/* <img src="https://cdn.hoanghamobile.com/i/preview/Uploads/2021/09/14/image-removebg-preview-9.png" /> */}
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://cdn.hoanghamobile.com/i/preview/Uploads/2021/05/04/10s-2.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://cdn.hoanghamobile.com/i/preview/Uploads/2021/05/04/10s.jpg" />
                                </SwiperSlide>
                            </Swiper>
                            <div style={{margin: 16}}></div>
                            <Swiper
                                onSwiper={setState}
                                loop={true}
                                spaceBetween={8}
                                slidesPerView={4}
                                // navigation={true}
                                modules={[Navigation, Thumbs]}
                                grabCursor={true}
                                className="product-images-slider-thumbs"
                            >
                                <SwiperSlide>
                                    <div className="product-images-slider-thumbs-wrapper">
                                        <img style={{ width: "100%", }} src="https://cdn.hoanghamobile.com/i/preview/Uploads/2021/05/04/10s-2.jpg" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="product-images-slider-thumbs-wrapper">
                                        <img style={{ width: "100%" }} src="https://cdn.hoanghamobile.com/i/preview/Uploads/2021/09/14/image-removebg-preview-9.png" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="product-images-slider-thumbs-wrapper">
                                        <img style={{ width: "100%" }} src="https://cdn.hoanghamobile.com/i/preview/Uploads/2021/05/04/10s-2.jpg" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="product-images-slider-thumbs-wrapper">
                                        <img style={{ width: "100%" }} src="https://cdn.hoanghamobile.com/i/preview/Uploads/2021/05/04/10s.jpg" />
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
                <div className="col l-5"></div>
                <div className="col l-3"></div>
            </div>
        </div>
    )

}

export default SlidePage