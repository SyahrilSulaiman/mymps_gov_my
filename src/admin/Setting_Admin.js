import React from "react";
import { Link } from "react-router-dom";
import { getUser, getNOKP, getToken, removeUserSession } from "../Utils/Common";

import Sidebar from "../admin/Sidebar_Admin";
import Navbar from "../components/Navbars/AdminNavbar";
import Information from "../components/Cards/CardSettings2";
import Footer from "../components/Footers/Footer";

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
      <div className="relative md:ml-64 bg-blue-400" style={{ height: "100%" }}>
        <Navbar />
        {/* Header */}
        <div className="relative bg-blue-600 md:pt-32 pb-16 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>
              {/* Card stats */}
              <div className="flex flex-wrap">
                <Information  notel={sessionStorage.getItem('notel')}/>
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
