import React, { useContext, useEffect, useRef, useState } from "react"
import Select from 'react-select'
import { Link, useNavigate } from "react-router-dom"
import { confirmAlert } from 'react-confirm-alert'; // Import
import { useUserAuth } from "../context/UserAuthContext"
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Modal from "../components/Modal"
import fileDB from "../config/firebase"
import numberWithCommas from "../utils/numberWithCommas"
import '../stylesheets/grid.scss'
import '../stylesheets/AdminPage.scss'
import { dataContext } from "../context/DataContext";
import axios from "axios";
import { async } from "@firebase/util";
import CircleSharpIcon from '@mui/icons-material/CircleSharp';
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
import AddCircleIcon from '@mui/icons-material/AddCircle';



const apiProduct = 'https://webecommerceapi.herokuapp.com/products'
function AdminPage() {

    const { products } = useContext(dataContext)

    const [outputs, setOutputs] = useState([])
    const [modal, setModal] = useState(false)
    const [productID, setProductID] = useState(null)
    const [editProduct, setEditProduct] = useState(false)
    const [productCategory, setProductCategory] = useState()
    const [searchItem, setSearchItem] = useState('')
    const { user, logOut } = useUserAuth();
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        setOutputs(products)
    }, [products])


    //Open Modal
    const openModal = () => {
        setModal(true);
    };

    //Close Modal
    const closeModal = () => {
        setModal(false);
    };

    // Reset Product ID
    const resetID = () => {
        setProductID(null)
    }
    // Reset Product ID
    const resetEditProduct = () => {
        setEditProduct(false)
    }

    //load data
    const loadData = async () => {
        const respone = await axios.get(apiProduct)
        setOutputs(respone.data)
    }

    // Delete product
    const handleDelete = async (id, category) => {
        // Confirm from user
        confirmAlert({
            title: 'Bạn có muốn xóa sản phẩm này không?',
            message: 'Sản phẩm sẽ bị xóa khỏi cơ sở dữ liệu',
            buttons: [
                {
                    label: 'Đồng ý',
                    onClick: () => {
                        try {
                            //* Handle delete product
                            axios.delete(`${apiProduct}/${id}`)
                            alert("sucssess")
                            setTimeout(() => loadData(), 500)
                        } catch (error) {
                            //! Notify error
                            console.log(error.message)
                        }
                    }
                },
                {
                    label: 'Hủy bỏ',
                    onClick: () => navigate('/admin')
                }
            ]
        });

    }

    // Update product by ID
    const handleUpdate = async (id, category) => {
        openModal()
        setProductID(id)
        setEditProduct(true)
    }

    //Option filter product
    const options = [
        { value: 'all', label: 'Tất cả' },
        { value: 'phone', label: 'Điện thoại' },
        { value: 'laptop', label: 'Laptop' },
    ]

    // Handle when user select option
    const selectInput = (option) => {
        if (option.value === 'all') {
            if (outputs !== undefined && outputs !== '') {
                setOutputs(products)
            }
        } else if (option.value === 'laptop') {
            if (outputs !== undefined && outputs !== '') {
                const laptops = products.filter(item => item.category === 'lap-top')
                setOutputs(laptops)
            }
        }
        else if (option.value === 'phone') {
            if (outputs !== undefined && outputs !== '') {
                const phones = products.filter(item => item.category === 'dien-thoai-di-dong')
                setOutputs(phones)
            }
        }
    }

    //* Handle when user click logout
    const handleLogOut = async () => {
        try {
            await logOut();
            navigate("/login");
        } catch (error) { }
    }


    return (
        <>
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
                            <input placeholder='Tìm kiếm...' onChange={(e) => setSearchItem(e.target.value)} className='input-admin' />

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
                            {/* <p style={{ fontWeight: 600, marginRight: 8 }}>Lọc sản phẩm: </p> */}
                            <div>
                                {/* Filter */}
                                <Select style={{ display: 'block', width: 200, padding: 2 }} options={options} onChange={(value) => selectInput(value)} />
                            </div>
                        </div>
                    </div>
                    <div style={{ padding: '0px 12px', height: '84vh', overflow: 'auto', position: 'relative' }}>
                        <table className="table-product styled-table">
                            <thead>
                                <tr>
                                    <th>Ảnh sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Màu sắc</th>
                                    <th>Phân loại</th>
                                    <th>Tùy chọn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    //Search and render item by name, category
                                    outputs !== undefined && outputs.filter(value => value.name.toLowerCase().includes(searchItem)).map(product => (
                                        <tr key={product.id}>
                                            <td>
                                                <img className="product-img" src={product.image.imgAvt} />
                                            </td>
                                            <td style={{ textAlign: 'left', fontWeight: 600 }}>{product.name}</td>
                                            <td>{numberWithCommas(product.price)} đ</td>
                                            <td>{product.colors.toString()}</td>
                                            <td>{product.category}</td>
                                            <td>
                                                <div className="product-select-action">
                                                    <div className="product-action-update" onClick={() => handleUpdate(product.id, product.category)} >
                                                        <i className="fa-solid fa-pen"></i>
                                                    </div>
                                                    <div className="product-action-del" onClick={() => handleDelete(product.id, product.category)}>
                                                        <i className="fa-solid fa-trash"></i>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <div className='add-product' onClick={openModal}>
                            <AddCircleIcon color='warning' sx={{ fontSize: 60 }} />
                        </div>

                    </div>
                </div>
                {
                    modal && (
                        <Modal
                            loadData={loadData}
                            productID={productID}
                            editProduct={editProduct}
                            resetID={resetID}
                            resetEditProduct={resetEditProduct}
                            closeModal={closeModal}
                        />
                    )
                }
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