import React, { useCallback, useEffect, useState } from 'react'
// import './styles/Browse.css'
// import LoadingScreen from '../components/LoadingScreen/LoadingScreen'
import Toolbar from '../../../components/Toolbar/Toolbar'
import Sidebar from '../../../components/Sidebar/Sidebar'
import Box from '@material-ui/core/Box'
import { useMediaQuery } from 'react-responsive'
import './Classes.css'
import Classcard from '../../../components/Classcard';
import axios from "axios"

function Classes() {
    const isMobile = useMediaQuery({ query: '(max-width: 760px)' })
    // const [loading, setLoading] = useState(true)
    const [sidebarOpen, setSidebarOpen] = useState()
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/viewclasses`;
    const [classData, setClassData] = useState([])
    const toggleSidebar = useCallback(() => {
        setSidebarOpen((sidebarOpen) => !sidebarOpen)
    }, [setSidebarOpen])

    // useEffect(() => {
    //     setTimeout(() => setLoading(false), 2000)
    // }, [])
    // if (loading) return <LoadingScreen />
    useEffect(() => {
        axios.get(url)
            .then(res => {
                console.log(res.data)
                setClassData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    console.log(classData)

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
                    <Toolbar title='Upcoming Classes' toggleSidebar={toggleSidebar} />
                </Box>


            </Box>

            <Box className="content">
                {
                    classData.map((classData, i) => {
                        return (
                            <Classcard
                                key={i}
                                title={classData.className}
                            />
                        )
                    })
                }
                {/* <Classcard title="English for Engineers" />
                <Classcard title="Operating Systems" />
                <Classcard title="Theory Of Computation" /> */}
            </Box>




        </>
    )
}


export default Classes;
