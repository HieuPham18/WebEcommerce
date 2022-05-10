import React, {useContext } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { dataContext } from "../context/DataContext";
// import { getData } from "../data/actionData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../stylesheets/grid.scss'
import '../stylesheets/base.scss'
import '../stylesheets/SliderBanner.scss'


function SliderBanner() {
    const {imgSilde} = useContext(dataContext)
    
    // const [sliderbanners, setSliderBanners] = useState([])
    // const collection_slide_banner = 'banner_slide_sale'
    // useEffect(() => {
    //     getData(setSliderBanners, collection_slide_banner)
    // }, [])
    
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
                    imgSilde.map((sliderbanner, index) => {
                        return (
                            <div key={index} className="slider-item">
                                <Link to="" href="" className="slider-item-link">
                                    <img className="slider-item-img" src={sliderbanner.imgrURL} alt={sliderbanner.title} style={{maxWidth: 1200}}/>
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