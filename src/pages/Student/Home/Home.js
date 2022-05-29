import React, { useCallback, useEffect, useState } from "react";
// import './styles/Browse.css'
// import LoadingScreen from '../components/LoadingScreen/LoadingScreen'
import Toolbar from "../../../components/Toolbar/Toolbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Box from "@material-ui/core/Box";
import { useMediaQuery } from "react-responsive";
import "./Home.css";
import Classcard from "../../../components/Classcard";
import PieChart from "../../../components/PieChart";
import BarChart from "../../../components/BarChart";

function Home() {
  const isMobile = useMediaQuery({ query: "(max-width: 760px)" });
  // const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState();

  let loginURL = window.location.href;
  console.log(loginURL);
  let studentId = loginURL.split("/")[5];
  console.log(studentId);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((sidebarOpen) => !sidebarOpen);
  }, [setSidebarOpen]);

  // useEffect(() => {
  //     setTimeout(() => setLoading(false), 2000)
  // }, [])
  // if (loading) return <LoadingScreen />

  return (
    <>
      <Box sx={{ display: "flex" }}>
        {!isMobile ? (
          <Sidebar
            isMobile={isMobile}
            open={!sidebarOpen}
            toggleSidebar={toggleSidebar}
            id={studentId}
          />
        ) : (
          <Sidebar
            isMobile={isMobile}
            open={sidebarOpen}
            toggleSidebar={toggleSidebar}
            id={studentId}
          />
        )}
        <Box className="browse_box">
          <Toolbar title="Home" toggleSidebar={toggleSidebar} />
        </Box>
      </Box>

      <div className="content">
        <div className="grid lg:grid-cols-2 grid-cols-1 py-2">
          <div className="mx-auto justify-center items-center" style={{ marginLeft: '550px' }}>
            <div className="mx-auto justify-center items-center mt-2">
              <p className="text-white py-2 border-b-2 mb-2">Monthly Performance</p>
            </div>
            <PieChart />
          </div>
        </div>
        <div className="grid grid-cols-1 my-2">
          <div className="mx-auto">
            <p className="text-white py-2 border-b-2 mb-2">Attendance(in %)</p>
            <BarChart />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
