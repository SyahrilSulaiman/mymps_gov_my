import React, { useState, useEffect } from 'react'
// import { Link } from "react-router-dom";
import { getUser, getNOKP, getToken, removeUserSession } from "./Utils/Common";
// import MainDashboard from "./views/admin/Dashboard";
// import Footer from "./components/Footers/Footer";
import Sidebar from "./Sidebar";
import Navbar from "./components/Navbars/AdminNavbar";
import axios from 'axios';
import swal from 'sweetalert';
import { Heading, Pane, Button, Text, Paragraph, majorScale, minorScale, Card, UnorderedList, ListItem, Icon, ArrowLeftIcon } from 'evergreen-ui';


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
                <Sidebar />
                <div className="relative bg-gray-500 md:ml-64" style={{ height: "100vh" }}>
                    <Navbar />
                    <div className=" w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16">
                        <div className="flex flex-wrap">
                            <div className="w-full px-4 mt-3">
                                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg xs:mt-16">
                                    <div className="flex-auto p-4 mt-6">
                                        <Heading
                                            is="h1"
                                            size={600}
                                            marginBottom={majorScale(2)}
                                            textTransform="uppercase"
                                            letterSpacing="2px"
                                            fontWeight={700}
                                            display="flex"
                                            alignItems="center"
                                        >
                                            MAKLUMAT BIL
                                    </Heading>
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
            <Sidebar />
            <div className="relative bg-gray-500 md:ml-64" style={{ height: "100vh" }}>
                <Navbar />
                <div className=" w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16">
                    <div className="flex flex-wrap">
                        <Pane background="#2c3e50" className="p-3 xl:mx-4 xl:rounded-md" position="relative" width="100%">
                            <Heading size={400} color="white"><Icon icon={ArrowLeftIcon} size={12} onClick={() => window.history.back()} /> Bil / Maklumat Bil</Heading>
                        </Pane>
                        <div className="w-full px-4 mt-3">
                            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg xs:mt-16">
                                <div className="flex-auto p-4 mt-6">

                                    <Heading
                                        is="h1"
                                        size={600}
                                        marginBottom={majorScale(2)}
                                        textTransform="uppercase"
                                        letterSpacing="2px"
                                        fontWeight={700}
                                        display="flex"
                                        alignItems="center"
                                    >
                                        MAKLUMAT PEMBAYARAN BIL
                                    </Heading>

                                    <Pane background="#c7ecee" marginBottom={majorScale(2)}>
                                        <Paragraph padding={majorScale(2)} size={500}>
                                            Berikut merupakan maklumat mengenai bil dan bukti pembayaran untuk bil anda.
                                        </Paragraph>
                                    </Pane>

                                    <Card
                                        background="tint2"
                                        marginBottom={majorScale(2)}
                                        padding={minorScale(2)}
                                    >
                                        <UnorderedList>
                                            <ListItem icon="person">
                                                <Text fontWeight={700}>Jenis:</Text> Cukai Taksiran
                                            </ListItem>
                                            <ListItem icon="heart">
                                                <Text fontWeight={700}>No Akaun:</Text> {bills.bill.data[0].NOAKAUN ? bills.bill.data[0].NOAKAUN : "Tiada"}
                                            </ListItem>
                                            <ListItem icon="predictive-analysis">
                                                <Text fontWeight={700}>Nama Pemilik:</Text> {bills.bill.data[0].NAMA_PEMILIK ? bills.bill.data[0].NAMA_PEMILIK : "Tiada"}
                                            </ListItem>
                                            <ListItem icon="tint">
                                                <Text fontWeight={700}>Alamat Harta:</Text> {bills.bill.data[0].ADDRHARTA ? bills.bill.data[0].ADDRHARTA : "Tiada"}
                                            </ListItem>
                                            <ListItem icon="tint">
                                                <Text fontWeight={700}>Mukim:</Text> {bills.bill.data[0].MUKIM ? bills.bill.data[0].MUKIM : "Tiada"}
                                            </ListItem>
                                            <ListItem icon="tint">
                                                <Text fontWeight={700}>Tempoh Cukai:</Text> {bills.bill.data[0].TEMPOH_CUKAI ? bills.bill.data[0].TEMPOH_CUKAI : "Tiada"}
                                            </ListItem>
                                            <ListItem icon="tint">
                                                <Text fontWeight={700}>Tempoh Bayaran:</Text> {bills.bill.data[0].TEMPOH_BAYARAN ? bills.bill.data[0].TEMPOH_BAYARAN : "Tiada"}
                                            </ListItem>
                                        </UnorderedList>
                                    </Card>
                                    {/* <div className="flex flex-col pt-4">
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
                                    </div> */}
                                    <div className="flex flex-col pt-4">
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            <span className="font-semibold text-sm text-gray-800">
                                                Status Bayaran : { bills.bill.data[0].STATUS == "PAID" ? (<span className="uppercase font-medium text-xs text-green-400">Telah Dibayar</span>) : (<span className="uppercase font-medium text-xs text-red-400">Tertunggak</span>) }
                                            </span>
                                            {/* <h5 className="uppercase font-medium text-xs text-green-400">
                                                {bills.bill.data[0].STATUS == "PAID" ? "TELAH DIBAYAR" : "TERTUNGGAK"}
                                            </h5> */}
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
                                    <div className="flex flex-wrap px-3 py-3 w-full mt-16 rounded-md">
                                        <Pane width="100%" >
                                            <Button
                                                display="flex"
                                                appearance="primary"
                                                type="button"
                                                onClick={handleBack}
                                                className="float-right"
                                            >
                                                Kembali
                                                </Button>
                                        </Pane>
                                        {/* <div className="w-full lg:w-6/12 px-1">
                                            <div className="relative w-full mb-3">
                                                <Button onClick={() => window.location.href = "/"} type="button" appearance="primary" intent="danger" display="flex" justifyContent="center" width="100%">Kembali</Button>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-6/12 px-1">
                                            <div className="relative w-full mb-3">
                                                <Button type="button" appearance="primary" intent="success" display="flex" justifyContent="center" width="100%">Teruskan</Button>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-4 md:px-10 mx-auto w-full">
                    <div className="flex flex-wrap px-3 py-3">
                        {/* <Pane display="flex">
                                <Button
                                appearance="primary"
                                type="button"
                                onClick={handleBack}
                                >
                                    Kembali
                                </Button>
                            </Pane> */}
                        {/* <div className="w-full lg:w-6/12 px-1">
                            <div className="relative w-full mb-3">
                                <Button onClick={() => window.location.href = "/"} type="button" appearance="primary" intent="danger" display="flex" justifyContent="center" width="100%">Kembali</Button>
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-1">
                            <div className="relative w-full mb-3">
                                <Button type="button" appearance="primary" intent="success" display="flex" justifyContent="center" width="100%">Teruskan</Button>
                            </div>
                        </div> */}
                    </div>
                </div>


            </div>
        </div>
    );
}