import React, {Component} from 'react';

const Bill = ({bills}) =>{
    
    const billList = bills.length ? (
        bills.map( bill => {
            return (
                <div>
                    <span>{bill.content}</span>
                </div>
            )
        })
        ) :('')

    return (
        <div className="relative bg-gray-200 md:pt-32 pb-16 pt-12">
            <div className="px-4 md:px-10 mx-auto w-full">
                <div className="flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg">
                            <div className="flex-auto p-4">
                                <div className="flex flex-wrap">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        {billList}
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

export default Bill;