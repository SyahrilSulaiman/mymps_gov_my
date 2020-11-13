import Axios from 'axios';
import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'
import { getUser, getNOKP, getToken, removeUserSession } from "./Utils/Common";

export default function Carian({bill, display}){

    const [loading,setLoading] = useState(false);
    const nokp    = getNOKP();
    let accountType = "";

        useEffect(() =>{
            console.log('bill ',bill);
            if(bill.type === 'nokp')
            accountType = 'No Kad Pengenalan';
            if(bill.type === 'akaun')
            accountType = 'Akaun';
            if(bill.type === 'ssm')
            accountType = 'No SSM';
        },[bill]);

        const handleAdd = (e) => {
            setLoading(true);
            const formData = new FormData();
            formData.append('nokp',nokp);
            formData.append('account',bill.noakaun);
            console.log(nokp);
            console.log(bill.noakaun);
            Axios.post('https://mymps.corrad.my/int/api_generator.php?api_name=newBill',formData)
            .then(res => {

                console.log('Response : ',res.data)
                if(res.data.status === "success"){
                    swal('Berjaya Tambah','Berjaya tambah akaun untuk pembayaran','success');
                    window.location.href = '/bill';
                }
                else if(res.data.status === "failure"){
                    swal("Tidak Berjaya",accountType+" ini telah didaftarkan ke akaun anda.","error");
                }
                else{
                    console.log(res.status);
                    swal('Ralat','Operasi tidak dapat diselesaikan','error');
                }

                setLoading(false);
            })
            .catch(err =>{
                console.log('error',err)
                swal('Ralat','Sila hubungi pentadbir sistem!','error');
            });
        }
    
    if(!display){
        return (
            <div>
            </div>
        );
    }
    else{
        return (
            <div>
                <div className="px-4 md:px-2 mx-auto w-full">
                    <div className="flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg">
                                <div className="flex-auto p-4">
                                    <div className="flex flex-row pt-4">
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            <span className="font-semibold uppercase text-lg text-gray-800">
                                            {
                                            // dataset.jenis
                                            // bill.type
                                                bill.nokp
                                            }
                                            </span>	
                                        </div>
                                        <div className="relative w-auto pl-4 flex-initial">
                                            <span className="font-semibold uppercase text-lg text-gray-800">Akaun :&nbsp;
                                            {
                                                //dataset.amaun
                                                bill.noakaun
                                            }
                                            </span>	
                                        </div>
                                    </div>
                                    <div className="flex flex-row pb-4">
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            <span className="font-semibold uppercase text-lg text-gray-800">
                                            {
                                            // dataset.akaun
                                            // bill.code
                                            bill.nama_pemilik
                                            }
                                            </span>	
                                            <h5 className="uppercase font-medium text-xs text-gray-600">
                                            {
                                            // dataset.tempoh
                                            // bill.description
                                            bill.add_harta
                                            }
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-initial flex-row-reverse pt-4 pb-4">
                        <button id="type" type="button" onClick={handleAdd} className="text-white text-center bg-green-500 flex-row-reverse rounded-full w-32 h-12">
                                    {loading?'Menambah..':'Tambah'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}