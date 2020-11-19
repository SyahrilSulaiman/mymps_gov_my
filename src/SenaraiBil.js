import React, { useState, useEffect } from 'react'
// import { Link } from "react-router-dom";
import { getUser, getNOKP, getToken, removeUserSession } from "./Utils/Common";
// import MainDashboard from "./views/admin/Dashboard";
// import Footer from "./components/Footers/Footer";
// import Sidebar from "./Sidebar";
// import Navbar from "./components/Navbars/AdminNavbar";
import axios from 'axios';
import swal from 'sweetalert';


export default function SenaraiBil(props) {
    const [isLoading, setLoading] = useState(true);
    const [bills, setBill] = useState(null);
    const nokp = getNOKP();
    const handleBack = () => {
        window.location.href = "/bill";
    }

    const handleBill = () => {
        console.log('Bil');
        const formData = new FormData;
        formData.append('noakaun', atob(atob(sessionStorage.noakaun)));
        // formData.append('noakaun',1001);
        formData.append('nokp', nokp);
        axios.post('https://mymps.corrad.my/int/api_generator.php?api_name=export_pdf', formData)
            .then(res => {
                console.log(res);

                if (res.data.status === 'success') {
                    console.log('success');
                    window.open('https://mymps.corrad.my/rp/bil_cukai_taksiran.php?token=' + res.data.token);
                }
                else {
                    swal('Resit tak dijumpai', 'Sila hubungi pentadbir system', 'error');
                }
            })
            .catch(err => {
                console.log(err);
                swal('Ralat', 'Sila hubungi pentadbir system', 'error');
            })
    }

    const handleReceipt = () => {
        console.log('Receipt');
        window.open('https://mymps.corrad.my/rp/resit.php');
        // const formData = new FormData;
        // formData.append('noakaun',atob(atob(sessionStorage.noakaun)));
        // // formData.append('noakaun',1001);
        // formData.append('nokp',nokp);
        // axios.post('https://mymps.corrad.my/int/api_generator.php?api_name=export_pdf',formData)
        // .then(res =>{
        //     console.log(res);

        //     if(res.data.status === 'success'){
        //         console.log('success');
        //         window.open('https://mymps.corrad.my/rp/bil_cukai_taksiran.php?token='+res.data.token);
        //     }
        //     else{
        //         swal('Resit tak dijumpai','Sila hubungi pentadbir system','error');
        //     }
        // })
        // .catch(err => {
        //     console.log(err);
        //     swal('Ralat','Sila hubungi pentadbir system','error');
        // })
    }

    useEffect(() => {
        // let source = axios.CancelToken.source();

        // const loadData = async () => {
        //     try{
        //         const response = await axios.get('https://mymps.corrad.my/int/api_generator.php?api_name=getBill&noakaun='+sessionStorage.noakaun,{cancelToken:source.token});
        //         console.log(response.data);
        //         setBill(response.data);
        //     }
        //     catch(error){
        //         if(axios.isCancel(error)){
        //             console.log('Caught cancel');
        //         }
        //         else{
        //             throw error;
        //         }
        //     }}
        // loadData();

        // return () => {
        //     source.cancel();
        // }
        axios.get('https://mymps.corrad.my/int/api_generator.php?api_name=getBill&noakaun=' + sessionStorage.noakaun)
            .then(res => {
                console.log(res.data)
                if (res.data.status == 'success') {
                    setBill({
                        bill: res.data
                    });
                    setLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
                swal('Ralat', 'Sila hubungi pentadbir system', 'error');
            })
    }, [])

    if (isLoading) {
        return (
            <div>
                <div className="relative bg-gray-600 md:pt-32 pt-4 pb-4" style={{ height: "100vh" }}>
                    <div className="px-4 md:px-10 mx-auto w-full">
                        <div className="flex flex-wrap">
                            <button onClick={handleBack} className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                                KEMBALI
                            </button>
                            <div className="w-full px-4">
                                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg">
                                    <div className="flex-auto p-4">
                                        loading...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="relative bg-gray-600 md:pt-32 pt-4 pb-4" style={{ height: "100vh" }}>
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
                                            <span className="font-semibold text-base text-gray-800">
                                                MAKLUMAT BIL
                                            </span>
                                        </div>
                                    </div>
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
                                                    bills.bill.data[0].NOAKAUN
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
                                                    bills.bill.data[0].NAMA_PEMILIK
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
                                                    bills.bill.data[0].ADDRHARTA
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
                                                    bills.bill.data[0].MUKIM
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
                                                    bills.bill.data[0].TEMPOH_CUKAI
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
                                                    bills.bill.data[0].TEMPOH_BAYARAN
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
                                                <button onClick={handleBill} className="hover:text-gray-200 focus:outline-none focus:underline transition ease-in-out duration-150">
                                                    <i className="fas fa-receipt"></i> Lihat Bil
                                                </button>
                                            </h5>
                                            <h5 className="uppercase font-medium text-xs text-gray-600">
                                                <button onClick={handleReceipt} className="hover:text-gray-200 focus:outline-none focus:underline transition ease-in-out duration-150">
                                                    <i className="fas fa-receipt"></i> Lihat Resit
                                                </button>
                                            </h5>
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