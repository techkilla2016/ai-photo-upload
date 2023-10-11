"use client"
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { FaHome } from 'react-icons/fa'
import { useCookies } from 'react-cookie';
import Loader from '@/components/Loader';
const Page = ({ params }) => {
    const [cookies] = useCookies(['auth'])
    const router = useRouter()
    const [isLoad, setIsLoad] = useState(true)
    useEffect(() => {
        if (!cookies?.auth) {
            router.push('/login')
        } else if (!params?.id) {
            router.push('/start')
        } else {
            setIsLoad(false)
        }
    }, [cookies])
    return (
        <div className="main">
            {
                isLoad ? <Loader /> : <Container>
                    <Row className='py-5 justify-content-center'>
                        <Col xxl={6} xl={6} lg={12} md={12} sm={12} xs={12}>
                            <img src="/assets/logo.png" alt="" />
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col xxl={10} xl={10} lg={12} md={12} sm={12} xs={12}>
                            <img src="/assets/thanks.png" alt="" />
                        </Col>
                    </Row>
                    <div className='py-5 d-flex justify-content-center'>
                        <div className="code">
                            {params.id}
                        </div>
                    </div>

                    <div className='d-flex justify-content-center'>
                        <p className='thanks'>
                            To access the picture in the drive
                        </p>
                    </div>

                    {/* <div className='d-flex justify-content-center py-4'>
                    <Link href='/' className='btn btn-success start-btn px-5'>Home</Link>
                </div> */}
                    <Link href='/' className="back-home">
                        <FaHome />
                    </Link>
                </Container>
            }
        </div>
    )
}

export default Page