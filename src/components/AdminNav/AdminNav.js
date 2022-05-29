import React, { useState } from 'react'
import '../Sidebar/Sidebar.css'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import { Link } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material'
const drawerWidth = 275
function Sidebar({ isMobile, toggleSidebar, open }) {
    const [selectedIndex, setSelectedIndex] = useState(0)
    

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index)
    }


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
                <Link to='/admin/home' style={{ textDecoration: 'none' }}>
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
                <Link to='/admin/addclass' style={{ textDecoration: 'none' }}>
                    <ListItemButton
                        onClick={() => handleListItemClick}
                        selected={selectedIndex === 1}
                        key='addclass'
                    >
                        <ListItemIcon>
                            <SchoolIcon fontSize='medium' />
                        </ListItemIcon>
                        <ListItemText sx={{ fontSize: '2rem' }} primary='Add Class' />
                    </ListItemButton>
                </Link>
            </List>
        </Drawer >
    )
}

export default Sidebar