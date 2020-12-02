import Axios from 'axios';
import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'
import {Heading, Text, Paragraph, Button, toaster, Pane, CrossIcon} from "evergreen-ui";

export default function Carian({bill,type, display, handleAdd}){
    const [loading,setLoading] = useState(false);
    let accountType = "";

        useEffect(() =>{
            if(type === 'nokp')
            accountType = 'No Kad Pengenalan';
            if(type === 'akaun')
            accountType = 'Akaun';
            if(type === 'ssm')
            accountType = 'No SSM';
        },[bill]);


    
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
                        <Pane marginTop={5} paddingLeft={5} background="#ffffff">
                            <Heading size={200} textAlign="left" >
                                Tekan pada bil untuk ditambah
                            </Heading>
                        </Pane>
                        <div key={bill[0].NOAKAUN} className="mx-auto w-full">
                        <div className="flex flex-wrap">
                            <div className="w-full">
                                <div className="relative flex flex-col min-w-0 break-words bg-gray-100 border " onClick={() => handleAdd(bill[0].NOAKAUN)}>
                                    <div className="flex-auto p-2">
                                    <i className="fas fa-close"></i>
                                        <div className="flex flex-row pt-1">
                                            <div className="relative w-auto flex-initial">
                                                <span className="font-semibold uppercase text-md text-gray-800">Akaun :&nbsp;
                                                {
                                                    bill[0].NOAKAUN
                                                }
                                                </span>	
                                            </div>
                                        </div>
                                        <div className="flex flex-row pb-2">
                                            <div className="relative w-full  max-w-full flex-grow flex-1">
                                                <span className="font-semibold uppercase text-lg text-gray-800">
                                                {
                                                bill[0].NAMA_PEMILIK
                                                }
                                                </span>	
                                                <h5 className="uppercase font-medium text-xs text-gray-600">
                                                {
                                                bill[0].ADDRHARTA
                                                }
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>)
        }

        else{
        return (
            <div>
                <Pane marginTop={5} background="#ffffff">
                    <Heading size={200} textAlign="center" >
                      Sila pilih bil untuk ditambah
                    </Heading>
                </Pane>
                <Pane marginTop={5}>
                    <Heading size={200} textAlign="center" >
                      
                    </Heading>
                </Pane>
            {
                bill.map(bills => (
                    <div key={bills.NOAKAUN} className="mx-auto w-full">
                        <Pane display="grid" gridTemplateColumns="40px 1fr 40px" marginBottom={10} className="hover:bg-gray-400">
                            <Pane padding={20} justifyContent="center" marginTop={7}>
                                <CrossIcon />
                            </Pane>
                            <Pane padding={10}>
                                <Heading size={200}>{"AKAUN " + bills.NOAKAUN}</Heading>
                                <Heading size={200}>{bills.NAMA_PEMILIK}</Heading>
                                <Heading size={100}>{bills.ADDRHARTA}</Heading>
                            </Pane>
                            <Pane padding={20} justifyContent="center" marginTop={7}>
                                <i className="fas fa-chevron-right"></i>
                            </Pane>
                        </Pane>
                    {/* <div className="flex flex-wrap">
                        <div className="w-full">
                            <div className="relative min-w-0 break-words bg-gray-100 border" onClick={() => handleAdd(bills.NOAKAUN)}>
                                <div className=" p-2">
                                    <div className="">
                                        <i className="fas fa-close"></i>
                                    </div>
                                    <div className="flex flex-row pt-1">
                                        <div className="relative w-auto flex-initial">
                                            <span className="font-semibold uppercase text-sm text-gray-800">
                                            {
                                                bills.NOAKAUN
                                            }
                                            </span>	
                                        </div>
                                    </div>
                                    <div className="flex flex-row pb-2">
                                        <div className="relative w-full max-w-full flex-grow flex-1">
                                            <span className="font-semibold uppercase text-sm text-gray-800">
                                            {
                                            bills.NAMA_PEMILIK
                                            }
                                            </span>	
                                            <h5 className="uppercase font-medium text-xs text-gray-600">
                                            {
                                            bills.ADDRHARTA 
                                            }
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
                )
            )
        }
            </div>
        );
    }
    }
}