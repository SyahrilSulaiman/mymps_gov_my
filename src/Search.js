import React,{useState, useEffect} from 'react'
import axios from 'axios';
import swal from 'sweetalert'
import Carian from './Carian'

export default function Search({type}){

    const [search,setSearch] = useState('');
    const [loading,setLoading] = useState(false);
    const [display,setDisplay] = useState(false);
    const [bill,setBill] = useState([]);

    useEffect(() =>{
        // console.log(type)
    },[type]);
    
    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    let searchType = "";
    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        axios.get('https://mymps.corrad.my/int/api_generator.php?api_name=searchBill',{
            params: {
                search:search.trim(),
                type:type
            }
        })
        .then(res => {
            if(type === 'nokp'){
                searchType = 'No Kad Pengenalan';

                if(res.data.status === 'FAILED'){
                    setDisplay(false);
                    swal('Tidak ditemui',searchType+' tidak ditemui','error');
                }
                else{
                    setBill(res.data);
                    // console.log('Search NOKP',res.data);
                    setDisplay(true);
                }
            }

            if(type === 'akaun'){
                searchType = 'Akaun';
                // res = res.data;
                // console.log('Search Response : ',res.data[0]);

                if(res.data.status === 'FAILED'){
                    setDisplay(false);
                    swal('Tidak ditemui',searchType+' tidak ditemui','error');
                }
                else{
                    setBill(res.data[0]);
                    // console.log('Search Account ',res.data);
                    // console.log('Bill Akaun',bill);
                    setDisplay(true);
                }
            }

            if(type === 'ssm'){
                searchType = 'No SSM';
                res = res.data;
                // console.log(res);
                
                if(res.status === 'FAILED'){
                    setDisplay(false);
                    swal('Tidak ditemui',searchType+' tidak ditemui','error');
                }
                else{
                    // console.log('Search SSM: ',res)
                    setBill(res);
                    setDisplay(true);
                }
            }
            setLoading(false);
        })
        
    }

    if(type === '') {
        return (
            <div className=""></div>
        );
    }
    else{

    return (
        <div>
                {/* Header */}
            <div className="relative bg-gray-600 pt-4 pb-4">
                <form onSubmit= {(e) => handleSubmit(e)}>
                    <div className="px-4 md:px-10 mx-auto w-full">
                        <div className="flex flex-wrap">
                            <div className="w-full px-4">
                                <div className="relative flex flex-col min-w-0 break-words rounded mb-6">
                                        <div>
                                            <input aria-label="search" id="search" name="search" onChange={(e) => handleChange(e)} type="text" required className="mb-2 bg-white appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" 
                                            placeholder= {
                                                    type === 'akaun' ? ('No Akaun') 
                                                :   type === 'ssm' ? ('No ROC / ROB Syarikat') 
                                                :   type === 'nokp' ? ('No Kad Pengenalan') 
                                                : ('Carian...')
                                            } />
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-initial flex-row-reverse pt-4 pb-4">
                            <button id="type" type="submit" className="text-white text-center bg-green-500 flex-row-reverse rounded-full w-32 h-12">
                                        {loading?'Mencari..':'Cari'}
                            </button>
                        </div>
                    </div>
                </form>
                {
                    <Carian bill={bill} type={type} display={display}/>
                }
            </div>
        </div>
    );
}
}