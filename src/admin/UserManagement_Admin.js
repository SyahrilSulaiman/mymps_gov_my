import React from "react";
import { getUser, getNOKP, getToken, removeUserSession } from "../Utils/Common";
import { DataGrid } from "@material-ui/data-grid";

import Sidebar from "./Sidebar_Admin";
import Navbar from "../components/Navbars/AdminNavbar";
import Footer from "../components/Footers/Footer";

function Dashboard(props) {
  const token = getToken();
  const user = getUser();
  const nokp = getNOKP();

  const handleLogout = () => {
    removeUserSession();
    props.history.push("/login");
  };

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "firstName", headerName: "First name" },
    { field: "lastName", headerName: "Last name" },
    { field: "age", headerName: "Age", type: "number"},
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 40 },
    { id: 6, lastName: "Melisandre", firstName: "Hello", age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <div>
      <Sidebar />
      <div className="relative md:ml-64 bg-blue-600" style={{ height: "100%" }}>
        <Navbar />
        {/* Header */}
        <div className="relative bg-blue-600 md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div className="flex flex-wrap">
              Header
            </div>
            <div className="flex flex-wrap">
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  width="100%"
                  checkboxSelection
                  className="bg-white"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 md:px-10 mx-auto w-full m-24"></div>
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
