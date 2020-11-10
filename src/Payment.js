import React, {useState, useEffect} from "react";
import Footer from "./components/Footers/Footer";
import axios from 'axios';
import swal from "sweetalert";


function Pay(){

    const [data, setData] = useState([{"CODE":"BIMB1234","NAME":"BANK ISLAM"}]);
    const [bankCode, setBankCode] = useState("");

    var All = [];

    useEffect(async () => {

        await fetch('https://dev.toyyibpay.com/api/getBankFPX')
        .then(response => response.json())
        .then(result => {
            setData(result);
        })
    }, [])

    const handleClick = (bankcode) => {
        console.log(bankcode);
        setBankCode(bankcode);
        document.getElementById("inputBank").value = bankcode;
    }

    const handleBayar = () => {
        var name = document.getElementById("nama").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var bank = document.getElementById("inputBank").value;

        if(name == ""){
            swal("Ralat!", "Sila lengkapkan maklumat nama pembayar sebelum membuat pembayaran.","error");
        }else if(email == ""){
            swal("Ralat!", "Sila lengkapkan maklumat emel pembayar sebelum membuat pembayaran.","error");
        }else if(phone == ""){
            swal("Ralat!", "Sila lengkapkan maklumat nombor telefon pembayar sebelum membuat pembayaran.","error");
        }else if(bank == ""){
            swal("Ralat!", "Sila membuat pilihan bank sebelum membuat pembayaran.","error");
        }else{

            var formdata = new FormData();
            formdata.append("accountId", document.getElementById("account_no").value);
            formdata.append("amount", document.getElementById("payment_amount").value);
            formdata.append("invoiceNo", document.getElementById("payment_ref_no").value);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            var urlAPI1 = 'https://mymps.corrad.my/int/api_generator.php?api_name=register_payment';

            fetch(urlAPI1 , requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.status == "success"){
                    document.getElementById("bayar").submit();
                }else{
                    swal("Ralat", "Sila lengkapkan maklumat pembayar dan pastikan maklumat adalah benar dah sah sebelum mebuat pembayaran cukai.","error");
                }
            })
                
        }
        
    }

    //console.log("Data : " + (data[0].NAME));
    for(var i = 0; i < data.length; i++){
        All.push(<button type="button" key={i} className="bg-gray-300 text-gray-700 text-center mx-center" style={{padding:"4px", margin:"2px"}} value={data[i].CODE} onClick={ e => handleClick(e.target.value)}>
            <img className="mx-auto" style={{height:"40px", width:"40px"}} src={"https://dev1.toyyibpay.com/asset/img/logobank/"+data[i].CODE+".png"} /> <br /> {data[i].NAME}</button>);
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
                    <form action="" method="post">
                    <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm leading-5 font-medium text-gray-500">
                        Nama Pembayar
                        </dt>
                        <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                        <div>
                            <input value={sessionStorage.getItem("username")} aria-label="nama" name="nama" id="nama" type="text" required className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="cth: Kassim" />
                        </div>
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm leading-5 font-medium text-gray-500">
                        Emel Pembayar
                        </dt>
                        <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                        <div>
                            <input value={sessionStorage.getItem("email")} aria-label="emel"  name="email" id="email" type="email" required className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="cth: admin@gmail.com" />
                        </div>
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm leading-5 font-medium text-gray-500">
                        No. Telefon Bimbit
                        </dt>
                        <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                        <div>
                            <input value={sessionStorage.getItem("notel")} aria-label="phone" name="phone" id="phone" type="text" required className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="cth: 0123456789" />
                        </div>
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ">
                        <dt className="text-sm leading-5 font-medium text-gray-500 ">
                        Senarai Bank
                        </dt>
                        <dd className="flex flex-wrap mt-1 text-sm leading-5 text-gray-500 sm:col-span-2">
                            <div className="grid gap-1 grid-cols-2 xl:grid-cols-5">
                                {All}
                            </div>
                        </dd>
                        <dt className="text-sm leading-5 font-medium text-gray-500">
                        
                        </dt>

                        <dd className="flex flex-wrap mt-1 text-sm leading-5 text-gray-500 sm:col-span-2">
                            <p className="flex flex-wrap mt-5 text-md text-red-500">*Sila pastikan semua maklumat lengkap dan betul sebelum membuat pembayaran. Anda akan diubah hala ke halaman bank untuk membuat pembayaran.</p>
                        </dd>
                        <dt className="text-sm leading-5 font-medium text-gray-500">
                        
                        </dt>

                        <dd className="flex flex-wrap mt-1 text-sm leading-5 text-gray-500 sm:col-span-2">
                            <button type="button" className="text-white bg-green-500 py-3 px-5 rounded-lg w-full inline-block mt-5" onClick={() => handleBayar()}>Bayar</button>
                        </dd>
                    </div>
                    </dl>
                    </form>
                </div>
                
                <div>
                    <form action="https://epstaging.mps.gov.my/fpx/sd.php" method="post" id="bayar">
                        <input type="hidden" name="account_no" id="account_no" value="A929739" />
                        <input type="hidden" name="payment_ref_no" id="payment_ref_no" value={"MYM"+Date.now()}/>
                        <input type="hidden" name="bank" id="inputBank"/>
                        <input type="hidden" name="channel" id="channel" value="01"/>
                        <input type="hidden" name="web_return_address" value="https://mymps.corrad.my"/>
                        <input type="hidden" name="web_service_return_address" value="https://mymps.corrad.my/int/callback.php"/>
                        <input type="hidden" name="payment_amount" id="payment_amount" value="40.00"/>
                        <input type="hidden" name="payment_description" value={"Cukai Taksiran A929739"}/>
                        <input type="hidden" name="email" value={sessionStorage.getItem("email")}/>
                    </form>
                </div>
            </div>

            <Footer className="p-0 mt-2"/>
        </div>
    );
}

export default Pay;