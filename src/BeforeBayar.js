import React, { useState, useEffect } from 'react'
import { getUser, getNOKP, getToken, removeUserSession } from "./Utils/Common";
import Sidebar from "./Sidebar";
import Navbar from "./components/Navbars/AdminNavbar";
import axios from 'axios';
import swal from 'sweetalert';
import { Heading, Spinner, Pane, Button, Text, Paragraph, majorScale, minorScale, Card, UnorderedList, ListItem, ArrowRightIcon, ArrowLeftIcon, toaster } from 'evergreen-ui';
import Topbaer from "./Topbar2";
import NoScroll from "no-scroll";


export default function SenaraiBil(props) {

    const [isLoading, setLoading] = useState(true);
    const [bills, setBill] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const nokp = getNOKP();

    const handlePayment = () => {

        setDisabled(true);

        const formData = new FormData();
        formData.append('userSecret', nokp)

        axios.post('https://mymps.corrad.my/int/api_generator.php?api_name=get_user_status', formData)
            .then((res) => {
                console.log(res.data);
                if (res.data.status === "Pending") {
                    toaster.danger("Pembayaran Dibatalkan.",{description:"Akaun anda masih belum diaktifkan. Sila semak emel anda untuk pengesahan akaun."})
                }else{
                    sessionStorage.setItem("noakaun", bills.bill.data[0][0].NOAKAUN);
                    sessionStorage.setItem("jumlah",bills.bill.data[2][0].BAKI)
                    window.location.href = "/Payment?Cukai=" + sessionStorage.noakaun;
                }
            })
            .catch((err) => {
                console.log(err);
                swal("Ralat", "Sila hubungi pentadbir sistem!", "error");
            });
    }

    useEffect(() => {
        axios.get('https://mymps.corrad.my/int/api_generator.php?api_name=getBill&noakaun=' + sessionStorage.getItem('noakaun'))
            .then(res => {
                if (res.data.status == 'success') {
                    setBill({
                        bill: res.data
                    });
                    setLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
                toaster.danger('Sistem Ralat. Sila hubungi pihak pentadbir sistem anda.');
                window.history.back();
            })
    }, [])

    if (isLoading) {
        return (
            <div>
                <Sidebar />
                <div className="relative bg-gray-400 md:ml-64" style={{ height: "150vh" }}>
                    <Navbar />
                    <div className=" w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16">
                        <div className="flex flex-wrap">
                            <Pane background="#2c3e50" className="xl:mx-4 xl:rounded-md" width="100%">
                                <Topbaer title="Bil / Maklumat Pembayaran" leftButtonIcon={ArrowLeftIcon} onClickLeftButton={() => window.history.back()} />
                            </Pane>
                            <div className="w-full px-4 mt-3">
                                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg xs:mt-16">
                                    <div className="flex-auto p-4 mt-6">
                                        <Heading
                                            is="h1"
                                            size={500}
                                            marginBottom={majorScale(2)}
                                            textTransform="uppercase"
                                            letterSpacing="2px"
                                            fontWeight={700}
                                            display="flex"
                                            alignItems="center"
                                        >
                                            MAKLUMAT PEMBAYARAN BIL
                                    </Heading>
                                    </div>
                                    <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
                                        <Spinner />
                                    </Pane>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    else if (!isLoading && bills.bill) {
        return (
            <div>
                <Sidebar />
                <div className="relative bg-gray-400 md:ml-64 " style={{ height: "150vh" }}>
                    <Navbar />
                    <div className=" w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16">
                        <div className="flex flex-wrap">
                            <Pane background="#2c3e50" className="xl:mx-4 xl:rounded-md" width="100%">
                                <Topbaer title="Bil / Maklumat Pembayaran" leftButtonIcon={ArrowLeftIcon} onClickLeftButton={() => window.history.back()} />
                            </Pane>
                            <div className="w-full px-4 mt-3">
                                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg xs:mt-16">
                                    <div className="flex-auto p-4 mt-6">

                                        <Heading
                                            is="h1"
                                            size={500}
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
                                            <Paragraph padding={majorScale(2)} size={400}>
                                                Berikut merupakan maklumat mengenai pembayaran untuk bil akaun <b>{bills.bill.data[0][0].NOAKAUN}</b>.
                                            </Paragraph>
                                        </Pane>

                                        <Card
                                            background="tint2"
                                            marginBottom={majorScale(2)}
                                            paddingY={minorScale(2)}
                                            paddingX={majorScale(1)}
                                        >
                                            <Pane>
                                                <Text fontWeight={600}>Jenis Bil</Text>
                                                <Heading size={100}>Cukai</Heading>
                                            </Pane>
                                            <Pane>
                                                <Text fontWeight={600}>Nombor Akaun</Text>
                                                <Heading size={100}>{bills.bill.data[0][0].NOAKAUN ? bills.bill.data[0][0].NOAKAUN : "Tiada"}</Heading>
                                            </Pane>
                                            <Pane>
                                                <Text fontWeight={600}>Nama Pemilik</Text>
                                                <Heading size={100}>{bills.bill.data[0][0].NAMA_PEMILIK ? bills.bill.data[0][0].NAMA_PEMILIK : "Tiada"}</Heading>
                                            </Pane>
                                            <Pane>
                                                <Text fontWeight={600}>Alamat Harta</Text>
                                                <Heading size={100}>{bills.bill.data[0][0].ADDRHARTA ? bills.bill.data[0][0].ADDRHARTA : "Tiada"}</Heading>
                                            </Pane>
                                            <Pane>
                                                <Text fontWeight={600}>Mukim</Text>
                                                <Heading size={100}>{bills.bill.data[0][0].MUKIM ? bills.bill.data[0][0].MUKIM : "Tiada"}</Heading>
                                            </Pane>
                                            <Pane>
                                                <Text fontWeight={600}>Tempoh Cukai</Text>
                                                <Heading size={100}>{bills.bill.data[0][0].TEMPOH_CUKAI ? bills.bill.data[0][0].TEMPOH_CUKAI : "Tiada"}</Heading>
                                            </Pane>
                                            <Pane>
                                                <Text fontWeight={600}>Tempoh Bayaran</Text>
                                                <Heading size={100}>{bills.bill.data[0][0].TEMPOH_BAYARAN ? bills.bill.data[0][0].TEMPOH_BAYARAN : "Tiada"}</Heading>
                                            </Pane>
                                        </Card>
                                        <Card
                                            background="tint2"
                                            marginBottom={majorScale(2)}
                                            padding={minorScale(2)}
                                        >
                                            <Pane>
                                                <Heading size={200}>Status Bayaran</Heading>
                                                <Heading size={200} fontWeight={400}>{bills.bill.data[0][0].STATUS == "PAID" ? (<span className="uppercase font-medium text-xs text-green-400">Telah Dibayar</span>) : (<span className="uppercase font-medium text-xs text-red-400">Tertunggak</span>)}</Heading>
                                            </Pane>
                                        </Card>
                                        {bills.bill.data[0][0].STATUS !== "PAID" &&
                                            <Card
                                                background="tint2"
                                                marginBottom={majorScale(1)}
                                                padding={minorScale(2)}
                                            >
                                                <Pane>
                                                    <Heading size={200}>Jumlah Tunggakan</Heading>
                                                    <Heading size={200} size={500}>RM {bills.bill.data[2][0].BAKI}</Heading>
                                                </Pane>
                                            </Card>
                                        }
                                        <div className="flex flex-wrap py-1 w-full mt-4 rounded-md">
                                            <Pane width="100%" >
                                                <Button
                                                    appearance="primary"
                                                    intent="danger"
                                                    type="button"
                                                    onClick={() => window.history.back()}
                                                    iconBefore={ArrowLeftIcon}
                                                >
                                                    Kembali
                                                </Button>
                                                <Button
                                                    disabled={disabled}
                                                    appearance="primary"
                                                    intent="success"
                                                    type="button"
                                                    className="float-right"
                                                    onClick={() => handlePayment()}
                                                    iconAfter={ArrowRightIcon}
                                                >
                                                    Bayar
                                                </Button>
                                            </Pane>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="w-full px-4" onClick={() => handlePayment()}>
                                <div className="relative flex flex-col min-w-0 break-words bg-green-600 rounded mb-6 shadow-lg xs:mt-16">
                                    <div className="flex-auto p-3 text-center">
                                        <Heading color="white">Teruskan Pembayaran</Heading>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}