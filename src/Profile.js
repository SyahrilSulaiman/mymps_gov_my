import React from "react";
import { Link } from "react-router-dom";
import { getUser, getNOKP, getToken, removeUserSession } from "./Utils/Common";

import MainDashboard from "./views/admin/Dashboard";
import Sidebar from "./Sidebar";
import Navbar from "./components/Navbars/AdminNavbar";
import Information from "./components/Cards/CardSettings";
import Footer from "./components/Footers/Footer";

function Profile(props) {
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
      <div className="relative md:ml-64 bg-gray-400" style={{ height: "100vh" }}>
        <Navbar />
        {/* Header */}
        <div className="relative bg-gray-600 h-full md:pt-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>
              {/* Card stats */}
              <div className="flex flex-wrap">
                <Information  
                  nama={sessionStorage.getItem('username')}
                  nokp={sessionStorage.getItem('nokp')}
                  email={sessionStorage.getItem('email')}
                  notel={sessionStorage.getItem('notel')}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default Profile;
