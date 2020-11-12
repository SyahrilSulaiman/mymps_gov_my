import React, {useState, useEffect} from 'react'
import Footer from "./components/Footers/Footer";
import Sidebar from "./Sidebar";
import Navbar from "./components/Navbars/AdminNavbar";
import axios from "axios";
import swal from 'sweetalert';
import Carian from './Carian';
import Search from './Search';

export default function Add({props}){
    const [type,setType] = useState('');


        return (
            <div>
            <Sidebar />
            <div className="relative md:ml-64 bg-gray-400" style={{ height: "100%" }}>
                <Navbar />
                {/* Header */}
                <div className="relative bg-gray-600 md:pt-32 pt-4 pb-4">
                    <div className="px-4 md:px-10 mx-auto w-full">
                        <div className="flex flex-wrap">
                            <div className="w-full px-4">
                                <div className="relative flex flex-col min-w-0 break-words rounded mb-6">
                                    <div className="flex-auto p-4">

                                    <div className="flex flex-initial flex-row-reverse pt-4 pb-4">
                                        <button onClick={() => setType('nokp')} className="text-black bg-white text-center flex-row-reverse border-solid border-2 border-gray-300 rounded-md w-full h-12">
                                                    No Kad Pengenalan
                                        </button>
                                    </div>

                                    <div className="flex flex-initial flex-row-reverse pt-4 pb-4">
                                        <button onClick={() => setType('ssm')} className="text-black bg-white text-center flex-row-reverse border-solid border-2 border-gray-300 rounded-md w-full h-12">
                                                    No SSM Pendaftaran Syarikat
                                        </button>
                                    </div>

                                    <div className="flex flex-initial flex-row-reverse pt-4 pb-4">
                                        <button onClick={() => setType('akaun')}className="text-black bg-white text-center flex-row-reverse border-solid border-2 border-gray-300 rounded-md w-full h-12">
                                                    No Akaun
                                        </button>
                                    </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Search type={type}/>
                <Footer />
                </div>
                
            </div>
            );
}
