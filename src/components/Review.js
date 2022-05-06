import React, { useContext } from 'react'
import { dataContext } from '../context/DataContext';
import Slider from 'react-slick/lib/slider'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../stylesheets/base.scss'
import '../stylesheets/grid.scss'
import "../stylesheets/Review.scss"


function Review() {
    // Get data
    const {posts} = useContext(dataContext)

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
    return (
        <section className='review'>
            <div className='grid wide'>
                <div className='row'>
                    <div className='col l-12 m-12 c-12'>
                        <h1 className="review-title">KHÁCH HÀNG</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col l-12 m-12 c-12'>
                        <div style={{borderRadius: 12, marginTop: 20}}>
                            <Slider {...settings}>
                                {
                                    posts !== undefined && posts.map((post, index) => (
                                        <div key={index}>
                                            <div className='post-reivew-item' style={{ display: 'flex', borderRadius: 12, marginRight: 4 }}>
                                                <div>
                                                    <img className='image-customer-review' src={post.imgAvt } />
                                                </div>
                                                <div className='customer-info'>
                                                    <h3 style={{ fontSize: 20, fontWeight: 700, paddingBottom: 12 }}>{post.customer}</h3>
                                                    <h5 style={{ fontSize: 16, fontWeight: 600, fontStyle: 'italic', color: '#009981' }}>{post.job}</h5>
                                                    <p style={{ fontSize: 14, fontWeight: 400, padding: "8px 0", textAlign: 'justify'}}>{post.note}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Review