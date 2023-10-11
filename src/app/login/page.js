"use client"
import React, { useEffect, useState } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { BiLockAlt } from 'react-icons/bi'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader'
const domain = 'https://photo-ai-auth.vercel.app'
const Login = () => {
    const router = useRouter()
    const [isLoader, setIsLoad] = useState(false)
    const [cookies, setCookies] = useCookies(['auth'])
    useEffect(() => {
        if (cookies?.auth) {
            router.push('/')
        }
    }, [])

    const formInit = {
        username: "",
        password: "",
    }

    const [data, setData] = useState(formInit)
    const handleChange = ({ target }) => {
        const { name, value } = target
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = async (evnet) => {
        setIsLoad(true)
        evnet.preventDefault()
        try {
            const res = await axios.post(`${domain}/login`, data)
            const { token } = res.data
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + (600 * 60 * 1000));
            setCookies('auth', token, { maxAge: expirationDate })
            router.push('/start')
        } catch (error) {
            console.log(error)
            setIsLoad(false)
        }
    }

    return (
        <div className="d-flex align-items-center justify-content-center login">
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-fields">
                        <label htmlFor="username">
                            <FaRegUser />
                        </label>
                        <input type="text" placeholder='Username' onChange={handleChange} name='username' id='username' value={data?.username} />
                    </div>
                    <div className="form-fields">
                        <label htmlFor="password">
                            <BiLockAlt />
                        </label>
                        <input type="password" placeholder='Password' onChange={handleChange} name='password' id='password' value={data?.password} />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className='btn btn-primary submit-btn'>Submit</button>
                    </div>
                </form>
            </div>

            {
                isLoader ? <Loader /> : ''
            }
        </div>
    )
}

export default Login    