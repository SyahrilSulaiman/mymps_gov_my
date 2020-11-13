import React from "react";
import {Link} from "react-router-dom";
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
      <div className="relative md:ml-64 bg-gray-400" style={{height: "100%"}}>
        <Navbar />
        {/* Header */}
        <div className="relative bg-gray-600 md:pt-32 pb-16 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>

              {/* Card stats */}
              <div className="flex flex-wrap">
                
                {/* <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                      <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                          <h5 className="text-gray-500 uppercase font-bold text-xs">
                            Jumlah Bayaran
                          </h5>
                          <span className="font-semibold text-xl text-gray-800">
                            RM 1000.00
                          </span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                          <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                            <i className="far fa-chart-bar"></i>
                          </div>
                        </div>
                      </div>
                        <p className="text-sm text-gray-500 mt-4">
                        <span className="text-green-500 mr-2">
                          <i className="fas fa-arrow-up"></i> 3.48%
                        </span>
                        <span className="whitespace-no-wrap">
                          Since last month
                        </span>
                      </p>
                    </div>
                  </div>
                </div> */}

                {/* <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                      <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                          <h5 className="text-gray-500 uppercase font-bold text-xs">
                            Jumlah Tunggakan
                          </h5>
                          <span className="font-semibold text-xl text-gray-800">
                            RM 205.90
                          </span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                          <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500">
                            <i className="fas fa-chart-pie"></i>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-4">
                        <span className="text-red-500 mr-2">
                          <i className="fas fa-arrow-down"></i> 3.48%
                        </span>
                        <span className="whitespace-no-wrap">
                          Since last week
                        </span>
                      </p>
                    </div>
                  </div>
                </div> */}

                {/* <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                      <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                          <h5 className="text-gray-500 uppercase font-bold text-xs">
                            Diskaun
                          </h5>
                          <span className="font-semibold text-xl text-gray-800">
                            10%
                          </span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                          <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500">
                            <i className="fas fa-users"></i>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-4">
                        <span className="text-orange-500 mr-2">
                          <i className="fas fa-arrow-down"></i> 1.10%
                        </span>
                        <span className="whitespace-no-wrap">
                          Since yesterday
                        </span>
                      </p>
                    </div>
                  </div>
                </div> */}

              </div>

            </div>
          </div>
        </div>
        <div className="px-4 md:px-10 mx-auto w-full mt-16 mb-16">
          <div className="flex flex-wrap">
           
          </div>
          <div className="flex flex-wrap">
            <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <Information />
              </div>
            </div>
          </div>
          <footer className="block mb-2">
            <div className="container mx-auto px-4">
              <hr className="mb-6 border-b-1 border-gray-300" />
              <div className="flex flex-wrap items-center md:justify-between justify-center h-full">
                <div className="w-full md:w-6/12 px-4">
                  <div className="text-sm text-gray-600 font-semibold py-3">
                    Hak Cipta Terpelihara © {new Date().getFullYear()}{" "}
                    <a
                      href="https://www.creative-tim.com"
                      className="text-gray-600 hover:text-gray-800 text-sm font-semibold py-1"
                    >
                      Majlis Perbandaran Selayang
                    </a>
                  </div>
                </div>
                <div className="w-full md:w-6/12 px-4">
                  <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                    <li>
                      <a
                        href=""
                        className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                      >
                        Majlis Perbandaran Selayang
                      </a>
                    </li>
                    <li>
                      <a
                        href=""
                        className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                      >
                        Tentang MyMPS
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Profile;
