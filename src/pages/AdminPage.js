import React, { useState } from "react"
import { Link, useNavigate, useParams, useLocation } from "react-router-dom"// Import
import { useUserAuth } from "../context/UserAuthContext"
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
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
import AdminDashBoad from "../components/AdminDashboad";
import LoginPage from '../pages/LoginPage'


function AdminPage() {
    const [searchItem, setSearchItem] = useState('')
    const { user, logOut } = useUserAuth();
    const { slugAdmin } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    //* Handle when user click logout
    const handleLogOut = async () => {
        try {
            await logOut();
            navigate("/login");
        } catch (error) { }
    }

    console.log('user', user)

    return (
        <>
            {
                // user ? (
                <div className='admin-test'>
                    <div className='sub-menu-admin'>
                        <Link to='/admin' style={{ display: 'block', width: '100%', textAlign: 'center', padding: '16px 0', fontSize: 24, color: 'white', fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}>
                            AdminPage
                        </Link>
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
                            <div className="sub-menu-admin-item" onClick={handleLogOut}>
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
                                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative' }}>
                                    <Avatar sx={{ margin: '0 6px' }} src="https://tophinhanh.com/wp-content/uploads/2021/12/anh-avatar-dep-cho-con-gai.jpg" />
                                    <div style={{ display: 'flex', alignItems: 'center', fontSize: 14 }}>
                                        <p>{user && user.email}</p>
                                        <ArrowDropDownIcon />
                                        {/* <div style={{position: 'absolute', top: 40, left: 40, backgroundColor: "white"}}>
                                                    <ul style={{ listStyle: 'none' }}>
                                                        <li style={{ padding: '12px 8px' }}>Thông tin cá nhân</li>
                                                        <li style={{ padding: '12px 8px' }}>Đăng xuất</li>
                                                    </ul>
                                                </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Component  */}
                        <div style={{ padding: '0px 12px', height: '91vh', overflow: 'auto', position: 'relative' }}>
                            {
                                location && location.pathname === '/admin' ? <AdminDashBoad title='dashboad' />
                                    :
                                    slugAdmin && slugAdmin === 'products'
                                        ?
                                        <AdminProducts
                                            searchProduct={searchItem}
                                            title={slugAdmin}
                                        />
                                        :
                                        slugAdmin === 'dashboad'
                                            ? <AdminDashBoad title='dashboad' />
                                            : <AdminUpdate title={slugAdmin} />
                            }
                        </div>
                    </div>
                </div>
                // ) : setTimeout(()=><LoginPage />, 500)
            }
        </>
    )
}
export default AdminPage