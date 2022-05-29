import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Hidden,
    makeStyles,
    TextField,
    Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import './Signup.css';
import * as faceapi from 'face-api.js';


const useStyles = makeStyles((theme) => ({
    media: {
        height: 140,
    },
    paper: {
        position: "absolute",
        width: "400",
        backgroundColor: "#0D0D0D",
        border: "1px solid #1799E1",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
    root: {
        overflow: "hidden",
        backgroundColor: "#242B2E",
        boxShadow: "4px 4px 50px rgba(0, 0, 0, 0.05)",
        textAlign: "center",
        height: "auto",
        width: "70%",
        margin: "0 auto",
    },
    gridList: {
        width: 800,
        height: 450,
    },
    gridContainer: {
        height: "100%",
    },
    gridContainerBox: {
        width: "100%",
        margin: 0,
        padding: "2rem",
    },
    cardContent: {
        textAlign: "center",
        fontFamily: "Source Sans Pro",
        fontSize: "1rem",
    },
    gridItemContainer: {
        margin: "0 auto",
    },
}));

const Signup = () => {
    const classes = useStyles();
    const history = useHistory();
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);

    const [userName, setUserName] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [registerNo, setRegisterNo] = useState("");

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

    async function registerUser(event) {
        event.preventDefault()
        console.log(name, age, userName, contact, password, registerNo);
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                age,
                userName,
                contact,
                password,
                registerNo
            }),
        })

        const data = await response.json()

        if (data.status === 'ok') {
            history.push(`/user/login/${data.id}`)
        }
    }
    return (

        <>
            <div
                className="bg-image"
                style={{
                    backgroundSize: "cover",
                    height: "100vh",
                    width: "100%",
                    backgroundPosition: "top",
                    background: '#111927',
                    backgroundImage: `radial-gradient(at 47% 33%, hsl(202.20, 90%, 15%) 0, transparent 59%), 
                    radial-gradient(at 82% 65%, hsl(218.00, 39%, 11%) 0, transparent 55%)`,
                }}
            >



                <Grid
                    container
                    alignItems="center"
                    className={classes.gridContainer}
                    spacing={0}
                >
                    <Grid item container sm={12} md={7}>
                        <form onSubmit={registerUser}>
                            <Card className={classes.root} id="cardstuff">
                                <CardContent className={classes.cardContent}>
                                    <Grid
                                        container
                                        spacing={3}
                                        className={classes.gridContainerBox}
                                    >
                                        <Grid item xs={12}>
                                            <Typography
                                                gutterBottom
                                                variant="h4"
                                                component="h2"
                                                style={{
                                                    fontFamily: "Source Sans Pro",
                                                    fontWeight: "600",
                                                    color: "#fff",
                                                }}
                                            >
                                                Register With Us!
                                            </Typography>
                                        </Grid>
                                        <Grid item md={6} xs={12} >
                                            <TextField
                                                name="name"
                                                type="text"
                                                label="Name"
                                                variant="outlined"
                                                className="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12} >
                                            <TextField
                                                name="age"
                                                type="number"
                                                label="Age"
                                                variant="outlined"
                                                className="age"
                                                value={age}
                                                onChange={(e) => setAge(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                name="username"
                                                type="text"
                                                label="Username"
                                                variant="outlined"
                                                className="username"
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                name="password"
                                                type="password"
                                                label="Password"
                                                variant="outlined"
                                                className="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                name="regno"
                                                type="text"
                                                label="Register Number"
                                                variant="outlined"
                                                className="register-number"
                                                value={registerNo}
                                                onChange={(e) => setRegisterNo(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                name="contact"
                                                type="number"
                                                label="Phone Number"
                                                variant="outlined"
                                                className="contact"
                                                value={contact}
                                                onChange={(e) => setContact(e.target.value)}
                                            />
                                        </Grid>



                                        <Grid item
                                            xs={12}>
                                            <p style={
                                                { textAlign: "center" }
                                            }>


                                                Already have an account?{" "}
                                                <Link to="/user/login" >
                                                    <span style={
                                                        {
                                                            color: "#1799E1",
                                                            listStyle: "none",
                                                            textDecoration: "none",
                                                        }
                                                    }>
                                                        Sign In
                                                    </span>
                                                </Link>
                                            </p>
                                        </Grid>

                                        <Grid item xs={12}>

                                            <Button
                                                type="submit"
                                                variant="contained"
                                                style={{
                                                    textTransform: "capitalize",
                                                    border: "1px solid #1799E1",
                                                    backgroundColor: "#1799E1",
                                                    color: "white",
                                                    fontFamily: "Source Sans Pro",
                                                    height: "48px",
                                                    width: "188px",
                                                    borderRadius: "10px",
                                                    fontSize: "18px",
                                                    fontWeight: "600",
                                                    lineHeight: "150%",
                                                    outline: "none",
                                                }}

                                            >
                                                Register
                                            </Button>
                                        </Grid>
                                    </Grid>

                                    <br />
                                </CardContent>
                            </Card>
                        </form>
                    </Grid>
                    <Grid item container sm={12} md={5}>
                        <div style={{ textAlign: 'center', padding: '10px' }}>
                            {
                                captureVideo && modelsLoaded ?
                                    <button onClick={closeWebcam} style={{ marginLeft: '-140px', height: '570px', width: '500px', cursor: 'pointer', backdropFilter: 'blur(16px) saturate(180%)', backgroundColor: 'rgba(48, 48, 53, 0.75)', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
                                        Close Webcam
                                    </button>
                                    :
                                    <button onClick={startVideo} style={{ marginLeft: '-140px', height: '570px', width: '500px', cursor: 'pointer', backdropFilter: 'blur(16px) saturate(180%)', backgroundColor: 'rgba(48, 48, 53, 0.75)', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
                                        Register Your Face
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
                    </Grid>

                </Grid >
            </div>




        </>



    );
};

export default Signup;
