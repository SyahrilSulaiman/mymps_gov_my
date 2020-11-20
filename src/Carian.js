import Axios from 'axios';
import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'
import { getUser, getNOKP, getToken, removeUserSession } from "./Utils/Common";
import {Heading, Text, Paragraph, Button, toaster} from "evergreen-ui";

export default function Carian({bill,type, display}){

    const [loading,setLoading] = useState(false);
    const nokp    = getNOKP();
    let accountType = "";

        useEffect(() =>{
            console.log('bill ',bill);
            if(type === 'nokp')
            accountType = 'No Kad Pengenalan';
            if(type === 'akaun')
            accountType = 'Akaun';
            if(type === 'ssm')
            accountType = 'No SSM';
        },[bill]);

        const handleAdd = (e) => {
            setLoading(true);
            const formData = new FormData();
            formData.append('nokp',nokp);
            formData.append('account',e);

            Axios.post('https://mymps.corrad.my/int/api_generator.php?api_name=newBill',formData)
            .then(res => {

                console.log('Response : ',res.data)
                if(res.data.status === "success")
                {
                    toaster.success('Berjaya tambah akaun untuk pembayaran.',{id:"forbidden-action"});
                    window.location.href = '/bill';
                }
                else if(res.data.status === "failure")
                {
                    toaster.danger("Akaun ini telah didaftarkan ke senarai bayaran anda.",{id:"forbidden-action"});
                }
                else
                {
                    toaster.danger('Maaf. Sila hubungi bahagian pihak pentadbiran.',{id:"forbidden-action"});
                }

                setLoading(false);
            })
            .catch(err =>{
                toaster.danger('Ralat! Sila hubungi pentadbir sistem.',{id:"forbidden-action"});
            });
        }
    
    if(!display){
        return (
            <div>
            </div>
        );
    }
    else{
        if( bill.length === 1 || type === 'akaun' )
        {
            return (<div>
                        <div key={bill[0].NOAKAUN} className="mx-auto w-full">
                        <div className="flex flex-wrap">
                            <div className="w-full">
                                <div className="relative flex flex-col min-w-0 break-words bg-gray-100 border " onClick={() => handleAdd(bill[0].NOAKAUN)}>
                                    <div className="flex-auto p-4">
                                        <div className="flex flex-row pt-4">
                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                <span className="font-semibold uppercase text-lg text-gray-800">
                                                {
                                                // dataset.jenis
                                                // bill.type
                                                //    ( typeof bill[0].NOKP !== 'undefined' )? bill[0].NOKP : bill[0].NOSSM
                                                }
                                                </span>	
                                            </div>
                                            <div className="relative w-auto pl-4 flex-initial">
                                                <span className="font-semibold uppercase text-lg text-gray-800">Akaun :&nbsp;
                                                {
                                                    //dataset.amaun
                                                    bill[0].NOAKAUN
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
                                                bill[0].NAMA_PEMILIK
                                                }
                                                </span>	
                                                <h5 className="uppercase font-medium text-xs text-gray-600">
                                                {
                                                // dataset.tempoh
                                                // bill.description
                                                bill[0].ADDRHARTA
                                                }
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="flex flex-initial flex-row-reverse pt-4 pb-4">
                                        <button id="type" type="button" onClick={(e) => handleAdd(bill[0].NOAKAUN)} className="text-white text-center bg-green-500 flex-row-reverse rounded-full w-32 h-12">
                                                    {loading?'Menambah..':'Tambah'}
                                        </button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
        </div>)
        }

        else{
        return (
            <div>

            {
                bill.map(bills => (
                    <div key={bills.NOAKAUN} className="mx-auto w-full">
                    <div className="flex flex-wrap">
                        <div className="w-full">
                            <div className="relative flex flex-col min-w-0 break-words bg-gray-100 border" onClick={() => handleAdd(bills.NOAKAUN)}>
                                <div className="flex-auto p-4">
                                    <div className="flex flex-row pt-4">
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            <span className="font-semibold uppercase text-lg text-gray-800">
                                            {
                                            // dataset.jenis
                                            // bill.type
                                                bills.NOKP
                                            }
                                            </span>	
                                        </div>
                                        <div className="relative w-auto pl-4 flex-initial">
                                            <span className="font-semibold uppercase text-lg text-gray-800">Akaun :&nbsp;
                                            {
                                                //dataset.amaun
                                                bills.NOAKAUN
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
                                            bills.NAMA_PEMILIK
                                            }
                                            </span>	
                                            <h5 className="uppercase font-medium text-xs text-gray-600">
                                            {
                                            // dataset.tempoh
                                            // bill.description
                                            bills.ADDRHARTA
                                            }
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="flex px-4">
                                    <Button 
                                    type="button" 
                                    appeareance="primary"
                                    intent="success" 
                                    onClick={(e) => handleAdd(bills.NOAKAUN)}>{loading?'Menambah..':'Tambah'}</Button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                )
            )
        }
            </div>
        );
    }
    }
}