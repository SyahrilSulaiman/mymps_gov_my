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
    const handleBack = () => {
        window.location.href = "/bill";
    }

        return (
            <div>
            <Sidebar />
            <div className="relative md:ml-64 bg-gray-400" style={{ height: "100%" }}>
                <Navbar />
                {/* Header */}
                <div className="relative bg-gray-600 md:pt-32 pt-4 pb-4">
                    <div className="px-4 md:px-10 mx-auto w-full">
                        <div className="flex flex-wrap">
                            <button onClick={handleBack} className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                                KEMBALI
                            </button>
                            <div className="w-full px-4">
                                <div className="relative flex flex-col min-w-0 break-words rounded mb-6">
                                    <div className="flex-auto p-4">

                                    <div className="flex flex-initial flex-row-reverse pt-4 pb-4">
                                        <button onClick={() => setType('nokp')} className={"text-black  text-center flex-row-reverse border-solid border-2 border-gray-300 rounded-md w-full h-12"+ (type === 'nokp' ? ' bg-blue-200 border-blue-300 ' : ' bg-white border-gray-300 ')}>
                                                    No Kad Pengenalan
                                        </button>
                                    </div>

                                    <div className="flex flex-initial flex-row-reverse pt-4 pb-4">
                                        <button onClick={() => setType('ssm')} className={"text-black  text-center flex-row-reverse border-solid border-2 border-gray-300 rounded-md w-full h-12"+ (type === 'ssm' ? ' bg-blue-200 border-blue-300 ' : ' bg-white border-gray-300 ')}>
                                                    No ROC / ROB Syarikat
                                        </button>
                                    </div>

                                    <div className="flex flex-initial flex-row-reverse pt-4 pb-4">
                                        <button onClick={() => setType('akaun')} className={"text-black  text-center flex-row-reverse border-solid border-2 border-gray-300 rounded-md w-full h-12"+ (type === 'akaun' ? ' bg-blue-200 border-blue-300 ' : ' bg-white border-gray-300 ')}>
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
