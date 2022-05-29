import React, { useState } from 'react'
import './Sidebar.css'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import { Link } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import SettingsIcon from '@mui/icons-material/Settings'
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import HelpIcon from '@mui/icons-material/Help';
import HomeIcon from '@mui/icons-material/Home';
// import SidebarWallet from './SidebarWallet'
import { IconButton } from '@mui/material'
const drawerWidth = 275
function Sidebar({ isMobile, toggleSidebar, open, }, props) {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index)
    }
    let loginURL = window.location.href;
    console.log(loginURL);
    let studentId = loginURL.split("/")[5];
    console.log(studentId);


    return (
        <Drawer
            sx={{
                position: 'inherit',
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    transition: 'all 200ms',
                    width: open ? drawerWidth : 0,
                    boxSizing: 'border-box',
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.125)',
                    backdropFilter: 'blur(15px)',
                }
            }}
            variant='permanent'
            anchor='left'
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >

                <IconButton onClick={toggleSidebar}>
                    <CloseIcon
                        sx={{
                            color: 'white',
                            margin: '0'
                        }}
                        fontSize='medium'
                        color='white'
                    />
                </IconButton>
            </Toolbar>
            <Divider />
            <List
                classes='sidebar_list'
                sx={{
                    flex: 1,
                    '& .MuiTypography-root': {
                        color: 'white',
                        fontSize: '1.15rem',
                        fontFamily: 'Inter,sansSerif',
                        fontFamily: 'Poppins,sansSerif',
                        margin: '1rem',
                    },

                    '& .MuiListItemButton-root': {
                        margin: '0 10px',
                        '& .MuiSvgIcon-root': {
                            color: 'white'
                        },
                        '.MuiListItemButton-root.Mui-selected': {
                            backgroundColor: 'white'
                        },
                        '&:hover': {
                            backgroundColor: '#1799E1',
                            transition: '200ms ease-in-out',
                        },
                        borderRadius: '10px',
                        '& .MuiTypography-root': {
                            color: 'white'
                        }
                    }
                }
                }
            >
                <Link to='/user/home' style={{ textDecoration: 'none' }}>
                    <ListItemButton
                        onClick={() => handleListItemClick}
                        selected={selectedIndex === 0}
                        key='home'
                    >
                        <ListItemIcon>
                            <HomeIcon fontSize='medium' />
                        </ListItemIcon>
                        <ListItemText sx={{ fontSize: '2rem' }} primary='Home' />
                    </ListItemButton>
                </Link>
                <Link to='/user/classes' style={{ textDecoration: 'none' }}>
                    <ListItemButton
                        onClick={() => handleListItemClick}
                        selected={selectedIndex === 1}
                        key='upcomingclasses'
                    >
                        <ListItemIcon>
                            <SchoolIcon fontSize='medium' />
                        </ListItemIcon>
                        <ListItemText sx={{ fontSize: '2rem' }} primary='Upcoming Classes' />
                    </ListItemButton>
                </Link>
                <Link to='/user/profile/${studentId}' style={{ textDecoration: 'none' }}>
                    <ListItemButton
                        onClick={() => handleListItemClick}
                        selected={selectedIndex === 2}
                        key='profile'
                    >
                        <ListItemIcon>
                            <PersonIcon fontSize='medium' />
                        </ListItemIcon>
                        <ListItemText sx={{ fontSize: '2rem' }} primary='Profile' />
                    </ListItemButton>

                </Link>
                <ListItemButton
                    onClick={() => handleListItemClick}
                    selected={selectedIndex === 3}
                    key='help'
                >
                    <ListItemIcon>
                        <HelpIcon fontSize='medium' />
                    </ListItemIcon>
                    <ListItemText sx={{ fontSize: '2rem' }} primary='Help' />
                </ListItemButton>
            </List>
        </Drawer >
    )
}

export default Sidebar