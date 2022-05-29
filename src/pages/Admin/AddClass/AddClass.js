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
import Toolbar from '../../../components/Toolbar/Toolbar'
import AdminNav from "../../../components/AdminNav/AdminNav";
import Box from '@material-ui/core/Box'
import { useMediaQuery } from 'react-responsive'
// import './Home.css'
import axios from 'axios'

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

const AddClass = () => {
    const classes = useStyles();
    const [className, setClassName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const isMobile = useMediaQuery({ query: '(max-width: 760px)' })
    // const [loading, setLoading] = useState(true)
    const [sidebarOpen, setSidebarOpen] = useState()

    const toggleSidebar = useCallback(() => {
        setSidebarOpen((sidebarOpen) => !sidebarOpen)
    }, [setSidebarOpen])





    async function addClass(event) {
        event.preventDefault()
        // console.log(name, age, userName, contact, password, registerNo);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/addclass`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                className,
                startTime,
                endTime,

            }),
        })

        const data = await response.json()
        console.log(data)

        // if (data.status === 'ok') {
        //     history.push(`/user/login/${data.id}`)
        // }
    }
    return (
        <>

            <Box sx={{ display: 'flex' }}>
                {!isMobile ? <AdminNav
                    isMobile={isMobile}
                    open={!sidebarOpen}
                    toggleSidebar={toggleSidebar}
                />
                    :
                    <AdminNav
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
                <form onSubmit={addClass}>
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
                                            Add Class
                                        </Typography>
                                    </Grid>
                                    <Grid item container xs={12}>

                                        {/* <form style={{ width: "100%" }}> */}
                                        <Grid container spacing={4}>


                                            <Grid item xs={6}>
                                                <TextField
                                                    name="class-name"
                                                    className={classes.input}
                                                    label="Class Name"
                                                    variant="outlined"
                                                    color="#fff"
                                                    background="#fff"

                                                    value={
                                                        className
                                                    }
                                                    onChange={(e) =>
                                                        setClassName(e.target.value)
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    name="start-time"
                                                    className={classes.input}
                                                    label="Start Time"
                                                    color="#fff"
                                                    variant="outlined"

                                                    value={startTime}
                                                    onChange={(e) =>
                                                        setStartTime(e.target.value)
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    name="end-time"
                                                    className={classes.input}
                                                    label="End Time"
                                                    color="#fff"
                                                    variant="outlined"

                                                    value={endTime}
                                                    onChange={(e) =>
                                                        setEndTime(e.target.value)
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"

                                                >
                                                    Submit
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        {/* </form> */}
                                    </Grid>
                                </Grid>
                            </Container>
                        </Paper>
                    </Container>
                </form>
            </div>
        </>
    );
}

export default AddClass;