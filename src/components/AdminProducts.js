import React, { useContext, useEffect, useState } from "react"
import Select from 'react-select'
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { dataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom"
import Modal from "../components/Modal"
import numberWithCommas from "../utils/numberWithCommas"
import CottageIcon from '@mui/icons-material/Cottage';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import '../stylesheets/AdminProducts.scss'
import '../stylesheets/grid.scss'
import '../stylesheets/base.scss'

const apiProduct = 'https://webecommerceapi.herokuapp.com/products'
function AdminProducts({ searchProduct, title }) {
    const { products } = useContext(dataContext)

    const [outputs, setOutputs] = useState([])
    const [modal, setModal] = useState(false)
    const [productID, setProductID] = useState(null)
    const [editProduct, setEditProduct] = useState(false)
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



    return (
        <>
            <div className='admin-heading'>
                <div className='admin-heading-left'>
                    <CottageIcon sx={{ fontSize: 24, color: '#00483d' }} />
                    <h2>Admin</h2>
                    <ArrowRightIcon sx={{ fontSize: 16 }} />
                    <h2 style={{ textAlign: 'center', fontWeight: 600, color: 'green' }}>
                        {
                            title === 'products' ? "Thông tin sản phẩm" : ''
                        }

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
            {/* Component  */}
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
                        outputs !== undefined && outputs.filter(value => value.name.toLowerCase().includes(searchProduct)).map(product => (
                            <tr key={product.id}>
                                <td>
                                    <img className="product-img" src={product.image.imgAvt} alt="" />
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
            {/* </div> */}
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
            
            {/* // </div> */}
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
export default AdminProducts