import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { getData } from "../data/actionData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../stylesheets/grid.scss'
import '../stylesheets/base.scss'
import '../stylesheets/SliderBanner.scss'


function SliderBanner() {
    const [sliderbanners, setSliderBanners] = useState([])
    const collection_slide_banner = 'banner_slide_sale'

    useEffect(() => {
        getData(setSliderBanners, collection_slide_banner)
    }, [])

    // Get data from database
    // const getBannerSlideSale = async () => {
    //     try {
    //         const data = await ProductDataService.getAllProducts(collection_name)
    //         let temp = []
    //         data.forEach((doc) => {
    //             const obj = {
    //                 id: doc.id,
    //                 ...doc.data(),
    //             }
    //             temp.push(obj)
    //         });
    //         setSliderBanners(temp)
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };
    return (
        <section className="slider-banner" >
            <Slider {...settings}>
                {
                    sliderbanners.map((sliderbanner, index) => {
                        return (
                            <div key={index} className="slider-item">
                                <Link to="" href="" className="slider-item-link">
                                    <img className="slider-item-img" src={sliderbanner.imgBanner} alt={sliderbanner.title} style={{maxWidth: 1200}}/>
                                </Link>
                            </div>
                        )
                    })
                }
            </Slider>
        </section>

    )

}
export default SliderBanner;