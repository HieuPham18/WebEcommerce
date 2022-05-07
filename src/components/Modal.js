import { async } from '@firebase/util';
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import '../stylesheets/base.scss'
import '../stylesheets/grid.scss'
import '../stylesheets/Modal.scss'

const listColor = ["Xanh", "Trắng", "Đỏ", "Ghi"];
const listCapacity = ["32GB", "64GB", "128GB", "512GB"];
const apiProduct = 'https://webecommerceapi.herokuapp.com/products'
const initialFielaValue = {
    name: '',
    price: '',
    discount: '',
    categorySlug: '',
    slug: '',
    category: '',
    colors: [],
    capacity: [],
    image: {
        imgAvt: '',
        imgDetal: '',
    }
}

function Modal(props) {
    const [stateAProduct, setStateAProduct] = useState(initialFielaValue)
    const [selectCategory, setSelectedCategory] = useState('')
    const [selectColor, setSelectColor] = useState([])
    const [selectCapacity, setSelectCapacity] = useState([])
    let navigate = useNavigate();

    const { name, price, categorySlug, slug, category, discount, image: { imgAvt, imgDetal }, colors } = stateAProduct

    // Handle select catgory
    const handleSelectCategory = (e) => {
        setSelectedCategory(e.target.value)
        let selectCategory = e.target.value;
        setStateAProduct({ ...stateAProduct, category: selectCategory })
    }

    // Handle select option category
    const handleSelectCategorySlug = (e) => {
        console.log(e.target.value)
        let selectCategorySlug = e.target.value;
        setStateAProduct({ ...stateAProduct, categorySlug: selectCategorySlug })
    }

    // hanhder check color
    const handleCheckColor = (e) => {
        var updateCheck = [...selectColor]
        if (e.target.checked) {
            updateCheck = [...selectColor, e.target.value]
        } else {
            console.log(selectColor.indexOf(e.target.value))
            updateCheck.splice(selectColor.indexOf(e.target.value), 1);
        }
        setSelectColor(updateCheck)
        setStateAProduct({ ...stateAProduct, colors: [...updateCheck] })
    }

    // handle check capacity
    const handleCheckCapacity = (e) => {
        var updateCheck = [...selectCapacity]
        if (e.target.checked) {
            updateCheck = [...selectCapacity, e.target.value]
        } else {
            updateCheck.splice(selectCapacity.indexOf(e.target.value), 1);
        }
        setSelectCapacity(updateCheck)
        setStateAProduct({ ...stateAProduct, capacity: [...updateCheck] })
    }

    // Handle select option categorySlug
    const handleInputChange = (e) => {
        const { name, value } = e.target
        const images = { ...stateAProduct.image, [name]: value }
        const newObject = {
            ...stateAProduct,
            image: {
                imgAvt: images.imgAvt,
                imgDetal: images.imgDetal
            },
            [name]: value
        }
        // Delete Property Attributes redundancy
        const { imgAvt, imgDetal, ...rest } = newObject
        setStateAProduct(rest)
    }

    console.log("edit:", props.editProduct)
    console.log("id:", props.productID)

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (!name || !price || !categorySlug || !slug || !category || !discount || !imgAvt || !imgDetal || !colors) {
            toast.error("Vui lòng nhập đủ các trường dữ liệu.")
        } else {
            console.log("edit:", props.editProduct)
            if (props.editProduct) {
                await axios.put(`${apiProduct}/${props.productID}`, stateAProduct)
                toast.success("Sản phẩm đã được cập nhật!!")
                setTimeout(() => props.loadData(), 200)
                setTimeout(() => props.closeModal(), 800)
                props.resetID()
                props.resetEditProduct()
            } else {
                await axios.post(apiProduct, stateAProduct)
                toast.success("Sản phẩm đã được thêm vào CSDL!")
                setTimeout(() => props.loadData(), 500)

                setStateAProduct(initialFielaValue)
                setSelectColor([])
                setSelectCapacity([])
            }
            setStateAProduct(initialFielaValue)
            setSelectColor([])
            setSelectCapacity([])

        }
    }

    // * Get data by ID
    useEffect(() => {
        if (props.productID) {
            getDataID()
        }
    }, [])

    //* Get and Set product by ID
    const getDataID = async () => {
        const respone = await axios.get(`${apiProduct}/${props.productID}`)
        console.log(respone.data)
        setStateAProduct(respone.data)
    }

    const handeClose = () => {
        props.resetID()
        props.resetEditProduct()
        setStateAProduct(initialFielaValue)
        props.closeModal()
    }

    return (
        <div className="modal">
            <div className="wrap">
                <h3 className="form__title" style={{ fontSize: 28, padding: 12, textAlign: 'center', color: '#00483d' }}>
                    {props.productID ? "Cập nhật thông tin sản phẩm" : "Thêm mới sản phẩm"}
                </h3>
                <form className="form" onSubmit={handleOnSubmit}>
                    <div className='form-group--left'>
                        <label htmlFor="category" className="input-title">
                            Phân loại:<span style={{ color: 'red' }}>*</span>
                        </label>
                        <select
                            value={category}
                            onChange={handleSelectCategory}
                            style={{ padding: 8, backgroundColor: '#ddd', border: 'none', borderRadius: 4, fontSize: 16 }}
                        >
                            <option value=''>----Phân loại sản phẩm----</option>
                            <option value='dien-thoai-di-dong'>Điện thoại di động</option>
                            <option value='lap-top'>Laptop</option>
                        </select>

                        <label htmlFor="title" className="input-title">
                            Tên sản phẩm:<span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            name="name"
                            type="text"
                            placeholder="Nhập tên sản phẩm..."
                            value={name}
                            onChange={handleInputChange}
                            className="input"
                        />

                        <label htmlFor="slug" className="input-title">
                            Tên rút gọn:<span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            name="slug"
                            type="text"
                            value={slug}
                            onChange={handleInputChange}
                            placeholder="Tên rút gọn..."
                            className="input"
                        />

                        <label htmlFor="price" className="input-title">
                            Giá:<span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            name="price"
                            type="number"
                            value={price}
                            onChange={handleInputChange}
                            placeholder="Giá..."
                            className="input"
                        />

                        <label htmlFor="price" className="input-title">
                            Giảm giá:<span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            name="discount"
                            type="number"
                            value={discount}
                            onChange={handleInputChange}
                            placeholder="Giảm giá..."
                            className="input"
                        />

                    </div>
                    <div className='form-group--right'>

                        <label className="input-title">
                            Màu sắc:<span style={{ color: 'red' }}>*</span>
                        </label>
                        <div style={{ marginTop: 10, padding: '6px 0px' }}>
                            {
                                listColor.map((item, index) => (
                                    <span key={index} style={{ marginRight: 20 }}>
                                        <input value={item} type="checkbox" onChange={handleCheckColor} />
                                        <span style={{ fontSize: 16, marginLeft: 5 }}>{item}</span>
                                    </span>
                                ))
                            }

                        </div>

                        <label className="input-title">
                            Phiên bản:<span style={{ color: 'red' }}>*</span>
                        </label>
                        <div style={{ marginTop: 10, padding: '6px 0px' }}>
                            {
                                listCapacity.map((item, index) => (
                                    <span key={index} style={{ marginRight: 20 }}>
                                        <input value={item} type="checkbox" onChange={handleCheckCapacity} />
                                        <span style={{ fontSize: 16, marginLeft: 5 }}>{item}</span>
                                    </span>
                                ))
                            }
                        </div>

                        <label htmlFor="price" className="input-title">
                            Hãng sản xuất:<span style={{ color: 'red' }}>*</span>
                        </label>
                        {
                            category === 'dien-thoai-di-dong' ? (
                                <select value={categorySlug} onChange={handleSelectCategorySlug} style={{ padding: 8, backgroundColor: '#ddd', marginTop: 10 }}>
                                    <option>----Hãng sản xuất----</option>
                                    <option value='samsung'>SamSung</option>
                                    <option value='apple'>Apple</option>
                                    <option value='nokia'>Nokia</option>
                                    <option value='realme'>Realme</option>
                                    <option value='oppo'>Oppo</option>
                                    <option value='xiaomi'>Xiaomi</option>
                                </select>
                            ) : category === 'lap-top' ? (
                                <select value={categorySlug} onChange={handleSelectCategorySlug} style={{ padding: 8, backgroundColor: '#ddd', marginTop: 10 }}>
                                    <option>----Hãng sản xuất----</option>
                                    <option value='dell'>Dell</option>
                                    <option value='apple'>Apple</option>
                                    <option value='samsung'>SamSung</option>
                                    <option value='asus'>Asus</option>
                                    <option value='hp'>HP</option>
                                    <option value='msi'>MSI</option>
                                </select>
                            ) : (
                                <select style={{ padding: 8, backgroundColor: '#ddd', marginTop: 10 }}>
                                    <option>Chọn phân loại sản phẩm</option>
                                </select>
                            )
                        }

                        <label htmlFor="image" className="input-title">
                            Ảnh đại diện sản phẩm:<span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            name="imgAvt"
                            type="url"
                            placeholder="Đường dẫn hình ảnh.."
                            value={imgAvt}
                            onChange={handleInputChange}
                            className="input"
                        />

                        <label htmlFor="image" className="input-title">
                            Ảnh chi tiết sản phẩm:<span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            name="imgDetal"
                            type="url"
                            placeholder="Đường dẫn hình ảnh.."
                            value={imgDetal}
                            onChange={handleInputChange}
                            className="input"
                        />

                        <button className="button-add-product">
                            {props.productID ? "Cập nhật" : "Thêm mới"}
                        </button>
                    </div>

                </form>
                <p onClick={handeClose}
                    style={{ color: '#FF8C00', cursor: 'pointer', fontSize: 14, fontStyle: 'italic', textDecoration: 'underline' }}
                >
                    Quay lại
                </p>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
            />
        </div>
    )
}

export default Modal