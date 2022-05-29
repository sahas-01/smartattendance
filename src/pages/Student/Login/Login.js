import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import * as faceapi from 'face-api.js';

function LoginPage() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    let loginURL = window.location.href;
    console.log(loginURL);
    let studentId = loginURL.split("/")[5];
    console.log(studentId);
    async function loginUser(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName,
                password,
            }),
        })

        const data = await response.json()
        if (data.user) {
            localStorage.setItem('token', data.user)
            alert('Login successful')
            history.push(`/user/home/${studentId}`)
        } else {
            alert('Please check your username and password')
        }
    }

    const [modelsLoaded, setModelsLoaded] = React.useState(false);
    const [captureVideo, setCaptureVideo] = React.useState(false);

    const videoRef = React.useRef();
    const videoHeight = 480;
    const videoWidth = 640;
    const canvasRef = React.useRef();

    React.useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + '/models';

            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            ]).then(setModelsLoaded(true));
        }
        loadModels();
    }, []);

    const startVideo = () => {
        setCaptureVideo(true);
        navigator.mediaDevices
            .getUserMedia({ video: { width: 300 } })
            .then(stream => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch(err => {
                console.error("error:", err);
            });
    }

    const handleVideoOnPlay = () => {
        setInterval(async () => {
            if (canvasRef && canvasRef.current) {
                canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
                const displaySize = {
                    width: videoWidth,
                    height: videoHeight
                }

                faceapi.matchDimensions(canvasRef.current, displaySize);

                const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

                const resizedDetections = faceapi.resizeResults(detections, displaySize);

                canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
                canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
                canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
                canvasRef && canvasRef.current && faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
            }
        }, 100)
    }

    const closeWebcam = () => {
        videoRef.current.pause();
        videoRef.current.srcObject.getTracks()[0].stop();
        setCaptureVideo(false);
    }

    return (
        <>
            <div
                style={{
                    background: "#081220",
                    height: "100vh",
                    // width: "calc(100vw - 15px)",
                    overflow: "hidden",
                    backgroundPosition: "bottom",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    display: "flex",
                    alignItems: "center",
                    alignContent: "center",
                }}
            >
                Login
                <div class="login-box">
                    <h2>Login to Get Started</h2>
                    <form class="auth" onSubmit={loginUser}>
                        <div class="user-box">
                            <input type="text"
                                name=""
                                required={true}
                                placeholder="Username"
                                id="uid"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />

                        </div>
                        <div class="user-box">
                            <input type="password"
                                name=""
                                required={true}
                                placeholder="Password"
                                id="pass"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                        </div>

                        <br />

                        <input type="submit" value="Submit" id="auth" />
                    </form>
                </div>
            </div>
            <div style={{ textAlign: 'center', padding: '10px' }}>
                {
                    captureVideo && modelsLoaded ?
                        <button onClick={closeWebcam} style={{ cursor: 'pointer', backdropFilter: 'blur(16px) saturate(180%)', backgroundColor: 'rgba(48, 48, 53, 0.75)', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
                            Close Webcam
                        </button>
                        :
                        <button onClick={startVideo} style={{ cursor: 'pointer', backdropFilter: 'blur(16px) saturate(180%)', backgroundColor: 'rgba(48, 48, 53, 0.75)', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
                            Login by scanning face
                        </button>
                }
            </div>
            {
                captureVideo ?
                    modelsLoaded ?
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                                <video ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} style={{ borderRadius: '10px' }} />
                                <canvas ref={canvasRef} style={{ position: 'absolute' }} />
                            </div>
                        </div>
                        :
                        <div>loading...</div>
                    :
                    <>
                    </>
            }
        </>
    )
}

export default LoginPage;