import React, { useState } from 'react'
import Webcam from 'react-webcam';
const Capture = ({ setImgFile }) => {

    const [cameraOn, setCameraOn] = useState(true);
    const [screenshot, setScreenshot] = useState(null);

    const handleCameraToggle = () => {
        setCameraOn(!cameraOn);
        setScreenshot(null)
    }

    const handleScreenshot = () => {
        const screenshot = webcamRef.current.getScreenshot();
        setImgFile(screenshot)
        setScreenshot(screenshot);
        setCameraOn(false);
    }

    const webcamRef = React.useRef(null);

    return (
        <div>
            <div className="capture">
                {cameraOn ? <Webcam ref={webcamRef} /> : screenshot ? <img src={screenshot} /> : ''}
            </div>
            <div className="d-flex pt-3">
                <button className='btn btn-warning start-btn' onClick={handleScreenshot}>Capture</button>
                <button className='btn btn-warning start-btn' onClick={handleCameraToggle}>Retake</button>
            </div>
        </div>
    )
}

export default Capture
