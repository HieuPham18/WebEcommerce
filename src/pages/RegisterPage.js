import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import isEmpty from 'validator/es/lib/isEmpty';
import isEmail from 'validator/es/lib/isEmail';
import '../stylesheets/grid.scss'
import '../stylesheets/base.scss'
import '../stylesheets/Register.scss'
import { useUserAuth } from "../context/UserAuthContext"
import 'react-toastify/dist/ReactToastify.css';
import Header from "../components/Header";
import { cartConstant } from '../redux/Cart/cart.contant'



function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setpasswordConfirm] = useState('')
    const [error, setError] = useState('')
    const [messageErorr, setMessageError] = useState('')
    const navigate = useNavigate()

    const { signUp } = useUserAuth()

    const handleValidate = () => {
        const msg = {}
        if (isEmpty(email)) {
            msg.email = "Please enter input your email"
        }
        if (isEmpty(password)) {
            msg.password = "Please enter input your password"
        }
        if (isEmpty(passwordConfirm)) {
            msg.passwordConfirm = "Please enter input confirm password"
        } else if (password !== passwordConfirm) {
            msg.passwordConfirm = "Confirmation password is incorrect"
        }


        setMessageError(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    const handleOnsubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            const isValid = handleValidate()
            if (!isValid) return

            //Login
            await signUp(email, password)
            toast.success('Đăng kí thành công')
            setTimeout(() => navigate('/login'), 6000)

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div>
            {/* <Header /> */}
            <div className="register-page">

                <div className="grid wide">
                    <div className="row alginCenter">
                        <div className="col l-6 m-12 c-12">
                            <div className="image-register">
                            <lottie-player  src="https://assets1.lottiefiles.com/packages/lf20_sop8cbmc.json" background="transparent" speed="1" style={{ width: 600, height: 400 }} loop autoplay></lottie-player>

                            </div>
                        </div>
                        <div className="col l-6 m-12 c-12">
                            <div className='register-content'>
                                <div className="register-form">
                                    <h1 className="heading-register">Register</h1>
                                    <form onSubmit={handleOnsubmit} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: '80%' }}>
                                        {/* Email */}
                                        <label>Email: </label>
                                        <input className="inputEmail"
                                            type="email" value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="example@gmail.com" />
                                        <div className="validate">{messageErorr.email}</div>

                                        {/* Password */}
                                        <label>Password: </label>
                                        <input className="inputPassword"
                                            type="password" value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password... " />
                                        <div className="validate">{messageErorr.password}</div>

                                        {/* Confirm Password */}
                                        <label>Confirm Password: </label>
                                        <input className="inputConfirmPassword"
                                            type="password" value={passwordConfirm}
                                            onChange={(e) => setpasswordConfirm(e.target.value)}
                                            placeholder="Confirm password... " />
                                        <div className="validate">{messageErorr.passwordConfirm}</div>

                                        {/* Submit */}
                                        <button className="btn button-register" >Register</button>
                                    </form>
                                    {
                                        error && <span variant="danger" style={{ color: 'red' }}>{error}</span>
                                    }
                                    <Link to='/Login' className="link-register">Go to Login</Link>
                                    {/* <button className="btn button-register" onClick={() => toast.success("Thanh cong r")}>aaaa</button> */}
                                    <ToastContainer position="top-right" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default RegisterPage