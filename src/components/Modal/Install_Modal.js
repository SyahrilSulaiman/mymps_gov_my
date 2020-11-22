import { Height } from '@material-ui/icons';
import React,{ useState, useEffect } from 'react';
import ios_out from './icon_safari_out.png'

export default function Modal({Close}){
    const height = 22;
    return(
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={Close}></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h2 className="text-2xl leading-6 font-medium text-gray-900" id="modal-headline">
                                    Cara Install
                                </h2>
                            </div>
                            <hr />
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-xl leading-6 font-medium text-gray-900 text-left" id="modal-headline">
                                    Android
                                </h3>
                                <div className="mt-2 ml-2">
                                    <div className="flex">
                                        <div className="flex-row full-width">
                                            <span className="mt-2 text-base text-right">
                                                1. Buka applikasi ini melalui Chrome
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex-row full-width">
                                            <span className="mt-2 text-base text-right">
                                                2. Tekan ikon menu <i className="fas fa-ellipsis-v text-red-700"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex-row full-width">
                                            <span className="mt-2 text-base text-right">
                                                3. Pilih <strong>Add to homescreen</strong>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-base leading-6 font-medium text-gray-900 text-left" id="modal-headline">
                                    IOS
                                </h3>
                                <div className="mt-2 ml-2">
                                    <div className="flex">
                                        <div className="flex-row full-width">
                                            <span className="mt-2 text-base text-right">
                                                1. Buka applikasi ini melalui Safari
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex-row full-width">
                                            <span className="mt-2 text-base text-right">
                                                2. Tekan ikon menu <img className="inline h-5" src={ios_out} alt=""/>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex-row full-width">
                                            <span className="mt-2 text-base text-right">
                                                3. Pilih <strong>Add to homescreen</strong>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" onClick={Close} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}