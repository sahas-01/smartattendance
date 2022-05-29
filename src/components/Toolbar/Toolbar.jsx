import React, { useState } from 'react'
// import CustomButton from '../CustomButton/CustomButton'
import './Toolbar.css'
import { TextField, InputAdornment, IconButton, Button } from '@mui/material'
import { useMediaQuery } from 'react-responsive'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout';
function Toolbar({ title, toggleSidebar }) {
    const isMobile = useMediaQuery({ query: '(max-width: 760px)' })
    const [buttonOpen, setButtonOpen] = useState(false)

    return (
        <div className='toolbar'>
            <IconButton onClick={toggleSidebar}>
                <MenuIcon
                    sx={{
                        color: 'white',
                        margin: '10px 20px'
                    }}
                    fontSize='medium'
                />
            </IconButton>

            {/* {!isMobile && (
                <TextField
                    sx={{
                        flex: '1',
                        maxWidth: '300px',
                        margin: '0 30px',
                        '&:hover input': {
                            color: 'white'
                        },
                        '&:active input': {
                            color: 'white'
                        },
                        '&:hover .MuiInputAdornment-root': {
                            color: 'white'
                        },
                        '&:focus .MuiInputAdornment-root': {
                            color: 'white'
                        },
                        '& input': {
                            fontSize: '2rem',
                            padding: '8px'
                        },
                        '& .MuiSvgIcon-root': {
                            marginTop: '-16px'
                        },

                        '& .MuiFilledInput-root': {
                            backgroundColor: 'white',
                            borderRadius: '4px'
                        },
                        '&:hover .MuiFilledInput-root': {
                            borderBottomColor: 'white',
                            backgroundColor: 'rgba(0,0,0,0.37)'
                        },
                        '&:focus .MuiFilledInput-root': {
                            borderBottomColor: 'white',
                            backgroundColor: 'rgba(0,0,0,0.37)'
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment
                                sx={{
                                    marginTop: 0
                                }}
                                position='start'
                            >
                                <SearchIcon fontSize='large' />
                            </InputAdornment>
                        )
                    }}
                    variant='filled'
                    placeholder='Search'
                />
            )} */}
            <h1
                style={{
                    flex: 1,
                    textAlign: 'center',
                }}
            >
                {title}
            </h1>
            <LogoutIcon className="logout-btn-nav" style={{

                // backgroundColor: "#1799E1",
                color: "white",
                fontFamily: "Source Sans Pro",
                height: "40px",
                width: "50px",
                fontSize: "18px",
                fontWeight: "600",
                outline: "none",
                cursor: "pointer",
                marginRight: "2%",
            }} />
        </div>
    )
}

export default Toolbar