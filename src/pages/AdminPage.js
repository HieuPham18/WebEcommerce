import React, { useContext, useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { async } from "@firebase/util";
import { confirmAlert } from 'react-confirm-alert'; // Import
import { useUserAuth } from "../context/UserAuthContext"
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { dataContext } from "../context/DataContext";
import axios from "axios";

import Modal from "../components/Modal"
import AdminProducts from "../components/AdminProducts";

import AppsIcon from '@mui/icons-material/Apps';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import '../stylesheets/grid.scss'
import '../stylesheets/base.scss'
import '../stylesheets/test.scss'
import AdminUpdate from "../components/AdminUpdate";


const apiProduct = 'https://webecommerceapi.herokuapp.com/products'

function AdminPage() {
    const [searchItem, setSearchItem] = useState('')
    // const [title, setTitle] = useState('')
    const title = ''
    const { slugAdmin } = useParams()
    console.log('slug', slugAdmin)

    // if (slugAdmin === 'product') {
    //     title = 'Thông tin sản phẩm'
    // } else if (slugAdmin === 'dashboad') {
    //     title = 'Thông tin chung'
    // } else if (slugAdmin === 'orders') {
    //     title = 'Thông tin đơn hàng'
    // } else if (slugAdmin === 'customer') {
    //     title = 'Thông tin khách hàng'
    // } else if (slugAdmin === 'setting') {
    //     title = 'Cài đặt'
    // }

    //* Handle when user click logout
    // const handleLogOut = async () => {
    //     try {
    //         await logOut();
    //         navigate("/login");
    //     } catch (error) { }
    // }


    return (
        <>
            <div className='admin-test'>
                <div className='sub-menu-admin'>
                    <div style={{ width: '100%', textAlign: 'center', padding: '16px 0', fontSize: 24, color: 'white', fontWeight: 600 }}>
                        Admin
                    </div>
                    <div className="sub-menu-admin-list">
                        <Link to='/admin/dashboad' className="sub-menu-admin-item">
                            <div className="sub-menu-admin-icon">
                                <AppsIcon />
                            </div>
                            <div>
                                Dashboad
                            </div>
                        </Link>
                        <Link to="/admin/products" className="sub-menu-admin-item">
                            <div className="sub-menu-admin-icon">
                                <AssignmentLateIcon />
                            </div>
                            <div>
                                Products
                            </div>
                        </Link>
                        <Link to="/admin/orders" className="sub-menu-admin-item">
                            <div className="sub-menu-admin-icon">
                                <ShoppingCartIcon />
                            </div>
                            <div>
                                Orders
                            </div>
                        </Link>
                        <Link to="/admin/customers" className="sub-menu-admin-item">
                            <div className="sub-menu-admin-icon">
                                <GroupAddIcon />
                            </div>
                            <div>
                                Customers
                            </div>
                        </Link>
                        <Link to="/admin/setting" className="sub-menu-admin-item">
                            <div className="sub-menu-admin-icon">
                                <SettingsIcon />
                            </div>
                            <div>
                                Setting
                            </div>
                        </Link>
                        <div className="sub-menu-admin-item" onClick>
                            <div className="sub-menu-admin-icon">
                                <LogoutIcon />
                            </div>
                            <div>
                                Logout
                            </div>
                        </div>
                    </div>
                </div>
                <div className='content-admin' >
                    {/* Header */}
                    <div className='header-menu-admin'>
                        <div>
                            <AlignHorizontalLeftIcon sx={{ fontSize: 20 }} />
                        </div>
                        <div>
                            <input placeholder='Tìm kiếm...' onChange={(e) => setSearchItem(e.target.value)} className='input-admin' />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Badge badgeContent={2} color="error" sx={{ margin: '0 12px', cursor: 'pointer' }}>
                                <CircleNotificationsIcon color="secondary" sx={{ fontSize: 24, }} />
                            </Badge>
                            <Badge badgeContent={6} color="error" sx={{ margin: '0 12px', cursor: 'pointer' }}>
                                <ChatBubbleIcon color="success" sx={{ fontSize: 24 }} />
                            </Badge>
                            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <Avatar sx={{ margin: '0 6px' }} src="https://tophinhanh.com/wp-content/uploads/2021/12/anh-avatar-dep-cho-con-gai.jpg" />
                                <div style={{ display: 'flex', alignItems: 'center', fontSize: 14 }}>
                                    <p>hieu@gamil.com</p>
                                    <ArrowDropDownIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Component  */}
                    <div style={{ padding: '0px 12px', height: '91vh', overflow: 'auto', position: 'relative' }}>
                        {
                            slugAdmin && slugAdmin == 'products'
                                ? <AdminProducts searchProduct={searchItem} />
                                : <AdminUpdate title={title} />
                        }
                        {/* <AdminProducts searchProduct = {searchItem} /> */}
                    </div>
                </div>
            </div>

            {/* 
                    {
                user ? (
                ) : (
                    <div style={{margin: '0 auto', color: 'red', width: '100%', textAlign: 'center'}}>
                        <div style={{fontSize: 20, marginTop: 50, padding:'20px 0'}}>Vui lòng đăng nhập để vào trang Admin</div>
                        <Link to='/login' style={{ fontSize: 16, color: 'blue', marginTop: 20}}>
                            Click me!
                        </Link>
                    </div>
                )
            } */}
        </>
    )
}
export default AdminPage