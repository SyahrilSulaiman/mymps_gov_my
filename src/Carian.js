import React, {useState, useEffect} from 'react'

export default function Carian(props){

    return (
        <div>
            <div className="relative bg-orange-400 md:pt-32 pt-4 pb-4">
                <div className="px-4 md:px-10 mx-auto w-full">
                    <div className="flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="relative flex flex-col min-w-0 break-words rounded mb-6">
                                <div className="flex-auto p-4">

                                <div className="flex flex-initial flex-row-reverse pt-4 pb-4">
                                    <button type="button" className="text-black bg-white text-center flex-row-reverse border-solid border-2 border-gray-300 rounded-md w-full h-12">
                                                No Kad Pengenalan
                                    </button>
                                </div>

                                <div className="flex flex-initial flex-row-reverse pt-4 pb-4">
                                    <button type="button" className="text-black bg-white text-center flex-row-reverse border-solid border-2 border-gray-300 rounded-md w-full h-12">
                                                No SSM Pendaftaran Syarikat
                                    </button>
                                </div>

                                <div className="flex flex-initial flex-row-reverse pt-4 pb-4">
                                    <button type="button" className="text-black bg-white text-center flex-row-reverse border-solid border-2 border-gray-300 rounded-md w-full h-12">
                                                No Akaun
                                    </button>
                                </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative bg-orange-400 pt-4 pb-4">
                <div className="px-4 md:px-10 mx-auto w-full">
                    <div className="flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="relative flex flex-col min-w-0 break-words rounded mb-6">
                                <form >
                                    <div>
                                        <input aria-label="Email" name="email" type="email" required className="mb-2 bg-white appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Kad Pengenalan" />
                                    </div>
                                </form>
                            </div>
                            
                        </div>
                    </div>
                    <div className="flex flex-initial flex-row-reverse pt-4 pb-4">
                        <button type="button" className="text-white text-center bg-green-500 flex-row-reverse rounded-full w-32 h-12">
                                    Cari
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}