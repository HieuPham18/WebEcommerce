import React from 'react'
import '../stylesheets/grid.scss'
import '../stylesheets/base.scss'
import '../stylesheets/test.scss'
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
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CottageIcon from '@mui/icons-material/Cottage';


export default function ResponsiveDrawer() {


    return (
        <div>
            <div className='admin-test'>
                <div className='sub-menu-admin'>
                    <div style={{ width: '100%', textAlign: 'center', padding: '16px 0', fontSize: 24, color: 'white', fontWeight: 600 }}>
                        Admin
                        {/* <img src="https://hoanghamobile.com/Content/web/img/logo-text.png" style={{ width: 180 }} /> */}
                    </div>
                    <div className="sub-menu-admin-list">
                        <div className="sub-menu-admin-item">
                            <div className="sub-menu-admin-icon">
                                <AppsIcon />
                            </div>
                            <div>
                                Dashboad
                            </div>
                        </div>
                        <div className="sub-menu-admin-item">
                            <div className="sub-menu-admin-icon">
                                <AssignmentLateIcon />
                            </div>
                            <div>
                                Products
                            </div>
                        </div>
                        <div className="sub-menu-admin-item">
                            <div className="sub-menu-admin-icon">
                                <ShoppingCartIcon />
                            </div>
                            <div>
                                Orders
                            </div>
                        </div>
                        <div className="sub-menu-admin-item">
                            <div className="sub-menu-admin-icon">
                                <GroupAddIcon />
                            </div>
                            <div>
                                Customers
                            </div>
                        </div>
                        <div className="sub-menu-admin-item">
                            <div className="sub-menu-admin-icon">
                                <SettingsIcon />
                            </div>
                            <div>
                                Setting
                            </div>
                        </div>
                        <div className="sub-menu-admin-item">
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
                    <div className='header-menu-admin'>
                        <div>
                            <AlignHorizontalLeftIcon sx={{ fontSize: 20 }} />
                        </div>
                        <div>
                            {/* <TextField label="Filled success" variant="filled" color="success" focused /> */}
                            <input placeholder='Nhập thông tin cần tìm kiếm...' className='input-admin' />

                            {/* <TextField label="Outlined secondary" color="secondary" focused /> */}
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
                    <div className='admin-heading'>
                        <div className='admin-heading-left'>
                            <CottageIcon sx={{ fontSize: 24 }} />
                            <h2>Admin</h2>
                            <ArrowRightIcon sx={{ fontSize: 16 }} />
                            <h2 style={{ textAlign: 'center', fontWeight: 600 }}>
                                Thông tin sản phẩm
                            </h2>
                        </div>
                        <div className='admin-heading-right'>
                            Loc san pham
                        </div>
                    </div>
                    {/* <div style={{ height: '90vh', overflow: 'auto', padding: 12, position: 'relative' }}>
                       
                        <div className='add-product'>
                            <AddCircleIcon color='warning' sx={{ fontSize: 60 }} />
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
