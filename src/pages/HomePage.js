import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useUserAuth } from "../context/UserAuthContext";
import Hotproduct from "../components/Hotproduct";
import SupportInfo from '../components/SupportInfo'
import Laptop from "../components/Laptop";
import QuickSale from "../components/QuickSale";
import FlashSale from "../components/FlashSale";
import BannerHotSale from "../components/BannerHotSale"
import SliderBanner from "../components/SliderBanner";
import Review from "../components/Review";
import '../stylesheets/base.scss'
import '../stylesheets/grid.scss'
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../components/Loading";

const apiProducts = 'https://webecommerceapi.herokuapp.com/products'

function HomePage() {
    const { user, logOut } = useUserAuth();
    const [data, setData] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    //Get data
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const reponse = await axios.get(apiProducts)
        setData(reponse.data)
    }


    return (
        <div className="container">
            <div className="grid wide">
                {/* <Loading /> */}
                <SliderBanner />
                <FlashSale />
                <QuickSale />
                <Hotproduct />
                <BannerHotSale />
                <Laptop />
                <div className="col l-12 m-12 c-12">
                    <img src="https://cdn.hoanghamobile.com/i/home/Uploads/2022/04/06/phu-kien-01.jpg" style={{ marginTop: 30, width: "100%" }} />
                </div>
                <Review />
                <SupportInfo />
            </div>
        </div>
    )
}
export default HomePage;