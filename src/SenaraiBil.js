import React, {useState, useEffect} from 'react'
// import { Link } from "react-router-dom";
import { getUser, getNOKP, getToken, removeUserSession } from "./Utils/Common";
// import MainDashboard from "./views/admin/Dashboard";
// import Footer from "./components/Footers/Footer";
// import Sidebar from "./Sidebar";
// import Navbar from "./components/Navbars/AdminNavbar";
import axios from 'axios';
import swal from 'sweetalert';


export default function SenaraiBil(props){
    const [bills,setBill] = useState({
        bill: []
    });
    const nokp = getNOKP();
    const handleBack = () => {
        window.location.href = "/bill";
    }

    const handleReceipt = () => {
        console.log('Resit');
        const formData = new FormData;
        formData.append('noakaun',atob(atob(sessionStorage.noakaun)));
        formData.append('nokp',nokp);
        axios.post('https://mymps.corrad.my/int/api_generator.php?api_name=export_pdf',formData)
        .then(res =>{
            console.log(res);
        })
        .catch(err => {
            console.log(err);
            swal('Ralat','Sila hubungi pentadbir system','error');
        })
    }

    useEffect(()=> {
        console.log(sessionStorage.noakaun);
        axios.get('https://mymps.corrad.my/int/api_generator.php?api_name=getBill',{
            params:{
                noakaun:sessionStorage.noakaun
            }
        })
        .then(res => {
            console.log(res.data.data)
            setBill({
                bill:res.data.data
            });
        })
        .catch(err => {
            console.log(err);
            swal('Ralat','Sila hubungi pentadbir system','error');
        })
    },[])

    return (
        <div>
                <div className="relative bg-gray-600 md:pt-32 pt-4 pb-4" style={{height: "90vh"}}>
                <div className="px-4 md:px-10 mx-auto w-full">
                <div className="flex flex-wrap">
                    <button onClick={handleBack} className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                        KEMBALI
                    </button>
                    <div className="w-full px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg">
                            <div className="flex-auto p-4">

                                <div className="flex flex-col pt-4">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <h5 className="uppercase font-medium text-xs text-gray-600">
                                            Jenis Bil
                                        </h5>
                                        <span className="font-semibold text-sm text-gray-800">
                                            Cukai Taksiran
                                        </span>	
                                    </div>
                                </div>

                                <div className="flex flex-col pt-4">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <h5 className="uppercase font-medium text-xs text-gray-600">
                                            No Akaun
                                        </h5>
                                        <span className="font-semibold text-sm text-gray-800">
                                            {
                                               bills.bill[0].NOAKAUN
                                            }
                                        </span>	
                                    </div>
                                </div>
                                
                                <div className="flex flex-col pt-4">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <h5 className="uppercase font-medium text-xs text-gray-600">
                                            Nama Pemilik
                                        </h5>
                                        <span className="font-semibold text-sm text-gray-800">
                                            {
                                               bills.bill[0].NAMA_PEMILIK
                                            }
                                        </span>	
                                    </div>
                                </div>
                                
                                <div className="flex flex-col pt-4">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <h5 className="uppercase font-medium text-xs text-gray-600">
                                            Alamat Harta
                                        </h5>
                                        <span className="font-semibold text-sm text-gray-800">
                                            {
                                                bills.bill[0].ADDRHARTA
                                            }
                                        </span>	
                                    </div>
                                </div>
                                
                                <div className="flex flex-col pt-4">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <h5 className="uppercase font-medium text-xs text-gray-600">
                                            Mukim
                                        </h5>
                                        <span className="font-semibold text-sm text-gray-800">
                                            {
                                                bills.bill[0].MUKIM
                                            }
                                        </span>	
                                    </div>
                                </div>
                                
                                <div className="flex flex-col pt-4">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <h5 className="uppercase font-medium text-xs text-gray-600">
                                            Tempoh Cukai
                                        </h5>
                                        <span className="font-semibold text-sm text-gray-800">
                                            {
                                                bills.bill[0].TEMPOH_CUKAI
                                            }
                                        </span>	
                                    </div>
                                </div>
                                
                                <div className="flex flex-col pt-4">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <h5 className="uppercase font-medium text-xs text-gray-600">
                                            Tempoh Bayaran
                                        </h5>
                                        <span className="font-semibold text-sm text-gray-800">
                                            {
                                                bills.bill[0].TEMPOH_BAYARAN
                                            }
                                        </span>	
                                    </div>
                                </div>
                                
                                <div className="flex flex-col pt-4">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <span className="font-semibold text-sm text-gray-800">
                                            Status Bayaran
                                        </span>
                                        <h5 className="uppercase font-medium text-xs text-green-400">
                                            Telah Dibayar
                                        </h5>
                                        <h5 className="uppercase font-medium text-xs text-gray-600">
                                            <button onClick ={handleReceipt} className="hover:text-gray-200 focus:outline-none focus:underline transition ease-in-out duration-150">
                                                <i className="fas fa-receipt"></i> Resit
                                            </button>
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