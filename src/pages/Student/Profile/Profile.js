import React, { useState, useEffect, useContext, useCallback } from "react";

import {
    Paper,
    Container,
    Button,
    Grid,
    makeStyles,
    TextField,
    Typography,
    Snackbar,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Toolbar from '../../../components/Toolbar/Toolbar'
import Sidebar from '../../../components/Sidebar/Sidebar'
import Box from '@material-ui/core/Box'
import { useMediaQuery } from 'react-responsive'
// import './Home.css'

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: "150px",
        height: "150px",
    },
    contPaper: {
        width: "85%",
        borderRadius: "20px",
        marginTop: "10px",
        paddingBottom: "40px",
        background: "rgba(17, 25, 40, 0.75)",
        backdropFilter: 'blur(16px) saturate(180%)',
        marginLeft: "auto",
    },
    input: {
        width: "100%",
        color: "#fff",
    },
}));

const Profile = () => {
    // const { studentProfile, setStudentDetails } = useContext(StudentContext);
    // const history = useHistory();
    const classes = useStyles();

    // const [error, setError] = useState(null);
    // const [studData, setStudData] = useState(studentProfile.student);

    // const [disabled, setDisabled] = useState(true);

    // const [profileSuccess, setProfileSuccess] = useState(false);

    // const [errorContact, setErrorContact] = useState(false);
    // const [errorReg, setErrorReg] = useState(false);

    // const handleProfileChange = (e) => {
    //     setStudData((prevState) => ({
    //         ...prevState,
    //         [e.target.name]: e.target.value,
    //     }));
    // };

    // const validate = () => {
    //     const regex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
    //     if (
    //         !studData.mobileNumber ||
    //         String(studData.mobileNumber).trim() === "" ||
    //         !regex.test(studData.mobileNumber)
    //     ) {
    //         console.log(
    //             !studData.mobileNumber,
    //             String(studData.mobileNumber).trim(),
    //             !regex.test(studData.mobileNumber)
    //         );
    //         setErrorContact(true);
    //         return false;
    //     } else {
    //         setErrorContact(false);
    //     }
    //     const regregex = /^[0-9]{2}[A-Za-z]{3}[0-9]{4}$/;
    //     if (
    //         !studData.registrationNumber ||
    //         studData.registrationNumber.trim() === "" ||
    //         !regregex.test(studData.registrationNumber)
    //     ) {
    //         setErrorReg(true);
    //         return false;
    //     } else {
    //         setErrorReg(false);
    //     }

    //     return true;
    // };

    // const updateProfile = async () => {
    //     if (validate()) {
    //         setDisabled(true);
    //         const token = localStorage.getItem("studentAuthToken");

    //         const res = await patchStudProfile(studData, token);

    //         if (res) {
    //             // getProfile(token);
    //             setProfileSuccess(true);
    //             const profile = await fetchStudentProfile(token);

    //             if (profile) {
    //                 setStudentDetails(profile);
    //             }
    //         }
    //         history.push("/student/dashboard");
    //         setDisabled(false);
    //     }
    // };

    // useEffect(() => {
    //     if (JSON.stringify(studData) === JSON.stringify(studentProfile.club)) {
    //         setDisabled(true);
    //     } else {
    //         setDisabled(false);
    //     }
    // }, [studData, studentProfile]);

    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // } else if (studData) {
    const isMobile = useMediaQuery({ query: '(max-width: 760px)' })
    // const [loading, setLoading] = useState(true)
    const [sidebarOpen, setSidebarOpen] = useState()

    const toggleSidebar = useCallback(() => {
        setSidebarOpen((sidebarOpen) => !sidebarOpen)
    }, [setSidebarOpen])
    return (
        <>

            <Box sx={{ display: 'flex' }}>
                {!isMobile ? <Sidebar
                    isMobile={isMobile}
                    open={!sidebarOpen}
                    toggleSidebar={toggleSidebar}
                />
                    :
                    <Sidebar
                        isMobile={isMobile}
                        open={sidebarOpen}
                        toggleSidebar={toggleSidebar}
                    />
                }
                <Box className='browse_box'>
                    <Toolbar title='Profile' toggleSidebar={toggleSidebar} />
                </Box>




            </Box>
            {/* <StudentNavbar location="Profile" /> */}
            <div className="cont-colour" style={{
                background: '#111927',
                backgroundImage: `radial-gradient(at 47% 33%, hsl(202.20, 90%, 15%) 0, transparent 59%), 
                    radial-gradient(at 82% 65%, hsl(218.00, 39%, 11%) 0, transparent 55%)` }}>
                {/* <form onSubmit={updateProfile}> */}
                <Container
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                        width: "100%",
                        marginTop: "-50px",

                    }}
                    className="profile-section-container"
                >
                    <Paper elevation={5} className={classes.contPaper}>
                        <Container>
                            <Grid container spacing={7}>
                                <Grid
                                    container
                                    style={{ marginTop: "40px" }}
                                    justify="center"
                                >
                                    <Typography
                                        gutterBottom
                                        variant="h4"
                                        style={{

                                            fontWeight: "600",
                                            color: "#fff",
                                        }}
                                    >
                                        User's Profile
                                    </Typography>
                                </Grid>
                                <Grid item container xs={12}>

                                    {/* <form style={{ width: "100%" }}> */}
                                    <Grid container spacing={4}>
                                        <Grid item xs={6}>
                                            <TextField
                                                name="name"
                                                className={classes.input}
                                                label="Name"
                                                variant="outlined"
                                                // value={studData.name}
                                                // onChange={
                                                //     handleProfileChange
                                                // }
                                                style={{
                                                    color: "#fff",
                                                }}
                                                disabled
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <TextField
                                                name="age"
                                                className={classes.input}
                                                label="Age"
                                                variant="outlined"
                                                // value={studData.branch}
                                                // onChange={
                                                //     handleProfileChange
                                                // }
                                                style={{ color: "fff" }}
                                                disabled
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <TextField
                                                
                                                name="dob"
                                                className={classes.input}
                                                label="Date of birth"
                                                color="#fff"
                                                variant="outlined"
                                                disabled
                                            // value={
                                            //     studData.mobileNumber
                                            // }
                                            // onChange={
                                            //     handleProfileChange
                                            // }
                                            // error={errorContact}
                                            // helperText={
                                            //     errorContact
                                            //         ? "Invalid number"
                                            //         : ""
                                            // }
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                name="username"
                                                className={classes.input}
                                                label="Username"
                                                variant="outlined"
                                                color="#fff"
                                                background="#fff"
                                                disabled
                                            // value={
                                            //     studData.registrationNumber
                                            // }
                                            // error={errorReg}
                                            // helperText={
                                            //     errorReg
                                            //         ? "Invalid Registration number"
                                            //         : ""
                                            // }
                                            // onChange={
                                            //     handleProfileChange
                                            // }
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                name="school"
                                                className={classes.input}
                                                label="School"
                                                color="#fff"
                                                variant="outlined"
                                                disabled
                                            // value={studData.bio}
                                            // onChange={
                                            //     handleProfileChange
                                            // }
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                name="contact"
                                                className={classes.input}
                                                label="Phone Number"
                                                color="#fff"
                                                variant="outlined"
                                                disabled
                                            // value={studData.bio}
                                            // onChange={
                                            //     handleProfileChange
                                            // }
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            // onClick={updateProfile}
                                            // disabled={disabled}
                                            >
                                                Save Changes
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    {/* </form> */}
                                </Grid>
                            </Grid>
                        </Container>
                    </Paper>
                </Container>
                {/* </form> */}
            </div>
        </>
    );
}
// };

export default Profile;