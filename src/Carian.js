import React, {useState, useEffect} from 'react'

export default function Carian({props}){
    const [search,setSearch] = useState({type:'',search:''});

    const handleSearchOption = (e) => {
        setSearch({
            ...search,
            [e.target.id]: e.target.value
        });
    }

    const handleSearch = (e) => {
        console.log(search.search);

        setSearch({
            ...search,
            [e.target.id]: e.target.value,
        });


        // + something something something
        // 
    }

    // const [dataset, setDataSet] = useState({
	// 	jenis: 'Cukai Taksiran',
	// 	akaun: 'A245181',
	// 	amaun:'RM 30.00',
	// 	tempoh:'Januari - Jun 2020',
	// 	status:'Belum dibayar'
	// });


    if(search.type == '')
    {
        return (
            <div>
                <div className="relative bg-gray-600 md:pt-32 pt-4 pb-4">
                    <div className="px-4 md:px-10 mx-auto w-full">
                        <div className="flex flex-wrap">
                            <div className="w-full px-4">
                                <div className="relative flex flex-col min-w-0 break-words rounded mb-6">
                                    <div className="flex-auto p-4">

                                    <div className="flex flex-initial flex-row-reverse pt-4 pb-4">
                                        <button onClick={(e) => handleSearchOption(e)} id="type" value="nokp" className="text-black bg-white text-center flex-row-reverse border-solid border-2 border-gray-300 rounded-md w-full h-12">
                                                    No Kad Pengenalan
                                        </button>
                                    </div>

                                    <div className="flex flex-initial flex-row-reverse pt-4 pb-4">
                                        <button onClick={(e) => handleSearchOption(e)} id="type" value="ssm" className="text-black bg-white text-center flex-row-reverse border-solid border-2 border-gray-300 rounded-md w-full h-12">
                                                    No SSM Pendaftaran Syarikat
                                        </button>
                                    </div>

                                    <div className="flex flex-initial flex-row-reverse pt-4 pb-4">
                                        <button onClick={(e) => handleSearchOption(e)} id="type" value="akaun" className="text-black bg-white text-center flex-row-reverse border-solid border-2 border-gray-300 rounded-md w-full h-12">
                                                    No Akaun
                                        </button>
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
    else
    {
        return (
            <div>
                <div className="relative bg-gray-600 md:pt-32 pt-4 pb-4">
                    <form onSubmit={(e) => handleSearch(e)}>
                        <div className="px-4 md:px-10 mx-auto w-full">
                            <div className="flex flex-wrap">
                                <div className="w-full px-4">
                                    <div className="relative flex flex-col min-w-0 break-words rounded mb-6">
                                            <div>
                                                <input aria-label="search" id="search" onChange={(e) => handleSearch(e)} name="id" type="text" required className="mb-2 bg-white appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" 
                                                placeholder= {
                                                    search.type == 'akaun' ? ('No Akaun') 
                                                    : search.type == 'ssm' ? ('No SSM Pendaftaran Syarikat') 
                                                    : search.type == 'nokp' ? ('No Kad Pengenalan') 
                                                    : ('Carian...')
                                                } />
                                            </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="flex flex-initial flex-row-reverse pt-4 pb-4">
                                <button id="type" type="button" className="text-white text-center bg-green-500 flex-row-reverse rounded-full w-32 h-12">
                                            Cari
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}