import React from "react";
import { getUser, getNOKP, getToken, removeUserSession } from "./Utils/Common";
import Sidebar from "./Sidebar";
import Navbar from "./components/Navbars/AdminNavbar";
import Information from "./components/Cards/CardSettings";
import { Pane, Heading, Icon, ArrowLeftIcon } from "evergreen-ui";

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
        <div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16">
          <div className="flex flex-wrap">
            <Pane background="#2c3e50" className="p-3 xl:mx-4 xl:rounded-md" position="relative" width="100%">
              <Heading size={400} color="white"><Icon icon={ArrowLeftIcon} size={12} onClick={() => window.history.back()} /> Akaun / Kemaskini Profil</Heading>
            </Pane>
            <div className="w-full">
              <div className="flex-auto mt-6 px-3">
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
      </div>
    </div>
  );
}

export default Profile;
