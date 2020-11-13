import React from "react";
import { getUser, getNOKP, getToken, removeUserSession } from "../Utils/Common";

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

  return (
    <div>
      <Sidebar />
      <div className="relative md:ml-64 bg-blue-600" style={{ height: "100%" }}>
        <Navbar />
        {/* Header */}
        <div className="relative bg-blue-600 md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div className="flex flex-wrap">
              
            </div>
          </div>
        </div>
        <div className="px-4 md:px-10 mx-auto w-full m-24">
          
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
