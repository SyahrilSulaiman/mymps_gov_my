import React, {Component, useState, useEffect} from 'react';
import axios from 'axios';

export default function BillList(){

    const handleViewBill = (e) => {
		// set=[e.target.id]
		// return (
		// 	 senarai = <Senarai />
		console.log('View');
        window.location.href = "/senaraibill";
        
    }
    
    const handleBayar = (e) => {
        console.log('Bayar');
        window.location.href = '/payment';
    }
    
    const [dataset, setDataSet] = useState({
        datas: []
    });

    
    useEffect (() => {
        axios.get('https://mymps.corrad.my/int/api_generator.php?api_name=getBill')
        .then(res => {
            console.log(res.data.data)
            setDataSet({
                datas:res.data.data
                })
            }
        )

    },[])

    const bills = dataset.datas.length ? (
        dataset.datas.map(bill => {
            return (
                <div className="px-4 md:px-2 mx-auto w-full"
                 onClick={
                     //condition xbetul
                     (bill.status.toUpperCase() == 'TERTUNGGAK') ? (handleBayar):(handleViewBill)
                    }
                key = {bill.id}>
                    <div className="flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg">
                                <div className="flex-auto p-4">
                                    <div className="flex flex-row pt-4">
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            <span className="font-semibold text-lg text-gray-800">
                                            {
                                            // dataset.jenis
                                            bill.type
                                            }
                                            </span>	
                                        </div>
                                        <div className="relative w-auto pl-4 flex-initial">
                                            <span className="font-semibold text-lg text-gray-800">
                                            {
                                                //dataset.amaun
                                            }
                                            </span>	
                                        </div>
                                    </div>
                                    <div className="flex flex-row pb-4">
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            <span className="font-semibold text-lg text-gray-800">
                                            {
                                            // dataset.akaun
                                            bill.code
                                            }
                                            </span>	
                                            <h5 className="uppercase font-medium text-xs text-gray-600">
                                            {
                                            // dataset.tempoh
                                            bill.description
                                            }
                                            </h5>
                                        </div>
                                        <div className="relative w-auto pl-4 flex-initial">
                                            <h5 className="uppercase font-medium text-xs text-green-600">
                                            {
                                            // dataset.status
                                            bill.status
                                            }
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })
    ) : (
        <div></div>
    )

    return (
        <div className="">
            {bills}
        </div>
    )
}