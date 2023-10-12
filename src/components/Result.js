"use client"
import { v4 as uuid } from 'uuid';
import QRCode from 'qrcode.react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Modal } from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import { FaHome } from 'react-icons/fa'
import axios from 'axios';
const Result = ({ result, setResult }) => {
    const unique_id = uuid();
    const small_id = unique_id.slice(0, 5)
    const router = useRouter()
    const [qr, setQr] = useState('')

    const handleRedirect = () => {
        setTimeout(() => {
            router.push(`result/${small_id}`);
        }, 5000)
    }

    const handleUploadImage = async () => {
        try {
            const data = await axios.post('https://dis2023.com/aiphotobooth/upload.php', {
                img: result.split(',')[1]
            })
            setQr(data?.data?.url)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        handleUploadImage()
    }, [])
    const [showQr, setShowQr] = useState(false)
    const handleQrCode = async () => {
        if (qr) {
            setShowQr(true)
        } else {
            const isSave = await handleUploadImage()
            if (isSave) {
                setShowQr(true)
            }
        }
    }

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print</title>
                </head>
            <body>
                <div id="finalImag"> 
                    <img src=${result} style="width:100%; border-radius :10px"/> 
                </div>
            </body>
            </html>    
        `);
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
    };
    return (
        <div className='center_main py-5 '>
            <h1 className='text-center'>Here is Your Photograph</h1>
            <Container className=''>
                <Row className='justify-content-center align-items-center'>
                    <Col lg={9} md={12} sm={12} xs={12}>
                        <div className="finalImag" id='finalImag'>
                            <img src={result} alt="" />
                        </div>
                        <div className="d-flex justify-content-between flex-wrap  py-4" >
                            <div className='my-2'>
                                <button className='btn btn-warning wt-border start-btn' onClick={() => setResult('')}>Re-generate</button>
                            </div>
                            <div className='my-2'>
                                <button onClick={handleQrCode} className='btn wt-border btn-warning start-btn'>Generate QR</button>
                            </div>
                            <div className='my-2'>
                                <a href={result} download={`${small_id}`} target="_blank" rel="noopener noreferrer" className='btn wt-border btn-warning start-btn'>Save</a>
                            </div>
                            <div className='my-2'>
                                <button onClick={handlePrint} className='btn wt-border btn-warning start-btn' >print</button>
                            </div>
                        </div>
                    </Col>
                    <Modal
                        show={showQr}
                        onHide={() => { setShowQr(false) }}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Scan this QR to get image
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="d-flex justify-content-center">
                                <QRCode value={qr} size={200} />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className='btn btn-danger' onClick={() => setShowQr(false)}>Close</button>
                        </Modal.Footer>
                    </Modal>
                </Row>
            </Container>
            <Link href='/' className="back-home">
                <FaHome />
            </Link>
        </div>
    )
}

export default Result