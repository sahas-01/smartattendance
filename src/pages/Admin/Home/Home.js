import React, { useCallback, useEffect, useState } from "react";
// import './styles/Browse.css'
// import LoadingScreen from '../components/LoadingScreen/LoadingScreen'
import Toolbar from "../../../components/Toolbar/Toolbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Box from "@material-ui/core/Box";
import { useMediaQuery } from "react-responsive";
import Tables from "../../../components/Tables/Tables";
import AdminNav from "../../../components/AdminNav/AdminNav";
import axios from "axios";

function HomeAdmin() {
  const isMobile = useMediaQuery({ query: "(max-width: 760px)" });
  // const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState();

  const [studentData, setStudentData] = useState([]);

  const url = `${process.env.REACT_APP_BACKEND_URL}/api/viewstudents`;
  useEffect(() => {
    axios.get(url)
      .then(res => {
        setStudentData(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  console.log(studentData)

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((sidebarOpen) => !sidebarOpen);
  }, [setSidebarOpen]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        {!isMobile ? (
          <AdminNav
            isMobile={isMobile}
            open={!sidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        ) : (
          <AdminNav
            isMobile={isMobile}
            open={sidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        )}
        <Box className="browse_box">
          <Toolbar title="Home" toggleSidebar={toggleSidebar} />
        </Box>
      </Box>

      <div className="admin-homecontent" style={{ marginLeft: '20%' }}>
        <div class="flex flex-col pt-5">
          <div class="-my-2 overflow-x-hidden mx-5">
            <div class="py-2 align-middle inline-block min-w-full">
              <div class="shadow overflow-hidden border-b border-pur sm:rounded-lg">
                <table class="w-full divide-y divide-pur">
                  <thead class="bg-pur bg-black">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        Registration Number
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody class=" bg-transparent divide-y divide-gray-200">
                    {/* backend */}
                    {/* {data.map((item) => (
                      <Tables item={item} />
                    ))} */}
                    {studentData.map((item) => (
                      <Tables item={item} />
                    ))}
                    {/* <Tables />
                    <Tables />
                    <Tables />
                    <Tables />
                    <Tables /> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeAdmin;
