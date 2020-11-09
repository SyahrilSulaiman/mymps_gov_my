import React, {useState, useEffect} from "react";
import Footer from "./components/Footers/Footer";
import axios from 'axios';

function Pay(){

    const [data, setData] = useState([{"CODE":"BIMB1234","NAME":"BANK ISLAM"}]);
    var All = [];

    useEffect(async () => {

        await fetch('https://toyyibpay.com/api/getBankFPX')
        .then(response => response.json())
        .then(result => {
            console.log(result);
            setData(result);
        })
    }, [])

    //console.log("Data : " + (data[0].NAME));
    for(var i = 0; i < data.length; i++){
        console.log(data[i].CODE);
        All.push(<div className="bg-gray-300 text-gray-700 text-center" style={{padding:"10px", margin:"5px"}} onClick={() => alert(data[i].CODE)}>{data[i].NAME}</div>);
    }

    return (
        <div className="p-4">
            <div className="bg-gray-300 rounded-lg">
                <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
                    Portal MyMPS
                    <br />
                    <span className="text-blue-600">Laman Pembayaran Bil</span>
                    </h2>
                    <div className="mt-8 flex lg:flex-shrink-0 lg:mt-0">
                    <div className="inline-flex rounded-md shadow">
                        <a href="/bill" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                        Kembali
                        </a>
                    </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 border-b border-gray-200 bg-gray-500 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Maklumat Cukai Taksiran
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-5 text-white">
                    Berikut dibawah merupakan maklumay cukai taksiran yang ingin dibayar.
                    </p>
                </div>
                <div>
                    <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm leading-5 font-medium text-gray-500">
                        No. Cukai
                        </dt>
                        <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                        A929739
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm leading-5 font-medium text-gray-500">
                        Penama Cukai
                        </dt>
                        <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                        {sessionStorage.getItem('username')}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm leading-5 font-medium text-gray-500">
                        Jumlah Tunggakan (RM)
                        </dt>
                        <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                        40.00
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm leading-5 font-medium text-gray-500">
                        Status Cukai
                        </dt>
                        <dd className="mt-1 text-sm leading-5 text-red-500 sm:mt-0 sm:col-span-2">
                        Tertunggak
                        </dd>
                    </div>
                    </dl>
                </div>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-5 mb-3">
                <div className="px-4 py-5 border-b border-gray-200 bg-gray-500 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Maklumat Pembayaran
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-5 text-white">
                    Anda diminta untuk mengisi maklumat dibawah sebagai pembayar.
                    </p>
                </div>
                <div>
                    <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm leading-5 font-medium text-gray-500">
                        Nama Pembayar
                        </dt>
                        <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                        <div>
                            <input aria-label="nama"  name="nama" type="text" required className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="cth: Kassim" />
                        </div>
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm leading-5 font-medium text-gray-500">
                        Emel Pembayar
                        </dt>
                        <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                        <div>
                            <input aria-label="emel"  name="emel" type="email" required className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="cth: admin@gmail.com" />
                        </div>
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm leading-5 font-medium text-gray-500">
                        No. Telefon Bimbit
                        </dt>
                        <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                        <div>
                            <input aria-label="phone"  name="phone" type="text" required className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="cth: admin@gmail.com" />
                        </div>
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm leading-5 font-medium text-gray-500">
                        {/* Status Cukai */}
                        </dt>
                        <dd className="flex flex-wrap mt-1 text-sm leading-5 text-gray-500 sm:col-span-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {All}
                            </div>
                        </dd>
                    </div>
                    </dl>
                </div>
            </div>

            <Footer className="p-0 mt-2"/>
        </div>
    );
}

export default Pay;