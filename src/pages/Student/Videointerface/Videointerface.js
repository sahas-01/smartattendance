import React, { useState, useEffect } from 'react';
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import VideoPlayer from '../../../components/VideoPlayer';
// import Options from '../../../components/Options';
// import Notifications from '../../../components/Notifications';
import VideoState from '../../../context/VideoState';
import Video from '../../../components/Video/Video';
import Options from '../../../components/options/Options'

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 100px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '600px',
        border: '2px solid black',

        [theme.breakpoints.down('xs')]: {
            width: '90%',
        },
    },
    image: {
        marginLeft: '15px',
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
}));

const Videointerface = () => {
    const classes = useStyles();
    useEffect(() => {
        if (!navigator.onLine) alert("Connect to internet!");
    }, [navigator]);

    useEffect(() => {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }, [])
    return (
        <div className={classes.wrapper}>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography variant="h2" align="center">Video Chat</Typography>
            </AppBar>
            <VideoState>
                <div className="App" style={{ height: "100%", width: "100%" }}>
                    <Video />
                    <Options />
                    {/* <Footer /> */}
                </div>
            </VideoState>
        </div>
    );
};

export default Videointerface;