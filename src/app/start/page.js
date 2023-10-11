"use client"
import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import data from '@/image-data'
import Capture from '@/components'
import Result from '@/components/Result'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/navigation'
const Home = () => {
    const [isUpload, setIsUpload] = useState(false)
    const [imgFile, setImgFile] = useState('')
    const [files, setFiles] = useState()
    const [select, setSelect] = useState()
    const [result, setResult] = useState('')
    const [isLoad, setIsLoad] = useState(true)
    const [cookies] = useCookies(['auth'])
    const router = useRouter()
    const domain = 'https://photo-ai-auth.vercel.app'
    useEffect(() => {
        const getVerify = async () => {
            try {
                const res = await axios.get(`${domain}/verify`, {
                    headers: {
                        auth: cookies?.auth
                    }
                })
            } catch (error) {
                router.push(`/login`);
                console.log(error)
            }
        }
        setTimeout(() => {
            if (!cookies?.auth) {
                router.push('/login')
            } else {
                getVerify()
                setIsLoad(false)
            }
        }, 1000)
    }, [cookies])

    // // select image from computer 
    // const changeFile = event => {
    //     const file = event.target.files[0]
    //     setFiles(file)
    // }

    // // upload Image file 
    // const uploadFile = () => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(files);
    //     reader.onload = function () {
    //         const base64String = reader.result;
    //         setImgFile(base64String);
    //     };
    // }

    // select Template 
    const handleStart = () => {
        if (imgFile) {
            setIsUpload(true)
        }
    }


    const handleSelect = (pyload) => {
        setSelect(pyload)
    }

    const handleEnhance = (encodedImage) => {
        setResult(`data:image/webp;base64,${encodedImage}`)
        setIsLoad(false)
    }

    const handleGenrate = async () => {
        setIsLoad(true)
        try {
            // console.log(imgFile)
            // axios.post('https://1a53-103-17-110-126.ngrok-free.app/rec', {
            axios.post('https://2964-103-17-110-97.ngrok-free.app/rec', {
                image: imgFile.split(',')[1],
                choice: select
            }).then(res => {
                handleEnhance(res.data?.result)
            })
        } catch (error) {
            console.log(error?.message)
            setIsLoad(false)
        }
    }

    return (
        !result ? <>
            {
                isLoad && <div className="isLoad">
                    <div className="spinner-border text-light" role="status">
                    </div>
                </div>
            }

            {
                isUpload ? <>
                    <div className='center_main py-5 '>
                        <h1 className='text-center py-4 text-primary'>Select Your Avatar</h1>
                        <Container className='px-0'>
                            <Row className='justify-content-center'>

                                {
                                    data?.map((arr, ind) => {
                                        return <Col className={`${ind % 2 === 1 && 'mt-5 pt-5'}`} key={ind}>
                                            {
                                                arr?.map((Item, keys) => {
                                                    return <div key={keys + ind} className={`genrate my-3 ${select === Item?.encode ? 'selectImg' : ''}`}>
                                                        <img src={Item?.img} alt="" onClick={() => handleSelect(Item?.encode)} />
                                                    </div>
                                                })
                                            }
                                        </Col>
                                    })
                                }

                            </Row>
                            <div className="d-flex py-5">
                                <button className='btn btn-success fs-2 start-btn' onClick={handleGenrate}>Generate Image</button>
                            </div>
                        </Container>
                    </div>
                </> : <>
                    <div className='center_main'>
                        <h1 className='text-center pt-4 font-weight-bold'>Click Your Picture</h1>
                        <Container className='px-5'>
                            <Row className='justify-content-center'>
                                <Col lg={7} className='my-4'>
                                    <div className="card-bord py-4 px-3">
                                        <div className="imgDemo">
                                            <Capture setImgFile={setImgFile} />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <div className="d-flex py-5">
                                <button className='btn btn-success fs-2 start-btn' onClick={handleStart} >Start Now</button>
                            </div>
                        </Container>
                    </div>
                </>
            }
        </> : <>
            <Result result={result} setResult={setResult} />
        </>
    )
}

export default Home