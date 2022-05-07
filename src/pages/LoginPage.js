import React, { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useUserAuth } from "../context/UserAuthContext"
import isEmpty from 'validator/es/lib/isEmpty';
import Header from "../components/Header";
import '../stylesheets/grid.scss'
import '../stylesheets/base.scss'
import '../stylesheets/LoginPage.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [messageErorr, setMessageError] = useState('')
    const { logIn } = useUserAuth()
    const location = useLocation()

    console.log('loca', location.pathname)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleValidate = () => {
        const msg = {}
        if (isEmpty(email)) {
            msg.email = "Please enter input your email"
        }
        if (isEmpty(password)) {
            msg.password = "Please enter input your password"
        }
        setMessageError(msg)
        if (Object.keys(msg) > 0) return false
        return true
    }

    const handleOnsubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            const isValid = handleValidate()
            if (!isValid) return
            //Login
            await logIn(email, password)
            toast.success("Đăng nhập thành công!!")
            setTimeout(() => {
                if(location.pathname === '/login'){
                    navigate("/")
                }
                else if(location.pathname === '/admin'){
                    navigate("/admin")
                }
            }, 1000);
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div>
            {/* <Header /> */}
            <div className="login-page">
                <div className="grid wide">
                    <div className="row alginCenter">
                        <div className="col l-6 m-12 c-12">
                            <div className="image-login" >
                                <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_sop8cbmc.json" background="transparent" speed="1" className='lootie-player' loop autoplay></lottie-player>
                            </div>
                        </div>
                        <div className="col l-6 m-12 c-12">
                            <div className="login-content">
                                <div className="login-form">
                                    <h1 className="heading-login">LOGIN</h1>
                                    {
                                        error && <span variant="danger" style={{ color: 'red' }}>{error}</span>
                                    }
                                    <form onSubmit={handleOnsubmit} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: '80%' }}>
                                        {/* Email */}
                                        <label>Email: </label>
                                        <input className="inputEmail" type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="example@gmail.com" />
                                        <div className="validate">{messageErorr.email}</div>

                                        {/* Password */}
                                        <label>Password: </label>
                                        <input
                                            className="inputPassword"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password... " />
                                        <div className="validate">{messageErorr.password}</div>

                                        <button className="btn button-login">Login</button>
                                    </form>
                                    <p style={{ marginTop: 20, fontSize: 12 }}>Don't have an account?
                                        <Link to='/register' className="link-register" style={{ textDecorationLine: 'underline', color: 'blue' }}> Sign up</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>

    )
}

export default LoginPage