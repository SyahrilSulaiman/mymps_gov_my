import React, {useState, useEffect} from 'react'
// import { Link } from "react-router-dom";
// import { getUser, getNOKP, getToken, removeUserSession } from "./Utils/Common";
// import MainDashboard from "./views/admin/Dashboard";

import Footer from "./components/Footers/Footer";
import Sidebar from "./Sidebar";
import Navbar from "./components/Navbars/AdminNavbar";

export default function SenaraiBil(props){

    return (
        <div>

                <div className="relative bg-green-400 md:pt-32 pt-4 pb-4">
                <div className="px-4 md:px-10 mx-auto w-full">
                <div className="flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg">
                            <div className="flex-auto p-4">

                                <div className="flex flex-col pt-4">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <h5 className="uppercase font-medium text-xs text-gray-600">
                                            Jenis Bil
                                        </h5>
                                        <span className="font-semibold text-lg text-gray-800">
                                            Cukai Taksiran
                                        </span>	
                                    </div>
                                </div>

                                <div className="flex flex-col pt-4">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <h5 className="uppercase font-medium text-xs text-gray-600">
                                            No Akaun
                                        </h5>
                                        <span className="font-semibold text-lg text-gray-800">
                                            A929181
                                        </span>	
                                    </div>
                                </div>
                                
                                <div className="flex flex-col pt-4">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <h5 className="uppercase font-medium text-xs text-gray-600">
                                            Jumlah Bayaran
                                        </h5>
                                        <span className="font-semibold text-lg text-gray-800">
                                            RM 30.00
                                        </span>	
                                    </div>
                                </div>

                                <div className="flex flex-col pt-4">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <h5 className="uppercase font-medium text-xs text-gray-600">
                                            Maklumat Bil
                                        </h5>
                                        <span className="font-semibold text-lg text-gray-800">
                                            Tempoh Julai - Disember 2020
                                        </span>	
                                    </div>
                                </div>

                                <div className="flex flex-col pt-4">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <span className="font-semibold text-lg text-gray-800">
                                            Status Bayaran
                                        </span>
                                        <h5 className="uppercase font-medium text-xs text-green-400">
                                            Telah Dibayar
                                        </h5>
                                        <h5 className="uppercase font-medium text-xs text-gray-600">
                                            <a href="https://mymps.corrad.my/rp/receipt.php" target="_blank" className="hover:text-gray-200 focus:outline-none focus:underline transition ease-in-out duration-150">
                                                <i className="fas fa-receipt"></i> Resit
                                            </a>
                                        </h5>
                                        <span className="font-semibold text-lg text-gray-800">
                                            {
                                                // bayar ? (export pdf):(add to pay)
                                            }
                                        </span>	
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
                </div>
        </div>
    );
}